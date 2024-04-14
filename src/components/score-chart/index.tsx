import EChart from "../common/echarts";
import { CSSProperties } from "react";

const ScoreChart = (props: {
  name: string;
  value: number;
  style?: CSSProperties;
}) => {
  const { name, value, style = { width: "80%", height: 220 } } = props;

  return (
    <EChart
      option={{
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            center: ["50%", "75%"],
            radius: "100%",
            min: 0,
            max: 4,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.25, "#FF6E76"],
                  [0.5, "#FDDD60"],
                  [0.75, "#58D9F9"],
                  [1, "#7CFFB2"],
                ],
              },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
              length: "10%",
              width: 16,
              offsetCenter: [0, "-60%"],
              itemStyle: {
                color: "auto",
              },
            },
            axisTick: {
              length: 10,
              lineStyle: {
                color: "auto",
                width: 1,
              },
            },
            splitLine: {
              length: 14,
              lineStyle: {
                color: "auto",
                width: 2,
              },
            },
            axisLabel: {
              color: "#464646",
              fontSize: 12,
              distance: -40,
              rotate: "tangential",
              formatter: function (value: number) {
                if (value === 3.5) {
                  return "A";
                } else if (value === 2.5) {
                  return "B";
                } else if (value === 1.5) {
                  return "C";
                } else if (value === 0.5) {
                  return "D";
                }
                return "";
              },
            },
            title: {
              offsetCenter: [0, "-10%"],
              fontSize: 12,
            },
            detail: {
              fontSize: 16,
              offsetCenter: [0, "-35%"],
              valueAnimation: true,
              formatter: function (value: number) {
                return value + "";
              },
              color: "inherit",
            },
            data: [
              {
                value: value,
                name: name,
              },
            ],
          },
        ],
      }}
      style={style}
    />
  );
};

export default ScoreChart;
