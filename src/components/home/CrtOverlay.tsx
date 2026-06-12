/**
 * Fixed CRT scanline + vignette overlay. Purely decorative.
 */
const CrtOverlay = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40"
      style={{
        backgroundImage:
          "repeating-linear-gradient(rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 1px, transparent 1px, transparent 3px), radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.45) 100%)",
      }}
    />
  );
};

export default CrtOverlay;
