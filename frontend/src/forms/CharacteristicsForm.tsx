import Navigation from "../layout/Navigation";
import TopMenu from "./TopMenu";
import {
  UpdateCharacteristics,
  PrintCharacteristics,
} from "../../wailsjs/go/investigator/Characteristics";
import { useFormContext } from "../context/FormContext";

export default function CharacteristicsForm() {
  type CharacteristicKey =
    | "str"
    | "dex"
    | "int"
    | "con"
    | "app"
    | "pow"
    | "siz"
    | "edu";

  const { characteristics, setCharacteristics } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCharacteristics(prevInfo => ({
      ...prevInfo,
      [name as CharacteristicKey]: parseInt(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await UpdateCharacteristics(
        characteristics.str,
        characteristics.dex,
        characteristics.int,
        characteristics.con,
        characteristics.app,
        characteristics.pow,
        characteristics.siz,
        characteristics.edu,
      );
      alert("Characteristics updated successfully!");
    } catch (error) {
      console.error("Error updating characteristics:", error);
    }
  };

  const handlePrintCharacteristcs = async () => {
    try {
      await PrintCharacteristics();
      alert("Check the console for printed characteristics.");
    } catch (error) {
      console.error("Error printing info:", error);
    }
  };

  return (
    <Navigation>
      <TopMenu />
      <div className="divide-y divide-white/5">
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold text-white">
              Characteristics
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Define the investigator's key characteristics.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              {Object.keys(characteristics).map((key, index) => (
                <div key={index} className="sm:col-span-3">
                  <label
                    htmlFor={key}
                    className="block text-sm font-medium text-white capitalize"
                  >
                    {key}
                  </label>
                  <div className="mt-2">
                    <input
                      id={key}
                      name={key}
                      type="number"
                      value={characteristics[key as CharacteristicKey]}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={handlePrintCharacteristcs}
                className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20"
              >
                Print Characteristics
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Navigation>
  );
}
