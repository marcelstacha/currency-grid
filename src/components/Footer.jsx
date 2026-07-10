import CurrencyBeaconLogo from "./CurrencyBeaconLogo"

export default function Footer() {

   const year = new Date().getFullYear()

   return (<>
      <footer >
         <div className="logos">
            <span>Powered by:</span>
            <img src="react-icon.svg" height="18" width="18"></img> <span>React |</span>
            <CurrencyBeaconLogo /> |
            <img src="chartjs.svg" height="28" /> <span>Chart.js</span>
         </div>
         <p className="name">Marcel Stacha<span className="copyright"> | </span><span>{year}</span></p>
      </footer>
   </>)
}