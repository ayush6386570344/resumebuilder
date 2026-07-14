const MetricCard = ({ title, value, subtitle, icon, color }) => {
  return (
    <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-8">
      <div className="flex justify-between items-center">
        <div>
          <p>{title}</p>

          <h1 className={`text-5xl font-bold ${color}`}>
            {value}%
          </h1>

          <p>{subtitle}</p>
        </div>

        <div>{icon}</div>
      </div>
    </div>
  );
};

export default MetricCard;