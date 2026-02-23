import React, { useState, useEffect } from 'react';
import { Page, Modality, DetectionResult, SystemStats, HistoryItem } from '../types';
import { submitFeedback, getSystemStats, getHistory, clearHistory, saveDetectionResult } from '../services/detectionService';
import { analyzeWithOpenSource } from '../services/geminiService';

export function useForensica() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedModality, setSelectedModality] = useState<Modality | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
    fetchHistory();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getSystemStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  };

  const navigate = (page: Page, modality: Modality | null = null) => {
    setCurrentPage(page);
    if (modality) setSelectedModality(modality);
    setResult(null);
    setFile(null);
    setPreviewUrl(null);
    setTextInput('');
    setFeedbackSubmitted(false);
    setAnalysisError(null);
    fetchStats();
    fetchHistory();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setAnalysisError(null);
    if (selectedFile) {
      const sizeInMB = selectedFile.size / (1024 * 1024);
      let limit = 0;
      if (selectedModality === 'photo') limit = 50;
      if (selectedModality === 'video') limit = 500;
      if (selectedModality === 'audio') limit = 50;
      
      if (sizeInMB > limit) {
        setAnalysisError(`File exceeds ${limit}MB limit. Please compress the file or choose a smaller one.`);
        e.target.value = ''; // Reset input
        return;
      }
    }
    
    setFile(selectedFile);
    if (selectedFile && selectedModality === 'photo') {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedModality) return;
    const content = selectedModality === 'text' ? textInput : file;
    if (!content) return;

    // Validation
    if (selectedModality === 'text') {
      const wordCount = textInput.trim().split(/\s+/).length;
      if (wordCount > 1000) {
        setAnalysisError('Text exceeds 1000 words limit. Please shorten your input.');
        return;
      }
    } else if (file) {
      const sizeInMB = file.size / (1024 * 1024);
      if (selectedModality === 'photo' && sizeInMB > 50) {
        setAnalysisError('Photo exceeds 50MB limit.');
        return;
      }
      if (selectedModality === 'video' && sizeInMB > 500) {
        setAnalysisError('Video exceeds 500MB limit.');
        return;
      }
      if (selectedModality === 'audio' && sizeInMB > 50) {
        setAnalysisError('Audio exceeds 50MB limit.');
        return;
      }
    }

    setIsAnalyzing(true);
    setFeedbackSubmitted(false);
    setAnalysisError(null);
    
    try {
      // 1. Perform analysis in the frontend using open-source detector
      const detectionResult = await analyzeWithOpenSource(selectedModality, content);
      
      // 2. Save the result to the backend for history and stats
      const savedResult = await saveDetectionResult({
        ...detectionResult,
        modality: selectedModality,
        filename: file?.name,
        textContent: typeof content === 'string' ? content : undefined
      });
      
      // Simulate processing time for the futuristic UI
      setTimeout(() => {
        setResult(savedResult);
        setIsAnalyzing(false);
        fetchStats();
        fetchHistory();
      }, 3000);
    } catch (error: any) {
      console.error('Detection failed:', error);
      setIsAnalyzing(false);
      
      let userMessage = 'Analysis failed due to a system error.';
      if (error.message) {
        userMessage = error.message;
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        userMessage = 'Network connection issue. Please check your internet and try again.';
      } else if (error.message?.includes('JSON')) {
        userMessage = 'The server returned an invalid response. This might be a temporary issue with the AI model.';
      }
      
      setAnalysisError(userMessage);
    }
  };

  const handleFeedback = async (rating: number, isCorrect: boolean) => {
    if (!result?.id) return;
    try {
      await submitFeedback(result.id, rating, isCorrect);
      setFeedbackSubmitted(true);
      fetchStats();
      fetchHistory();
    } catch (error) {
      console.error('Feedback failed:', error);
    }
  };

  const handleClearHistory = async () => {
    try {
      await clearHistory();
      fetchStats();
      fetchHistory();
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setFile(null);
    setTextInput('');
    setPreviewUrl(null);
    setFeedbackSubmitted(false);
    setAnalysisError(null);
  };

  return {
    currentPage,
    selectedModality,
    result,
    isAnalyzing,
    file,
    previewUrl,
    textInput,
    stats,
    history,
    feedbackSubmitted,
    analysisError,
    navigate,
    handleFileChange,
    handleAnalyze,
    handleFeedback,
    handleClearHistory,
    resetAnalysis,
    setFile,
    setPreviewUrl,
    setTextInput,
  };
}
