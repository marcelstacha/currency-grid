import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { fullCurrencyName } from "../currencies";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title);

export default function Graph({ selectedCurrency1, selectedCurrency2, dataArray, dateArray, highest, lowest, isDarkMode, windowWidth, isLoading }) {
   const [bgColor, setBgColor] = useState("");
   const [secondaryColor, setSecondaryColor] = useState("");

   useEffect(() => {
      requestAnimationFrame(() => {
         const themeElement = document.querySelector("[data-dark-mode]");
         if (!themeElement) return;

         const styles = getComputedStyle(themeElement);

         setBgColor(styles.getPropertyValue("--main").trim());
         setSecondaryColor(styles.getPropertyValue("--secondary").trim());
      });
   }, [isDarkMode]);

   let rangeVal = 0.1;
   let steps = 11.5;

   let gridColor, graph, toolTipBG, toolTipFontColor, legend, stroke, radius, title1, title2;

   let fullCurrencyName1 = fullCurrencyName[selectedCurrency1];
   let fullCurrencyName2 = fullCurrencyName[selectedCurrency2];

   if (windowWidth > 1200) {
      title1 = fullCurrencyName1;
      title2 = fullCurrencyName2;
      stroke = 4.8;
      radius = 3;
   } else {
      title1 = selectedCurrency1;
      title2 = selectedCurrency2;
      stroke = 2.8;
      radius = 1.8;
   }

   graph = secondaryColor;
   toolTipBG = bgColor;
   toolTipFontColor = secondaryColor;

   if (isDarkMode) {
      gridColor = "rgba(255,255,255,0.26)";
      legend = "rgba(255,255,255,0.85)";
   } else {
      gridColor = "rgba(0,0,0,0.22)";
      legend = "rgba(0,0,0,0.8)";
   }

   const combinedData = {
      labels: dateArray,
      datasets: [
         {
            data: dataArray,
            borderColor: graph,
            tension: 0.2,
            borderWidth: stroke,
            pointRadius: radius,
         },
      ],
   };

   const calculateStepSizeInPercentage = (lowest, highest) => {
      const range = highest - lowest;
      rangeVal = range * (1 / steps);
      return rangeVal;
   };

   const stepSize = calculateStepSizeInPercentage(lowest, highest);

   const options = {
      plugins: {
         legend: {
            display: false,
         },
         tooltip: {
            displayColors: false,
            callbacks: {
               label: function (tooltipItem) {
                  const value = parseFloat(tooltipItem.raw);
                  return value.toFixed(5);
               },
            },
            // Tooltip-Optionen
            backgroundColor: toolTipBG,
            titleColor: toolTipFontColor,
            bodyColor: toolTipFontColor,
            borderColor: toolTipFontColor,
            borderWidth: 1,
            titleFont: {
               size: 16,
               weight: "400",
               family: "Arial",
            },
            bodyFont: {
               size: 16,
               weight: "bold",
               family: "Arial",
            },
         },
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
         y: {
            beginAtZero: false,
            grid: {
               color: gridColor,
               lineWidth: 1,
            },
            ticks: {
               stepSize: stepSize,
               color: legend,
               callback: function (value) {
                  return value.toFixed(5);
               },
            },
         },
         x: {
            grid: {
               color: gridColor,
               lineWidth: 1,
            },
            ticks: {
               color: legend,
            },
         },
      },
   };

   return (
      <>
         {selectedCurrency1 != selectedCurrency2 && (
            <>
               <h3 className="graph-header">
                  1 <span className="full-currency-name">{title1}</span> in{" "}
                  <span className="full-currency-name" id="full-currency-name-blue">
                     {title2}
                  </span>
               </h3>
            </>
         )}
         <div className={`diagram ${isLoading ? "loading" : ""}`}>
            {selectedCurrency1 == selectedCurrency2 ? (
               <div className="same">
                  <span>Wähle zwei unterschiedliche Währungen!</span>
               </div>
            ) : (
               <Line data={combinedData} options={options} />
            )}
         </div>
      </>
   );
}
