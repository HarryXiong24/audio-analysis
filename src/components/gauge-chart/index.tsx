import * as echarts from "echarts";
import EChart from "../echarts";

const GaugeChart = (props: { name: string; value: number }) => {
  const { name, value } = props;

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
      style={{ width: "60%", height: 230 }}
    />
  );
};

export default GaugeChart;
