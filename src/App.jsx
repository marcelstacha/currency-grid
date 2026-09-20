import "./App.css";

import { useEffect, useState } from "react";

import Average from "./components/Average.jsx";
import Card from "./components/Card";
import CurrencyBox from "./components/CurrencyBox";
import CurrencySwitch from "./components/CurrencySwitch";
import CurrentRate from "./components/CurrentRate";
import DarkmodeToggle from "./components/DarkmodeToggle";
import Footer from "./components/Footer";
import Funfact from "./components/Funfact";
import Graph from "./components/Graph";
import HighestLowestRate from "./components/HighestLowestRate";
import Title from "./components/Title";
import Trend from "./components/Trend";

import useDarkMode from "./hooks/useDarkMode.jsx";
import useGetCurrencyData from "./hooks/useGetCurrencyData.jsx";
import useThrottle from "./hooks/useThrottle.jsx";
import useWindowWidth from "./hooks/useWindowWidth";

import { currencies, currencySymbols } from "./currencies.js";

function App() {
   const [selectedCurrencies, setSelectedCurrencies] = useState(() => ({
      currency1: localStorage.getItem("currency-1") || currencies[0],
      currency2: localStorage.getItem("currency-2") || currencies[1],
   }));

   useEffect(() => {
      localStorage.setItem("currency-1", selectedCurrencies.currency1);
      localStorage.setItem("currency-2", selectedCurrencies.currency2);
   }, [selectedCurrencies]);

   const [textValue, setTextValue] = useState("1");

   const [isDarkMode, setIsDarkMode] = useDarkMode();
   const windowWidth = useWindowWidth();
   const throttledSwitch = useThrottle(currencySwitch);

   const {
      data,
      error,
      dataArray,
      dateArray,
      highest,
      lowest,
      storageKey,
      endDate,
      first,
      latest,
      isFetching,
   } = useGetCurrencyData(
      selectedCurrencies.currency1,
      selectedCurrencies.currency2
   );

   const isLoading = !data || isFetching;

   function switchMode() {
      setIsDarkMode((prev) => !prev);
   }

   function handleTextField(e) {
      let val = e.target.value;
      val = val.replace(",", ".");

      if (val.length === 2 && val.startsWith("0") && val[1] !== ".") {
         val = "0." + val[1];
      }

      const isValidFormat = /^\d*\.?\d*$/.test(val);

      if (isValidFormat) {
         setTextValue(val);
      }
   }

   function handleCurrencies(i, value) {
      if (i == 1) {
         setSelectedCurrencies((prev) => ({ ...prev, currency1: value }));
      } else if (i == 2) {
         setSelectedCurrencies((prev) => ({ ...prev, currency2: value }));
      }
   }

   function currencySwitch() {
      setSelectedCurrencies((prev) => ({
         currency1: prev.currency2,
         currency2: prev.currency1,
      }));
   }

   useEffect(() => {
      currencies.forEach((currency) => {
         const img = new Image();
         img.src = `/${currency.toLowerCase()}.jpg`;
      });
   }, []);

   if (error) return <div>Error: {error.message}</div>;

   return (
      <>
         <nav className="nav-bar">
            <Title />
            <DarkmodeToggle isDarkMode={isDarkMode} switchMode={switchMode} />
         </nav>
         <div
            className="bg-gradient-bg"
            style={{
               "--c1": `var(--${selectedCurrencies.currency1.toLowerCase()})`,
               "--c2": `var(--${selectedCurrencies.currency2.toLowerCase()})`,
            }}
         />
         <div className="container">
            <Card id="card-1" loading={false}>
               <Graph
                  selectedCurrency1={selectedCurrencies.currency1}
                  selectedCurrency2={selectedCurrencies.currency2}
                  dataArray={dataArray}
                  dateArray={dateArray}
                  highest={highest}
                  lowest={lowest}
                  isDarkMode={isDarkMode}
                  windowWidth={windowWidth}
                  storageKey={storageKey}
                  isLoading={isLoading}
               />
            </Card>

            <Card id="card-2" loading={isLoading}>
               <CurrentRate
                  selectedCurrency1={selectedCurrencies.currency1}
                  selectedCurrency2={selectedCurrencies.currency2}
                  data={data}
                  endDate={endDate}
               />
            </Card>

            <Card id="card-4" loading={isLoading}>
               <Trend
                  selectedCurrency1={selectedCurrencies.currency1}
                  selectedCurrency2={selectedCurrencies.currency2}
                  first={first}
                  latest={latest}
               />
            </Card>

            <Card id="card-8" loading={isLoading}>
               <Average
                  selectedCurrency1={selectedCurrencies.currency1}
                  selectedCurrency2={selectedCurrencies.currency2}
                  dataArray={dataArray}
               />
            </Card>

            <Funfact />

            <Card id="card-6" loading={false}>
               <CurrencyBox
                  textValue={textValue}
                  latest={latest}
                  handleTextField={handleTextField}
                  handleCurrencies={handleCurrencies}
                  currencySymbols={currencySymbols}
                  currencies={currencies}
                  selectedCurrency1={selectedCurrencies.currency1}
                  selectedCurrency2={selectedCurrencies.currency2}
               />
            </Card>
            <Card id="card-5" loading={false}>
               <CurrencySwitch
                  handleCurrencies={handleCurrencies}
                  currencySymbols={currencySymbols}
                  currencies={currencies}
                  selectedCurrency1={selectedCurrencies.currency1}
                  selectedCurrency2={selectedCurrencies.currency2}
                  onClick={
                     selectedCurrencies.currency1 !=
                     selectedCurrencies.currency2
                        ? throttledSwitch
                        : undefined
                  }
               />
            </Card>
            <Card id="card-3" loading={isLoading}>
               <HighestLowestRate
                  selectedCurrency1={selectedCurrencies.currency1}
                  selectedCurrency2={selectedCurrencies.currency2}
                  highest={highest}
                  lowest={lowest}
               />
            </Card>
         </div>
         <Footer />
      </>
   );
}

export default App;
