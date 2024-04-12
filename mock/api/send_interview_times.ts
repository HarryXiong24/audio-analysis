export interface InterviewTime {
  id: string;
  time: string;
}

export const sendInterviewTimes = () => {
  const mockData: InterviewTime[] = [
    {
      id: "0",
      time: "Overall",
    },
    {
      id: "1",
      time: "4/11/2024 10:00 AM",
    },
    {
      id: "2",
      time: "4/10/2024 11:00 AM",
    },
  ];
  return Promise.resolve(mockData);
};
