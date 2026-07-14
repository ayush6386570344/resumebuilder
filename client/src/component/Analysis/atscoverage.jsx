import CountUp from "react-countup";
const ATSCoverage = ({ ats }) => {
  return (
    <div className="mt-8 rounded-3xl bg-zinc-900 border border-zinc-800 p-8">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-bold">
            ATS Keyword Coverage
          </h2>

          <p className="text-zinc-400 mt-2">
            Keywords detected from your resume that align with the job description.
          </p>
        </div>

       <div className="text-5xl font-bold text-indigo-400">
  {ats.score}%
</div>

      </div>

      {/* Progress Bar */}

      <div className="mt-8 h-4 rounded-full bg-zinc-800 overflow-hidden">

        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-1000"
          style={{ width: `${ats.score}%` }}
        />

      </div>

      {/* Keywords */}

      <div className="flex flex-wrap gap-3 mt-8">

        {ats.keywords.map((item, index) => (

          <div
            key={index}
            className="px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-sm hover:border-indigo-500 transition"
          >
            ✓ {item}
          </div>

        ))}

      </div>

    </div>
  );
};

export default ATSCoverage;