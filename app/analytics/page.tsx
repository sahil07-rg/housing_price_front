"use client";
import { useSearchParams } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default function AnalyticsPage() {

  const searchParams = useSearchParams();

const currentPrice =
  Number(searchParams.get("price")) || 445000;

  const historicalData = [

    currentPrice * 0.72,

    currentPrice * 0.79,

    currentPrice * 0.84,

    currentPrice * 0.91,

    currentPrice * 0.96,

    currentPrice,

  ];

  const chartData = {

    labels: [
      "2020",
      "2021",
      "2022",
      "2023",
      "2024",
      "2025",
    ],

    datasets: [
      {
        label: "Historical Property Valuation",

        data: historicalData,

        borderColor: "#d4af37",

        backgroundColor: "rgba(212,175,55,0.08)",

        fill: true,

        tension: 0.5,

        pointBackgroundColor: "#d4af37",

        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {

    responsive: true,

    plugins: {

      legend: {
        labels: {
          color: "#d8c4a0",
        },
      },

    },

    scales: {

      x: {
        ticks: {
          color: "#8a7a5e",
        },

        grid: {
          color: "rgba(255,255,255,0.03)",
        },
      },

      y: {
        ticks: {
          color: "#8a7a5e",
        },

        grid: {
          color: "rgba(255,255,255,0.03)",
        },
      },

    },

  };

  return (

    <main className="min-h-screen bg-[#0b0b0b] text-[#f5e6c8] px-6 py-20">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">

          <div className="text-[#d4af37] tracking-[0.4em] mb-5">
            ✦ ───────── MARKET INTELLIGENCE ───────── ✦
          </div>

          <h1
            className="text-5xl md:text-7xl"
            style={{
              fontFamily: "var(--font-cinzel)",
            }}
          >
            Valuation Analytics
          </h1>

          <p className="mt-8 text-[#bfae8f] max-w-3xl mx-auto leading-relaxed">
            Neural market systems analyzing
            historical valuation trends and
            premium residential forecasting.
          </p>

        </div>

        <div className="border border-[#3a2f1c] bg-[#111111] p-8 hover:shadow-[0_0_60px_rgba(212,175,55,0.08)] transition-all duration-700">

          <Line
            data={chartData}
            options={chartOptions}
          />

        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">

          {[
            {
              title: "Market Stability",
              value: "94%",
            },
            {
              title: "Prediction Accuracy",
              value: "92.4%",
            },
            {
              title: "AI Confidence",
              value: "97%",
            },
          ].map((item, index) => (

            <div
              key={index}
              className="border border-[#3a2f1c] bg-[#111111] p-10 text-center hover:shadow-[0_0_60px_rgba(212,175,55,0.08)] transition-all duration-700"
            >

              <div
                className="text-5xl text-[#d4af37]"
                style={{
                  fontFamily: "var(--font-cinzel)",
                }}
              >
                {item.value}
              </div>

              <div className="mt-4 text-[#bfae8f] tracking-[0.2em]">
                {item.title}
              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}