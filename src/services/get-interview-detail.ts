import { DetailData } from "@/types";
import { MockDetailData } from "../../mock/api/mock-detail-1";

const mockData1: DetailData = MockDetailData;

export const getDetailData = (timeId: string) => {
  if (timeId === "1") {
    return Promise.resolve(mockData1);
  } else {
    return Promise.resolve({} as DetailData);
  }
};
