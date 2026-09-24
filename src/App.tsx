import { useEffect, useState } from "react";
import { lireConfig } from "./config";
import { useCompteARebours } from "./useCompteARebours";
import Haricot from "./components/Haricot";
import Tuile from "./components/Tuile";
import Confettis from "./components/Confettis";

const FORMAT_DATE = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
});

const HARICOTS = [
  { couleur: "#6cc24a", position: "left-[6%] top-[8%]", rotation: "-20deg", delai: "0s" },
  { couleur: "#a58bff", position: "right-[8%] top-[14%]", rotation: "25deg", delai: "-1.5s" },
  { couleur: "#ffd23f", position: "left-[10%] bottom-[10%]", rotation: "160deg", delai: "-2.7s" },
  { couleur: "#ff2e88", position: "right-[5%] bottom-[6%]", rotation: "-150deg", delai: "-0.8s" },
];

export default function App() {
  const [config] = useState(lireConfig);
  const { jours, heures, minutes, secondes, fini } = useCompteARebours(config.fin);

  useEffect(() => {
    const p = (n: number) => String(n).padStart(2, "0");
    document.title = fini
      ? "C'est fini ! | La fin des haricots"
      : `${jours}j ${p(heures)}:${p(minutes)}:${p(secondes)} | La fin des haricots`;
  }, [fini, jours, heures, minutes, secondes]);

  const pour = config.pour ? ` pour ${config.pour}` : "";

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-24 [@media(max-height:500px)]:py-8">
      {fini && <Confettis />}

      {HARICOTS.map(({ couleur, position, rotation, delai }) => (
        <Haricot
          key={couleur}
          couleur={couleur}
          humeur={fini ? "content" : "inquiet"}
          className={`animate-flotte pointer-events-none absolute w-16 sm:w-24 md:w-28 [@media(max-height:500px)]:w-14 ${position}`}
          style={{ "--r": rotation, animationDelay: delai } as React.CSSProperties}
        />
      ))}

      <main className="relative flex w-full max-w-4xl flex-col items-center gap-8 text-center">
        <p className="text-lg font-semibold sm:text-xl">
          {fini ? `C'est fini, les haricots sont cuits. Liberté${pour}.` : `${FORMAT_DATE.format(config.fin)}${pour}`}
        </p>

        <section className="grid w-full grid-cols-2 gap-4 sm:gap-6 landscape:grid-cols-4 md:grid-cols-4" aria-label="Temps restant">
          <Tuile valeur={jours} unite="jours" fond="bg-rose" inclinaison="-rotate-2" />
          <Tuile valeur={heures} unite="heures" fond="bg-citron" inclinaison="rotate-1" />
          <Tuile valeur={minutes} unite="minutes" fond="bg-haricot" inclinaison="-rotate-1" />
          <Tuile valeur={secondes} unite="secondes" fond="bg-lilas" inclinaison="rotate-2" />
        </section>
      </main>
    </div>
  );
}
