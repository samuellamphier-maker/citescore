import { scoreTone } from "@/lib/sample-report";

export function ScoreRing({
  score,
  size = 148,
  label = "CiteScore",
}: {
  score: number;
  size?: number;
  label?: string;
}) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(100, Math.max(0, score)) / 100);
  const tone = scoreTone(score);
  const stroke =
    tone === "high" ? "#2c5847" : tone === "mid" ? "#8a6a24" : "#b24a22";

  return (
    <div
      className="relative inline-grid place-items-center"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 128 128"
        className="-rotate-90"
        width={size}
        height={size}
        aria-hidden="true"
      >
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="#d8d0c0"
          strokeWidth="8"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-serif text-5xl leading-none tracking-tight text-ink">
            {score}
          </div>
          <div className="kicker mt-1">/ 100</div>
        </div>
      </div>
      <span className="sr-only">
        {label} {score} out of 100
      </span>
    </div>
  );
}
