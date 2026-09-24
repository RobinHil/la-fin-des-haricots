type Props = {
  className?: string;
  couleur?: string;
  humeur?: "inquiet" | "content";
  style?: React.CSSProperties;
};

export default function Haricot({ className, couleur = "#6cc24a", humeur = "inquiet", style }: Props) {
  return (
    <svg viewBox="0 0 100 62" className={className} style={style} aria-hidden="true">
      <path
        d="M12 34 C6 16 26 4 44 10 C52 13 56 11 64 7 C82 0 98 16 90 36 C82 56 52 58 34 54 C22 51 15 44 12 34 Z"
        fill={couleur}
        stroke="#17131a"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <ellipse cx="28" cy="22" rx="7" ry="3.5" fill="#fff" opacity="0.6" transform="rotate(-25 28 22)" />
      <circle cx="42" cy="31" r="3.6" fill="#17131a" />
      <circle cx="62" cy="29" r="3.6" fill="#17131a" />
      {humeur === "content" ? (
        <path d="M44 40 Q53 50 62 39" fill="none" stroke="#17131a" strokeWidth="3.5" strokeLinecap="round" />
      ) : (
        <path d="M45 44 Q49 40 53 44 Q57 48 61 43" fill="none" stroke="#17131a" strokeWidth="3" strokeLinecap="round" />
      )}
      {humeur === "content" && (
        <>
          <ellipse cx="36" cy="40" rx="4" ry="2.5" fill="#ff2e88" opacity="0.6" />
          <ellipse cx="70" cy="37" rx="4" ry="2.5" fill="#ff2e88" opacity="0.6" />
        </>
      )}
    </svg>
  );
}
