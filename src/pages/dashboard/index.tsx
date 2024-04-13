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
import dynamic from "next/dynamic";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import RadarChart from "@/components/radar-chart";
import GaugeChart from "@/components/gauge-chart";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { InterviewTime, OverallData } from "@/types";
import { getInterviewTimes } from "@/services/get-interview-times";
import { getOverallData } from "@/services/get-overall-data";

const Select = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.Select),
  {
    ssr: false,
  }
);

export const ScoreCriteria = {
  algorithm: "Algorithm",
  coding: "Coding",
  communication: "Communication",
  problemSolving: "Problem Solving",
};

const Dashboard = (props: {
  interviewTimes: InterviewTime[];
  overallData: OverallData;
}) => {
  const { interviewTimes, overallData } = props;
  const [time, setTime] = useState<string>(interviewTimes[0].id);

  return (
    <div className="mx-auto max-w-5xl grow px-4 pt-10 h-full w-full duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-4">
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
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <CardTitle className="text-xl w-1/2 pb-2">
                  Interview Performance
                </CardTitle>
                <p className="text-lg text-neutral-500 pb-2">
                  Average Score:
                  <span className="px-1">
                    {overallData.averageScore || "-"} / 4
                  </span>
                </p>
                <p className="text-lg text-neutral-500 pb-2">
                  Interview Times:
                  <span className="px-1">
                    {overallData.interviewTimes || "-"}
                  </span>
                </p>
                <p className="text-lg text-neutral-500 pb-2">
                  Average Time Consumed:
                  <span className="px-1">
                    {overallData.averageTimeConsumed || "-"} min
                  </span>
                </p>
              </div>
              <div>
                <Button className="inline-flex items-center whitespace-nowrap font-medium shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 group/cta text-md justify-start rounded-full">
                  Check your interview details
                  <ChevronRight className="lucide lucide-chevron-right ml-2 transition duration-200 group-hover/cta:translate-x-2" />
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <RadarChart value={Object.values(overallData.score)} />
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
                  {ScoreCriteria[item as keyof typeof ScoreCriteria]}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.keys(overallData.score).map((item, index) => {
              return (
                <TabsContent value={item} key={index}>
                  <div className="mt-2 flex gap-x-8">
                    <div className="flex-1">
                      <GaugeChart
                        name={ScoreCriteria[item as keyof typeof ScoreCriteria]}
                        value={overallData.score[item]}
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
  const interviewTimes: InterviewTime[] = await getInterviewTimes();
  const overallData: OverallData = await getOverallData();

  return {
    props: {
      interviewTimes: interviewTimes,
      overallData: overallData,
    },
  };
}

export default Dashboard;

``;
