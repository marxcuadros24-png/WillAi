"""
URL configuration for WillAI backend (MVP).
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

def custom_500(request):
    import sys
    exc_type, exc_value, _ = sys.exc_info()
    detail = f": {exc_value}" if exc_value else ""
    return JsonResponse({
        'success': False,
        'error': f'Error interno del servidor (HTTP 500){detail}. Revisa logs en Render o conexión a Supabase.',
        'path': request.path
    }, status=500)

handler500 = 'config.urls.custom_500'

def health_check(request):
    return JsonResponse({
        'status': 'ok',
        'service': 'willai-backend',
        'version': '1.0.0'
    })

urlpatterns = [
    # Health checks para Render y UptimeRobot (24/7 pinger)
    path('health/', health_check, name='health-root'),
    path('api/health/', health_check, name='health-api'),

    # Django Admin (Panel de Operaciones & Gestión)
    path('admin/', admin.site.urls),

    # Centro de Mando Táctico Web (Operadores de Emergencia COEP/COEL/OGRD)
    path('panel/', include('apps.panel.urls')),

    # Documentación interactiva de la API (Swagger & ReDoc)
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    # Endpoints de las aplicaciones Core (NASA APIs, ML, Geografía, Incidentes)
    path('api/v1/usuarios/', include('apps.usuarios.urls')),
    path('api/v1/geografia/', include('apps.geografia.urls')),
    path('api/v1/respuesta/', include('apps.respuesta.urls')),
    path('api/v1/reportes/', include('apps.reportes.urls')),
    path('api/v1/incidentes/', include('apps.incidentes.urls')),
    path('api/v1/publico/', include('apps.incidentes.public_urls')),
    path('api/v1/firms/', include('apps.firms.urls')),
    path('api/v1/meteorologia/', include('apps.meteorologia.urls')),
    path('api/v1/predicciones/', include('apps.predicciones.urls')),
    path('api/predicciones/', include('apps.predicciones.urls')),
    path('api/v1/alertas/', include('apps.alertas.urls')),
    path('api/v1/gamificacion/', include('apps.gamificacion.urls')),
    path('api/v1/donaciones/', include('apps.donaciones.urls')),
    path('api/v1/auditoria/', include('apps.auditoria.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
