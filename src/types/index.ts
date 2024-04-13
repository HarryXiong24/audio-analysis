export interface InterviewTime {
  id: string;
  time: string;
}

export interface OverallData {
  user: string;
  name: string;
  interviewTimes: number;
  averageTimeConsumed: number;
  ProblemCorrectRate: number;
  averageScore: number;
  score: Record<string, number>;
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
