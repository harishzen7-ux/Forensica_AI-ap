def detect_text_ai(text: str):

def detect_text_ai(text: str):
    try:
        from transformers import pipeline
        try:
            detector = pipeline('text-classification', model='roberta-base-openai-detector')
        except Exception:
            detector = pipeline('text-classification', model='gpt2-output-detector')
        result = detector(text)
        return {
            'generation_source': 'AI' if result[0]['label'] == 'LABEL_1' else 'HUMAN',
            'score': result[0]['score'],
            'justification': f"Model: {result[0]['label']} (score: {result[0]['score']})",
            'confidence': result[0]['score'],
            'breakdown': [result[0]]
        }
    except Exception as e:
        return {
            'error': 'Text AI detection failed.',
            'detail': str(e)
        }
