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
    place: "left-[5%] top-[3%]",
    taille: "w-11 sm:w-14 md:w-16 [@media(max-height:500px)]:w-10",
    rotation: "-20deg",
    delai: "0s",
  },
  {
    rendu: (h) => <Pterodactyle humeur={h} className="w-full" />,
    place: "left-1/2 -translate-x-1/2 top-[2%]",
    taille: "w-24 sm:w-32 md:w-36 xl:w-52 [@media(max-height:500px)]:w-20",
    rotation: "-4deg",
    delai: "-1s",
  },
  {
    rendu: (h) => <Haricot humeur={h} couleur="#a58bff" className="w-full" />,
    place: "right-[5%] top-[5%]",
    taille: "w-11 sm:w-14 md:w-16 [@media(max-height:500px)]:w-10",
    rotation: "25deg",
    delai: "-1.5s",
  },
  {
    rendu: (h) => <Brachiosaure humeur={h} className="w-full" />,
    place: "left-[10%] top-[14%] xl:left-[6%] xl:top-[11%]",
    taille: "w-20 sm:w-24 md:w-28 xl:w-44 [@media(max-height:760px)]:hidden",
    rotation: "3deg",
    delai: "-2.2s",
  },
  {
    rendu: (h) => <TRex humeur={h} className="w-full" />,
    place: "right-[10%] top-[16%] xl:right-[6%] xl:top-[13%]",
    taille: "w-24 sm:w-28 md:w-32 xl:w-48 [@media(max-height:760px)]:hidden",
    rotation: "-5deg",
    delai: "-0.6s",
  },
  {
    rendu: (h) => <Triceratops humeur={h} className="w-full" />,
    place: "left-[7%] bottom-[16%] xl:left-[4%] xl:bottom-[11%]",
    taille: "w-24 sm:w-28 md:w-32 xl:w-48 [@media(max-height:760px)]:hidden",
    rotation: "4deg",
    delai: "-3.1s",
  },
  {
    rendu: (h) => <Stegosaure humeur={h} className="w-full" />,
    place: "right-[7%] bottom-[17%] xl:right-[4%] xl:bottom-[12%]",
    taille: "w-24 sm:w-28 md:w-32 xl:w-48 [@media(max-height:760px)]:hidden",
    rotation: "-4deg",
    delai: "-1.8s",
  },
  {
    rendu: (h) => <Haricot humeur={h} couleur="#ffd23f" className="w-full" />,
    place: "left-[6%] bottom-[4%]",
    taille: "w-11 sm:w-14 md:w-16 [@media(max-height:500px)]:w-10",
    rotation: "160deg",
    delai: "-2.7s",
  },
  {
    rendu: (h) => <BebeOeuf humeur={h} className="w-full" />,
    place: "left-1/2 -translate-x-1/2 bottom-[3%]",
    taille: "w-16 sm:w-20 md:w-24 xl:w-32 [@media(max-height:500px)]:w-14",
    rotation: "-6deg",
    delai: "-0.3s",
  },
  {
    rendu: (h) => <Haricot humeur={h} couleur="#ff2e88" className="w-full" />,
    place: "right-[6%] bottom-[5%]",
    taille: "w-11 sm:w-14 md:w-16 [@media(max-height:500px)]:w-10",
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
    <div className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-24 [@media(max-height:500px)]:py-8">
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
