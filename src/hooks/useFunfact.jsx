import { useEffect, useState } from "react";

const funfactsArray = [
   "DEU, NLD, BEL, LUX, FRA, IRL, ESP, ITA, EST, LVA, LTU & GRC führten den Euro 2002 als gemeinsame Währung ein.",
   "Das Euro-Symbol (€) wurde 1975 vom Deutschen Arthur Eisenmenger in Luxemburg entworfen.",
   "Über 340 Millionen Menschen in Europa nutzen den Euro als ihre Hauptwährung.",
   "Der Euro ist die gemeinsame Währung von 21 der 27 EU-Mitgliedstaaten, die zusammen als Eurozone bezeichnet werden.",
   "Um dem Euro beizutreten, müssen Länder bestimmte wirtschaftliche Kriterien erfüllen, die als Maastricht-Kriterien bekannt sind.",
   "Die erste Euro-Münze wurde am 1. Januar 2002 in Berlin geprägt, um den offiziellen Start des Euros als Bargeld zu feiern.",
   "1,95583 D-Mark pro Euro war der Wechselkurs, der am 1. Januar 1999 bei der Euro-Einführung offiziell festgelegt wurde.",
   "Bei Einführung des Euro wurden innerhalb weniger Wochen 15 Milliarden Banknoten und 52 Milliarden Münzen in Umlauf gebracht.",
   "Im Jahr 2019 wurden rund 5210 Tonnen Baumwollfasern für den Druck von Euro-Banknoten verwendet.",
   "Kroatien löste am 01. Januar 2023 die bisherige Währung Kuna durch den Euro ab.",
   "Rumänien plant 2029 die Einführung des Euro, nachdem es 2007 der Europäischen Union beigetreten ist.",
   "Am 12. Juli 2022 erreichte der Euro-Dollar-Wechselkurs seit fast 20 Jahren erneut ein Verhältnis von 1:1.",
   "Der Euro wurde am 1. Januar 1999 als Buchgeld eingeführt und trat am 1. Januar 2002 in Form von Bargeld in 12 EU-Ländern in Kraft.",
   "Die European Currency Unit (ECU) diente ab 1979 als Vorläufer des Euro und wurde am 1. Januar 1999 im Verhältnis 1:1 als Euro fortgeführt.",

   "Die japanische 1-Yen-Münze besteht zu 100 % aus Aluminium und ist so leicht (1 Gramm), dass sie auf der Wasseroberfläche schwimmen kann.",
   "China war während der Song-Dynastie im 11. Jahrhundert das erste Land der Welt, das Papiergeld als offizielles Zahlungsmittel einführte.",
   "Weltweit gibt es heute rund 160 anerkannte offizielle Währungen, die in den 193 Mitgliedstaaten der Vereinten Nationen genutzt werden.",
   "Amerikanische Banknoten bestehen nicht aus gewöhnlichem Papier, sondern zu 75 % aus Baumwolle und zu 25 % aus Leinen.",
   "Der US-Dollar ist die unangefochtene Leitwährung der Welt und macht über 60 % aller weltweiten Währungsreserven aus.",
   "Das Britische Pfund Sterling ist die älteste Währung der Welt, die noch immer kontinuierlich im Umlauf ist.",
   "Der Name 'Pfund Sterling' stammt aus dem Mittelalter, als der Wert der Währung exakt einem Pfund an reinem Silber entsprach.",
   "Die aktuellen Banknoten des Schweizer Frankens sind im Gegensatz zu fast allen anderen Währungen der Welt vertikal gestaltet.",
   "Der Schweizer Franken ist der letzte offiziell im Umlauf befindliche Franken in Europa.",
   "Das japanische Wort 'Yen' bedeutet übersetzt 'runder Gegenstand'.",
   "Zwischen Januar 2014 und Juni 2019 war der Yen offizielles Zahlungsmittel in Simbabwe."
]

export default function useFunfact() {

   const [remainingFacts, setRemainingFacts] = useState(funfactsArray)
   const [funfact, setFunfact] = useState()

   useEffect(() => {
      getNextFunfact()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   function getNextFunfact() {

      let remaining = remainingFacts

      if (remaining.length == 0) {
         remaining = funfactsArray
      }

      const index = Math.floor(Math.random() * remaining.length)
      setFunfact(remaining[index])
      remaining = remaining.filter((prev, id) => id != index)
      setRemainingFacts(remaining)
   }

   return { funfact, getNextFunfact };
}
