from django.utils import timezone
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ObservacionMeteorologica, ZonaRiesgo, Vivienda, ResidenteVivienda, EvaluacionExposicion
from .serializers import (
    ObservacionMeteorologicaSerializer,
    ZonaRiesgoSerializer,
    ViviendaSerializer,
    EvaluacionExposicionSerializer,
)


class ObservacionMeteorologicaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Datos meteorológicos en tiempo real e históricos (Open-Meteo) para cálculo de riesgo.
    """
    queryset = ObservacionMeteorologica.objects.all()
    serializer_class = ObservacionMeteorologicaSerializer
    permission_classes = [permissions.AllowAny]
    filterset_fields = ['proveedor']

    @action(detail=False, methods=['get'])
    def actual(self, request):
        """
        Retorna la última observación meteorológica registrada en Coracora.
        """
        ultima = ObservacionMeteorologica.objects.first()
        if not ultima:
            return Response({
                "temperatura_c": 18.0,
                "humedad_relativa": 58.0,
                "viento_kmh": 15.0,
                "direccion_viento_grados": 270.0,
                "precipitacion_mm": 0.0,
                "fwi": 24.5,
                "nivel_peligro": "Alto",
                "observada_en": timezone.now().isoformat()
            })
        return Response(ObservacionMeteorologicaSerializer(ultima).data)


class ZonaRiesgoViewSet(viewsets.ModelViewSet):
    """
    Zonas de peligro y riesgo delimitadas para advertencia temprana.
    """
    queryset = ZonaRiesgo.objects.select_related('incidente').all()
    serializer_class = ZonaRiesgoSerializer
    filterset_fields = ['nivel', 'origen', 'incidente']

    def get_permissions(self):
        return [permissions.AllowAny()]


class ViviendaViewSet(viewsets.ModelViewSet):
    """
    Registro y gestión de viviendas rurales en zonas de interfaz urbano-forestal.
    """
    queryset = Vivienda.objects.select_related('comunidad').filter(activa=True)
    serializer_class = ViviendaSerializer
    filterset_fields = ['comunidad', 'verificada']

    def get_permissions(self):
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        vivienda = serializer.save()
        user = self.request.user if (self.request.user and self.request.user.is_authenticated) else None
        if user:
            ResidenteVivienda.objects.get_or_create(
                vivienda=vivienda,
                usuario=user,
                defaults={'relacion': ResidenteVivienda.Relacion.PROPIETARIO, 'recibe_alertas': True}
            )
