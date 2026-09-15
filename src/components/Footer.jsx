import CurrencyBeaconLogo from "./CurrencyBeaconLogo"
import Reactlogo from "./ReactLogo"

export default function Footer() {

   const year = new Date().getFullYear()

   return (<>
      <footer >
         <div className="logos">
            <Reactlogo />
            <span>React</span>
            <span>|</span>
            <CurrencyBeaconLogo />
            <span>|</span>
            <img src="chartjs.svg" /> <span>Chart.js</span>
         </div>
         <p className="name">Marcel Stacha <span>({year})</span></p>
      </footer>
   </>)
}