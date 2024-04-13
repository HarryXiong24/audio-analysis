import { InterviewTime } from "@/types";
import { MockInterviewTimes } from "../../mock/api/interview-times";

export const getInterviewTimes = () => {
  const mockData: InterviewTime[] = MockInterviewTimes;
  return Promise.resolve(mockData);
};
