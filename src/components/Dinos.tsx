import { useId } from "react";

export type Humeur = "inquiet" | "content";

type Props = {
  humeur?: Humeur;
  className?: string;
};

const ENCRE = "#17131a";
const JOUE = "#ff6aab";
const GRIFFE = "#fff8ea";

const trait = {
  stroke: ENCRE,
  strokeWidth: 4.5,
  strokeLinejoin: "round",
  strokeLinecap: "round",
} as const;

function Forme({ d, peau, ombre, dx = -3, dy = -6 }: { d: string; peau: string; ombre: string; dx?: number; dy?: number }) {
  const id = useId();
  return (
    <g>
      <clipPath id={id}>
        <path d={d} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <path d={d} fill={ombre} />
        <path d={d} fill={peau} transform={`translate(${dx} ${dy})`} />
      </g>
      <path d={d} fill="none" {...trait} />
    </g>
  );
}

function Oeil({ x, y, r = 5 }: { x: number; y: number; r?: number }) {
  return (
    <g stroke="none">
      <circle cx={x} cy={y} r={r} fill={ENCRE} />
      <circle cx={x + r * 0.35} cy={y - r * 0.4} r={r * 0.38} fill="#fff" />
      <circle cx={x - r * 0.4} cy={y + r * 0.35} r={r * 0.16} fill="#fff" />
    </g>
  );
}

function Sourcil({ x, y, humeur }: { x: number; y: number; humeur: Humeur }) {
  if (humeur === "content") return null;
  return <path d={`M${x - 4} ${y + 1} L${x + 4} ${y - 2}`} fill="none" {...trait} strokeWidth={3} />;
}

function Bouche({ x, y, humeur, l = 6 }: { x: number; y: number; humeur: Humeur; l?: number }) {
  const d =
    humeur === "content"
      ? `M${x - l} ${y} Q${x} ${y + l} ${x + l} ${y}`
      : `M${x - l} ${y + 1} Q${x - l / 2} ${y - 2} ${x} ${y + 1} Q${x + l / 2} ${y + 4} ${x + l} ${y}`;
  return <path d={d} fill="none" {...trait} strokeWidth={3.2} />;
}

function Joue({ x, y, humeur }: { x: number; y: number; humeur: Humeur }) {
  return <ellipse cx={x} cy={y} rx={5} ry={3} fill={JOUE} opacity={humeur === "content" ? 0.75 : 0.35} />;
}

function Reflet({ x, y, rx = 7, angle = -20 }: { x: number; y: number; rx?: number; angle?: number }) {
  return (
    <ellipse
      cx={x}
      cy={y}
      rx={rx}
      ry={rx / 2.2}
      fill="#fff"
      opacity={0.6}
      transform={`rotate(${angle} ${x} ${y})`}
    />
  );
}

function Patte({ x, y, l = 14, h = 16, couleur }: { x: number; y: number; l?: number; h?: number; couleur: string }) {
  return (
    <g>
      <rect x={x} y={y} width={l} height={h} rx={l / 2.4} fill={couleur} {...trait} />
      {[0.27, 0.5, 0.73].map((k) => (
        <ellipse
          key={k}
          cx={x + l * k}
          cy={y + h - 2.5}
          rx={1.9}
          ry={1.6}
          fill={GRIFFE}
          stroke={ENCRE}
          strokeWidth={1.2}
        />
      ))}
    </g>
  );
}

function Taches({ points, couleur }: { points: [number, number, number][]; couleur: string }) {
  return (
    <g stroke="none">
      {points.map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={couleur} />
      ))}
    </g>
  );
}

export function TRex({ humeur = "inquiet", className }: Props) {
  const peau = "#6ee0b0";
  const ombre = "#45c190";
  const fonce = "#2fa577";
  return (
    <svg viewBox="0 0 124 100" className={className} aria-hidden="true">
      <Patte x={42} y={74} couleur={ombre} />
      {[
        [16, 67, 2.6],
        [26, 62, 3.2],
        [37, 55, 3.8],
        [49, 47, 4.2],
        [61, 43, 4.2],
      ].map(([x, y, r]) => (
        <circle key={x} cx={x} cy={y} r={r} fill={fonce} {...trait} strokeWidth={3} />
      ))}
      <Forme
        d="M6 70 Q26 70 36 58 C44 44 66 40 78 50 C88 58 88 80 74 86 C60 92 42 88 32 82 Q18 76 6 70 Z"
        peau={peau}
        ombre={ombre}
      />
      <ellipse cx={67} cy={70} rx={10} ry={13} fill="#d4f9e8" />
      <path d="M59 64 Q67 66 75 64 M58 70 Q67 72 76 70 M59 76 Q67 78 75 76" fill="none" stroke="#9fe3c4" strokeWidth={2} strokeLinecap="round" />
      <Taches points={[[40, 64, 3], [48, 58, 2.2], [30, 70, 2], [52, 68, 1.8]]} couleur={ombre} />
      <Reflet x={52} y={52} rx={7} angle={-30} />
      <Patte x={60} y={78} couleur={peau} />
      <path d="M80 60 Q88 62 90 56" fill="none" {...trait} strokeWidth={5} />
      <path d="M90 56 l3 -2 M90 56 l3 1" fill="none" {...trait} strokeWidth={2} />
      <Forme
        d="M60 30 C58 12 74 3 92 4 C110 5 120 16 118 30 C116 42 104 48 90 48 C74 48 62 42 60 30 Z"
        peau={peau}
        ombre={ombre}
      />
      <Taches points={[[70, 26, 2.4], [76, 34, 1.8], [66, 34, 1.5]]} couleur={ombre} />
      <Reflet x={74} y={13} rx={8} angle={-25} />
      <Sourcil x={96} y={12} humeur={humeur} />
      <Oeil x={96} y={22} r={6} />
      <circle cx={111} cy={15} r={1.6} fill={ENCRE} />
      <circle cx={115} cy={17} r={1.4} fill={ENCRE} />
      <Joue x={86} y={34} humeur={humeur} />
      <Bouche x={104} y={36} humeur={humeur} l={7} />
      <path d="M99 38.5 l1.8 3.6 l1.8 -3.2 Z M106 38.5 l1.8 3.4 l1.6 -3.6 Z" fill="#fff" stroke={ENCRE} strokeWidth={1.3} strokeLinejoin="round" />
    </svg>
  );
}

export function Triceratops({ humeur = "inquiet", className }: Props) {
  const peau = "#ffb45e";
  const ombre = "#f0963a";
  const collerette = "#ff7a59";
  const corne = "#fff1d6";
  return (
    <svg viewBox="0 0 124 100" className={className} aria-hidden="true">
      <Patte x={30} y={74} couleur={ombre} />
      <Patte x={62} y={74} couleur={ombre} />
      <Forme
        d="M6 66 Q20 66 28 56 C38 40 68 38 80 52 C88 62 86 80 72 84 L34 84 C22 82 14 76 6 66 Z"
        peau={peau}
        ombre={ombre}
      />
      <path d="M32 62 Q36 56 42 58 M46 54 Q50 48 56 50 M60 52 Q64 47 70 50" fill="none" stroke={ombre} strokeWidth={2.5} strokeLinecap="round" />
      <Reflet x={44} y={50} rx={9} />
      <Patte x={40} y={76} couleur={peau} />
      <Patte x={72} y={76} couleur={peau} />
      {[
        [67, 49],
        [65, 38],
        [69, 27],
        [78, 19],
        [90, 15],
        [102, 19],
        [109, 28],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={4.5} fill="#ef5f3f" {...trait} strokeWidth={3.5} />
      ))}
      <Forme d="M70 58 C62 44 66 22 80 16 C94 10 108 18 110 30 C104 34 94 40 86 56 Z" peau={collerette} ombre="#ef5f3f" dx={2} dy={-4} />
      <path d="M78 50 C72 40 74 28 83 24 C92 20 100 24 103 30 C97 35 91 41 86 50 Z" fill="#ff9a7a" />
      <Taches points={[[81, 29, 3], [91, 24, 3], [77, 40, 2.6], [96, 31, 2]]} couleur="#ffd23f" />
      <path d="M92 36 L94 14 L102 34 Z" fill={corne} {...trait} strokeWidth={3.5} />
      <path d="M104 38 L112 20 L114 40 Z" fill={corne} {...trait} strokeWidth={3.5} />
      <path d="M95 30 L95.5 20 M109 34 L111 25" stroke="#e8cfa4" strokeWidth={2} strokeLinecap="round" />
      <Forme
        d="M80 54 C76 40 88 32 100 34 C112 36 122 46 118 58 C114 68 96 70 86 64 C82 62 80 58 80 54 Z"
        peau={peau}
        ombre={ombre}
      />
      <path d="M114 46 L122 40 L120 52 Z" fill={corne} {...trait} strokeWidth={3} />
      <path d="M113 56 Q119 55 118 60 Q114 64 110 61" fill="#e8843a" stroke="none" />
      <circle cx={115} cy={52} r={1.4} fill={ENCRE} />
      <Reflet x={88} y={42} rx={5} angle={-35} />
      <Sourcil x={97} y={38} humeur={humeur} />
      <Oeil x={98} y={47} r={5.5} />
      <Joue x={92} y={58} humeur={humeur} />
      <Bouche x={106} y={59} humeur={humeur} l={5} />
    </svg>
  );
}

export function Stegosaure({ humeur = "inquiet", className }: Props) {
  const peau = "#b8a4ff";
  const ombre = "#9a84ea";
  const plaque = "#ffd23f";
  const plaqueEn = (x: number, y: number, t = 1) =>
    `M${x - 7 * t} ${y + 10 * t} Q${x - 9 * t} ${y - 6 * t} ${x} ${y - 13 * t} Q${x + 9 * t} ${y - 6 * t} ${x + 7 * t} ${y + 10 * t} Z`;
  return (
    <svg viewBox="0 0 124 96" className={className} aria-hidden="true">
      <path d="M16 57 L3 46 L20 53 Z M14 63 L0 64 L15 67 Z" fill={GRIFFE} {...trait} strokeWidth={3.5} />
      {[
        [30, 46, 0.8],
        [46, 36, 1],
        [63, 34, 1.05],
        [79, 42, 0.85],
      ].map(([x, y, t]) => (
        <g key={x}>
          <path d={plaqueEn(x, y, t)} fill={plaque} {...trait} strokeWidth={4} />
          <path d={plaqueEn(x, y + 2 * t, t * 0.5)} fill="#ffe98f" />
        </g>
      ))}
      <Patte x={30} y={72} couleur={ombre} />
      <Patte x={70} y={72} couleur={ombre} />
      <Forme
        d="M10 60 C20 58 26 44 50 42 C74 40 88 50 92 60 C94 68 90 76 82 80 L36 80 C24 78 16 70 10 60 Z"
        peau={peau}
        ombre={ombre}
      />
      <Taches points={[[34, 60, 3], [46, 56, 3.4], [59, 55, 3.4], [72, 58, 3], [82, 63, 2.4]]} couleur="#a58ef5" />
      <path d="M34 72 Q56 78 80 72" fill="none" stroke="#8a72dc" strokeWidth={2.5} strokeLinecap="round" />
      <Reflet x={52} y={48} rx={9} />
      <Patte x={40} y={74} couleur={peau} />
      <Patte x={78} y={74} couleur={peau} />
      <Forme
        d="M86 62 C84 48 100 42 110 48 C120 54 120 68 108 72 C98 76 88 72 86 62 Z"
        peau={peau}
        ombre={ombre}
      />
      <circle cx={116} cy={59} r={1.3} fill={ENCRE} />
      <Sourcil x={104} y={48} humeur={humeur} />
      <Oeil x={104} y={57} r={5} />
      <Joue x={96} y={66} humeur={humeur} />
      <Bouche x={110} y={66} humeur={humeur} l={4.5} />
    </svg>
  );
}

export function Brachiosaure({ humeur = "inquiet", className }: Props) {
  const peau = "#7fd6ff";
  const ombre = "#5ec0f0";
  const tache = "#3fa6dc";
  return (
    <svg viewBox="0 0 110 124" className={className} aria-hidden="true">
      <Patte x={26} y={100} h={20} couleur={ombre} />
      <Patte x={62} y={100} h={20} couleur={ombre} />
      <Forme
        d="M4 98 Q18 96 24 86 C32 74 56 72 72 80 C84 86 86 102 74 108 L30 108 C18 106 10 102 4 98 Z"
        peau={peau}
        ombre={ombre}
      />
      <path d="M36 104 Q52 108 68 104" fill="none" stroke="#c9eeff" strokeWidth={5} strokeLinecap="round" />
      <Forme d="M58 80 C60 58 64 40 70 28 L84 32 C80 46 76 62 76 86 Z" peau={peau} ombre={ombre} dx={-4} dy={0} />
      <path d="M72 76 C73 62 75 48 79 36" fill="none" stroke="#c9eeff" strokeWidth={4} strokeLinecap="round" />
      <Taches
        points={[
          [44, 86, 3.5],
          [55, 92, 2.6],
          [34, 93, 2.6],
          [24, 96, 1.8],
          [50, 80, 2],
          [66, 58, 2.4],
          [69, 45, 2],
          [64, 70, 1.8],
        ]}
        couleur={tache}
      />
      <Reflet x={40} y={79} rx={8} />
      <Patte x={38} y={102} h={18} couleur={peau} />
      <Patte x={72} y={100} h={20} couleur={peau} />
      <Forme
        d="M64 26 C62 12 76 4 90 6 C104 8 108 22 100 30 C94 36 76 38 68 34 C66 32 64 30 64 26 Z"
        peau={peau}
        ombre={ombre}
      />
      <Taches points={[[72, 14, 2], [70, 24, 1.6]]} couleur={tache} />
      <Reflet x={77} y={11} rx={6} angle={-15} />
      <Sourcil x={86} y={11} humeur={humeur} />
      <Oeil x={86} y={20} r={5} />
      <circle cx={100} cy={15} r={1.5} fill={ENCRE} />
      <circle cx={103} cy={18} r={1.3} fill={ENCRE} />
      <Joue x={78} y={29} humeur={humeur} />
      <Bouche x={94} y={28} humeur={humeur} l={4.5} />
    </svg>
  );
}

export function Pterodactyle({ humeur = "inquiet", className }: Props) {
  const peau = "#ff8fc0";
  const ombre = "#f36ea8";
  const aile = "#ffc2dc";
  const aileOmbre = "#ffa8cc";
  const nervure = { fill: "none", stroke: "#f59cc4", strokeWidth: 1.8, strokeLinecap: "round" } as const;
  return (
    <svg viewBox="0 0 124 88" className={className} aria-hidden="true">
      <Forme d="M54 42 Q32 12 4 22 Q14 30 14 40 Q24 36 30 46 Q40 40 52 52 Z" peau={aile} ombre={aileOmbre} dx={0} dy={-5} />
      <path d="M50 44 Q34 32 16 29 M50 47 Q40 42 28 42" {...nervure} />
      <path d="M8 21 L4 16 L12 20" fill={GRIFFE} {...trait} strokeWidth={2.5} />
      <Forme d="M70 42 Q92 12 120 22 Q110 30 110 40 Q100 36 94 46 Q84 40 72 52 Z" peau={aile} ombre={aileOmbre} dx={0} dy={-5} />
      <path d="M74 44 Q90 32 108 29 M74 47 Q84 42 96 42" {...nervure} />
      <path d="M116 21 L120 16 L112 20" fill={GRIFFE} {...trait} strokeWidth={2.5} />
      <path d="M56 70 v8 l-3 4 M56 78 l3 4 M68 70 v8 l-3 4 M68 78 l3 4" fill="none" {...trait} strokeWidth={3.5} />
      <Forme d="M49 54 A13 17 0 1 0 75 54 A13 17 0 1 0 49 54 Z" peau={peau} ombre={ombre} />
      <ellipse cx={62} cy={58} rx={7} ry={9} fill="#ffe0ee" />
      <path d="M57 54 Q62 56 67 54 M56 59 Q62 61 68 59 M57 64 Q62 66 67 64" fill="none" stroke="#ffbcd8" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M56 16 L34 8 L54 26 Z" fill={ombre} {...trait} strokeWidth={4} />
      <path d="M52 16 L40 11 L51 21 Z" fill="#ffd23f" />
      <path d="M70 22 Q88 22 96 30 Q86 36 70 34 Z" fill="#ffd23f" {...trait} strokeWidth={4} />
      <path d="M72 29 Q84 29 92 30" fill="none" stroke="#e8b400" strokeWidth={1.8} strokeLinecap="round" />
      <circle cx={84} cy={25} r={1.2} fill={ENCRE} />
      <Forme d="M49 26 A13 13 0 1 0 75 26 A13 13 0 1 0 49 26 Z" peau={peau} ombre={ombre} dx={-2} dy={-4} />
      <Reflet x={56} y={18} rx={5} angle={-30} />
      <Sourcil x={65} y={17} humeur={humeur} />
      <Oeil x={65} y={25} r={4.5} />
      <Joue x={57} y={32} humeur={humeur} />
      <path
        d={humeur === "content" ? "M74 31 Q82 35 90 31" : "M74 31.5 Q82 30 90 32"}
        fill="none"
        {...trait}
        strokeWidth={2.5}
      />
    </svg>
  );
}

export function BebeOeuf({ humeur = "inquiet", className }: Props) {
  const peau = "#9be870";
  const ombre = "#7dd154";
  const coquille = "#fff1d6";
  const coquilleOmbre = "#f1d9ad";
  return (
    <svg viewBox="0 0 84 96" className={className} aria-hidden="true">
      <Forme d="M20 40 A22 22 0 1 0 64 40 A22 22 0 1 0 20 40 Z" peau={peau} ombre={ombre} />
      <Taches points={[[24, 44, 2.2], [60, 44, 2.2], [28, 52, 1.6], [57, 52, 1.6]]} couleur={ombre} />
      <Forme
        d="M22 26 C20 8 64 8 62 26 L56 21 L49 29 L42 21 L35 29 L28 21 Z"
        peau={coquille}
        ombre={coquilleOmbre}
        dx={0}
        dy={-3}
      />
      <Taches points={[[36, 14, 2.5], [50, 13, 2]]} couleur="#ffd23f" />
      <Oeil x={34} y={34} r={5} />
      <Oeil x={51} y={34} r={5} />
      <Joue x={26} y={42} humeur={humeur} />
      <Joue x={59} y={42} humeur={humeur} />
      <Bouche x={42.5} y={42} humeur={humeur} l={4} />
      <Forme
        d="M10 56 L18 50 L26 58 L34 50 L42 58 L50 50 L58 58 L66 50 L74 56 C78 78 64 92 42 92 C20 92 6 78 10 56 Z"
        peau={coquille}
        ombre={coquilleOmbre}
      />
      <circle cx={19} cy={55} r={5} fill={peau} {...trait} strokeWidth={3.5} />
      <circle cx={65} cy={55} r={5} fill={peau} {...trait} strokeWidth={3.5} />
      <path d="M17 52.5 v3 M21 52.5 v3 M63 52.5 v3 M67 52.5 v3" stroke={ENCRE} strokeWidth={1.4} strokeLinecap="round" />
      <path d="M60 64 l-5 6 l4 5 l-4 6" fill="none" stroke={ENCRE} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      <Taches points={[[28, 74, 4], [52, 82, 3], [62, 66, 2.5], [36, 64, 2]]} couleur="#ffd23f" />
      <Reflet x={20} y={68} rx={5} angle={-60} />
    </svg>
  );
}
