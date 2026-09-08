import MoonFullIcon from "../assets/MoonFullIcon"
import MoonLineIcon from "../assets/MoonLineIcon"
import SunFullIcon from "../assets/SunFullIcon"
import SunLineIcon from "../assets/SunLineIcon"

export default function DarkmodeToggle({ switchMode, isDarkMode }) {
   return (
      <button
         onClick={switchMode}
         className="darkmode-btn"
         aria-label={isDarkMode ? "In den hellen Modus wechseln" : "In den dunklen Modus wechseln"}
      >
         {isDarkMode ? (
            <>
               <span className="icon-default"><SunLineIcon /></span>
               <span className="icon-hover"><SunFullIcon /></span>
            </>
         ) : (
            <>
               <span className="icon-default"><MoonLineIcon /></span>
               <span className="icon-hover"><MoonFullIcon /></span>
            </>
         )}
      </button>
   )
}