import { useState } from 'react';
import { UpdateInfo, PrintInfo } from '../../wailsjs/go/investigator/Info'

export default function InfoForm() {
  const [info, setInfo] = useState({
    name: '',
    player: '',
    occupation: '',
    age: '',
    sex: 'Male',
    residence: '',
    birthplace: ''
  });

  // Update state as user inputs data
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Call Go's UpdateInfo function directly
      await UpdateInfo(
        info.name,
        info.player,
        info.occupation,
        info.residence,
        info.birthplace,
        parseInt(info.age, 10),
        info.sex
      );
      alert('Info updated successfully!');
    } catch (error) {
      console.error('Error updating info:', error);
    }
  };

  const handlePrintInfo = async () => {
    try {
      await PrintInfo();
      alert('Check the console for printed information.');
    } catch (error) {
      console.error('Error printing info:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Investigator Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Enter the details of the investigator. This information will be saved securely.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={info.name}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-indigo-600"
              />
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="player" className="block text-sm font-medium leading-6 text-gray-900">
                Player
              </label>
              <input
                id="player"
                name="player"
                type="text"
                value={info.player}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-indigo-600"
              />
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="occupation" className="block text-sm font-medium leading-6 text-gray-900">
                Occupation
              </label>
              <input
                id="occupation"
                name="occupation"
                type="text"
                value={info.occupation}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-indigo-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                value={info.age}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-indigo-600"
              />
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="sex" className="block text-sm font-medium leading-6 text-gray-900">
                Sex
              </label>
              <select
                id="sex"
                name="sex"
                value={info.sex}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-indigo-600"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="residence" className="block text-sm font-medium leading-6 text-gray-900">
                Residence
              </label>
              <input
                id="residence"
                name="residence"
                type="text"
                value={info.residence}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-indigo-600"
              />
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="birthplace" className="block text-sm font-medium leading-6 text-gray-900">
                Birthplace
              </label>
              <input
                id="birthplace"
                name="birthplace"
                type="text"
                value={info.birthplace}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" onClick={handlePrintInfo} className="text-sm font-semibold leading-6 text-gray-900">
            Print Info
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
