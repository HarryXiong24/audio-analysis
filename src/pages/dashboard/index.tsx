import { useState } from "react";
import AudioPlayer from "@/components/audio-player";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetServerSidePropsContext } from "next";
import { sendInterviewTimes } from "../../../mock/api/send_interview_times";
import { InterviewTime } from "@/types";
import dynamic from "next/dynamic";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import EChart from "@/components/echarts";
import * as echarts from "echarts";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import {
  OverallData,
  sendOverallData,
} from "../../../mock/api/send_overall_data";

const Select = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.Select),
  {
    ssr: false,
  }
);

const Dashboard = (props: {
  interviewTimes: InterviewTime[];
  overallData: OverallData;
}) => {
  const { interviewTimes, overallData } = props;
  const [time, setTime] = useState<string>(interviewTimes[0].id);
  console.log(interviewTimes);

  return (
    <div className="mx-auto max-w-5xl grow px-4 pt-10">
      <div className="flex justify-between items-center">
        <h3 className="p-0 text-start text-3xl font-semibold text-purple-gradient">
          Welcome back, Harry!
        </h3>
        <Select
          value={time}
          onValueChange={(time) => {
            setTime(time);
          }}
        >
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Select your interview record" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Interview Record</SelectLabel>
              {interviewTimes?.map((item, index) => (
                <SelectItem value={item.id} key={index}>
                  {item.time}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex gap-x-8">
            <div className="flex-1">
              <CardTitle className="text-xl w-1/2 pb-2">
                Interview Performance
              </CardTitle>
              <p className="text-base text-neutral-500 pb-2">
                Average Score:
                <span className="px-1">
                  {overallData.averageScore || "-"} / 4
                </span>
              </p>
              <p className="text-base text-neutral-500 pb-2">
                Interview Times:
                <span className="px-1">
                  {overallData.interviewTimes || "-"}
                </span>
              </p>
              <p className="text-base text-neutral-500 pb-2">
                Average Time Consumed:
                <span className="px-1">
                  {overallData.averageTimeConsumed || "-"} min
                </span>
              </p>
            </div>
            <div className="flex-1">
              <EChart
                option={{
                  tooltip: {
                    trigger: "axis",
                  },
                  radar: {
                    indicator: [
                      { name: "Algorithm", max: 4 },
                      { name: "Coding", max: 4 },
                      { name: "Communication", max: 4 },
                      { name: "Problem Solving", max: 4 },
                    ],
                  },
                  series: [
                    {
                      name: "Interview Performance",
                      type: "radar",
                      tooltip: {
                        trigger: "item",
                      },
                      data: [
                        {
                          value: Object.values(overallData.score),
                          name: "Interview Performance",
                          areaStyle: {
                            color: new echarts.graphic.RadialGradient(
                              0.1,
                              0.6,
                              1,
                              [
                                {
                                  color: "rgba(255, 145, 124, 0.1)",
                                  offset: 0,
                                },
                                {
                                  color: "rgba(255, 145, 124, 0.9)",
                                  offset: 1,
                                },
                              ]
                            ),
                          },
                        },
                      ],
                    },
                  ],
                }}
                style={{ width: "100%", height: 240 }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardContent className="p-6">
          <Tabs defaultValue="algorithm">
            <TabsList className="grid grid-cols-4 w-[520px]">
              {Object.keys(overallData.score).map((item, index) => (
                <TabsTrigger value={item} key={index}>
                  {item}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.keys(overallData.score).map((item, index) => {
              console.log(item);
              return (
                <TabsContent value={item} key={index}>
                  <div className="mt-2 flex gap-x-8">
                    <div className="flex-1">
                      <EChart
                        option={{
                          series: [
                            {
                              title: {
                                show: false,
                              },
                              name: item,
                              type: "gauge",
                              progress: {
                                show: true,
                                itemStyle: {
                                  color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                      {
                                        offset: 0,
                                        color: "#f8adff",
                                      },
                                      {
                                        offset: 1,
                                        color: "#6b70ff",
                                      },
                                    ],
                                    global: false,
                                  },
                                },
                              },
                              axisTick: {
                                show: false,
                              },
                              min: 0,
                              max: 4,
                              detail: {
                                valueAnimation: true,
                                formatter: "{value}",
                                offsetCenter: [0, "70%"],
                              },
                              data: [
                                {
                                  value: overallData.score[item],
                                  name: "Score",
                                },
                              ],
                            },
                          ],
                        }}
                        style={{ width: "60%", height: 230 }}
                      />
                    </div>
                    <div className="flex-1 flex justify-center items-center">
                      <p className="text-base text-neutral-500 ">
                        {
                          (overallData[item as keyof typeof overallData] as any)
                            .suggestion
                        }
                      </p>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>
      {/* 
      <div className="flex gap-x-8">
        <div className="flex-1 ">
          <AudioPlayer></AudioPlayer>
        </div>

        <div className="flex-1"></div>
      </div> */}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const interviewTimes: InterviewTime[] = await sendInterviewTimes();
  const overallData: OverallData = await sendOverallData();

  return {
    props: {
      interviewTimes: interviewTimes,
      overallData: overallData,
    },
  };
}

export default Dashboard;
