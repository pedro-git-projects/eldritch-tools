import { UpdateInfo, PrintInfo } from "../../wailsjs/go/investigator/Info";
import placeholder from "../assets/images/portrait.jpg";
import { useFormContext } from "../context/FormContext";
import Navigation from "../layout/Navigation";
import TopMenu from "./TopMenu";

export default function InfoForm() {
  const { info, setInfo, setPortrait } = useFormContext();

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
      alert("Info updated successfully!");
    } catch (error) {
      console.error("Error updating info:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setTimeout(() => {
            setPortrait(reader.result as string); // Ensure update
          }, 0);
        }
        fileInput.value = ""; // Reset the input
      };

      reader.readAsDataURL(file); // Read file
    }
  };

  const handlePrintInfo = async () => {
    try {
      await PrintInfo();
      alert("Check the console for printed information.");
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
            <h2 className="text-base/7 font-semibold text-white">
              Personal Information
            </h2>
            <p className="mt-1 text-sm/6 text-gray-400">
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
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="portraitInput"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("portraitInput")?.click()
                    }
                    className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                  >
                    Change avatar
                  </button>
                  <p className="mt-2 text-xs/5 text-gray-400">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-white"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={info.name}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="player"
                  className="block text-sm/6 font-medium text-white"
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
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="occupation"
                  className="block text-sm/6 font-medium text-white"
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
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="age"
                  className="block text-sm/6 font-medium text-white"
                >
                  Age
                </label>
                <div className="mt-2">
                  <input
                    id="age"
                    name="age"
                    type="number"
                    value={info.age}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="sex"
                  className="block text-sm/6 font-medium text-white"
                >
                  Sex
                </label>
                <div className="mt-2">
                  <select
                    id="sex"
                    name="sex"
                    value={info.sex}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="residence"
                  className="block text-sm/6 font-medium text-white"
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
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="birthplace"
                  className="block text-sm/6 font-medium text-white"
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
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={handlePrintInfo}
                className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20"
              >
                Print Info
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
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
