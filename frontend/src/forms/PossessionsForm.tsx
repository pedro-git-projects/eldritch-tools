import { useState } from 'react';
import Navigation from '../layout/Navigation';
import TopMenu from './TopMenu';
import { UpdatePossessions } from '../../wailsjs/go/investigator/Possessions';
import { useFormContext } from '../context/FormContext';

type Possession = {
  Name: string;
  Description: string;
  Quantity: number;
};

export default function PossessionsForm() {
  const { possessions, setPossessions } = useFormContext();

  const [newPossession, setNewPossession] = useState<Possession>({
    Name: '',
    Description: '',
    Quantity: 1,
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingPossession, setEditingPossession] = useState<Possession | null>(null);

  // Modal state variables
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, isEditMode = false) => {
    const { name, value } = e.target;
    const update = isEditMode ? setEditingPossession : setNewPossession;

    update((prev: any) =>
      prev
        ? {
          ...prev,
          [name]: name === 'Quantity' ? parseInt(value, 10) : value,
        }
        : prev
    );
  };

  const handleAddPossession = () => {
    if (!newPossession.Name || !newPossession.Description || newPossession.Quantity < 1) {
      alert('Please fill out all fields.');
      return;
    }

    setPossessions([...possessions, newPossession]);
    setNewPossession({ Name: '', Description: '', Quantity: 1 });
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editingPossession) {
      setPossessions((prev) =>
        prev.map((possession, i) => (i === editingIndex ? editingPossession : possession))
      );
      setEditingIndex(null);
      setEditingPossession(null);
    }
  };

  const handleEditPossession = (index: number) => {
    setEditingIndex(index);
    setEditingPossession({ ...possessions[index] });
  };

  const handleDeletePossession = (index: number) => {
    setPossessions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdatePossessions = async () => {
    console.log(possessions);
    try {
      await UpdatePossessions(possessions);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error updating possessions:', error);
      setShowErrorModal(true);
    }
  };

  return (
    <Navigation>
      <TopMenu />
      <div className="px-4 py-16">
        <h2 className="text-lg font-bold text-white mb-4">Manage Possessions</h2>

        <div className="space-y-4 mt-4">
          <input
            type="text"
            name="Name"
            value={newPossession.Name}
            onChange={(e) => handleInputChange(e)}
            placeholder="Possession Name"
            className="w-full rounded-md bg-gray-800 text-white p-2"
          />
          <input
            type="text"
            name="Description"
            value={newPossession.Description}
            onChange={(e) => handleInputChange(e)}
            placeholder="Description"
            className="w-full rounded-md bg-gray-800 text-white p-2"
          />
          <input
            type="number"
            name="Quantity"
            value={newPossession.Quantity}
            onChange={(e) => handleInputChange(e)}
            placeholder="Quantity"
            min="1"
            className="w-full rounded-md bg-gray-800 text-white p-2"
          />
        </div>

        <button
          onClick={handleAddPossession}
          className="mt-6 rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
        >
          Add Possession
        </button>

        {editingPossession && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full mx-4 sm:mx-6 md:mx-auto">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Edit Possession</h3>
              <input
                type="text"
                name="Name"
                value={editingPossession.Name}
                onChange={(e) => handleInputChange(e, true)}
                placeholder="Possession Name"
                className="w-full rounded-md mb-2 bg-gray-100 p-2 text-gray-700"
              />
              <input
                type="text"
                name="Description"
                value={editingPossession.Description}
                onChange={(e) => handleInputChange(e, true)}
                placeholder="Description"
                className="w-full rounded-md mb-2 bg-gray-100 p-2 text-gray-700"
              />
              <input
                type="number"
                name="Quantity"
                value={editingPossession.Quantity}
                onChange={(e) => handleInputChange(e, true)}
                placeholder="Quantity"
                min="1"
                className="w-full rounded-md mb-2 bg-gray-100 p-2 text-gray-700"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setEditingIndex(null);
                    setEditingPossession(null);
                  }}
                  className="rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="rounded-md bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-400"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white">Current Possessions</h3>
          {possessions.length > 0 ? (
            possessions.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 mt-2 bg-gray-700 rounded-md"
              >
                <div>
                  <p className="font-semibold text-white">{item.Name}</p>
                  <p className="text-sm text-gray-300">{item.Description}</p>
                  <p className="text-sm text-gray-300">Quantity: {item.Quantity}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditPossession(index)}
                    className="p-1 text-sm bg-yellow-500 rounded text-white hover:bg-yellow-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePossession(index)}
                    className="p-1 text-sm bg-red-500 rounded text-white hover:bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No possessions added yet.</p>
          )}
        </div>

        <button
          onClick={handleUpdatePossessions}
          className="w-full p-2 mt-4 rounded-md bg-green-500 text-white hover:bg-green-400"
        >
          Update Possessions
        </button>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
              <h3 className="text-lg font-semibold text-green-600">Update Successful!</h3>
              <p className="text-gray-700 mt-2">Possessions have been successfully updated.</p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="mt-4 w-full rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-400"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* Error Modal */}
        {showErrorModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
              <h3 className="text-lg font-semibold text-red-600">Update Failed</h3>
              <p className="text-gray-700 mt-2">An error occurred while updating possessions.</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="mt-4 w-full rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </Navigation>
  );
}

