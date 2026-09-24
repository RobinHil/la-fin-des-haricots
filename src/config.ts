export const FIN_PAR_DEFAUT = new Date("2026-09-28T18:00:00+02:00");

export type Config = {
  fin: Date;
  pour: string;
};

function lireDate(valeur: string | null): Date | null {
  if (!valeur) return null;
  const date = new Date(valeur);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function lireConfig(): Config {
  const params = new URLSearchParams(window.location.search);
  return {
    fin: lireDate(params.get("fin")) ?? FIN_PAR_DEFAUT,
    pour: params.get("pour")?.trim() ?? "",
  };
}
