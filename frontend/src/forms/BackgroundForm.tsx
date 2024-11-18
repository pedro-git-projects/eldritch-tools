import Navigation from "../layout/Navigation";
import TopMenu from "./TopMenu";
import { useState } from "react";
import { UpdateMeta } from "../../wailsjs/go/investigator/Meta";

export default function BackgroundForm() {
  const [meta, setMeta] = useState({
    PersonalDescription: "",
    Traits: "",
    IdeologyAndBeliefs: "",
    SignificantPeople: "",
    MeaningfulLocations: "",
    TreasuredPosessions: "",
    InjuriesAndScars: "",
    PhobiasAndManias: "",
    ArcaneTomesSpellsAndArtifacts: "",
    EncountersWithStrangeEntities: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setMeta(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await UpdateMeta(
        meta.PersonalDescription,
        meta.Traits,
        meta.IdeologyAndBeliefs,
        meta.SignificantPeople,
        meta.MeaningfulLocations,
        meta.TreasuredPosessions,
        meta.InjuriesAndScars,
        meta.PhobiasAndManias,
        meta.ArcaneTomesSpellsAndArtifacts,
        meta.EncountersWithStrangeEntities,
      );
      console.log("Submitted Meta:", meta);
      alert("Background information updated successfully!");
    } catch (error) {
      console.error("Error updating background information:", error);
    }
  };

  return (
    <Navigation>
      <TopMenu />
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          Investigator Background
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(meta).map(([field, value]) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-white"
              >
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <div className="mt-2">
                <textarea
                  id={field}
                  name={field}
                  rows={4}
                  value={value}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-gray-800 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                  placeholder={`Enter${field.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                />
              </div>
            </div>
          ))}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
            >
              Save Background
            </button>
          </div>
        </form>
      </div>
    </Navigation>
  );
}
