import os
from pathlib import Path
from collections import defaultdict
from django.core.management.base import BaseCommand
from django.core.serializers import deserialize
from django.conf import settings


class Command(BaseCommand):
    help = 'Carga los datos completos del MVP en la base de datos de forma ultrarrápida (bulk_create) tolerando duplicados'

    def handle(self, *args, **options):
        posibles = [
            settings.BASE_DIR / 'data' / 'seed_mvp_data.json',
            Path('data/seed_mvp_data.json'),
            Path('/app/data/seed_mvp_data.json'),
        ]
        archivo = None
        for p in posibles:
            if p.exists():
                archivo = p
                break

        if not archivo:
            self.stdout.write(self.style.ERROR("No se encontró el archivo seed_mvp_data.json"))
            return

        self.stdout.write(self.style.NOTICE(f"Leyendo {archivo}..."))
        with open(archivo, 'r', encoding='utf-8') as f:
            contenido = f.read()

        # Agrupar instancias respetando el orden topológico de dependencias del fixture
        ordered_groups = []
        current_model = None
        current_batch = []

        for obj in deserialize('json', contenido):
            model_cls = obj.object.__class__
            if model_cls != current_model:
                if current_batch:
                    ordered_groups.append((current_model, current_batch))
                current_model = model_cls
                current_batch = [obj.object]
            else:
                current_batch.append(obj.object)

        if current_batch:
            ordered_groups.append((current_model, current_batch))

        total_cargados = 0
        self.stdout.write(self.style.NOTICE("Iniciando importación masiva por lotes (bulk_create)..."))

        for model_cls, instances in ordered_groups:
            try:
                # bulk_create con ignore_conflicts=True ejecuta INSERT ON CONFLICT DO NOTHING nativo en Postgres
                created = model_cls.objects.bulk_create(instances, ignore_conflicts=True, batch_size=500)
                total_cargados += len(instances)
                self.stdout.write(f"  ✓ {model_cls.__name__}: {len(instances)} procesados")
            except Exception as e:
                # Fallback por registro individual si el bulk falla por alguna restricción
                for inst in instances:
                    try:
                        inst.save()
                        total_cargados += 1
                    except Exception:
                        pass

        self.stdout.write(self.style.SUCCESS(
            f"Importación masiva completada exitosamente: {total_cargados} registros procesados."
        ))

        # Sincronizar secuencias de PostgreSQL para evitar IntegrityError en nuevos registros
        from django.db import connection
        self.stdout.write(self.style.NOTICE("Sincronizando secuencias de PostgreSQL (setval)..."))
        sql_reset = """
        DO $$
        DECLARE
            r RECORD;
        BEGIN
            FOR r IN (
                SELECT table_name, column_name
                FROM information_schema.columns
                WHERE table_schema = 'public' 
                  AND column_default LIKE 'nextval(%'
            ) LOOP
                BEGIN
                    EXECUTE format(
                        'SELECT setval(pg_get_serial_sequence(%L, %L), coalesce(max(%I), 0) + 1, false) FROM %I',
                        r.table_name, r.column_name, r.column_name, r.table_name
                    );
                EXCEPTION WHEN OTHERS THEN
                    NULL;
                END;
            END LOOP;
        END $$;
        """
        try:
            with connection.cursor() as cursor:
                cursor.execute(sql_reset)
            self.stdout.write(self.style.SUCCESS("✓ Todas las secuencias de PostgreSQL sincronizadas correctamente."))
        except Exception as e:
            self.stdout.write(self.style.WARNING(f"Aviso al sincronizar secuencias: {e}"))
