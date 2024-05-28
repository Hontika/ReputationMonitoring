import { Line } from "react-chartjs-2";
import "chart.js/auto";

interface GraphProps {
  data: { date: string; y: number }[];
  label: string;
}

export default function Graph({ data, label }: GraphProps) {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: `${label} Graph`,
        data: data.map((d) => d.y),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg max-w-xl mx-auto items-center justify-center">
      <div className="p-2">
        <Line data={chartData} />
      </div>
    </div>
  );
}
