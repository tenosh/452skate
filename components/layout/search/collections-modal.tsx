'use client';

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import Collections from './collections';

export default function CollectionsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center gap-2 text-452-blue-light hover:opacity-80"
      >
        <Bars3Icon className="h-6 w-6" />
        <span className="font-oswald text-lg">Collections</span>
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeModal} className="relative z-50">
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </TransitionChild>
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <DialogPanel className="fixed bottom-0 left-0 top-0 flex h-full w-full max-w-[300px] flex-col border-r border-452-blue-light bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-oswald text-xl text-452-blue-light">Collections</h2>
                <button
                  onClick={closeModal}
                  className="text-452-blue-light hover:opacity-80"
                  aria-label="Close collections"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <Collections />
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
