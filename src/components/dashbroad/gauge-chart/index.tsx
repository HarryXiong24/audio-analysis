import EChart from "../../common/echarts";
import { CSSProperties } from "react";

const GaugeChart = (props: {
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
            title: {
              show: false,
            },
            name: name,
            type: "gauge",
            splitNumber: 8,
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
                value: value,
                name: "Score",
              },
            ],
          },
        ],
      }}
      style={style}
    />
  );
};

export default GaugeChart;
