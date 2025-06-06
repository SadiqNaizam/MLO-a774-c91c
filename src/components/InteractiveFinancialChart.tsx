import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Example data structure
interface ChartDataPoint {
  name: string; // Typically date or label for X-axis
  value: number; // Typically amount for Y-axis
  value2?: number; // Optional second value for comparison
}

interface InteractiveFinancialChartProps {
  data: ChartDataPoint[];
  title?: string;
  chartType?: 'line' | 'bar';
  dataKey?: string;
  dataKey2?: string; // For second line/bar
  xAxisDataKey?: string;
  aspectRatio?: number;
}

const InteractiveFinancialChart: React.FC<InteractiveFinancialChartProps> = ({
  data,
  title = "Financial Overview",
  chartType = 'line',
  dataKey = "value",
  dataKey2,
  xAxisDataKey = "name",
  aspectRatio = 16 / 9,
}) => {
  console.log("Rendering InteractiveFinancialChart with data:", data.length, "points, type:", chartType);

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">No data available to display.</p>
        </CardContent>
      </Card>
    );
  }

  const ChartComponent = chartType === 'line' ? LineChart : BarChart;
  const PrimarySeriesComponent = chartType === 'line' ? Line : Bar;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" aspect={aspectRatio}>
          <ChartComponent data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
            <XAxis dataKey={xAxisDataKey} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => typeof value === 'number' ? value.toLocaleString() : value} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <PrimarySeriesComponent
              type="monotone"
              dataKey={dataKey}
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              dot={chartType === 'line' ? { r: 3, strokeWidth: 2 } : false}
              activeDot={chartType === 'line' ? { r: 6 } : undefined}
            />
            {dataKey2 && (
              <PrimarySeriesComponent
                type="monotone"
                dataKey={dataKey2}
                stroke="hsl(var(--secondary-foreground))" // Example color
                fill="hsl(var(--secondary-foreground))"
                dot={chartType === 'line' ? { r: 3, strokeWidth: 2 } : false}
                activeDot={chartType === 'line' ? { r: 6 } : undefined}
              />
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default InteractiveFinancialChart;