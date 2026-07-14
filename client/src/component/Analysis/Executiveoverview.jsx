const ExecutiveOverview = ({ overview }) => {
    console.log("overview", overview);
  return (
    <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <h2 className="text-2xl font-bold text-white">
        Executive Overview
      </h2>

      <p className="mt-6 text-lg text-zinc-300 leading-8">
        {overview.verdict}
      </p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">

        <div className="rounded-2xl bg-zinc-950 p-6">
          <p className="text-zinc-400 text-sm">
            Recruiter First Impression
          </p>

          <p className="mt-3 text-white leading-7">
            {overview.recruiterImpression}
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-950 p-6">
          <p className="text-zinc-400 text-sm">
            AI Confidence
          </p>

          <h2 className="text-4xl font-bold text-indigo-400 mt-3">
            {overview.confidence}
          </h2>
        </div>

      </div>
    </div>
  );
};

export default ExecutiveOverview;