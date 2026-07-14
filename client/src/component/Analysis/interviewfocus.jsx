import { BookOpen } from "lucide-react";

const InterviewFocus = ({ topics }) => {
  return (
    <div className="mt-8 rounded-3xl bg-zinc-900 border border-zinc-800 p-8">

      <h2 className="text-2xl font-bold">
        Interview Focus Areas
      </h2>

      <p className="text-zinc-400 mt-2">
        AI recommends revising these topics before your interview.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        {topics.map((item, index) => (

          <div
            key={index}
            className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 hover:border-indigo-500 transition"
          >

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center">
                <BookOpen className="text-white" />
              </div>

              <h3 className="text-lg font-semibold">
                {item.topic}
              </h3>

            </div>

            <p className="text-zinc-400 mt-5 leading-7">
              {item.description}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default InterviewFocus;