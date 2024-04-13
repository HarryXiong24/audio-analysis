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
import { DetailData, InterviewTime } from "@/types";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AudioPlayer from "@/components/audio-player";
import Footer from "@/components/layout/footer";
import { getDetailData } from "@/services/get-interview-detail";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScoreCriteria } from "../..";
import GaugeChart from "@/components/gauge-chart";

const Select = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.Select),
  {
    ssr: false,
  }
);

const InterviewDetail = (props: {
  interviewTimes: InterviewTime[];
  detailData: DetailData;
}) => {
  const { interviewTimes, detailData } = props;
  const [timeId, setTimeId] = useState<string>(interviewTimes[1].id);
  const router = useRouter();

  return (
    <>
      <div className="flex gap-x-8 mx-auto grow px-6 pt-4 h-full w-full duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-4">
        <div className="flex-1">
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
          <div className="mb-4">
            <Card className="mt-6">
              <CardContent className="p-6">
                <Tabs defaultValue="overall">
                  <TabsList className="grid grid-cols-5 w-[660px]">
                    {Object.keys(detailData.score).map((item, index) => (
                      <TabsTrigger value={item} key={index}>
                        {ScoreCriteria[item as keyof typeof ScoreCriteria]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {Object.keys(detailData.score).map((item, index) => {
                    return (
                      <TabsContent value={item} key={index}>
                        <div className="mt-2 flex gap-x-8">
                          <div className="flex-1">
                            <GaugeChart
                              name={
                                ScoreCriteria[
                                  item as keyof typeof ScoreCriteria
                                ]
                              }
                              value={detailData.score[item]}
                              style={{ width: "80%", height: 200 }}
                            />
                          </div>
                          <div className="flex-1 flex justify-center items-center">
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
                      </TabsContent>
                    );
                  })}
                </Tabs>
              </CardContent>
            </Card>
          </div>
          <div>
            <AudioPlayer></AudioPlayer>
          </div>
        </div>

        <div className="flex-1">
          <Card className="h-full">
            <CardContent className="p-6">
              <div>div</div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  const interviewTimes: InterviewTime[] = await getInterviewTimes();
  const detailData: DetailData = await getDetailData(params!.timeId as string);

  return {
    props: {
      interviewTimes: interviewTimes,
      detailData: detailData,
    },
  };
}

export default InterviewDetail;
