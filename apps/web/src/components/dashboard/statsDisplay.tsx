import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartData } from "@/types/stats";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const mockChartData: ChartData[] = [
  { name: "Jan", users: 4000, activity: 2400 },
  { name: "Feb", users: 3000, activity: 1398 },
  { name: "Mar", users: 2000, activity: 9800 },
  { name: "Apr", users: 2780, activity: 3908 },
  { name: "May", users: 1890, activity: 4800 },
  { name: "Jun", users: 2390, activity: 3800 },
];

export default function StatsDisplay() {
  return (
    <>
      <h2 className="text-2xl font-bold">Database Stats</h2>
      <Card>
        <CardHeader>
          <CardTitle>User Growth and Activity</CardTitle>
          <CardDescription>
            Monitor key metrics of your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="activity"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
