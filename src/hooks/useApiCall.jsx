import { useState } from "react"

export default function useApiCall(url, storageKey) {

   const [data, setData] = useState(null)
   const [error, setError] = useState(null)
   const [isFetching, setIsFetching] = useState(false)

   async function getApiData() {
      setIsFetching(true)
      try {
         const response = await fetch(url);
         if (!response.ok) {
            throw new Error("Fehlerhaftes fetch");
         }
         const dat = await response.json();
         console.log("API call");
         console.log(dat)
         setData(dat);
         localStorage.setItem(storageKey, JSON.stringify(dat));
      } catch (err) {
         setError(err);
      } finally {
         setIsFetching(false)
      }
   }

   return { data, error, getApiData, setData, isFetching }
}