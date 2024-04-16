import { useState } from "react";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ScoreChart from "../score-chart";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ScoreCriteria } from "@/pages/dashboard";
import dynamic from "next/dynamic";
import { DetailData, TargetTrainingData } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronRight } from "lucide-react";

const Select = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.Select),
  {
    ssr: false,
  }
);

const OverallScorePanel = (props: {
  detailData: DetailData;
  targetTrainingData: TargetTrainingData[];
}) => {
  const { detailData, targetTrainingData } = props;
  const [scoreTab, setScoreTab] = useState<string>("overall");

  return (
    <Sheet>
      <div className="flex justify-end">
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
                  {ScoreCriteria[item as keyof typeof ScoreCriteria]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col justify-start">
        <div>
          {detailData.score &&
            Object.keys(detailData.score)?.map((item, index) => {
              if (item === scoreTab) {
                return (
                  <div key={index}>
                    <ScoreChart
                      name={ScoreCriteria[item as keyof typeof ScoreCriteria]}
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
                          (detailData[item as keyof typeof detailData] as any)
                            .suggestion
                        }
                      </p>
                    </div>
                  </div>
                );
              }
            })}
        </div>
        <div className="justify-self-end self-end mt-8">
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full text-base"
              onClick={() => {}}
            >
              Get targeted training
              <ChevronRight />
            </Button>
          </SheetTrigger>
        </div>
      </div>

      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Targeted Train</SheetTitle>
          <SheetDescription>
            There are our strategies to help you improve your speaking skills.
          </SheetDescription>
        </SheetHeader>

        {targetTrainingData.map((item, index) => (
          <div key={index}>
            <DropdownMenuSeparator className="mt-4" />
            <div className="flex space-x-2 py-4">
              <Avatar className="mr-4">
                <AvatarImage src={item.imgUrl} />
              </Avatar>
              <div className="space-y-1 x-full">
                <h4 className="text-sm font-semibold text-left">
                  {item.title}
                </h4>
                <p className="text-sm">{item.description}</p>
                <div className="flex items-center pt-2">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </div>
                <div className="flex justify-end">
                  <Button variant="link" className="text-xs">
                    {item.linName}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default OverallScorePanel;
