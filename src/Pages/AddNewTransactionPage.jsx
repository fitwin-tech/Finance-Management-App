import React from 'react'
import { AnaliticsProvider } from "../Context/AnaliticsContext";
import Header from '../Components/Header';
import MobileAppBar from '../Components/MobileAppBar';
import AddTransactionsMobile from '../Components/AddTransactionsMobile';

export default function AddNewTransactionPage() {
  return (
    <AnaliticsProvider>
      <div>
        <Header />
        <div className="p-4 text-2xl font-bold space-y-2 sm:block md:block lg:hidden">
          <h1>Add New</h1>
          <hr />
        </div>
        <AddTransactionsMobile/>
        <MobileAppBar />
      </div>
    </AnaliticsProvider>
  )
}
