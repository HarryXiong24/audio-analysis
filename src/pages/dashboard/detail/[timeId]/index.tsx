import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getInterviewTimes } from "@/services/get-interview-times";
import {
  AudioSuggestion,
  Code,
  DetailData,
  InterviewTime,
  TargetTrainingData,
} from "@/types";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import AudioAnalysis from "@/components/dashbroad-detail/audio-analysis";
import Footer from "@/components/layout/footer";
import { getDetailData } from "@/services/get-interview-detail";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditor from "@monaco-editor/react";
import { getDetailCode } from "@/services/get-interview-code";
import { getAudioSuggestions } from "@/services/get-audio-suggestions";
import OverallScorePanel from "@/components/dashbroad-detail/overall-score-panel";
import { getTargetTrainingData } from "@/services/get-target-training";

const Select = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.Select),
  {
    ssr: false,
  }
);

const InterviewDetail = (props: {
  interviewTimes: InterviewTime[];
  initDetailData: DetailData;
  initCodeData: Code;
  initAudioSuggestions: AudioSuggestion[];
  initTargetTrainingData: TargetTrainingData[];
}) => {
  const router = useRouter();
  const id = router.query.timeId as string;
  const {
    interviewTimes,
    initDetailData,
    initCodeData,
    initAudioSuggestions,
    initTargetTrainingData,
  } = props;
  const [timeId, setTimeId] = useState<string>(id ? id : interviewTimes[1].id);
  const [detailData, setDetailData] = useState<DetailData>(initDetailData);
  const [codeData, setCodeData] = useState<Code>(initCodeData);
  const [audioSuggestions, setAudioSuggestions] =
    useState<AudioSuggestion[]>(initAudioSuggestions);
  const [targetTrainingData, setTargetTrainingData] = useState<
    TargetTrainingData[]
  >(initTargetTrainingData);
  const audioRef = useRef<HTMLDivElement>(null);
  const [rightPanelHeight, setRightPanelHeight] = useState<number>(0);

  const fetchDetailData = async (timeId: string) => {
    const data = await getDetailData(timeId);
    setDetailData(data || {});
  };

  const fetchCodeData = async (timeId: string) => {
    const data = await getDetailCode(timeId);
    setCodeData(data || {});
  };

  const fetchAudioSuggestions = async (timeId: string) => {
    const data = await getAudioSuggestions(timeId);
    setAudioSuggestions(data || []);
  };

  const fetchTargetTrainingData = async (timeId: string) => {
    const data = await getTargetTrainingData(timeId);
    setTargetTrainingData(data || []);
  };

  useEffect(() => {
    const audioDiv = audioRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        console.log(entry);
        const height = (entry.target as any).offsetHeight;
        console.log(height);
        setRightPanelHeight(height);
      }
    });

    audioDiv && resizeObserver.observe(audioDiv);

    return () => {
      audioDiv && resizeObserver.unobserve(audioDiv);
    };
  }, []);

  return (
    <>
      <div className="mx-auto px-6 pt-4 h-full w-full duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-4">
        <div className="flex justify-between mb-4">
          <div className="flex-2">
            <h3 className="p-0 text-start text-3xl font-semibold text-purple-gradient">
              We will help you to improve!
            </h3>
          </div>
          <div className="flex-1 flex justify-end">
            <Select
              value={timeId}
              onValueChange={(timeId: string) => {
                setTimeId(timeId);
                if (timeId === interviewTimes[0].id) {
                  router.push("/dashboard");
                } else {
                  fetchDetailData(timeId);
                  fetchCodeData(timeId);
                  fetchAudioSuggestions(timeId);
                  fetchTargetTrainingData(timeId);
                  router.push(`/dashboard/detail/${timeId}`);
                }
              }}
            >
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Select your interview record" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Interview Record</SelectLabel>
                  <DropdownMenuSeparator />
                  {interviewTimes?.map((item, index) => (
                    <SelectItem value={item.id} key={index}>
                      {item.time}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel className="h-full">
            <div ref={audioRef}>
              <AudioAnalysis
                key={timeId}
                timeId={timeId}
                audioSuggestions={audioSuggestions}
              ></AudioAnalysis>
            </div>
          </ResizablePanel>
          <ResizableHandle className="mx-1" />
          <ResizablePanel className="h-full">
            <Card className="h-full" style={{ height: rightPanelHeight }}>
              <CardContent className="p-6">
                <Tabs defaultValue="code" className="w-full">
                  <TabsList className="grid grid-cols-2 w-1/3">
                    <TabsTrigger value="code">Problem</TabsTrigger>
                    <TabsTrigger value="score">Score</TabsTrigger>
                  </TabsList>
                  <TabsContent value="code">
                    <ResizablePanelGroup
                      direction="vertical"
                      className="min-w-full min-h-[70vh] max-w-md"
                    >
                      <ResizablePanel defaultSize={75}>
                        <div className="h-full">
                          <CodeEditor
                            key={interviewTimes[0].id}
                            className="mt-4 w-full"
                            height="70vh"
                            language={codeData.language || "text"}
                            value={codeData.code || ""}
                            theme="vs"
                            options={{
                              automaticLayout: true,
                            }}
                          />
                        </div>
                      </ResizablePanel>
                      <ResizableHandle />
                      <ResizablePanel defaultSize={20}>
                        <div className="h-full">
                          <p className="pt-4 pl-4 text-xl font-semibold leading-none tracking-tight">
                            Question
                          </p>
                          <CodeEditor
                            key={interviewTimes[0].id}
                            className="mt-4 w-full"
                            height="70vh"
                            defaultLanguage="text"
                            value={codeData.question || ""}
                            theme="vs"
                            options={{
                              automaticLayout: true,
                              readOnly: true,
                            }}
                          />
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </TabsContent>
                  <TabsContent value="score">
                    <OverallScorePanel
                      detailData={detailData}
                      targetTrainingData={targetTrainingData}
                    ></OverallScorePanel>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  const interviewTimes: InterviewTime[] = await getInterviewTimes();
  const initDetailData: DetailData = await getDetailData(
    params!.timeId as string
  );
  const initCodeData: Code = await getDetailCode(params!.timeId as string);
  const initAudioSuggestions = await getAudioSuggestions(
    params!.timeId as string
  );
  const initTargetTrainingData: TargetTrainingData[] =
    await getTargetTrainingData(params!.timeId as string);

  return {
    props: {
      interviewTimes: interviewTimes,
      initDetailData: initDetailData,
      initCodeData: initCodeData,
      initAudioSuggestions: initAudioSuggestions,
      initTargetTrainingData: initTargetTrainingData,
    },
  };
}

export default InterviewDetail;
