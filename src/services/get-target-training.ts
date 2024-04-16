import { TargetTrainingData } from "@/types";
import { MockTargetTrainingData } from "../../mock/api/mock-detail-1";
import { MockTargetTrainingData2 } from "../../mock/api/mock-detail-2";

const mockData1: TargetTrainingData[] = MockTargetTrainingData;
const mockData2: TargetTrainingData[] = MockTargetTrainingData2;

export const getTargetTrainingData = (timeId: string) => {
  if (timeId === "1") {
    return Promise.resolve(mockData1);
  } else if (timeId === "2") {
    return Promise.resolve(mockData2);
  } else {
    return Promise.resolve([] as TargetTrainingData[]);
  }
};
