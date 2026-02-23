
# Forensica-AI Open-Source Setup

## Overview
This project detects AI-generated or fake content (text, image, video, audio) using only free and open-source models. No paid API keys or commercial SaaS are required.

## Requirements
- Python 3.8+
- Node.js (for frontend)
- pip (Python package manager)

## Installation

### 1. Python Environment
Create a virtual environment:

```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install dependencies:

```
pip install -r requirements.txt
```

### 2. Node.js Frontend
Install frontend dependencies:

```
npm install
```

## Running Locally

### Backend (FastAPI)
Start the backend server:

```
uvicorn backend.app:app --reload
```

### Frontend
Start the frontend:

```
npm run dev
```

## Modular Detectors

### TEXT AI Detection
- Uses Hugging Face transformers.
- Example models: `roberta-base-openai-detector`, `gpt2-output-detector`.
- Example Python code:

```
from transformers import pipeline

detector = pipeline('text-classification', model='roberta-base-openai-detector')
result = detector("Your text here")
print(result)
```

### IMAGE Deepfake Detection
- Uses EfficientNet/Xception CNN models (PyTorch/TensorFlow).
- Load local `.pt` or `.h5` weights.
- Example Python code:

```python
import torch
from torchvision import transforms
from PIL import Image

model = torch.load(weights_path, map_location='cpu')
model.eval()
img = Image.open(file).convert('RGB')
preprocess = transforms.Compose([
	transforms.Resize((224, 224)),
	transforms.ToTensor(),
	transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])
input_tensor = preprocess(img).unsqueeze(0)
with torch.no_grad():
	output = model(input_tensor)
	score = torch.sigmoid(output).item()
print(score)
```

### VIDEO Deepfake Detection
- Extract frames using OpenCV
- Run frame-level deepfake classifier
- Aggregate results (average/majority vote)
- Example Python code:

```python
import cv2
from image_detector import detect_image_deepfake

vidcap = cv2.VideoCapture(video_path)
frames = []
count = 0
while True:
	success, frame = vidcap.read()
	if not success:
		break
	frames.append(frame)
	count += 1
results = [detect_image_deepfake(frame) for frame in frames]
final_score = sum(results) / len(results)
print(final_score)
```

### AUDIO Deepfake Detection
- Uses wav2vec2-based classifier.
- Extract MFCC features with librosa.
- Classify using a pretrained audio model.
- Example Python code:

```python
import librosa
import torch
from transformers import Wav2Vec2ForSequenceClassification, Wav2Vec2Processor

audio_path = "audio.wav"
model_name = "facebook/wav2vec2-base-960h"
processor = Wav2Vec2Processor.from_pretrained(model_name)
model = Wav2Vec2ForSequenceClassification.from_pretrained(model_name)
speech, sr = librosa.load(audio_path, sr=16000)
inputs = processor(speech, sampling_rate=sr, return_tensors="pt")
with torch.no_grad():
	logits = model(**inputs).logits
predicted = torch.argmax(logits, dim=-1)
print(predicted)
```
- Each detector is modular and can be extended.
- See backend/services for implementation details.

## License
Open-source, MIT License.
