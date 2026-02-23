# Placeholder for video deepfake detection
# Use OpenCV to extract frames and run image classifier


def detect_video_deepfake(file):
    try:
        import cv2
        from .image_detector import detect_image_deepfake
        def extract_frames(video_path, interval=30):
            vidcap = cv2.VideoCapture(video_path)
            frames = []
            count = 0
            while True:
                success, image = vidcap.read()
                if not success:
                    break
                if count % interval == 0:
                    frames.append(image)
                count += 1
            vidcap.release()
            return frames
        frames = extract_frames(file)
        scores = []
        for frame in frames:
            temp_path = 'temp_frame.jpg'
            cv2.imwrite(temp_path, frame)
            result = detect_image_deepfake(temp_path)
            scores.append(result['score'])
        avg_score = sum(scores) / len(scores) if scores else 0
        return {
            'generation_source': 'AI' if avg_score > 0.5 else 'HUMAN',
            'score': avg_score,
            'justification': f'Average deepfake score: {avg_score}',
            'confidence': avg_score,
            'breakdown': scores
        }
    except Exception as e:
        return {
            'error': 'Video deepfake detection failed.',
            'detail': str(e)
        }
