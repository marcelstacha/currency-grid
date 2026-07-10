export const currencies = [
   "EUR", "USD", "GBP", "CHF", "CZK", "DKK", "HUF", "NOK", "PLN", "RON", "SEK", "JPY", "CNY"
];

export const currencySymbols = [
   "€", "$", "£", "₣", "Kč", "kr", "Ft", "kr", "zł", "lei", "kr", "¥", "元"
]

export function getFullCurrencyName(currency) {

   let fullCurrencyName = "";

   switch (currency) {
      case "EUR":
         fullCurrencyName = "Euro"
         break;
      case "USD":
         fullCurrencyName = "Amerikanischer Dollar"
         break;
      case "GBP":
         fullCurrencyName = "Britischer Pfund Sterling"
         break;
      case "CHF":
         fullCurrencyName = "Schweizer Franken"
         break;
      case "CZK":
         fullCurrencyName = "Tschechische Krone"
         break;
      case "DKK":
         fullCurrencyName = "Dänische Krone"
         break;
      case "HUF":
         fullCurrencyName = "Ungarischer Forint"
         break;
      case "NOK":
         fullCurrencyName = "Norwegische Krone"
         break;
      case "PLN":
         fullCurrencyName = "Polnischer Złoty"
         break;
      case "RON":
         fullCurrencyName = "Rumänischer Leu"
         break;
      case "SEK":
         fullCurrencyName = "Schwedische Krone"
         break;
      case "JPY":
         fullCurrencyName = "Japanischer Yen"
         break;
      case "CNY":
         fullCurrencyName = "Chinesischer Yuan"
         break;
   }

   return fullCurrencyName

}