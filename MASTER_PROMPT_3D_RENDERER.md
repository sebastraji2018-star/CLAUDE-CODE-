# MASTER PROMPT — SISTEMA DE RENDERIZADO 3D DESDE IMÁGENES

> Pega esto completo en Claude Code al inicio de tu sesión.

---

## ROL Y MISIÓN

Eres un ingeniero experto en gráficos 3D, visión por computadora y desarrollo web. Tu misión es construir un sistema completo de renderizado 3D que convierta imágenes en modelos 3D de alta calidad listos para usar en páginas web, con calidad comparable a Blender.

**ANTES DE ESCRIBIR UNA SOLA LÍNEA DE CÓDIGO**, ejecuta esta secuencia de auto-configuración:

---

## FASE 0 — AUTO-INSTALACIÓN DE CAPACIDADES

Ejecuta los siguientes pasos EN ORDEN y sin omitir ninguno:

### 0.1 — Detección de entorno
```bash
python3 --version && node --version && npm --version && pip3 --version
uname -a
nvidia-smi 2>/dev/null || echo "No GPU detectada, usaremos CPU"
```

### 0.2 — Instalación de dependencias del sistema
```bash
# Herramientas base
sudo apt-get update -y 2>/dev/null || true
sudo apt-get install -y libgl1-mesa-glx libglib2.0-0 libsm6 libxrender1 libxext6 ffmpeg wget curl git 2>/dev/null || true
```

### 0.3 — Instalación del stack Python completo para 3D
```bash
pip3 install --upgrade pip

# Stack principal de visión 3D y IA
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
pip3 install open3d trimesh numpy scipy pillow imageio matplotlib
pip3 install transformers diffusers accelerate safetensors
pip3 install opencv-python-headless scikit-image
pip3 install fastapi uvicorn python-multipart aiofiles
pip3 install pygltflib pyrender pyopengl xatlas
pip3 install huggingface_hub datasets
pip3 install rembg onnxruntime  # Eliminación de fondo
pip3 install depth-pro 2>/dev/null || pip3 install timm  # Estimación de profundidad
```

### 0.4 — Instalación del stack JavaScript/Web
```bash
npm install -g three @types/three
mkdir -p 3d-renderer && cd 3d-renderer
npm init -y
npm install three @react-three/fiber @react-three/drei
npm install vite @vitejs/plugin-react react react-dom
npm install axios multer express cors
npm install gltf-pipeline draco3d
```

### 0.5 — Descarga de modelos de IA para reconstrucción 3D
Descarga los siguientes modelos usando Python:
```python
from huggingface_hub import hf_hub_download, snapshot_download
import os

os.makedirs("models", exist_ok=True)

# Modelo de estimación de profundidad (MiDaS/DPT)
snapshot_download(
    repo_id="Intel/dpt-large",
    local_dir="models/dpt-depth",
    ignore_patterns=["*.msgpack", "*.h5"]
)

# Modelo ZoeDepth para profundidad métrica
snapshot_download(
    repo_id="isl-org/ZoeDepth",
    local_dir="models/zoedepth",
    ignore_patterns=["*.msgpack"]
)

# Modelo de eliminación de fondo U2Net
from rembg import new_session
session = new_session("u2net")
print("✅ Modelos descargados correctamente")
```

---

## FASE 1 — ARQUITECTURA DEL SISTEMA

Construye la siguiente estructura de proyecto:

```
3d-renderer/
├── backend/
│   ├── main.py                  # API FastAPI principal
│   ├── pipeline/
│   │   ├── __init__.py
│   │   ├── depth_estimator.py   # Estimación de profundidad
│   │   ├── mesh_generator.py    # Generación de malla 3D
│   │   ├── texture_mapper.py    # Mapeo de texturas
│   │   ├── bg_remover.py        # Eliminación de fondo
│   │   ├── normal_estimator.py  # Estimación de normales
│   │   └── exporter.py          # Exportación GLTF/GLB/OBJ
├── frontend/
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx             # App React principal
│   │   ├── components/
│   │   │   ├── Uploader.jsx     # Subida de imágenes
│   │   │   ├── Viewer3D.jsx     # Visor Three.js interactivo
│   │   │   ├── Controls.jsx     # Controles de calidad
│   │   │   └── Exporter.jsx     # Descarga del modelo
│   │   └── utils/
│   │       └── api.js
│   └── vite.config.js
├── models/                      # Modelos de IA descargados
└── outputs/                     # Modelos 3D generados
```

---

## FASE 2 — IMPLEMENTACIÓN DEL BACKEND

### 2.1 — Pipeline de Estimación de Profundidad (`backend/pipeline/depth_estimator.py`)

Implementa una clase `DepthEstimator` con:
- Soporte para modelos DPT-Large y ZoeDepth
- Inferencia adaptativa (GPU si disponible, CPU como fallback)
- Normalización y refinamiento del mapa de profundidad
- Modo de alta calidad que combina múltiples pasadas
- Salida como numpy array float32 normalizado [0,1]

```python
# Referencia de implementación — expande esto completamente:
class DepthEstimator:
    def __init__(self, model_type="zoedepth", quality="high"):
        # Carga el modelo apropiado
        # quality: "fast" | "balanced" | "high"
        pass
    
    def estimate(self, image: PIL.Image) -> np.ndarray:
        # Retorna mapa de profundidad normalizado
        pass
    
    def refine(self, depth_map: np.ndarray, image: PIL.Image) -> np.ndarray:
        # Refinamiento con bordes de la imagen original
        pass
```

### 2.2 — Generador de Malla 3D (`backend/pipeline/mesh_generator.py`)

Implementa `MeshGenerator` con las siguientes capacidades:

**Método Principal — Depth-to-Mesh:**
- Convierte mapa de profundidad en nube de puntos 3D
- Reconstrucción de superficie con algoritmo Poisson
- Eliminación de artefactos y suavizado
- Remallado adaptativo (más detalle en zonas con alta variación)
- Proyección de textura desde imagen original

**Método Secundario — Multi-view synthesis:**
- Genera vistas sintéticas adicionales (front, side, top)
- Fusión de nubes de puntos para mayor completitud
- Estimación de geometría en zonas ocultas

**Parámetros de calidad:**
```python
QUALITY_PRESETS = {
    "web_fast":    {"depth": 7,  "vertices": 5000,   "texture": 512},
    "web_quality": {"depth": 9,  "vertices": 20000,  "texture": 1024},
    "ultra":       {"depth": 12, "vertices": 100000, "texture": 4096},
}
```

### 2.3 — Mapeador de Texturas (`backend/pipeline/texture_mapper.py`)

Implementa `TextureMapper` con:
- Desempaquetado UV automático con xatlas
- Proyección de textura desde imagen original en zonas visibles
- Síntesis de textura para zonas ocultas (usando inpainting)
- Mapas de normales generados desde gradiente de profundidad
- PBR materials: albedo, roughness, metallic, normal, ao

### 2.4 — API Principal (`backend/main.py`)

```python
from fastapi import FastAPI, UploadFile, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="3D Renderer API", version="2.0")

@app.post("/render")
async def render_image_to_3d(
    file: UploadFile,
    quality: str = "web_quality",  # web_fast | web_quality | ultra
    format: str = "glb",           # glb | obj | gltf
    remove_background: bool = True,
    generate_pbr: bool = True,
    background_tasks: BackgroundTasks = None
):
    """
    Convierte una imagen en un modelo 3D completo.
    Retorna URL de descarga del modelo generado.
    Pipeline completo:
    1. Eliminar fondo
    2. Estimar profundidad
    3. Estimar normales de superficie
    4. Generar malla 3D
    5. Mapear textura + PBR
    6. Optimizar para web
    7. Exportar GLB/GLTF
    """
    pass

@app.get("/status/{job_id}")
async def get_job_status(job_id: str):
    pass

@app.get("/download/{job_id}")
async def download_model(job_id: str, format: str = "glb"):
    pass
```

---

## FASE 3 — IMPLEMENTACIÓN DEL FRONTEND

### 3.1 — Visor 3D Interactivo (`frontend/src/components/Viewer3D.jsx`)

Usa React Three Fiber (@react-three/fiber) para crear:
- Visor orbital con controles táctiles y de ratón
- Iluminación dinámica tipo estudio fotográfico (HDRI)
- Sombras suaves en tiempo real
- Reflections usando environment maps
- Grid de suelo con sombra proyectada
- Controles de material: roughness, metallic, wireframe toggle
- Animación de rotación automática opcional
- Post-processing: bloom, SSAO, tone mapping

```jsx
// Referencia — implementa completamente con todos los efectos
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei'
import { EffectComposer, SSAO, Bloom } from '@react-three/postprocessing'

export function Viewer3D({ modelUrl, settings }) {
  // Implementación completa con todos los efectos visuales
}
```

### 3.2 — Interfaz Principal (`frontend/src/main.jsx`)

Crea una UI profesional con:
- Zona de drag-and-drop para imágenes
- Preview de imagen original vs modelo 3D side-by-side
- Barra de progreso con etapas del pipeline
- Selector de calidad con preview de tiempos estimados
- Controles de iluminación del visor
- Botones de exportación (GLB, OBJ, GLTF)
- Código embed para copiar/pegar en páginas web
- Diseño dark mode profesional

---

## FASE 4 — OPTIMIZACIÓN PARA WEB

### 4.1 — Compresión y optimización de modelos

Implementa en `backend/pipeline/exporter.py`:
```bash
# Draco compression para reducir tamaño hasta 90%
# Implementa esto como llamada de sistema si gltf-pipeline está disponible
gltf-pipeline -i model.gltf -o model.glb --draco.compressionLevel 7
```

- Compresión Draco para geometría
- KTX2 para texturas comprimidas
- LOD (Level of Detail) automático: 3 niveles
- Tamaño objetivo: < 2MB para web_fast, < 10MB para web_quality

### 4.2 — Código de embebido web

Genera automáticamente un snippet HTML listo para pegar:
```html
<!-- Genera esto dinámicamente con la URL del modelo -->
<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
<model-viewer
  src="MODEL_URL_AQUI"
  alt="Modelo 3D"
  auto-rotate
  camera-controls
  shadow-intensity="1"
  environment-image="neutral"
  style="width: 100%; height: 500px;">
</model-viewer>
```

---

## FASE 5 — MEJORAS AVANZADAS CON IA

Después de tener el pipeline base funcionando, implementa estas mejoras:

### 5.1 — Reconstrucción multi-vista con IA
```python
# Usa el modelo TripoSR o InstantMesh si están disponibles
try:
    from tripo_sr import TripoSR
    # Pipeline con TripoSR para reconstrucción 3D de calidad superior
except ImportError:
    # Fallback a pipeline depth-based
    pass
```

Intenta instalar y usar en orden de preferencia:
1. **TripoSR** (Stability AI) — mejor calidad, open source
2. **One-2-3-45** — reconstrucción multi-vista
3. **InstantMesh** — meshes de alta calidad
4. **Shap-E** (OpenAI) — como fallback

```bash
pip3 install git+https://github.com/VAST-AI-Research/TripoSR.git 2>/dev/null || true
pip3 install shap-e 2>/dev/null || true
```

### 5.2 — Generación de material PBR con IA
- Usa modelos de difusión para generar mapas de roughness/metallic realistas
- Genera normal maps de alta frecuencia con IA

### 5.3 — Animación automática
- Detección de tipo de objeto (persona, objeto, vehículo)
- Aplicación de rig automático para figuras humanas
- Animaciones básicas (idle, rotación, bounce)

---

## FASE 6 — SERVIDOR Y DESPLIEGUE

### 6.1 — Script de inicio todo-en-uno
Crea `start.sh`:
```bash
#!/bin/bash
# Inicia backend y frontend en paralelo
cd backend && uvicorn main:app --reload --port 8000 &
cd frontend && npm run dev &
echo "🚀 Backend: http://localhost:8000"
echo "🎨 Frontend: http://localhost:5173"
echo "📖 API Docs: http://localhost:8000/docs"
wait
```

### 6.2 — Docker compose para producción
Crea `docker-compose.yml` completo con:
- Servicio backend Python con modelo cacheado
- Servicio frontend Vite/React
- Nginx como reverse proxy
- Volumen para modelos y outputs

---

## FASE 7 — PRUEBAS Y VALIDACIÓN

Después de implementar, ejecuta estas pruebas:

```python
# test_pipeline.py — Crea esto y ejecútalo
import requests
from pathlib import Path

def test_render_pipeline():
    # Descarga imagen de prueba
    import urllib.request
    urllib.request.urlretrieve(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png",
        "test_image.png"
    )
    
    # Test del pipeline completo
    with open("test_image.png", "rb") as f:
        response = requests.post(
            "http://localhost:8000/render",
            files={"file": f},
            data={"quality": "web_quality", "format": "glb"}
        )
    
    assert response.status_code == 200
    result = response.json()
    print(f"✅ Pipeline OK — Job ID: {result['job_id']}")
    print(f"⏱️  Tiempo: {result['processing_time']}s")
    print(f"📦 Tamaño: {result['file_size_mb']}MB")
    print(f"🔺 Vértices: {result['vertex_count']}")
    return result

test_render_pipeline()
```

---

## INSTRUCCIONES ADICIONALES PARA CLAUDE CODE

Durante toda la implementación:

1. **Si alguna instalación falla**, busca alternativas equivalentes e instálalas. Nunca te detengas por una dependencia fallida — siempre hay un fallback.

2. **Para modelos de IA pesados** (>1GB), implementa descarga lazy: descarga solo cuando se necesite, no al inicio.

3. **Mide el tiempo** de cada etapa del pipeline y muéstraselo al usuario con barra de progreso.

4. **Manejo de errores robusto**: si la estimación de profundidad falla, intenta con el modelo alternativo. Si la reconstrucción Poisson falla, usa marching cubes como fallback.

5. **Logs detallados** en consola para cada etapa — el usuario necesita ver qué está pasando.

6. **Al terminar**, muestra:
   - URL del frontend
   - URL de la API con link a /docs (Swagger)
   - Ejemplo de curl para probar el endpoint
   - Instrucciones de uso en 5 pasos

7. **Busca y añade skills adicionales** ejecutando:
```bash
# Busca en GitHub modelos y herramientas nuevas de reconstrucción 3D
# Prioriza las que tengan >1000 stars y licencia MIT/Apache
# Integra automáticamente cualquiera que mejore la calidad del output
```

8. **El objetivo final**: que el usuario pueda arrastrar una foto de un zapato, una silla, una cara, o cualquier objeto, y en menos de 60 segundos tener un `.glb` listo para poner en su web con `<model-viewer>`.

---

## MÉTRICAS DE ÉXITO

El sistema está completo cuando:
- [ ] Una imagen JPG/PNG se convierte a GLB en < 60s (calidad web)
- [ ] El modelo tiene textura proyectada correctamente desde la imagen
- [ ] El visor 3D web funciona en Chrome/Firefox/Safari/Mobile
- [ ] El GLB generado pesa < 10MB
- [ ] El snippet de embebido HTML funciona con `<model-viewer>`
- [ ] La API tiene documentación en /docs
- [ ] Funciona con fotos de personas, objetos, muebles, productos

**¡Empieza por la Fase 0 y no pares hasta que todo esté funcionando!**
