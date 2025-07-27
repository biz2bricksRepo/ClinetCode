"use client";


import React from "react";
import TableExport from "@/app/ui/TableExport";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);




// Define columns for the table with mathematical data
const columns = [
  "id",
  "age",
  "square",
  "cube",
  "sqrt",
  "log",
  "exp",
  "sin",
  "cos",
  "tan"
];

// Generate 100 rows of mathematical sample data
const sampleData = Array.from({ length: 100 }, (_, rowIdx) => {
  const id = rowIdx + 1;
  const age = 20 + (rowIdx % 40);
  return {
    id,
    age,
    square: age * age,
    cube: age * age * age,
    sqrt: Number(Math.sqrt(age).toFixed(4)),
    log: Number(Math.log(age).toFixed(4)),
    exp: Number(Math.exp(age / 20).toFixed(4)),
    sin: Number(Math.sin(age).toFixed(4)),
    cos: Number(Math.cos(age).toFixed(4)),
    tan: Number(Math.tan(age).toFixed(4)),
  };
});



import { useState } from "react";


// Generate histogram data for age counts
const ageCounts: { [age: number]: number } = {};
sampleData.forEach(row => {
  ageCounts[row.age] = (ageCounts[row.age] || 0) + 1;
});

const ageLabels = Object.keys(ageCounts).map(Number).sort((a, b) => a - b);
const ageHistogramData = {
  labels: ageLabels.map(age => age.toString()),
  datasets: [
    {
      label: "Count of Age",
      data: ageLabels.map(age => ageCounts[age]),
      backgroundColor: "rgba(54, 162, 235, 0.7)",
    }
  ]
};

const ageHistogramOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: "Histogram of Age Counts" }
  },
  scales: {
    x: { title: { display: true, text: "Age" } },
    y: { title: { display: true, text: "Count" } }
  }
};


export default function TableExportDemoPage() {
  const [showGraph, setShowGraph] = useState(false);
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Table Export Demo</h1>
      <TableExport data={sampleData} columns={columns} />
      <div className="mt-8">
        <button
          className="px-4 py-2 text-white rounded"
          style={{ backgroundColor: '#e63946' }}
          onClick={() => setShowGraph(true)}
        >
          Generate Graph
        </button>
        {showGraph && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Histogram: Count of Age</h2>
            <Bar
              data={ageHistogramData}
              options={ageHistogramOptions}
            />
          </div>
        )}
      </div>
    </div>
  );
}
