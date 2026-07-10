import { useState, useEffect, useMemo } from 'react';
import { getDate, OFFSET } from '../utils';
import { currencies } from '../currencies';
import useApiCall from './useApiCall';

export default function useGetCurrencyData(selectedCurrency1, selectedCurrency2) {
   const [shouldReload, setShouldReload] = useState(false)
   const startDate = getDate(true, true)
   const endDate = getDate(false, true)
   const trueDate = new Date()
   const day = trueDate.getDate()
   const month = trueDate.getMonth() + 1
   const year = trueDate.getFullYear()
   const hour = new Date().getHours()

   let digitHour = ""
   let digitDay = ""
   let digitMonth = ""

   if (hour < 10) digitHour = "0"
   else digitHour = ""

   if (day < 10) digitDay = "0"
   else digitDay = ""

   if (month < 10) digitMonth = "0"
   else digitMonth = ""

   const url = `/.netlify/functions/getRates?start_date=${startDate}&end_date=${endDate}&base=${selectedCurrency1}&symbols=${currencies}`
   const dmy = digitDay + day + "." + digitMonth + month + "." + year
   const storageKey = `currencyBeacon|${digitHour}${hour}:00|-|${dmy}|-|${selectedCurrency1}|`

   const { data, setData, error, getApiData } = useApiCall(url, storageKey)

   useEffect(() => {
      if (shouldReload) {
         getApiData()
         setShouldReload(false)
      }
   }, [shouldReload, getApiData])

   useEffect(() => {
      const savedData = localStorage.getItem(storageKey)
      if (savedData) {
         setData(JSON.parse(savedData))
         console.log("LocalStorage loaded")
      } else {
         getApiData()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectedCurrency1, endDate])

   useEffect(() => {
      if (data) {
         localStorage.setItem(storageKey, JSON.stringify(data))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data, selectedCurrency1, startDate, endDate])

   const { dataArray, dateArray, highest, lowest } = useMemo(() => {
      if (!data?.response) {
         return { dataArray: [], dateArray: [], highest: 0, lowest: Infinity }
      }

      const tempDataArray = []
      const tempDateArray = []
      let tempHighest = 0
      let tempLowest = Infinity
      let workingDate = getDate(true, false)

      for (let i = 0; i < OFFSET; i++) {
         workingDate.setDate(workingDate.getDate() + 1)
         const dateISO = workingDate.toISOString().split('T')[0]
         let value
         try {
            value = data.response[dateISO][selectedCurrency2]
         } catch (e) {
            console.error(e)
            localStorage.removeItem(storageKey)
            setShouldReload(true)
            return { dataArray: [], dateArray: [], highest: 0, lowest: Infinity }
         }

         tempDataArray.push(value);

         if (value > tempHighest) {
            tempHighest = value
         }
         if (value < tempLowest) {
            tempLowest = value
         }
         const formattedDate = dateISO.slice(5)
         const dayLegend = formattedDate.slice(3, 5)
         const monthLegend = formattedDate.slice(0, 2)
         let legend = dayLegend + "." + monthLegend + "."
         tempDateArray.push(legend)
      }

      return {
         dataArray: tempDataArray,
         dateArray: tempDateArray,
         highest: tempHighest,
         lowest: tempLowest,
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data, selectedCurrency2])

   useEffect(() => {
      const delay = setTimeout(() => {
         if (dataArray.length > 0 && dataArray.every((item) => item === 1)) {
            if (selectedCurrency1 !== selectedCurrency2) {
               console.log("RELOADED")
               setShouldReload(true)
            }
         }
      }, 500);

      return () => clearTimeout(delay)
   }, [dataArray, selectedCurrency1, selectedCurrency2, setShouldReload])

   const first = parseFloat(dataArray[0] || 0);
   const latest = parseFloat(dataArray[dataArray.length - 1] || 0);

   return {
      data,
      error,
      dataArray,
      dateArray,
      highest,
      lowest,
      getApiData,
      shouldReload,
      setShouldReload,
      setData,
      storageKey,
      endDate,
      first,
      latest
   };
}