import { useEffect, useState } from "react";
import Navigation from "../layout/Navigation";
import TopMenu from "./TopMenu";
import {
  GetSkills,
  UpdateSkills,
} from "../../wailsjs/go/investigator/Investigator";
import { useFormContext } from "../context/FormContext";
import { SkillData } from "../types/SkillData";
import AlertBanner from "../components/AlertBanner";
import { ErrorDialog } from "../components/ErrorModal";

export default function SkillsForm() {
  const { skills, setSkills } = useFormContext();

  const [alert, setAlert] = useState<{
    title: string;
    content: string;
    nextStepPath?: string;
  } | null>(null);
  const [errorDialog, setErrorDialog] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const handleSubmit = async () => {
    const updatedSkills = skills.map((skill: SkillData) => ({
      Name: skill.name,
      BaseChance: skill.baseChance,
      Level:
        skill.baseChance +
        (typeof skill.additionalPoints === "number"
          ? skill.additionalPoints
          : 0),
    }));

    try {
      await UpdateSkills(updatedSkills);
      setAlert({
        title: "Success",
        content:
          "The ancient forces approve. Skills are now etched into your being.",
        nextStepPath: "/weapons",
      });
    } catch (error) {
      setErrorDialog({
        title: "Error",
        content: `Failed to update info with ${error}. Please try again.`,
      });
    }
  };

  useEffect(() => {
    async function loadSkills() {
      const initialSkills = await GetSkills();
      const skillsWithAdditionalPoints: SkillData[] = initialSkills
        .filter(
          (skill: any) =>
            skill.Name !== "Language (Own)" && skill.Name !== "Dodge",
        ) // Remove "Language (Own)" and "Dodge"
        .map((skill: any) => ({
          name: skill.Name,
          baseChance: skill.BaseChance,
          level: skill.Level,
          additionalPoints: 0,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

      setSkills(skillsWithAdditionalPoints);
    }

    loadSkills();
  }, []);

  const handleChange = (index: number, value: string) => {
    setSkills(prevSkills =>
      prevSkills.map((skill, i) =>
        i === index
          ? {
              ...skill,
              additionalPoints:
                value === "" ? "" : Math.max(0, parseInt(value)),
            }
          : skill,
      ),
    );
  };

  return (
    <Navigation>
      <TopMenu />
      {alert && (
        <div className="mb-4">
          <AlertBanner
            title={alert.title}
            content={alert.content}
            onClose={() => setAlert(null)}
            nextStepPath={alert.nextStepPath}
          />
        </div>
      )}
      {errorDialog && (
        <ErrorDialog
          title={errorDialog.title}
          content={errorDialog.content}
          textBtn1="OK"
          onClose1={() => setErrorDialog(null)}
        />
      )}
      <div className="px-6 py-16">
        <h2 className="text-base font-semibold">Skills</h2>
        <p className="mt-1 text-sm mb-8">Adjust points for each skill.</p>

        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div key={skill.name} className="col-span-1">
                <label className="block text-sm font-medium">
                  {skill.name} (Base: {skill.baseChance}%)
                </label>
                <div className="mt-2 flex items-center gap-x-4">
                  <input
                    type="number"
                    value={skill.additionalPoints}
                    onChange={e => handleChange(index, e.target.value)}
                    className="w-20 rounded-md border-0 bg-cthulhu-secondary py-1.5 shadow-sm ring-1 ring-inset ring-inset ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-teal sm:text-sm"
                  />
                  <span className="text-sm">
                    Total:{" "}
                    {Math.max(
                      skill.baseChance,
                      skill.baseChance +
                        (typeof skill.additionalPoints === "number"
                          ? skill.additionalPoints
                          : 0),
                    )}
                    %
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-cthulhu-rust px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cthulhu-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Bind
            </button>
          </div>
        </form>
      </div>
    </Navigation>
  );
}
