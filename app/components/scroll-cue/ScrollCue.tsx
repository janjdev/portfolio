export default function ScrollCue() {
  return (
    <a
      href="#projects"
      aria-label="Scroll to projects"
      className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center"
    >
      <div className="mb-3 flex items-center gap-6">
        <span className="h-3 w-3 bg-[color:var(--accent)]" />

        <span className="text-[10px] font-medium uppercase tracking-[0.45em] text-[color:var(--muted-text)]">
          Scroll
        </span>
      </div>

      <span className="h-16 w-px bg-[color:var(--primary-text)]/20" />
    </a>
  );
}