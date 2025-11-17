function Stat({ title, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-slate-500">{title}</span>
      <span className="text-xl font-semibold">{value}</span>
    </div>
  );
}

export default Stat