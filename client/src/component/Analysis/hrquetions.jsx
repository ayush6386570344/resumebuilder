import { BriefcaseBusiness } from "lucide-react";

const HRQuestions = ({ questions }) => {
  return (
    <div className="mt-8 rounded-3xl bg-zinc-900 border border-zinc-800 p-8">

      <div className="flex items-center gap-3 mb-6">
        <BriefcaseBusiness className="text-indigo-400" size={30} />
        <h2 className="text-2xl font-bold text-white">
          HR Interview Questions
        </h2>
      </div>

      <div className="space-y-4">

       {questions.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 p-5 rounded-2xl bg-zinc-800 border border-zinc-700 hover:border-indigo-500 transition"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
              {index + 1}
            </div>

           <div>
  <p className="text-zinc-100 font-medium">
    {item.question}
  </p>

  <p className="text-zinc-400 mt-2 text-sm">
    {item.reason}
  </p>
</div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default HRQuestions;