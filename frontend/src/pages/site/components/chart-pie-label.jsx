"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import axios from "axios"
import { colorsList } from "./colors"

export const description = "A pie chart with a label"

const chartData = [
  { category: "food", expense: 275, fill: "#444098" },
  { category: "travel", expense: 200, fill: "var(--color-travel)" },
  { category: "emi", expense: 187, fill: "var(--color-emi)" },
  { category: "shopping", expense: 173, fill: "var(--color-shopping)" },
  { category: "other", expense: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  food: {
    label: "Food",
    
  },
  travel: {
    label: "Travel",
    color: "var(--chart-2)",
  },
  emi: {
    label: "EMI",
    color: "var(--chart-3)",
  },
  shopping: {
    label: "Shopping",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
}

export function ChartPieLabel() {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState({});
  const [value, setValue] = useState("thismonth");
  const url = import.meta.env.VITE_BACKEND;
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${url}/pieChart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => {
        console.log(res.data)
        let tempData = [];
        let tempConfigData = {};
        let i = 0;
        for (let key in res.data) {
          tempData.push({
            category: key,
            expense: res.data[key],
            fill: colorsList[i]
          });
          tempConfigData[key] = {
            label: key.charAt(0).toUpperCase() + key.slice(1),
          };
          i++;
        }
        console.log(tempData);
        console.log(tempConfigData)
        setData(tempData);
        setConfig(tempConfigData);
      })
      .catch(err => console.log(err))
    }

    fetchData();
  }, [])
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 flex">
        <CardTitle className='flex flex-col gap-2'>
          <p>Expense Breakdown</p>
          <CardDescription>Expenditure data based on category</CardDescription>
        </CardTitle>
        
        <Select defaultValue="thismonth">
          <SelectTrigger className="ml-auto">
            <SelectValue placeholder="Theme"  />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="thismonth">This Month</SelectItem>
            <SelectItem value="lastmonth">Last Month</SelectItem>
            <SelectItem value="lastyear">Last Year</SelectItem>
            <SelectItem value="alltime">All Time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={data} dataKey="expense" label nameKey="category" />
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />          
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}

// export function ChartPieLabel2() {
//   return (
//     <Card className="flex flex-col">
//       <CardHeader className="items-center pb-0">
//         <CardTitle>Income vs Expense Analysis</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
//         >
//           <PieChart>
//             <ChartTooltip content={<ChartTooltipContent hideLabel />} />
//             <Pie data={chartData} dataKey="expense" label nameKey="category" />
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col gap-2 text-sm">
//         <div className="flex items-center gap-2 leading-none font-medium">
//           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="text-muted-foreground leading-none">
//           Showing total visitors for the last 6 months
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }

// export {ChartPieLabel, ChartPieLabel2}