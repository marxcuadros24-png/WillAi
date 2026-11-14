import os
from .base import *

DEBUG = env.bool('DEBUG', default=False)

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['*', 'localhost', '127.0.0.1', '.onrender.com', '.vercel.app'])

# Base de datos: Soporta DATABASE_URL (Supabase / Render) o variables individuales
database_url = os.environ.get('DATABASE_URL') or env('DATABASE_URL', default=None)
if database_url:
    DATABASES = {
        'default': env.db('DATABASE_URL', engine='django.contrib.gis.db.backends.postgis')
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': env('DB_ENGINE', default='django.contrib.gis.db.backends.postgis'),
            'NAME': env('DB_NAME', default='postgres'),
            'USER': env('DB_USER', default='postgres'),
            'PASSWORD': env('DB_PASSWORD', default=''),
            'HOST': env('DB_HOST', default='localhost'),
            'PORT': env('DB_PORT', default='5432'),
        }
    }

# Celery síncrono para despliegues serverless o free tier sin Redis dedicado
CELERY_TASK_ALWAYS_EAGER = env.bool('CELERY_TASK_ALWAYS_EAGER', default=True)
CELERY_TASK_EAGER_PROPAGATES = True

# Configuración de proxy inverso (Render / Cloudflare)
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Orígenes confiables para CSRF (Vercel y Render)
CSRF_TRUSTED_ORIGINS = env.list(
    'CSRF_TRUSTED_ORIGINS',
    default=[
        'https://*.onrender.com',
        'https://*.vercel.app',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ]
)

# Soporte para WhiteNoise (archivos estáticos en producción)
try:
    import whitenoise
    if 'whitenoise.middleware.WhiteNoiseMiddleware' not in MIDDLEWARE:
        # Insertar después de SecurityMiddleware
        MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
except ImportError:
    pass
