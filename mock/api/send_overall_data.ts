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

export const sendOverallData = () => {
  const mockData: OverallData = {
    user: "Harry",
    name: "Overall",
    interviewTimes: 2,
    averageTimeConsumed: 48,
    ProblemCorrectRate: 0.7,
    averageScore: 3.125,
    score: {
      algorithm: 2,
      coding: 4,
      communication: 3.5,
      problemSolving: 3,
    },
    algorithm: {
      score: 2,
      suggestion:
        "The candidate did not implement any solution within the delete Duplicates` function, indicating a lack of understanding or inability to apply algorithms to solve the problem of removing duplicates from a linked list. This shows a significant gap in both knowledge and application of algorithms and data structures, specifically linked lists.",
    },
    coding: {
      score: 4,
      suggestion: "You are good at coding.",
    },
    communication: {
      score: 3.5,
      suggestion: "You are good at communication.",
    },
    problemSolving: {
      score: 3,
      suggestion: "You need to improve your problem solving skills.",
    },
  };
  return Promise.resolve(mockData);
};