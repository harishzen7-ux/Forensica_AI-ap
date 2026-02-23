import { DetectionResult, HistoryItem, Modality, SystemStats } from '../types';

export const saveDetectionResult = async (result: any): Promise<DetectionResult> => {
  const response = await fetch('/api/detect/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result),
  });

  if (!response.ok) {
    throw new Error('Failed to save detection result');
  }

  return response.json();
};

export const submitFeedback = async (analysisId: number, rating: number, isCorrect: boolean): Promise<void> => {
  const response = await fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ analysisId, rating, isCorrect }),
  });

  if (!response.ok) {
    throw new Error('Feedback submission failed');
  }
};

export const getSystemStats = async (): Promise<SystemStats> => {
  const response = await fetch('/api/stats');
  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }
  return response.json();
};

export const getHistory = async (): Promise<HistoryItem[]> => {
  const response = await fetch('/api/history');
  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }
  return response.json();
};

export const clearHistory = async (): Promise<void> => {
  const response = await fetch('/api/history/clear', { method: 'POST' });
  if (!response.ok) {
    throw new Error('Failed to clear history');
  }
};
