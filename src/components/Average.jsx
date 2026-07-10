import { OFFSET } from "../utils"

export default function Average({ dataArray, selectedCurrency1, selectedCurrency2 }) {

   const sum = (dataArray.reduce((acc, curr) => acc + curr, 0))

   const avg1 = (sum / OFFSET).toFixed(4)
   const avg2 = (1 / (sum / OFFSET)).toFixed(4)

   return (<>
      <div className="top-card">
         <h5>Durchschnitt</h5>
         <div>1 {selectedCurrency1} = <span className="result">{avg1} {selectedCurrency2}</span></div>
         <div>1 {selectedCurrency2} = <span className="result">{avg2} {selectedCurrency1}</span></div>
      </div>
      <h6 className="sub-info">letzte {OFFSET} Tage</h6>
   </>)
}