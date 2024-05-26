import { Line } from "react-chartjs-2";
import "chart.js/auto";

interface GraphProps {
  data: { date: string; rating: number }[];
  label: string;
}

export default function Graph({ data, label }: GraphProps) {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: `${label} Graph`,
        data: data.map((d) => d.rating),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
}
