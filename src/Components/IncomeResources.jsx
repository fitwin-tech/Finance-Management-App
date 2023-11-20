import React, {useState} from "react";
import { useAnalitics } from "../Context/AnaliticsContext";

export default function IncomeResources() {
  const { userDetails, userData, formatNumber, category } = useAnalitics();
  const [searchTerm, setSearchTerm] = useState("");
  const incomeCategories = category.filter((index) => index.is_income === true);

    // Filter expense categories based on the search term
    const filteredIncomeCategories = incomeCategories.filter((index) =>
    index.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="border rounded-md p-4 space-y-4">
      <div>
        <h1 className="font-bold capitalize">Income Resources</h1>
      </div>
      <div className="border rounded-md w-full flex items-center p-2">
        <input
          className="w-full outline-none"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredIncomeCategories.length === 0 ? (
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/portfolios-62a43.appspot.com/o/5461692_2808347.svg?alt=media&token=05e263d7-a953-49c0-a76e-55c005ea1798&_gl=1*fc6dk0*_ga*NTE3MjM3NDA3LjE2OTU5NjI5NDc.*_ga_CW55HF8NVT*MTY5OTE4MTk1Ny42LjEuMTY5OTE4MjA2Ni40NC4wLjA."
            alt="No Data"
          />
        </div>
      ) : (
        // Render income categories if they exist
        filteredIncomeCategories.map((index) => (
          <div key={index.id} className="pt-1">
            <div className="text-subtitle space-y-1">
              <div className="flex items-center">
                <p className="w-full capitalize">
                  {index.title} -{" "}
                  {(
                    (index.amount.$numberDecimal /
                      userDetails.thisMonthIncome?.$numberDecimal) *
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
        ))
      )}
    </div>
  );
}
