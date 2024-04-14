import { Code } from "@/types";
import { MockDetailCode } from "../../mock/api/mock-detail-1";

const mockData1: Code = MockDetailCode;

export const getDetailCode = (timeId: string) => {
  if (timeId === "1") {
    return Promise.resolve(mockData1);
  } else {
    return Promise.resolve({} as Code);
  }
};
