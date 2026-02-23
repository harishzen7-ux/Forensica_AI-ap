
def load_deepfake_model(weights_path: str = 'efficientnet_deepfake.pt'):
def detect_image_deepfake(file, weights_path: str = 'efficientnet_deepfake.pt'):

def detect_image_deepfake(file, weights_path: str = 'efficientnet_deepfake.pt'):
    try:
        import torch
        from torchvision import transforms
        from PIL import Image
        def load_deepfake_model(weights_path: str = 'efficientnet_deepfake.pt'):
            model = torch.load(weights_path, map_location='cpu')
            model.eval()
            return model
        model = load_deepfake_model(weights_path)
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
        return {
            'generation_source': 'AI' if score > 0.5 else 'HUMAN',
            'score': score,
            'justification': f'Deepfake score: {score}',
            'confidence': score,
            'breakdown': [{'score': score}]
        }
    except Exception as e:
        return {
            'error': 'Image deepfake detection failed.',
            'detail': str(e)
        }
