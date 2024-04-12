import React, { useCallback, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";

// Props 接口定义
interface EChartsReactProps {
  option: EChartsOption;
  style?: React.CSSProperties;
}

const EChart: React.FC<EChartsReactProps> = ({
  option,
  style = { width: "100%", height: "100%" },
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  const renderChart = useCallback(() => {
    if (chartRef.current) {
      const renderedInstance = echarts.getInstanceByDom(chartRef.current);
      if (renderedInstance) {
        chartInstanceRef.current = renderedInstance;
      } else {
        chartInstanceRef.current = echarts.init(chartRef.current);
      }
      chartInstanceRef.current.setOption(option);
    }
  }, [option]);

  const chartInstance = chartInstanceRef.current;

  useEffect(() => {
    renderChart();
    return () => {
      chartInstance?.dispose();
    };
  }, [option, chartInstance, renderChart]);

  return <div ref={chartRef} style={style} />;
};

export default EChart;
