import React, {useState} from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import chartData from "../Json/Chart.json";

export default function Chart() {
  // Extracting data from the JSON array
  const incomeData = chartData.map((item) => item.income);
  const expenceData = chartData.map((item) => item.expence);
  const xLabels = chartData.map((item) => item.month);
  const [is12Month, setIs12Month] = useState(true)

  return (
    <div className="border p-4 rounded-lg sm:hidden md:hidden lg:block">
      <div className="flex items-center">
        <p className="font-bold w-[20%]">Income/Expence Report</p>
        <div className="w-[80%] flex justify-end space-x-4 text-subtitle">
          <div className={`border p-1 px-3 rounded-md hover:bg-white_hover cursor-pointer ${is12Month ? "bg-white_hover" : ""}`}>
          <p >12 Months</p>
          </div>
            <p className="border p-1 px-3 rounded-md hover:bg-white_hover cursor-pointer">6 Months</p>
            <p className="border p-1 px-3 rounded-md hover:bg-white_hover cursor-pointer">30 Days</p>
            <p className="border p-1 px-3 rounded-md hover:bg-white_hover cursor-pointer">7 Days</p>
        </div>
      </div>
      <div>
        <LineChart
          height={400}
          series={[
            { data: expenceData, label: "Expence", color: '#C624FF' },
            { data: incomeData, label: "Income"},
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
        />
      </div>
    </div>
  );
}
