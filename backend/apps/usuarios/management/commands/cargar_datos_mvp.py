import os
from pathlib import Path
from django.core.management.base import BaseCommand
from django.core.serializers import deserialize
from django.db import IntegrityError, transaction
from django.conf import settings


class Command(BaseCommand):
    help = 'Carga los datos completos del MVP en la base de datos tolerando registros duplicados existentes'

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

        cargados = 0
        omitidos = 0
        errores = 0

        self.stdout.write(self.style.NOTICE("Iniciando importación tolerante a duplicados..."))
        for obj in deserialize('json', contenido):
            try:
                with transaction.atomic():
                    obj.save()
                    cargados += 1
            except IntegrityError:
                omitidos += 1
            except Exception:
                errores += 1

        self.stdout.write(self.style.SUCCESS(
            f"Importación completada con éxito: {cargados} registros cargados, "
            f"{omitidos} ya existentes omitidos, {errores} errores secundarios."
        ))
