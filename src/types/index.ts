export interface InterviewTime {
  id: string;
  time: string;
}

export interface OverallData {
  user: string;
  name: string;
  interviewTimes: number;
  averageTimeConsumed: number;
  problemCorrectRate: number;
  averageScore: number;
  score: Record<string, number>;
  overall: {
    score: number;
    suggestion: string;
  };
  algorithm: {
    score: number;
    suggestion: string;
  };
  coding: {
    score: number;
    suggestion: string;
  };
  communication: {
    score: number;
    suggestion: string;
  };
  problemSolving: {
    score: number;
    suggestion: string;
  };
}

export interface DetailData {
  user: string;
  id: string;
  title: string;
  averageScore: number;
  score: Record<string, number>;
  overall: {
    score: number;
    suggestion: string;
  };
  algorithm: {
    score: number;
    suggestion: string;
  };
  coding: {
    score: number;
    suggestion: string;
  };
  communication: {
    score: number;
    suggestion: string;
  };
  problemSolving: {
    score: number;
    suggestion: string;
  };
}
