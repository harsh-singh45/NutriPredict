import React from 'react';

export default function MetricCard({ icon, title, value, subtitle, color }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg bg-gray-50 ${color}`}>{icon}</div>
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      </div>
      <div>
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
      </div>
    </div>
  );
}