import React, { useState, useEffect } from "react";
import { DateRange } from 'react-date-range';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateRangePick({ onClose, onDateSelect, initialStartDate, initialEndDate }) {
  const [dateRange, setDateRange] = useState({
    startDate: initialStartDate || new Date(),
    endDate: initialEndDate || new Date(),
    key: "selection",
    color: "#0E4B5E",
  });

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection);
  };

  useEffect(() => {
    onDateSelect(dateRange.startDate, dateRange.endDate);
  }, [dateRange, onDateSelect]);

  return (
    <div className="text-black bg-white p-2 rounded-lg">
      <DateRange
        ranges={[dateRange]}
        onChange={handleSelect}
        maxDate={new Date()}
      />
    </div>
  );
}