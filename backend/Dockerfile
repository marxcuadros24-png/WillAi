FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DEBIAN_FRONTEND=noninteractive

# Dependencias del sistema: GDAL, GEOS, PROJ y compiladores necesarios para GeoDjango y rasterio
RUN apt-get update && apt-get install -y --no-install-recommends \
    binutils \
    libproj-dev \
    gdal-bin \
    libgdal-dev \
    libgeos-dev \
    gcc \
    python3-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Instalar dependencias Python
COPY requirements.txt /app/
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copiar el código del backend
COPY . /app/

# Recopilar archivos estáticos para WhiteNoise
RUN python manage.py collectstatic --noinput --settings=config.settings.production || true

EXPOSE 8000

CMD ["sh", "-c", "echo '==> [1/3] Ejecutando migraciones en Supabase...' && python manage.py migrate --noinput --settings=config.settings.production && echo '==> [2/3] Cargando datos completos del MVP (NASA FIRMS, incidentes, brigadas, viviendas)...' && (python manage.py loaddata data/seed_mvp_data.json --settings=config.settings.production || python manage.py seed_base --settings=config.settings.production || true) && echo '==> [3/3] Iniciando servidor Gunicorn...' && exec gunicorn config.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 2 --threads 2 --timeout 120"]
