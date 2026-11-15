from django.db import migrations


def fix_all_sequences(apps, schema_editor):
    from django.db.models import AutoField

    # Recorrer todos los modelos y sincronizar sus secuencias en PostgreSQL
    for model in apps.get_models():
        try:
            table = model._meta.db_table
            if not table:
                continue
            pk = model._meta.pk
            if isinstance(pk, AutoField):
                col = pk.column
                sql = f"""
                SELECT setval(
                    pg_get_serial_sequence('{table}', '{col}'),
                    coalesce(max("{col}"), 1),
                    max("{col}") IS NOT null
                ) FROM "{table}";
                """
                with schema_editor.connection.cursor() as cursor:
                    cursor.execute(sql)
        except Exception:
            pass


class Migration(migrations.Migration):

    dependencies = [
        ('incidentes', '0003_alter_incidente_estado'),
    ]

    operations = [
        migrations.RunPython(fix_all_sequences, reverse_code=migrations.RunPython.noop),
    ]
