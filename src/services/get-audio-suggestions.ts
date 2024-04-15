import { AudioSuggestion } from "@/types";
import { MockDetailAudioSuggestions } from "../../mock/api/mock-detail-1";
import { MockDetailAudioSuggestions2 } from "../../mock/api/mock-detail-2";

const mockData1: AudioSuggestion[] = MockDetailAudioSuggestions;
const mockData2: AudioSuggestion[] = MockDetailAudioSuggestions2;

export const getAudioSuggestions = (timeId: string) => {
  if (timeId === "1") {
    return Promise.resolve(mockData1);
  } else if (timeId === "2") {
    return Promise.resolve(mockData2);
  } else {
    return Promise.resolve([] as AudioSuggestion[]);
  }
};
