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
import { Code, DetailData, InterviewTime } from "@/types";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import AudioAnalysis from "@/components/audio-analysis";
import Footer from "@/components/layout/footer";
import { getDetailData } from "@/services/get-interview-detail";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScoreCriteria } from "../..";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ScoreChart from "@/components/score-chart";
import CodeEditor from "@monaco-editor/react";
import { getDetailCode } from "@/services/get-interview-code";
import Link from "next/link";

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
}) => {
  const router = useRouter();
  const id = router.query.timeId as string;
  const { interviewTimes, initDetailData, initCodeData } = props;
  const [timeId, setTimeId] = useState<string>(id ? id : interviewTimes[1].id);
  const [scoreTab, setScoreTab] = useState<string>("overall");
  const [detailData, setDetailData] = useState<DetailData>(initDetailData);
  const [codeData, setCodeData] = useState<Code>(initCodeData);

  const fetchDetailData = async (timeId: string) => {
    const data = await getDetailData(timeId);
    console.log(data);
    setDetailData(data || {});
  };

  const fetchCodeData = async (timeId: string) => {
    const data = await getDetailCode(timeId);
    console.log(data);
    setCodeData(data || {});
  };

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
                  router.push(`/dashboard/detail/${timeId}`);
                  fetchDetailData(timeId);
                  fetchCodeData(timeId);
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
                      <Link href={`/dashboard/detail/${item.id}`}>
                        {item.time}
                      </Link>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel className="h-full">
            <AudioAnalysis></AudioAnalysis>
          </ResizablePanel>
          <ResizableHandle className="mx-1" />
          <ResizablePanel className="h-full">
            <Card className="min-h-[82vh]">
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
                    <div className="float-right">
                      <Select
                        value={scoreTab}
                        onValueChange={(value: string) => {
                          setScoreTab(value);
                        }}
                      >
                        <SelectTrigger className="w-56">
                          <SelectValue placeholder="Select your score" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Score</SelectLabel>
                            <DropdownMenuSeparator />
                            {Object.keys(ScoreCriteria)?.map((item, index) => (
                              <SelectItem value={item} key={index}>
                                {
                                  ScoreCriteria[
                                    item as keyof typeof ScoreCriteria
                                  ]
                                }
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      {detailData.score &&
                        Object.keys(detailData.score)?.map((item, index) => {
                          if (item === scoreTab) {
                            return (
                              <div key={index}>
                                <ScoreChart
                                  name={
                                    ScoreCriteria[
                                      item as keyof typeof ScoreCriteria
                                    ]
                                  }
                                  value={detailData.score[item]}
                                  style={{
                                    width: "50%",
                                    height: 200,
                                  }}
                                />
                                <div>
                                  <h3 className="text-xl mb-4">AI Review</h3>
                                  <p className="text-base text-neutral-500 ">
                                    {
                                      (
                                        detailData[
                                          item as keyof typeof detailData
                                        ] as any
                                      ).suggestion
                                    }
                                  </p>
                                </div>
                              </div>
                            );
                          }
                        })}
                    </div>
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

  return {
    props: {
      interviewTimes: interviewTimes,
      initDetailData: initDetailData,
      initCodeData: initCodeData,
    },
  };
}

export default InterviewDetail;
