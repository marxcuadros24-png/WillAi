import os

# Si existe DATABASE_URL, RENDER o DJANGO_ENV=production, cargar producción
if os.getenv('DATABASE_URL') or os.getenv('RENDER') or os.getenv('DJANGO_ENV') == 'production':
    from .production import *
else:
    from .development import *
