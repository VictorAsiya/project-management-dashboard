// --- Small UI helper components (using tailwind and shadcn-like styles) ---
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm p-4 ${className}`}>{children}</div>
  );
}
export default Card