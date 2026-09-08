import CurrencySelector from "./CurrencySelector"
import CurrencySwitch from "./CurrencySwitch"

export default function CurrencyBox({ textValue, handleTextField, currencySymbols, currencies, selectedCurrency1, selectedCurrency2, handleCurrencies, onClick, latest }) {

   let textValue2 = parseFloat(textValue.replace(',', '.')) * latest

   return (<>

      <div className="currency-box">

         <input value={textValue} placeholder="Wert" onChange={handleTextField} type="text" inputMode="decimal"></input>
         <CurrencySelector
            no={1}
            currencySymbols={currencySymbols}
            currencies={currencies}
            selectedCurrency1={selectedCurrency1}
            selectedCurrency2={selectedCurrency2}
            handleCurrencies={handleCurrencies}
         />
         <input value={(!isNaN(textValue2) && textValue !== "") ? textValue2.toFixed(2) : "?"} onChange={handleTextField} disabled></input>
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