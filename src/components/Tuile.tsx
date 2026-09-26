type Props = {
  valeur: number;
  unite: string;
  fond: string;
  inclinaison: string;
};

export default function Tuile({ valeur, unite, fond, inclinaison }: Props) {
  return (
    <div
      className={`${fond} ${inclinaison} flex flex-col items-center rounded-2xl border-4 border-encre px-2 pb-4 pt-5 shadow-brut`}
    >
      <span className="block h-[1.1em] overflow-hidden font-titre text-6xl leading-none sm:text-7xl md:text-8xl [@media(max-height:620px)]:text-5xl">
        <span key={valeur} className="inline-block animate-pop">
          {String(valeur).padStart(2, "0")}
        </span>
      </span>
      <span className="mt-2 text-sm font-bold uppercase tracking-widest sm:text-base paysage:text-xs">{unite}</span>
    </div>
  );
}
