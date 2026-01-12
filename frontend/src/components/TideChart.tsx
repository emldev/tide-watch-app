import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface TideData {
    timestamp: string;
    height_m: number;
}

interface TideChartProps {
    data: TideData[];
}

const TideChart: React.FC<TideChartProps> = ({ data }) => {
    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorHeight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="timestamp"
                    tickFormatter={formatTime}
                    minTickGap={30}
                />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip
                    labelFormatter={formatTime}
                    formatter={(value: any) => {
                        if (typeof value === 'number') {
                            return [`${value.toFixed(2)} m`, "Height"];
                        }
                        return value;
                    }}
                />
                <Area
                    type="monotone"
                    dataKey="height_m"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorHeight)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default TideChart;
