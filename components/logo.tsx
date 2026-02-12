export default function Logo() {
  return (
    <svg
      width="28"
      height="32"
      viewBox="0 0 28 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="J. logo"
      className="text-foreground"
    >
      {/* Letter J */}
      <path
        d="M8 0H18V20C18 24.418 14.418 28 10 28C5.582 28 2 24.418 2 20H8C8 21.105 8.895 22 10 22C11.105 22 12 21.105 12 20V6H8V0Z"
        fill="currentColor"
      />
      {/* Dot */}
      <circle cx="24" cy="24" r="4" fill="currentColor" />
    </svg>
  );
}
