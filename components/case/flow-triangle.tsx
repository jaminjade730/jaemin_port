export function FlowTriangle({
  className = "case-header__flow-arrow",
  size = 6,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 12"
      width={size}
      height={Math.round(size * 1.2)}
      aria-hidden
    >
      <path d="M1.2 1.1 8.8 6 1.2 10.9Z" fill="currentColor" />
    </svg>
  );
}
