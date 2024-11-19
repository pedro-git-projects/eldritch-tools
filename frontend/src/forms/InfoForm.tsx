import { useState } from "react";
import { UpdateInfo } from "../../wailsjs/go/investigator/Info";
import placeholder from "../assets/images/portrait.jpg";
import AlertBanner from "../components/AlertBanner";
import { ErrorDialog } from "../components/ErrorModal";
import { useFormContext } from "../context/FormContext";
import Navigation from "../layout/Navigation";
import TopMenu from "./TopMenu";

export default function InfoForm() {
  const { info, setInfo, setPortrait } = useFormContext();
  const [alert, setAlert] = useState<{
    title: string;
    content: string;
    nextStepPath?: string;
  } | null>(null);
  const [errorDialog, setErrorDialog] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await UpdateInfo(
        info.name,
        info.player,
        info.occupation,
        info.residence,
        info.birthplace,
        parseInt(info.age, 10),
        info.sex,
        info.portrait,
      );
      setAlert({
        title: "Success",
        content: "Info updated successfully!",
        nextStepPath: "/characteristics",
      });
    } catch (error) {
      console.error("Error updating info:", error);
      setAlert({
        title: "Error",
        content: "Failed to update info. Please try again.",
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    const file = fileInput.files?.[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrorDialog({
          title: "Unsupported File Format",
          content: "Please upload a file in JPG, PNG, or WebP format.",
        });
        fileInput.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const mimeType = file.type;
          const base64Data = reader.result.split(",")[1];
          const dataUrl = `data:${mimeType};base64,${base64Data}`;

          setTimeout(() => {
            setPortrait(dataUrl);
          }, 0);
        }
        fileInput.value = "";
      };
      reader.readAsDataURL(file);
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
            <h2 className="text-base/7 font-semibold">Personal Information</h2>
            <p className="mt-1 text-sm/6">
              Basic information about the player and investigator.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full flex items-center gap-x-8">
                <img
                  alt="Investigator Avatar"
                  src={info.portrait || placeholder}
                  className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                />
                <div>
                  <input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png, image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                    id="portraitInput"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("portraitInput")?.click()
                    }
                    className="rounded-md hover:bg-cthulhu-bluegray px-3 py-2 text-sm font-semibold shadow-sm bg-white/20"
                  >
                    Change avatar
                  </button>
                  <p className="mt-2 text-xs/5">JPG, PNG and Webp.</p>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm/6 font-semibold">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={info.name}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 bg-cthulhu-secondary py-1.5 shadow-sm ring-1 ring-inset ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-teal sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="player"
                  className="block text-sm/6 font-semibold"
                >
                  Player
                </label>
                <div className="mt-2">
                  <input
                    id="player"
                    name="player"
                    type="text"
                    value={info.player}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 bg-cthulhu-secondary py-1.5 shadow-sm ring-1 ring-inset ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-teal sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="occupation"
                  className="block text-sm/6 font-semibold"
                >
                  Occupation
                </label>
                <div className="mt-2">
                  <input
                    id="occupation"
                    name="occupation"
                    type="text"
                    value={info.occupation}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 bg-cthulhu-secondary py-1.5 shadow-sm ring-1 ring-inset ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-teal sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="age" className="block text-sm/6 font-semibold">
                  Age
                </label>
                <div className="mt-2">
                  <input
                    id="age"
                    name="age"
                    type="number"
                    value={info.age}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 bg-cthulhu-secondary py-1.5 shadow-sm ring-1 ring-inset ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-teal sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="sex" className="block text-sm/6 font-semibold">
                  Sex
                </label>
                <div className="mt-2">
                  <select
                    id="sex"
                    name="sex"
                    value={info.sex}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 bg-cthulhu-secondary py-1.5 shadow-sm ring-1 ring-inset ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-teal sm:text-sm/6"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="residence"
                  className="block text-sm/6 font-semibold"
                >
                  Residence
                </label>
                <div className="mt-2">
                  <input
                    id="residence"
                    name="residence"
                    type="text"
                    value={info.residence}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 bg-cthulhu-secondary py-1.5 shadow-sm ring-1 ring-inset ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-teal sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="birthplace"
                  className="block text-sm/6 font-semibold"
                >
                  Birthplace
                </label>
                <div className="mt-2">
                  <input
                    id="birthplace"
                    name="birthplace"
                    type="text"
                    value={info.birthplace}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 bg-cthulhu-secondary py-1.5 shadow-sm ring-1 ring-inset ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-teal sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                onClick={handleSubmit}
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
