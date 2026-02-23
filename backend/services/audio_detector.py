def detect_audio_deepfake(file, model_name='facebook/wav2vec2-base-960h'):

def detect_audio_deepfake(file, model_name='facebook/wav2vec2-base-960h'):
    try:
        import librosa
        from transformers import Wav2Vec2ForSequenceClassification, Wav2Vec2Processor
        import torch
        y, sr = librosa.load(file, sr=16000)
        processor = Wav2Vec2Processor.from_pretrained(model_name)
        model = Wav2Vec2ForSequenceClassification.from_pretrained(model_name)
        input_values = processor(y, sampling_rate=sr, return_tensors="pt").input_values
        with torch.no_grad():
            logits = model(input_values).logits
            score = torch.sigmoid(logits).item()
        return {
            'generation_source': 'AI' if score > 0.5 else 'HUMAN',
            'score': score,
            'justification': f'Wav2Vec2 score: {score}',
            'confidence': score,
            'breakdown': [{'score': score}]
        }
    except Exception as e:
        return {
            'error': 'Audio deepfake detection failed.',
            'detail': str(e)
        }
