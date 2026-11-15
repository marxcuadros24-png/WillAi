from django.db import migrations


def reset_sequences(apps, schema_editor):
    # 1. Limpiar simulaciones en estado ERROR causadas por desfasaje de secuencias
    try:
        SimulacionPropagacion = apps.get_model('predicciones', 'SimulacionPropagacion')
        SimulacionPropagacion.objects.filter(estado='ERROR').delete()
    except Exception:
        pass

    # 2. Reseteo automático de secuencias en PostgreSQL al valor máximo actual + 1
    sql = """
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
        with schema_editor.connection.cursor() as cursor:
            cursor.execute(sql)
    except Exception as e:
        print(f"Advertencia al resetear secuencias: {e}")


class Migration(migrations.Migration):

    dependencies = [
        ('predicciones', '0002_simulacionpropagacion_resultadopropagacion'),
    ]

    operations = [
        migrations.RunPython(reset_sequences, reverse_code=migrations.RunPython.noop),
    ]
