import { OverallData } from "@/types";
import { MockOverallData } from "../../mock/api/overall-data";

export const getOverallData = () => {
  const mockData: OverallData = MockOverallData;
  return Promise.resolve(mockData);
};
