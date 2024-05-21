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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ReviewChartProps {
  reviews: { date: string; rating: number }[];
}

export default function Graph({ reviews }: ReviewChartProps) {
  const labels = reviews.map((review) => review.date);
  const data = reviews.map((review) => review.rating);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Review Ratings Over Time",
        data: data,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Review Ratings Over Time",
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
