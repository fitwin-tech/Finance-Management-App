import React from "react";
import { useAnalitics } from "../Context/AnaliticsContext";

export default function ExpenceResources() {
  const { userDetails, userData, formatNumber, category } = useAnalitics();
  const expenceCategories = category.filter((index) => index.is_income === false);

  return (
    <div className="border rounded-md p-4 space-y-4">
      <div>
        <h1 className="font-bold capitalize">Expence Resources</h1>
      </div>
      {expenceCategories.map((index) => (
        <div key={index.id} className="pt-1">
          <div className="text-subtitle space-y-1">
            <div className="flex items-center">
              <p className="w-full capitalize">
                {index.title} -{" "}
                {(
                  (index.amount.$numberDecimal / userDetails.thisMonthIncome?.$numberDecimal) *
                  100
                ).toFixed(1)}
                %
              </p>
              <p>
                <span className="font-semibold">{userData.currency}</span>
                {formatNumber(index.amount.$numberDecimal)}
              </p>
            </div>
            <div className="w-full pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/[.30]">
                <div
                  style={{
                    width: `${
                      (index.amount.$numberDecimal /
                        userDetails.thisMonthIncome?.$numberDecimal) *
                      100
                    }%`,
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
