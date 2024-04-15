import { DetailData } from "@/types";
import { MockDetailData } from "../../mock/api/mock-detail-1";
import { MockDetailData2 } from "../../mock/api/mock-detail-2";

const mockData1: DetailData = MockDetailData;
const mockData2: DetailData = MockDetailData2;

export const getDetailData = (timeId: string) => {
  if (timeId === "1") {
    return Promise.resolve(mockData1);
  } else if (timeId === "2") {
    return Promise.resolve(mockData2);
  } else {
    return Promise.resolve({} as DetailData);
  }
};
