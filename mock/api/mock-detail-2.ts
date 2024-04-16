export const MockDetailData2 = {
  user: "Harry",
  id: "2",
  title: "3/10/2024 11:00:00 AM",
  averageScore: 3.4,
  score: {
    overall: 3.4,
    algorithm: 3.2,
    coding: 3.6,
    communication: 2.5,
    problemSolving: 3,
  },
  overall: {
    score: 3.4,
    suggestion:
      "The candidate did not demonstrate any problem-solving skills as there was no attempt made to solve the given problem. There was no discussion of potential approaches, trade-offs, or clarifying questions indicating a lack of engagement with the problem-solving process.",
  },
  algorithm: {
    score: 3.2,
    suggestion:
      "The candidate did not implement any solution within the delete Duplicates` function, indicating a lack of understanding or inability to apply algorithms to solve the problem of removing duplicates from a linked list. This shows a significant gap in both knowledge and application of algorithms and data structures, specifically linked lists.",
  },
  coding: {
    score: 3.6,
    suggestion:
      "The candidate provided a template for the solution but did not write any functional code within the `deleteDuplicates’ function. This indicates alack of ability to translate problem-solving thoughts into code. There were no syntax errors simply because there was no attempt to solve the problem, which does not demonstrate any coding skill.",
  },
  communication: {
    score: 2.5,
    suggestion:
      "There is no evidence of communication from the candidate regarding their thought process, approach to solving the problem, or any clarifying questions. The lack of any code or explanation suggests the candidate either did not understand the problem or chose not to communicate their thought process.",
  },
  problemSolving: {
    score: 3,
    suggestion:
      "The candidate did not demonstrate any problem-solving skills as there was no attempt made to solve the given problem. There was no discussion of potential approaches, trade-offs, or clarifying questions indicating a lack of engagement with the problem-solving process.",
  },
};

export const MockDetailCode2 = {
  question: `Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).

Example 1:
Input: s = "abc", t = "ahbgdc"
Output: true

Example 2:
Input: s = "axc", t = "ahbgdc"
Output: false`,
  language: "python",
  code: `class Solution:
def isSubsequence(self, s: str, t: str) -> bool:
    i, j = 0, 0
    while i < len(s) and j < len(t):
        if s[i] == t[j]:
            i += 1
        j += 1
    return i == len(s)
`,
};

export const MockDetailAudioSuggestions2 = [
  {
    id: "1",
    start: 12,
    end: 22,
    suggestion:
      "The candidate need to improve the communication skill, and the problem-solving skill, and the coding skill.",
  },
  {
    id: "2",
    start: 34,
    end: 46,
    suggestion:
      "When preparing for an interview, it's important to thoroughly research the company and the role you are applying for, ensuring that you understand their mission, culture, and the specific responsibilities associated with the position, while also practicing your responses to common interview questions and scenarios, but remember to remain flexible and ready to engage in a conversation rather than delivering rehearsed responses, and it’s equally crucial to prepare some insightful questions to ask the interviewer, as this demonstrates your genuine interest in the position and helps you determine if the company’s environment and values align with your professional goals.",
  },
  {
    id: "3",
    start: 56,
    end: 64,
    suggestion:
      "When preparing for an interview, it's important to thoroughly research the company and the role you are applying for, ensuring that you understand their mission, culture, and the specific responsibilities associated with the position, while also practicing your responses to common interview questions and scenarios, but remember to remain flexible and ready to engage in a conversation rather than delivering rehearsed responses, and it’s equally crucial to prepare some insightful questions to ask the interviewer, as this demonstrates your genuine interest in the position and helps you determine if the company’s environment and values align with your professional goals.",
  },
  {
    id: "4",
    start: 89,
    end: 111,
    suggestion:
      "test suggestion, test suggestion, test suggestion, test suggestion",
  },
  {
    id: "5",
    start: 130,
    end: 150,
    suggestion:
      "CCCCCCC test suggestion, test suggestion, test suggestion, test suggestion",
  },
  {
    id: "6",
    start: 180,
    end: 210,
    suggestion:
      "Sdghsdgsgadisytd CCCCCCC test suggestion, test suggestion, test suggestion, test suggestion",
  },
];
