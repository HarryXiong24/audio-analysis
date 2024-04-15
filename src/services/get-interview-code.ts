import { Code } from "@/types";
import { MockDetailCode } from "../../mock/api/mock-detail-1";
import { MockDetailCode2 } from "../../mock/api/mock-detail-2";

const mockData1: Code = MockDetailCode;
const mockData2: Code = MockDetailCode2;

export const getDetailCode = (timeId: string) => {
  if (timeId === "1") {
    return Promise.resolve(mockData1);
  } else if (timeId === "2") {
    return Promise.resolve(mockData2);
  } else {
    return Promise.resolve({} as Code);
  }
};
