import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, XAxis } from 'recharts';

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { TransactionType } from '@/types/transaction-type';
import InitDataPageTransaction from './transaction/init-data';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const barData = [
    { name: 'Jan', total: 4000 },
    { name: 'Feb', total: 3000 },
    { name: 'Mar', total: 2000 },
    { name: 'Apr', total: 2780 },
    { name: 'Mei', total: 1890 },
    { name: 'Jun', total: 2390 },
];

const pieData = [
    { name: 'Elektronik', value: 400 },
    { name: 'Fashion', value: 300 },
    { name: 'Makanan', value: 300 },
    { name: 'Kecantikan', value: 200 },
];

const COLORS = ['#2563eb', '#16a34a', '#f59e0b', '#dc2626'];

const transactions = [
    { id: 'T-001', customer: 'Ahmad', amount: 'Rp 250.000', status: 'Selesai', date: '2025-10-08' },
    { id: 'T-002', customer: 'Siti', amount: 'Rp 180.000', status: 'Diproses', date: '2025-10-07' },
    { id: 'T-003', customer: 'Budi', amount: 'Rp 420.000', status: 'Selesai', date: '2025-10-07' },
    { id: 'T-004', customer: 'Nina', amount: 'Rp 90.000', status: 'Dibatalkan', date: '2025-10-06' },
];

export const description = 'A multiple bar chart';

const chartConfig = {
    completed: {
        label: 'Completed',
        color: 'var(--chart-2)',
    },
    cancelled: {
        label: 'Cancelled',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig;

const chartConfigPie = {
    value: {
        label: 'Transaksi',
    },
    pending: {
        label: 'Pending',
        color: 'var(--color-chart-3)',
    },
    waiting_payment: {
        label: 'Waiting Payment',
        color: 'var(--color-chart-5)',
    },
    paid: {
        label: 'Paid',
        color: 'var(--color-chart-5)',
    },
    verified: {
        label: 'Verified',
        color: 'var(--color-chart-4)',
    },
    shipped: {
        label: 'Shipped',
        color: 'var(--color-chart-3)',
    },
    completed: {
        label: 'Completed',
        color: 'var(--color-chart-2)',
    },
    cancelled: {
        label: 'Cancelled',
        color: 'var(--color-chart-1)',
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
    transactions: TransactionType[];
}

export default function Dashboard({ stats, chartData, chartDataPie, transactions }: DashboardProps) {
    console.log({ chartDataPie });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-5">
                    {stats.map((item, i) => (
                        <Card key={i} className="shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
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
                            <CardDescription>January - Desember 2025</CardDescription>
                        </CardHeader>
                        <CardContent className="h-full">
                            <ChartContainer config={chartConfig} className="mx-auto aspect-video pb-16 [&_.recharts-pie-label-text]:fill-foreground">
                                <ResponsiveContainer width="100%" height="100%">
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
                                        <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
                                        <Bar dataKey="cancelled" fill="var(--color-cancelled)" radius={4} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="items-center pb-0">
                            <CardTitle>Pie Chart - Label</CardTitle>
                            <CardDescription>January - June 2024</CardDescription>
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
                <Card className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <CardHeader>
                        <CardTitle>Transaksi Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <InitDataPageTransaction transactions={transactions} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
