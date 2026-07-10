import { OFFSET } from "../utils"

export default function Trend({ selectedCurrency1, selectedCurrency2, first, latest }) {

   let trend = (1 - (first / latest)) * 100
   let trendWording = trend > 0 ? <span className="rising">gestiegen</span> : <span className="dropping">gefallen</span>

   return (<>
      <div className="top-card">
         <h5>Trend</h5>
         <div>
            <span className="bold">{selectedCurrency1}</span> <span>{"=>"}</span> <span className="bold">{selectedCurrency2}</span>
            <br />
            <span>{trendWording}</span>
            <br />
            <span className="bold">{Math.abs(trend).toFixed(4)}%</span>
         </div>
         <h6 className="sub-info">letzte {OFFSET} Tage</h6>
      </div>
   </>)
}