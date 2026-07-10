import { useState } from "react"

export default function useApiCall(url, storageKey) {

   const [data, setData] = useState(null)
   const [error, setError] = useState(null)

   async function getApiData() {

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
      }
   }

   return { data, error, getApiData, setData }
}