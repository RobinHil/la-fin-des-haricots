import { useEffect, useState } from "react";
import { lireConfig } from "./config";
import { useCompteARebours } from "./useCompteARebours";
import Haricot from "./components/Haricot";
import { BebeOeuf, Brachiosaure, Pterodactyle, Stegosaure, Triceratops, TRex, type Humeur } from "./components/Dinos";
import Tuile from "./components/Tuile";
import Confettis from "./components/Confettis";

const FORMAT_DATE = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
});

const DECOR: {
  rendu: (humeur: Humeur) => React.ReactNode;
  place: string;
  taille: string;
  rotation: string;
  delai: string;
}[] = [
  {
    rendu: (h) => <Haricot humeur={h} couleur="#6cc24a" className="w-full" />,
    place: "left-[4%] top-[calc(var(--d)*0.15)] grand:left-[5%] grand:top-[3%]",
    taille: "w-[calc(var(--d)*0.55)] grand:w-16",
    rotation: "-20deg",
    delai: "0s",
  },
  {
    rendu: (h) => <Pterodactyle humeur={h} className="w-full" />,
    place: "left-1/2 -translate-x-1/2 top-[calc(var(--d)*0.15)] grand:top-[2%]",
    taille: "w-[calc(var(--d)*1.3)] grand:w-52",
    rotation: "-4deg",
    delai: "-1s",
  },
  {
    rendu: (h) => <Haricot humeur={h} couleur="#a58bff" className="w-full" />,
    place: "right-[4%] top-[calc(var(--d)*0.35)] grand:right-[5%] grand:top-[5%]",
    taille: "w-[calc(var(--d)*0.55)] grand:w-16",
    rotation: "25deg",
    delai: "-1.5s",
  },
  {
    rendu: (h) => <Brachiosaure humeur={h} className="w-full" />,
    place: "left-[27%] -translate-x-1/2 top-[calc(var(--d)*0.15)] grand:left-[6%] grand:top-[11%] grand:translate-x-0 paysage:left-[2%] paysage:top-[14%] paysage:translate-x-0",
    taille: "w-[var(--d)] grand:w-44 paysage:w-[min(12vw,28dvh)]",
    rotation: "3deg",
    delai: "-2.2s",
  },
  {
    rendu: (h) => <TRex humeur={h} className="w-full" />,
    place: "right-[27%] translate-x-1/2 top-[calc(var(--d)*0.3)] grand:right-[6%] grand:top-[13%] grand:translate-x-0 paysage:right-[2%] paysage:top-[18%] paysage:translate-x-0",
    taille: "w-[calc(var(--d)*1.05)] grand:w-48 paysage:w-[min(12vw,28dvh)]",
    rotation: "-5deg",
    delai: "-0.6s",
  },
  {
    rendu: (h) => <Triceratops humeur={h} className="w-full" />,
    place: "left-[27%] -translate-x-1/2 bottom-[calc(var(--d)*0.3)] grand:left-[4%] grand:bottom-[11%] grand:translate-x-0 paysage:left-[2%] paysage:bottom-[14%] paysage:translate-x-0",
    taille: "w-[calc(var(--d)*1.1)] grand:w-48 paysage:w-[min(12vw,28dvh)]",
    rotation: "4deg",
    delai: "-3.1s",
  },
  {
    rendu: (h) => <Stegosaure humeur={h} className="w-full" />,
    place: "right-[27%] translate-x-1/2 bottom-[calc(var(--d)*0.2)] grand:right-[4%] grand:bottom-[12%] grand:translate-x-0 paysage:right-[2%] paysage:bottom-[14%] paysage:translate-x-0",
    taille: "w-[calc(var(--d)*1.1)] grand:w-48 paysage:w-[min(12vw,28dvh)]",
    rotation: "-4deg",
    delai: "-1.8s",
  },
  {
    rendu: (h) => <Haricot humeur={h} couleur="#ffd23f" className="w-full" />,
    place: "left-[4%] bottom-[calc(var(--d)*0.1)] grand:left-[6%] grand:bottom-[4%]",
    taille: "w-[calc(var(--d)*0.55)] grand:w-16",
    rotation: "160deg",
    delai: "-2.7s",
  },
  {
    rendu: (h) => <BebeOeuf humeur={h} className="w-full" />,
    place: "left-1/2 -translate-x-1/2 bottom-[calc(var(--d)*0.1)] grand:bottom-[3%]",
    taille: "w-[calc(var(--d)*0.75)] grand:w-32",
    rotation: "-6deg",
    delai: "-0.3s",
  },
  {
    rendu: (h) => <Haricot humeur={h} couleur="#ff2e88" className="w-full" />,
    place: "right-[4%] bottom-[calc(var(--d)*0.25)] grand:right-[6%] grand:bottom-[5%]",
    taille: "w-[calc(var(--d)*0.55)] grand:w-16",
    rotation: "-150deg",
    delai: "-0.8s",
  },
];

export default function App() {
  const [config] = useState(lireConfig);
  const { jours, heures, minutes, secondes, fini } = useCompteARebours(config.fin);
  const humeur: Humeur = fini ? "content" : "inquiet";

  useEffect(() => {
    const p = (n: number) => String(n).padStart(2, "0");
    document.title = fini
      ? "C'est fini ! | La fin des haricots"
      : `${jours}j ${p(heures)}:${p(minutes)}:${p(secondes)} | La fin des haricots`;
  }, [fini, jours, heures, minutes, secondes]);

  const pour = config.pour ? ` pour ${config.pour}` : "";

  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden px-4 py-[calc(var(--d)*1.3+1rem)] [--d:min(19vw,13dvh,9rem)] grand:py-24 [@media(max-height:480px)]:[--d:min(19vw,11dvh)]">
      {fini && <Confettis />}

      {DECOR.map(({ rendu, place, taille, rotation, delai }, i) => (
        <div
          key={i}
          className={`animate-flotte pointer-events-none absolute ${place} ${taille}`}
          style={{ "--r": rotation, animationDelay: delai } as React.CSSProperties}
        >
          {rendu(humeur)}
        </div>
      ))}

      <main className="relative flex w-full max-w-4xl flex-col items-center gap-8 text-center [@media(max-height:620px)]:gap-4 paysage:max-w-[min(36rem,68vw)]">
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
