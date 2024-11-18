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
              className="overflow-hidden rounded-lg bg-cthulhu-secondary px-4 py-5 shadow sm:p-6"
            >
              <dt className="truncate text-sm font-medium">{skill.Name}</dt>
              <div className="flex items-baseline text-2xl font-semibold text-cthulhu-olive">
                {total}%
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span>
                  Half: <span className="text-cthulhu-olive">{half}%</span>
                </span>
                <span>
                  Fifth: <span className="text-cthulhu-olive">{fifth}%</span>
                </span>
              </div>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

