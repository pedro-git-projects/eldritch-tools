import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import {
  Bars3Icon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
  BoltIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Navigation({ children }: LayoutProps) {
  const location = useLocation();

  const navigation = [
    { name: 'Create Investigator', href: '/', icon: PlusCircleIcon, current: true },
    { name: 'Search Investigator', href: '/search', icon: MagnifyingGlassIcon, current: false },
    { name: 'Simulate Combat', href: '/combat', icon: BoltIcon, current: false },
  ]

  function classNames(...classes: String[]) {
    return classes.filter(Boolean).join(' ')
  }

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div>
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-cthulhu-dark/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6 text-cthulhu-bg" />
                  </button>
                </div>
              </TransitionChild>

              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-cthulhu-secondary px-6 pb-2 ring-1 ring-cthulhu-gray">
                <div className="flex h-16 shrink-0 items-center">
                  {
                    // <img
                    //   alt="Necronomicon"
                    //   src={logo}
                    //   className="h-12 w-auto"
                    // />
                  }
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              className={classNames(
                                location.pathname === item.href
                                  ? 'bg-cthulhu-deep text-cthulhu-highlight'
                                  : 'text-cthulhu-olive hover:bg-cthulhu-gray hover:text-cthulhu-light',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                              )}
                            >
                              <item.icon aria-hidden="true" className="h-6 w-6 shrink-0 text-cthulhu-teal" />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-cthulhu-secondary px-6">
            <div className="flex h-16 shrink-0 items-center">
              {
                // <img
                //   alt="Necronomicon"
                //   src={logo}
                //   className="h-12 w-auto"
                // />
              }
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? 'bg-cthulhu-deep text-cthulhu-highlight'
                              : 'text-cthulhu-olive hover:bg-cthulhu-gray hover:text-cthulhu-light',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                          )}
                        >
                          <item.icon aria-hidden="true" className="h-6 w-6 shrink-0 text-cthulhu-teal" />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-cthulhu-secondary px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-cthulhu-olive lg:hidden">
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-cthulhu-beige">Menu</div>
        </div>

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="bg-cthulhu-dark text-cthulhu-beige">
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

