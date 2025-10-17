"use client"

import { Pie, PieChart } from "recharts"
import { useEffect, useState } from "react"
import axios from "axios"
import { colorsList } from "./colors"

import {
    Card,
    CardContent,
    CardDescription,
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

export function ChartPieLabel2() {
    const [data, setData] = useState([]);
    const [config, setConfig] = useState({});
    const url = import.meta.env.VITE_BACKEND;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${url}/pieChart2`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                console.log(res.data); // [card, cash, upi]

                const categories = ["Card", "Cash", "UPI"];
                const tempData = res.data.map((value, index) => ({
                    category: categories[index],
                    expense: value,
                    fill: colorsList[index],
                }));

                const tempConfigData = {
                    Card: { label: "Card" },
                    Cash: { label: "Cash" },
                    UPI: { label: "UPI" },
                };

                setData(tempData);
                setConfig(tempConfigData);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0 flex">
                <CardTitle className="flex flex-col gap-2">
                    <p>Expense Breakdown</p>
                    <CardDescription>Expenditure by payment method</CardDescription>
                </CardTitle>

                <Select defaultValue="thismonth">
                    <SelectTrigger className="ml-auto">
                        <SelectValue placeholder="Theme" />
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
        </Card>
    );
}
