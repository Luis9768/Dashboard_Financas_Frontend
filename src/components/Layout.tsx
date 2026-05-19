import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { useState } from 'react';

export function Layout() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        month={selectedMonth} 
        year={selectedYear} 
        onMonthChange={setSelectedMonth} 
        onYearChange={setSelectedYear} 
      />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Usamos o Context do Outlet para passar o estado de filtro para os filhos */}
        <Outlet context={{ month: selectedMonth, year: selectedYear }} />
      </main>
    </div>
  );
}
