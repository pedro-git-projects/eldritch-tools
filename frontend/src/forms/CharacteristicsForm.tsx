import Navigation from "../layout/Navigation";
import TopMenu from "./TopMenu";
import { UpdateCharacteristics } from "../../wailsjs/go/investigator/Characteristics";
import { useFormContext } from "../context/FormContext";
import { useState } from "react";
import AlertBanner from "../components/AlertBanner";
import { ErrorDialog } from "../components/ErrorModal";

export default function CharacteristicsForm() {
  const [alert, setAlert] = useState<{
    title: string;
    content: string;
    nextStepPath?: string;
  } | null>(null);

  const [errorDialog, setErrorDialog] = useState<{
    title: string;
    content: string;
  } | null>(null);

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
      setAlert({
        title: "Success",
        content:
          "Characteristics adjusted as per the unseen script. A strange power beckons you.",
        nextStepPath: "/skills",
      });
    } catch (error) {
      setErrorDialog({
        title: "Error updatading characteristics",
        content: `Failed to update info with ${error}. Please try again.`,
      });
    }
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

      <div className="divide-y divide-white/5">
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold">Characteristics</h2>
            <p className="mt-1 text-sm">
              Define the investigator's key characteristics.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              {Object.keys(characteristics).map((key, index) => (
                <div key={index} className="sm:col-span-3">
                  <label
                    htmlFor={key}
                    className="block text-sm font-medium uppercase"
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
                      className="block w-full rounded-md border-0 bg-cthulhu-secondary py-1.5 shadow-sm ring-1 ring-inset ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-teal sm:text-sm/6"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-cthulhu-rust px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cthulhu-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Bind
              </button>
            </div>
          </form>
        </div>
      </div>
    </Navigation>
  );
}
