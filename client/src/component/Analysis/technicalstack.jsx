import {
  Monitor,
  Server,
  Database,
  Wrench,
} from "lucide-react";

const TechnicalStack = ({ stack }) => {
  const sections = [
    {
      title: "Frontend",
      icon: <Monitor size={22} className="text-blue-400" />,
      items: stack.frontend,
    },
    {
      title: "Backend",
      icon: <Server size={22} className="text-green-400" />,
      items: stack.backend,
    },
    {
      title: "Database",
      icon: <Database size={22} className="text-yellow-400" />,
      items: stack.database,
    },
    {
      title: "Tools",
      icon: <Wrench size={22} className="text-purple-400" />,
      items: stack.tools,
    },
  ];

  return (
    <div className="mt-8 rounded-3xl bg-zinc-900 border border-zinc-800 p-8">

      <h2 className="text-2xl font-bold">
        Technical Stack Detected
      </h2>

      <p className="text-zinc-400 mt-2">
        Technologies identified from your resume.
      </p>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        {sections.map((section, index) => (

          <div
            key={index}
            className="rounded-2xl bg-zinc-800 border border-zinc-700 p-6"
          >

            <div className="flex items-center gap-3 mb-5">
              {section.icon}

              <h3 className="text-lg font-semibold">
                {section.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">

              {section.items.map((tech, i) => (

                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 text-sm hover:border-indigo-500 transition"
                >
                  {tech}
                </span>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default TechnicalStack;