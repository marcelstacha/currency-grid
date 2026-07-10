import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title } from 'chart.js';
import { getFullCurrencyName } from '../currencies';
import { motion, useAnimation } from "motion/react"
import { useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title);

export default function Graph({ selectedCurrency1, selectedCurrency2, dataArray, dateArray, highest, lowest, isDarkMode, windowWidth, storageKey }) {

   const controls = useAnimation()

   useEffect(() => {
      let isMounted = true;

      if (!localStorage.getItem(storageKey)) {
         try {
            controls.start({ opacity: 0 })

            const timer = setTimeout(() => {
               if (isMounted) {
                  controls.start({ opacity: 1 })
               }
            }, 200)

            return () => {
               isMounted = false;
               clearTimeout(timer);
            }
         } catch (error) {
            console.warn("Animation übersprungen: Element nicht bereit.", error);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectedCurrency1])

   const bgColorD = "#0B0C10"
   const fontColorD = "#D3D9D4"
   const secondaryColorD = "#00ffee"

   const bgColor = "#f0f1f5"
   const fontColor = "#262c27"
   const secondaryColor = "#007a5e"

   let rangeVal = 0.1
   let steps = 11.5

   let gridColor
   let graph
   let toolTipBG
   let toolTipFontColor
   let legend
   let stroke
   let radius

   let fullCurrencyName1 = getFullCurrencyName(selectedCurrency1)
   let fullCurrencyName2 = getFullCurrencyName(selectedCurrency2)
   let title1
   let title2

   if (windowWidth > 1200) {
      title1 = fullCurrencyName1
      title2 = fullCurrencyName2
      stroke = 4.8
      radius = 3
   } else {
      title1 = selectedCurrency1
      title2 = selectedCurrency2
      stroke = 2.6
      radius = 1.8
   }

   if (isDarkMode) {
      gridColor = "rgba(255,255,255,0.18)"
      graph = secondaryColorD
      toolTipBG = bgColorD
      toolTipFontColor = secondaryColorD
      legend = fontColorD

   } else {
      gridColor = "rgba(0,0,0,0.25)"
      graph = secondaryColor
      toolTipBG = bgColor
      toolTipFontColor = secondaryColor
      legend = fontColor
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
         }
      ],
   };

   const calculateStepSizeInPercentage = (lowest, highest) => {
      const range = highest - lowest;
      rangeVal = range * (1 / steps)
      return rangeVal
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
            borderColor: 'rgba(211,217,212, 1)',
            borderWidth: 1,
            titleFont: {
               size: 16,
               weight: '400',
               family: 'Arial',
            },
            bodyFont: {
               size: 16,
               weight: 'bold',
               family: 'Arial',
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
               }
            }
         },
         x: {
            grid: {
               color: gridColor,
               lineWidth: 1,
            },
            ticks: {
               color: legend
            }
         },
      },
   }

   return (
      <>
         {selectedCurrency1 != selectedCurrency2 &&
            <>
               <h3 className="graph-header">
                  1 <span className="full-currency-name">{title1}</span> in <span className="full-currency-name" id="full-currency-name-blue">{title2}</span>
               </h3>

            </>}
         <motion.div
            animate={controls}
            className="diagram">
            {selectedCurrency1 == selectedCurrency2
               ?
               <div className="same">
                  <span>Wähle zwei unterschiedliche Währungen!</span>
               </div>
               :
               <Line
                  data={combinedData}
                  options={options}
               />
            }
         </motion.div>
      </>
   );
}