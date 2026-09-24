import { useMemo } from "react";
import Haricot from "./Haricot";

const COULEURS = ["#ff2e88", "#ffd23f", "#6cc24a", "#a58bff"];

export default function Confettis() {
  const morceaux = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        gauche: Math.random() * 100,
        delai: Math.random() * -8,
        duree: 4 + Math.random() * 5,
        taille: 10 + Math.random() * 22,
        couleur: COULEURS[(i % 4 === 0 ? i / 4 : i) % COULEURS.length],
        haricot: i % 4 === 0,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {morceaux.map((m, i) => (
        <div
          key={i}
          className="confetti absolute top-0"
          style={
            {
              left: `${m.gauche}%`,
              "--delai": `${m.delai}s`,
              "--duree": `${m.duree}s`,
            } as React.CSSProperties
          }
        >
          {m.haricot ? (
            <Haricot humeur="content" couleur={m.couleur} style={{ width: m.taille * 2 }} />
          ) : (
            <div
              className="border-2 border-encre"
              style={{ width: m.taille, height: m.taille * 0.5, background: m.couleur }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
