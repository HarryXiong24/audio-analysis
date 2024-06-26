import { languages } from "monaco-editor";

export const MockDetailData = {
  user: "Harry",
  id: "1",
  title: "4/11/2024 10:00:00 AM",
  averageScore: 3.13,
  score: {
    overall: 3.13,
    algorithm: 3,
    coding: 4,
    communication: 3,
    problemSolving: 2.5,
  },
  overall: {
    score: 3.13,
    suggestion:
      "The candidate did not demonstrate any problem-solving skills as there was no attempt made to solve the given problem. There was no discussion of potential approaches, trade-offs, or clarifying questions indicating a lack of engagement with the problem-solving process.",
  },
  algorithm: {
    score: 3,
    suggestion:
      "The candidate did not implement any solution within the delete Duplicates` function, indicating a lack of understanding or inability to apply algorithms to solve the problem of removing duplicates from a linked list. This shows a significant gap in both knowledge and application of algorithms and data structures, specifically linked lists.",
  },
  coding: {
    score: 4,
    suggestion:
      "The candidate provided a template for the solution but did not write any functional code within the `deleteDuplicates’ function. This indicates alack of ability to translate problem-solving thoughts into code. There were no syntax errors simply because there was no attempt to solve the problem, which does not demonstrate any coding skill.",
  },
  communication: {
    score: 3,
    suggestion:
      "There is no evidence of communication from the candidate regarding their thought process, approach to solving the problem, or any clarifying questions. The lack of any code or explanation suggests the candidate either did not understand the problem or chose not to communicate their thought process.",
  },
  problemSolving: {
    score: 2.5,
    suggestion:
      "The candidate did not demonstrate any problem-solving skills as there was no attempt made to solve the given problem. There was no discussion of potential approaches, trade-offs, or clarifying questions indicating a lack of engagement with the problem-solving process.",
  },
};

export const MockDetailCode = {
  question: `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively. 

Merge nums1 and nums2 into a single array sorted in non-decreasing order. The final sorted array should not be returned by the function, but instead be stored inside the array nums1. 

To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

Example 1: 
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3 
Output: [1,2,2,3,5,6] 
Explanation: The arrays we are merging are [1,2,3] and [2,5,6]. The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.

Example 2: 
Input: nums1 = [1], m = 1, nums2 = [], n = 0 
Output: [1] 
Explanation: The arrays we are merging are [1] and []. The result of the merge is [1].


Example 3: 
Input: nums1 = [0], m = 0, nums2 = [1], n = 1 
Output: [1] 
Explanation: The arrays we are merging are [] and [1]. The result of the merge is [1]. Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.
`,
  language: "typescript",
  code: `function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let p1 = m - 1;
  let p2 = n - 1;

  let total = n + m - 1;
  while (total >= 0) {
    if (p2 < 0) {
        break;
    }
    if (p1 >= 0 && nums1[p1] >= nums2[p2]) {
      nums1[total] = nums1[p1];
      total--;
      p1--;
    } else {
      nums1[total] = nums2[p2];
      total--;
      p2--;
    }
  }
}`,
};

export const MockDetailAudioSuggestions = [
  {
    id: "1",
    start: 5,
    end: 13,
    suggestion:
      "The candidate need to improve the communication skill, and the problem-solving skill, and the coding skill.",
  },
  {
    id: "2",
    start: 20,
    end: 50,
    suggestion:
      "When preparing for an interview, it's important to thoroughly research the company and the role you are applying for, ensuring that you understand their mission, culture, and the specific responsibilities associated with the position, while also practicing your responses to common interview questions and scenarios, but remember to remain flexible and ready to engage in a conversation rather than delivering rehearsed responses, and it’s equally crucial to prepare some insightful questions to ask the interviewer, as this demonstrates your genuine interest in the position.",
  },
  {
    id: "3",
    start: 80,
    end: 120,
    suggestion:
      "When preparing for an interview, it's important to thoroughly research the company and the role you are applying for, ensuring that you understand their mission, culture, and the specific responsibilities associated with the position, while also practicing your responses to common interview questions and scenarios, but remember to remain flexible and ready to engage in a conversation rather than delivering rehearsed responses, and it’s equally crucial to prepare some insightful questions to ask the interviewer, as this demonstrates your genuine interest in the position.",
  },
  {
    id: "4",
    start: 150,
    end: 180,
    suggestion:
      "test suggestion, test suggestion, test suggestion, test suggestion",
  },
  {
    id: "5",
    start: 220,
    end: 240,
    suggestion:
      "CCCCCCC test suggestion, test suggestion, test suggestion, test suggestion",
  },
  {
    id: "6",
    start: 260,
    end: 280,
    suggestion:
      "Sdghsdgsgadisytd CCCCCCC test suggestion, test suggestion, test suggestion, test suggestion",
  },
];

export const MockTargetTrainingData = [
  {
    id: 1,
    imgUrl: "https://github.com/vercel.png",
    title: "How to do communication better",
    description: "Free Course.",
    time: "Joined May 2024",
    linName: "Click here to join",
    link: "",
  },
  {
    id: 2,
    imgUrl: "https://github.com/vercel.png",
    title: "Leetcode 95 - Unique Binary Search Trees II",
    description: "Targeted Problem Training.",
    time: "Joined May 2024",
    linName: "Click here to have test",
    link: "",
  },
  {
    id: 3,
    imgUrl: "https://github.com/vercel.png",
    title: "Practice your speaking skills",
    description: "Free Blog to help your interview better.",
    time: "Joined May 2024",
    linName: "Click here to read",
    link: "",
  },
];
