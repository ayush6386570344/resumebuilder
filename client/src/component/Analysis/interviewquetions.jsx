import { MessageCircleQuestion } from "lucide-react";

const InterviewQuestions = ({ questions }) => {
  return (
    <div className="mt-8 rounded-3xl bg-zinc-900 border border-zinc-800 p-8">

      <h2 className="text-2xl font-bold">
        AI Expected Interview Questions
      </h2>

      <p className="text-zinc-400 mt-2">
        Personalized questions generated from your resume and the job description.
      </p>

      <div className="mt-8 space-y-5">

        {questions.map((item, index) => (

          <div
            key={index}
            className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 hover:border-indigo-500 transition"
          >

            <div className="flex items-start gap-4">

              <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center">

                <MessageCircleQuestion className="text-white"/>

              </div>

              <div>

                <span className="text-indigo-400 text-sm">
                  {item.category}
                </span>

                <h3 className="mt-2 text-lg">
                  {index + 1}. {item.question}
                </h3>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default InterviewQuestions;