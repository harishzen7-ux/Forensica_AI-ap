import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';
import { auditService } from '../services/audit.service';
import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';
import db from '../db';

export const saveAnalysisResult = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { modality, score, justification, confidence, breakdown, filename, textContent } = req.body;

  const stmt = db.prepare(`
    INSERT INTO evidence (type, modality, filename, text_content, authenticity_score, risk_level, result_json)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  const riskLevel = score > 70 ? 'Low' : score > 30 ? 'Medium' : 'High';
  
  const dbResult = stmt.run(
    modality,
    modality,
    filename || null,
    textContent || null,
    score,
    riskLevel,
    JSON.stringify({
      authenticity_score: score,
      risk_level: riskLevel,
      tampering_signs: breakdown?.map((b: any) => b.label) || [],
      forensic_summary: justification
    })
  );

  res.status(200).json({
    id: Number(dbResult.lastInsertRowid),
    type: modality,
    generation_source: score > 50 ? 'HUMAN' : 'AI',
    score,
    justification,
    confidence,
    breakdown
  });
});

export const submitFeedback = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { analysisId, rating, isCorrect } = req.body;
  
  const stmt = db.prepare('UPDATE evidence SET feedback_rating = ?, feedback_is_correct = ? WHERE id = ?');
  stmt.run(rating, isCorrect ? 1 : 0, analysisId);

  auditService.log(req.user?.id, 'FEEDBACK_SUBMITTED', req.ip);

  res.status(200).json({ status: 'success' });
});

export const getStats = asyncHandler(async (req: AuthRequest, res: Response) => {
  const totalAttempts = db.prepare('SELECT COUNT(*) as count FROM evidence').get() as any;
  const avgAccuracy = db.prepare('SELECT AVG(authenticity_score) as avg FROM evidence').get() as any;

  res.status(200).json({
    totalAttempts: totalAttempts.count || 0,
    averageAccuracy: Math.round(avgAccuracy.avg || 0),
    learningProgress: 85, // Mocked for UI
    intelligenceStatus: 'Optimal',
    neuralVersion: '4.2.0'
  });
});

export const getHistory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const rows = db.prepare('SELECT * FROM evidence ORDER BY created_at DESC LIMIT 50').all() as any[];
  
  const history = rows.map(row => {
    const result = JSON.parse(row.result_json || '{}');
    return {
      id: row.id,
      modality: row.modality,
      source: row.authenticity_score > 50 ? 'HUMAN' : 'AI',
      score: row.authenticity_score,
      confidence: row.risk_level === 'Low' ? 0.95 : row.risk_level === 'Medium' ? 0.75 : 0.45,
      justification: result.forensic_summary || 'Analysis performed',
      timestamp: row.created_at
    };
  });

  res.status(200).json(history);
});

export const clearHistory = asyncHandler(async (req: AuthRequest, res: Response) => {
  db.prepare('DELETE FROM evidence').run();
  auditService.log(req.user?.id, 'HISTORY_CLEARED', req.ip);
  res.status(200).json({ status: 'success' });
});
