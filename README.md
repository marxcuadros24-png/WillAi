#  WillAI — MVP Hackathon NASA & Comunidades Andinas
###  Monitoreo Satelital (NASA FIRMS) y Machine Learning Predictivo para Parinacochas, Ayacucho

Este directorio contiene la versión **MVP limpia y optimizada** de WillAI, preparada para desplegar en producción y grabar la demo para la **Hackathon de la NASA**.

---

##  Pilares del MVP

1. **🛰️ Consumo de APIs de la NASA (NASA FIRMS):**
   * Descarga satelital en tiempo real de **VIIRS (375 m)** y **MODIS (1 km)**.
   * Modelado de la **huella física real (*Footprint*)** en UTM 18S según ángulo de escaneo (`scan`), rastro (`track`) e inclinación orbital ($\pm 9.5^\circ$).
   * Fusión multi-sensor para eliminar duplicados y consolidar potencia radiativa (FRP).

2. ** Machine Learning y Física Predictiva:**
   * **Modelo de Susceptibilidad / Ocurrencia:** *Random Forest* calibrado con escalamiento sigmoide de Platt (**Brier Score = 0.0056**).
   * **Prevención de fuga de datos:** División temporal estricta 70/30 (Time-Split) entrenada sobre 1,859 detecciones históricas de la NASA y 2 años de meteorología.
   * **Calibración FWI Altoandino:** Adaptación del *Canadian Fire Weather Index* al pajonal andino (**PR-AUC = 0.7816**, **ROC-AUC = 0.8029**).
   * **Simulador Elíptico Andino:** Propagación física con corrección topográfica DEM Copernicus y ensamble de viento ($\pm 15^\circ$).

3. ** Contexto Sociocultural Andino:**
   * Protección prioritaria de **comunidades quechuahablantes** (*Huaccana, Chumpi, Pullo, Puyusca, Upahuacho, Paucaray*).
   * Alerta temprana para evitar muertes de comuneros en combate manual de ladera (*"Qata wichayman amapuni asuykuychu"*).
   * Protección de los **bofedales altoandinos** (esponjas hídricas comunales) y pastos de ganado (*ichu*).

---

## Cómo Ejecutar el MVP

### Opción 1: Con el Script Automático de 1 Clic
Abre PowerShell y ejecuta:
```powershell
cd "c:\Users\MARX\Desktop\Nueva carpeta\mvp_produccion"
powershell -ExecutionPolicy Bypass -File .\iniciar_mvp.ps1
```

### Opción 2: Manualmente
1. **Iniciar Backend (Django):**
   ```powershell
   cd backend
   & "c:\Users\MARX\Desktop\Nueva carpeta\WillAi-ML\backend\.venv\Scripts\python.exe" manage.py runserver 127.0.0.1:8000
   ```
2. **Iniciar Frontend (React + Vite):**
   ```powershell
   cd frontend
   npm run dev -- --host 127.0.0.1
   ```

---

## Accesos de la Demo

* **Centro de Mando Web:** [http://localhost:5173/](http://localhost:5173/)
* **Documentación OpenAPI / Swagger:** [http://127.0.0.1:8000/api/docs/](http://127.0.0.1:8000/api/docs/)
* **Credenciales:** `admin@willai.pe` / `admin12345`
