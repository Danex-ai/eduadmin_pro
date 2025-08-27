import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const AttendanceChart = ({ attendanceData = [] }) => {
  const mockData = attendanceData?.length > 0 ? attendanceData : [
    { month: 'Jan', attendance: 95 },
    { month: 'Feb', attendance: 92 },
    { month: 'Mar', attendance: 98 },
    { month: 'Apr', attendance: 89 },
    { month: 'May', attendance: 94 },
    { month: 'Jun', attendance: 96 },
    { month: 'Jul', attendance: 91 },
    { month: 'Aug', attendance: 97 }
  ];

  const averageAttendance = mockData?.reduce((sum, item) => sum + item?.attendance, 0) / mockData?.length;

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Attendance Trend</h3>
        <Icon name="TrendingUp" size={20} className="text-primary" />
      </div>
      <div className="mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Monthly Attendance</span>
          </div>
          <div className="text-sm font-medium text-card-foreground">
            Avg: {averageAttendance?.toFixed(1)}%
          </div>
        </div>
      </div>
      <div className="h-64 w-full" aria-label="Attendance Trend Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              domain={[80, 100]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value) => [`${value}%`, 'Attendance']}
            />
            <Line 
              type="monotone" 
              dataKey="attendance" 
              stroke="#1E40AF" 
              strokeWidth={2}
              dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#1E40AF', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 pt-3 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-bold text-success">
            {Math.max(...mockData?.map(d => d?.attendance))}%
          </div>
          <div className="text-xs text-muted-foreground">Best Month</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-warning">
            {Math.min(...mockData?.map(d => d?.attendance))}%
          </div>
          <div className="text-xs text-muted-foreground">Lowest Month</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-primary">
            {mockData?.[mockData?.length - 1]?.attendance || 0}%
          </div>
          <div className="text-xs text-muted-foreground">This Month</div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;