import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { GetAllInvestigators } from "../../wailsjs/go/main/App";
import {
  Listbox,
  ListboxOption,
  ListboxOptions,
  ListboxButton,
} from "@headlessui/react";
import { CharacteristicsDisplay } from "../components/DisplayCharacteristics";
import SkillsDisplay from "../components/DisplaySkills";
import InvestigatorCard from "../components/InvestigatorCard";
import HpStatusCard from "../components/HpStatusCard";
import SanityStatusCard from "../components/SanityStatusCard";

interface FullInvestigator {
  id: number;
  name: string;
  player: string;
  occupation: string;
  age: number;
  sex: string;
  residence: string;
  birthplace: string;
  characteristics: any;
  hp: any;
  sanity: any;
  combat: any;
  meta: any;
  weapons: any;
  skills: any;
  possessions: any;
  luck: number;
  mp: number;
  wealth: any;
  portrait: string;
}

export default function InvestigatorList() {
  const [investigators, setInvestigators] = useState<FullInvestigator[]>([]);
  const [selected, setSelected] = useState<FullInvestigator | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInvestigators() {
      try {
        const result = await GetAllInvestigators();
        setInvestigators(result);
        if (result.length > 0) setSelected(result[0]); // Set the first investigator as selected
      } catch (err) {
        console.error("Failed to fetch investigators:", err);
        setError("Could not load investigators. " + err);
      }
    }
    fetchInvestigators();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <label className="text-md font-semibold">Select Investigator</label>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-2">
          <ListboxButton className="relative w-full cursor-default rounded-md bg-cthulhu-secondary py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-cthulhu-secondary focus:outline-none focus:ring-2 focus:ring-cthulhu-olive sm:text-sm">
            <span className="flex items-center">
              {selected && (
                <img
                  alt={selected.name}
                  src={selected.portrait}
                  onError={e => {
                    console.error(
                      "Image failed to load for investigator:",
                      selected.name,
                      e,
                    );
                  }}
                  className="h-5 w-5 flex-shrink-0 rounded-full"
                />
              )}
              <span className="ml-3 block truncate">
                {selected ? selected.name : "Select an investigator"}
              </span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronUpDownIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
              />
            </span>
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-cthulhu-secondary py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {investigators.map(investigator => (
              <ListboxOption
                key={investigator.id}
                value={investigator}
                className={({ selected }) =>
                  `relative cursor-default select-none py-2 pl-3 pr-9 ${selected ? "bg-cthulhu-olive" : "text-cthulhu-beige"}`
                }
              >
                {({ selected }) => (
                  <>
                    <div className="flex items-center">
                      <img
                        alt=""
                        src={investigator.portrait}
                        className="h-5 w-5 flex-shrink-0 rounded-full"
                      />
                      <span
                        className={`ml-3 block truncate ${selected ? "font-semibold" : "font-normal"}`}
                      >
                        {investigator.name}
                      </span>
                    </div>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-cthulhu-rust">
                        <CheckIcon aria-hidden="true" className="h-5 w-5" />
                      </span>
                    )}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>

      {selected && (
        <div className="mt-6 bg-cthulhu-dark rounded-lg shadow-md p-6">
          <InvestigatorCard selected={selected} />
          <div className="mt-4">
            <CharacteristicsDisplay data={selected.characteristics} />
          </div>

          <div className="mt-4">
            <HpStatusCard selected={selected} />
          </div>

          <div className="mt-4">
            <SanityStatusCard selected={selected} />
          </div>

          <div className="mt-4">
            <SkillsDisplay skills={selected.skills} />
          </div>

          {/* Combat */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900">Combat</h3>
            <pre className="text-gray-700 text-sm mt-2">
              {JSON.stringify(selected.combat, null, 2)}
            </pre>
          </div>

          {/* Meta */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900">Meta</h3>
            <pre className="text-gray-700 text-sm mt-2">
              {JSON.stringify(selected.meta, null, 2)}
            </pre>
          </div>

          {/* Weapons */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900">Weapons</h3>
            <pre className="text-gray-700 text-sm mt-2">
              {JSON.stringify(selected.weapons, null, 2)}
            </pre>
          </div>

          {/* Possessions */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900">Possessions</h3>
            <pre className="text-gray-700 text-sm mt-2">
              {JSON.stringify(selected.possessions, null, 2)}
            </pre>
          </div>

          {/* Luck and MP */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Additional Attributes
            </h3>
            <p className="text-gray-700 mb-1">
              <strong>Luck:</strong> {selected.luck}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>MP:</strong> {selected.mp}
            </p>
          </div>

          {/* Wealth */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900">Wealth</h3>
            <pre className="text-gray-700 text-sm mt-2">
              {JSON.stringify(selected.wealth, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
