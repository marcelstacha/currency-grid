import './App.css'

import { useEffect, useRef, useState } from 'react'

import Card from "./components/Card"
import Title from './components/Title'
import DarkmodeToggle from './components/DarkmodeToggle'
import Graph from './components/Graph'
import CurrentRate from "./components/CurrentRate"
import Trend from './components/Trend'
import HighestLowestRate from './components/HighestLowestRate'
import Funfact from './components/Funfact'
import CurrencySwitch from './components/CurrencySwitch'
import CurrencyBox from './components/CurrencyBox'
import Average from './components/Average.jsx'
import Footer from "./components/Footer"

import useWindowWidth from './hooks/useWindowWidth';
import useFunfact from './hooks/useFunfact';
import useDarkMode from './hooks/useDarkMode.jsx'
import useDebounce from './hooks/useDebounce.jsx'
import useGetCurrencyData from "./hooks/useGetCurrencyData.jsx"

import { currencies, currencySymbols } from "./currencies.js"

function App() {

   const [selectedCurrencies, setSelectedCurrencies] = useState({
      currency1: localStorage.getItem("currency-1") || currencies[0],
      currency2: localStorage.getItem("currency-2") || currencies[1]
   })

   const [textValue, setTextValue] = useState("1")

   const { funfact, getNextFunfact } = useFunfact();
   const [isDarkMode, setIsDarkMode] = useDarkMode()
   const windowWidth = useWindowWidth();
   const debouncedSwitch = useDebounce(currencySwitch)

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
      latest
   } = useGetCurrencyData(selectedCurrencies.currency1, selectedCurrencies.currency2);

   const isLoading = !data

   function switchMode() {
      setIsDarkMode((prev) => !prev)
   }

   function handleTextField(e) {
      const val = e.target.value
      if (+val || val == "") {
         setTextValue(val)
      }
   }

   function handleCurrencies(i, value) {
      if (i == 1) {
         setSelectedCurrencies((prev) => ({ ...prev, currency1: value }))
      } else if (i == 2) {
         setSelectedCurrencies((prev) => ({ ...prev, currency2: value }))
      }
   }

   function currencySwitch() {
      setSelectedCurrencies((prev) => (
         {
            currency1: prev.currency2,
            currency2: prev.currency1
         }
      ))
   }

   const savedTimerRef = useRef(null);

   useEffect(() => {
      savedTimerRef.current = getNextFunfact;
   }, [getNextFunfact]);

   const timerRef = useRef(null);

   function startFunfactTimer() {
      if (timerRef.current) {
         clearInterval(timerRef.current);
      }

      timerRef.current = setInterval(() => {
         if (savedTimerRef.current) {
            savedTimerRef.current();
         }
      }, 9000);
   }

   useEffect(() => {
      startFunfactTimer();
      return () => {
         if (timerRef.current) {
            clearInterval(timerRef.current);
         }
      };
   }, []);

   function getCustomNextFunfact() {
      getNextFunfact()
      startFunfactTimer()
   }

   if (error) return (<div>Error: {error.message}</div>)

   return (
      <>
         <nav className="nav-bar">
            <Title />
            <DarkmodeToggle
               isDarkMode={isDarkMode}
               switchMode={switchMode}
            />
         </nav>
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

            <Card id="card-3" loading={isLoading}>
               <HighestLowestRate
                  selectedCurrency1={selectedCurrencies.currency1}
                  selectedCurrency2={selectedCurrencies.currency2}
                  highest={highest}
                  lowest={lowest}
               />
            </Card>

            <Card id="card-7" onClick={getCustomNextFunfact} loading={false}>
               <Funfact
                  funfact={funfact}
               />
            </Card>

            <Card id="card-5" loading={isLoading}>
               <CurrencySwitch
                  handleCurrencies={handleCurrencies}
                  currencySymbols={currencySymbols}
                  currencies={currencies}
                  selectedCurrency1={selectedCurrencies.currency1}
                  selectedCurrency2={selectedCurrencies.currency2}
                  onClick={(selectedCurrencies.currency1 != selectedCurrencies.currency2) ? debouncedSwitch : undefined}
               />
            </Card>

            <Card id="card-6" loading={isLoading}>
               <CurrencyBox
                  textValue={textValue}
                  latest={latest}
                  handleTextField={handleTextField}
                  handleCurrencies={handleCurrencies}
                  currencySymbols={currencySymbols}
                  currencies={currencies}
                  selectedCurrency1={selectedCurrencies.currency1}
                  selectedCurrency2={selectedCurrencies.currency2}
                  onClick={(selectedCurrencies.currency1 != selectedCurrencies.currency2) ? debouncedSwitch : undefined}
               />
            </Card>

            <Card id="card-8" loading={isLoading}>
               <Average
                  selectedCurrency1={selectedCurrencies.currency1}
                  selectedCurrency2={selectedCurrencies.currency2}
                  dataArray={dataArray}
               />
            </Card>

         </div>
         <Footer />
      </>
   )
}

export default App