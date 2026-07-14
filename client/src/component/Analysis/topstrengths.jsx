import { Award } from "lucide-react";

const TopStrengths = ({ strengths }) => {
  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-6">
        Top Strengths
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {strengths.map((item, index) => (

          <div
            key={index}
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7 hover:border-indigo-500 hover:-translate-y-1 transition duration-300"
          >

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center">
                <Award className="text-white" />
              </div>

              <h3 className="text-xl font-semibold">
                {item.title}
              </h3>

            </div>

            <p className="mt-5 text-zinc-400 leading-7">
              {item.description}
            </p>

          </div>

        ))}

      </div>
    </div>
  );
};

export default TopStrengths;