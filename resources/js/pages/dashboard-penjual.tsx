import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { ShopReviewsType } from '@/types/shop-reviews-type';
import { TransactionType } from '@/types/transaction-type';
import { Head } from '@inertiajs/react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis } from 'recharts';
import ShopCard from './shop-review/shop-card';
import InitDataPageTransaction from './transaction/init-data';

const chartConfig = {
    completed: {
        label: 'Completed',
        color: 'var(--chart-6)',
    },
    cancelled: {
        label: 'Cancelled',
        color: 'var(--chart-7)',
    },
    pending: {
        label: 'Pending',
        color: 'var(--chart-1)',
    },
    waiting_payment: {
        label: 'Waiting',
        color: 'var(--chart-2)',
    },
    paid: {
        label: 'Paid',
        color: 'var(--chart-3)',
    },
    verified: {
        label: 'Verified',
        color: 'var(--chart-4)',
    },
    shipped: {
        label: 'Shipped',
        color: 'var(--chart-5)',
    },
} satisfies ChartConfig;

const chartConfigPie = {
    value: {
        label: 'Transaksi',
    },
    completed: {
        label: 'Completed',
        color: 'var(--chart-6)',
    },
    cancelled: {
        label: 'Cancelled',
        color: 'var(--chart-7)',
    },
    pending: {
        label: 'Pending',
        color: 'var(--chart-1)',
    },
    waiting_payment: {
        label: 'Waiting',
        color: 'var(--chart-2)',
    },
    paid: {
        label: 'Paid',
        color: 'var(--chart-3)',
    },
    verified: {
        label: 'Verified',
        color: 'var(--chart-4)',
    },
    shipped: {
        label: 'Shipped',
        color: 'var(--chart-5)',
    },
} satisfies ChartConfig;

interface StatsItem {
    title: string;
    value: string;
    unit: string;
    change: string;
    positive: boolean;
}

interface DashboardProps {
    stats: StatsItem[];
    chartData: { month: string; completed: number; cancelled: number }[];
    chartDataPie: { status: string; value: number; fill: string }[];
    shopReviews: ShopReviewsType;
    transactions: TransactionType[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function DashboardPenjual({ stats, chartData, chartDataPie, shopReviews, transactions }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-5">
                    {stats.map((item, i) => (
                        <Card key={i} className="shadow-sm">
                            {/* <CardHeader className="pb-0">
                            </CardHeader> */}
                            <CardContent>
                                <div className="pb-2 text-sm font-medium text-gray-500">{item.title}</div>
                                <div className="text-2xl font-bold">
                                    {item.value} <span className="text-sm text-muted-foreground">{item.unit}</span>
                                </div>
                                <p className={`flex items-center gap-1 text-sm ${item.positive ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {item.change}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <Card className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader>
                            <CardTitle>Bar Chart - Transaction</CardTitle>
                            {/* <CardDescription>January - Desember 2025</CardDescription> */}
                        </CardHeader>
                        <CardContent className="h-full">
                            <ChartContainer config={chartConfig} className="mx-auto aspect-video pb-16 [&_.recharts-pie-label-text]:fill-foreground">
                                <BarChart accessibilityLayer data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Bar dataKey="completed" fill="var(--color-completed)" radius={4} stackId="a" />
                                    <Bar dataKey="cancelled" fill="var(--color-cancelled)" radius={4} stackId="a" />
                                    <Bar dataKey="waiting_payment" fill="var(--color-waiting_payment)" radius={4} stackId="a" />
                                    <Bar dataKey="paid" fill="var(--color-paid)" radius={4} stackId="a" />
                                    <Bar dataKey="shipped" fill="var(--color-shipped)" radius={4} stackId="a" />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="items-center pb-0">
                            <CardTitle>Pie Chart - Label</CardTitle>
                            {/* <CardDescription>January - June 2024</CardDescription> */}
                        </CardHeader>
                        <CardContent className="flex-1 pb-0">
                            <ChartContainer
                                config={chartConfigPie}
                                className="mx-auto aspect-video pb-16 [&_.recharts-pie-label-text]:fill-foreground"
                            >
                                <PieChart>
                                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                    <Pie
                                        data={chartDataPie}
                                        dataKey="value" // 🔹 ganti dari "visitors"
                                        nameKey="status" // 🔹 ganti dari "browser"
                                        label
                                        outerRadius={100}
                                    />
                                    <ChartLegend content={<ChartLegendContent />} /> {/* 🔹 Tambahkan legend */}
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-10">
                    <div className="md:col-span-6">
                        <Card className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                            <CardHeader>
                                <CardTitle>Transaksi Terbaru</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <InitDataPageTransaction transactions={transactions} />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:col-span-4">
                        <ShopCard myShop={shopReviews} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
