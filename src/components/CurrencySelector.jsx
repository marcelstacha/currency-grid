export default function CurrencySelector({ currencies, currencySymbols, no, selectedCurrency1, selectedCurrency2, handleCurrencies }) {
   let value
   let id

   if (no == 1) {
      value = selectedCurrency1
      id = "currency-select-1"
   }
   if (no == 2) {
      value = selectedCurrency2
      id = "currency-select-2"
   }

   return (<>
      <select className="currency-select" value={value} id={id} onChange={(e) => handleCurrencies(no, e.target.value)} aria-label="Währung auswählen">
         {currencies.map((currency, index) => (
            <option key={currency} value={currency} >
               {currency}{"\u2003"}({currencySymbols[index]})
            </option>
         ))}
      </select>
   </>)
}