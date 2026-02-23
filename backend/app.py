
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from typing import Any
import traceback

app = FastAPI()

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/detect/text")
def detect_text_endpoint(text: str) -> Any:
    try:
        from services.text_detector import detect_text_ai
        return detect_text_ai(text)
    except Exception as e:
        return JSONResponse(status_code=500, content={
            "error": "Text AI detection failed.",
            "detail": str(e),
            "trace": traceback.format_exc()
        })

@app.post("/detect/image")
def detect_image_endpoint(file: UploadFile = File(...)) -> Any:
    try:
        from services.image_detector import detect_image_deepfake
        return detect_image_deepfake(file)
    except Exception as e:
        return JSONResponse(status_code=500, content={
            "error": "Image deepfake detection failed.",
            "detail": str(e),
            "trace": traceback.format_exc()
        })

@app.post("/detect/video")
def detect_video_endpoint(file: UploadFile = File(...)) -> Any:
    try:
        from services.video_detector import detect_video_deepfake
        return detect_video_deepfake(file)
    except Exception as e:
        return JSONResponse(status_code=500, content={
            "error": "Video deepfake detection failed.",
            "detail": str(e),
            "trace": traceback.format_exc()
        })

@app.post("/detect/audio")
def detect_audio_endpoint(file: UploadFile = File(...)) -> Any:
    try:
        from services.audio_detector import detect_audio_deepfake
        return detect_audio_deepfake(file)
    except Exception as e:
        return JSONResponse(status_code=500, content={
            "error": "Audio deepfake detection failed.",
            "detail": str(e),
            "trace": traceback.format_exc()
        })
