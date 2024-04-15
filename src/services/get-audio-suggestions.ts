import { AudioSuggestion } from "@/types";
import { MockDetailAudioSuggestions } from "../../mock/api/mock-detail-1";

const mockData1: AudioSuggestion[] = MockDetailAudioSuggestions;

export const getInterviewSuggestions = (timeId: string) => {
  if (timeId === "1") {
    return Promise.resolve(mockData1);
  } else {
    return Promise.resolve([] as AudioSuggestion[]);
  }
};
