/** A decorative sign-off, not an input field. */
const LivePrompt = () => (
  <div className="mt-16 text-sm text-night-muted">
    <p># end of session. thanks for stopping by.</p>
    <p className="mt-2 hidden text-xs sm:block">
      psst — try ↑ ↑ ↓ ↓ ← → ← → b a
    </p>
  </div>
);

export default LivePrompt;
