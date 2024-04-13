import * as echarts from "echarts";
import EChart from "../common/echarts";

const RadarChart = (props: { value: number[] }) => {
  const { value } = props;

  return (
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
                value: value,
                name: "Interview Performance",
                areaStyle: {
                  color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                    {
                      color: "rgba(255, 145, 124, 0.1)",
                      offset: 0,
                    },
                    {
                      color: "rgba(255, 145, 124, 0.9)",
                      offset: 1,
                    },
                  ]),
                },
              },
            ],
          },
        ],
      }}
      style={{ width: "100%", height: 240 }}
    />
  );
};

export default RadarChart;
