import { OFFSET } from "../utils"

export default function HighestLowestRate({ selectedCurrency1, selectedCurrency2, highest, lowest }) {

   return (<>
      <div className="top-card">
         <div>
            <h5>Höchster Wechselkurs</h5>
            1 {selectedCurrency1} = <span className="result">{highest.toFixed(4)} {selectedCurrency2}</span>
         </div>
         <div className="gap">
            <h5>Niedrigster Wechselkurs</h5>
            1 {selectedCurrency1} = <span className="result">{lowest.toFixed(4)} {selectedCurrency2}</span>
         </div>
      </div>
      <h6 className="sub-info">letzte {OFFSET} Tage</h6>
   </>)
}