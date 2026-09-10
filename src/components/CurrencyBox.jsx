import CurrencySelector from "./CurrencySelector"
import CurrencySwitch from "./CurrencySwitch"

export default function CurrencyBox({ textValue, handleTextField, currencySymbols, currencies, selectedCurrency1, selectedCurrency2, handleCurrencies, onClick, latest }) {

   let textValue2 = parseFloat(textValue.replace(',', '.')) * latest

   return (<>

      <div className="currency-box">

         <input value={textValue} placeholder="Wert" className="upper-input" onChange={handleTextField} type="text" inputMode="decimal" aria-label="Betrag eingeben"></input>
         <CurrencySelector
            no={1}
            currencySymbols={currencySymbols}
            currencies={currencies}
            selectedCurrency1={selectedCurrency1}
            selectedCurrency2={selectedCurrency2}
            handleCurrencies={handleCurrencies}
         />
         <input value={(!isNaN(textValue2) && textValue !== "") ? textValue2.toFixed(2) : "?"} className="lower-input" onChange={handleTextField} aria-label="Ergebnis" disabled ></input>
         <CurrencySelector
            no={2}
            currencySymbols={currencySymbols}
            currencies={currencies}
            selectedCurrency1={selectedCurrency1}
            selectedCurrency2={selectedCurrency2}
            handleCurrencies={handleCurrencies}
         />
         <div className="star"
            onClick={onClick}
         >
            <CurrencySwitch
               selectedCurrency1={selectedCurrency1}
               selectedCurrency2={selectedCurrency2}
               isIcon={true}
            />
         </div>

      </div>

   </>)
}