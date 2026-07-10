import { useState } from "react";

export default function useDebounce(fn, delay = 800) {
   const [isReady, setIsReady] = useState(true)

   return (...args) => {
      if (!isReady) return
      setIsReady(false)
      fn(...args)
      setTimeout(() => setIsReady(true), delay)
   }
}