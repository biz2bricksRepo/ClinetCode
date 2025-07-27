import React from "react";
import * as XLSX from "xlsx";

interface TableExportProps {
  data: Array<{ [key: string]: any }>;
  columns: string[];
}

const TableExport: React.FC<TableExportProps> = ({ data, columns }) => {
  const handleExport = () => {
    // Create worksheet from data
    const ws = XLSX.utils.json_to_sheet(data);
    // Create workbook and add worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // Export to Excel file
    XLSX.writeFile(wb, "table_export.xlsx");
  };

  return (
    <div>
      <table className="min-w-full border">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col} className="border px-2 py-1">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map(col => (
                <td key={col} className="border px-2 py-1">{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleExport}
        className="mt-4 px-4 py-2 rounded text-white hover:brightness-90"
        style={{ background: '#e63946' }}
      >
        Export to Excel
      </button>
