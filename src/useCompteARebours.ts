import { useEffect, useState } from "react";

export function useCompteARebours(fin: Date) {
  const [maintenant, setMaintenant] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setMaintenant(Date.now()), 250);
    return () => clearInterval(id);
  }, []);

  const restant = Math.max(0, Math.floor((fin.getTime() - maintenant) / 1000));

  return {
    maintenant,
    restant,
    jours: Math.floor(restant / 86400),
    heures: Math.floor((restant % 86400) / 3600),
    minutes: Math.floor((restant % 3600) / 60),
    secondes: restant % 60,
    fini: restant === 0,
  };
}
