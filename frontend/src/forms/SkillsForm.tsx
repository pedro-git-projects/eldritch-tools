import { useEffect } from "react";
import Navigation from "../layout/Navigation";
import TopMenu from "./TopMenu";
import { GetSkills, UpdateSkills } from "../../wailsjs/go/investigator/Investigator";
import { useFormContext } from "../context/FormContext";

interface SkillData {
  name: string;
  baseChance: number;
  level: number;
  additionalPoints: number | string;
}


export default function SkillsForm() {
  const { skills, setSkills } = useFormContext();

  const handleSubmit = async () => {
    const updatedSkills = skills.map((skill: SkillData) => ({
      Name: skill.name,
      BaseChance: skill.baseChance,
      Level: skill.baseChance + (typeof skill.additionalPoints === "number" ? skill.additionalPoints : 0),
    }));

    try {
      await UpdateSkills(updatedSkills);
      alert('Skills updated successfully!');
    } catch (error) {
      console.error('Error updating skills:', error);
    }
  };

  useEffect(() => {
    async function loadSkills() {
      const initialSkills = await GetSkills();
      const skillsWithAdditionalPoints: SkillData[] = initialSkills.map((skill: any) => ({
        name: skill.Name,
        baseChance: skill.BaseChance,
        level: skill.Level,
        additionalPoints: 0,
      }));
      setSkills(skillsWithAdditionalPoints);
    }

    loadSkills();
  }, []);

  const handleChange = (index: number, value: string) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill, i) =>
        i === index
          ? { ...skill, additionalPoints: value === "" ? "" : Math.max(0, parseInt(value)) }
          : skill
      )
    );
  };
  
  return (
    <Navigation>
      <TopMenu />
      <div className="divide-y divide-white/5 px-4 py-16">
        <h2 className="text-base font-semibold text-white">Skills</h2>
        <p className="mt-1 text-sm text-gray-400">Adjust points for each skill.</p>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <div key={skill.name} className="col-span-1">
                <label className="block text-sm font-medium text-white">
                  {skill.name} (Base: {skill.baseChance}%)
                </label>
                <div className="mt-2 flex items-center gap-x-4">
                  <input
                    type="number"
                    value={skill.additionalPoints}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="w-20 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  />
                  <span className="text-sm text-gray-400">
                    Total: {Math.max(skill.baseChance, skill.baseChance + (typeof skill.additionalPoints === "number" ? skill.additionalPoints : 0))}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Navigation>
  );
}

