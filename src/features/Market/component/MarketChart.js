import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMarketChart, marketSelect } from "../marketSlice";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import dayjs from "dayjs";

const MarketChart = ({ id, days, setDays }) => {
  const { marketChartResult } = useSelector(marketSelect);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  return (
    <div>
      <div>
        <Line
          data={{
            labels:
              marketChartResult.prices &&
              marketChartResult.prices.map((data) => {
                return days === "1"
                  ? dayjs(data[0]).format("h A")
                  : dayjs(data[0]).format("MMM D, YYYY");
              }),
            datasets: [
              {
                label: id,
                data:
                  marketChartResult.prices &&
                  marketChartResult.prices.map((data) => {
                    return {
                      x: data[0],
                      y: data[1].toFixed(2),
                    };
                  }),
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 1,
                backgroundColor: "rgb(255, 99, 132, 0.5)",
                fill: true,
                pointRadius: 0,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            lineHeightAnnotation: {
              always: true,
              hover: false,
              lineWeight: 1.5,
            },
            animation: {
              duration: 2000,
            },
            responsive: true,
            interaction: {
              mode: "index",
              intersect: false,
            },
          }}
          width={400}
          height={600}
        />
      </div>
      <div className="flex bg-gray-50">
        <button
          onClick={() => setDays("1")}
          className="flex items-center justify-center w-10 h-10 text-xl bg-gray-100 hover:bg-gray-200"
        >
          1d
        </button>
        <button
          onClick={() => setDays("7")}
          className="flex items-center justify-center w-10 h-10 text-xl bg-gray-100 hover:bg-gray-200"
        >
          7d
        </button>
        <button
          onClick={() => setDays("365")}
          className="flex items-center justify-center w-10 h-10 text-xl bg-gray-100 hover:bg-gray-200"
        >
          1y
        </button>
      </div>
    </div>
  );
};

export default MarketChart;
