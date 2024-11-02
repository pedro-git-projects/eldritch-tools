import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { UpdateInvestigator, Save, Print } from '../../wailsjs/go/investigator/Investigator'
import { GetInfo } from '../../wailsjs/go/investigator/Info'
import { GetMeta } from '../../wailsjs/go/investigator/Meta'
import { GetCharacteristics } from '../../wailsjs/go/investigator/Characteristics'
import { GetPossessionsList } from "../../wailsjs/go/investigator/Possessions";
import Navigation from '../layout/Navigation'
import TopMenu from './TopMenu'


function ErrorModal({ message, onClose, onRetry }: any) {
  return (
    <Dialog open={true} onClose={onClose} className="relative z-[60]">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-[60] w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                Error Saving Investigator
              </DialogTitle>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{message}</p>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:col-start-2"
              >
                Retry
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}


function Modal() {
  const [open, setOpen] = useState(true)

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-[60]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-[60] w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckIcon aria-hidden="true" className="h-6 w-6 text-green-600" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                  Investigator saved to the database successfully
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    You can now visualize and use your investigator in combat situations.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
              >
                Create another
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              >
                Ok
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}


export const combineInvestigatorData = async () => {
  const info = await GetInfo();
  const characteristics = await GetCharacteristics();
  const meta = await GetMeta();
  const possessions = await GetPossessionsList();
  await UpdateInvestigator(info, meta, characteristics, possessions);
};


export default function SaveInvestigator() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = async () => {
    try {
      await combineInvestigatorData();
    // await Print();
      await Save();
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error saving investigator:', error);
      setErrorMessage(String(error));
      setShowErrorModal(true);
    }
  };

  const closeModals = () => {
    setShowSuccessModal(false);
    setShowErrorModal(false);
  };

  const retrySave = () => {
    setShowErrorModal(false);
    handleSave();
  };

  return (
    <Navigation>
      <TopMenu />
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSave}
          className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
        >
          Save Investigator
        </button>
        {showSuccessModal && <Modal />}
        {showErrorModal && <ErrorModal message={errorMessage} onClose={closeModals} onRetry={retrySave} />}
      </div>
    </Navigation>
  );
}

