interface SkillData {
  Name: string;
  BaseChance: number;
  Level: number;
}

interface SkillsDisplayProps {
  skills: Record<string, SkillData>;
}

export default function SkillsDisplay({ skills }: SkillsDisplayProps) {
  const skillsArray = Object.values(skills);

  return (
    <div>
      <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {skillsArray.map((skill) => {
          const total = skill.Level + skill.BaseChance;
          const half = Math.floor(total / 2);
          const fifth = Math.floor(total / 5);

          return (
            <div
              key={skill.Name}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <dt className="truncate text-sm font-medium text-gray-500">{skill.Name}</dt>
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {total}%
              </div>
              <div className="mt-2 flex justify-between text-sm text-gray-600">
                <span>Half: {half}%</span>
                <span>Fifth: {fifth}%</span>
              </div>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

