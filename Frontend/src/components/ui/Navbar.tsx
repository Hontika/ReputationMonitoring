import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const navigationAuth = [
  { name: "Home", path: "/", current: true },
  { name: "Achievements", path: "/achievements", current: false },
  { name: "Profile", path: "/profile", current: false },
];

const auth = [
  { name: "Register", path: "/register", current: false },
  { name: "Login", path: "/login", current: false },
]

const navigationNoAuth = [
  { name: "Reddit Search", path: "/reddit-search", current: false },
];

interface imgIcon {
  img: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}


export default function Navbar() {
  const { logout, user } = useAuthContext();
  const [imgIcon, setimgIcon] = useState<imgIcon>({
    img:
      user?.img ||
      "https://pbs.twimg.com/profile_images/1764081844419473409/d3-p1vQ-_400x400.jpg",
  });

  return (
    <Disclosure as="nav" className="shadow-md navbar">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center mobilemenubutton rounded-md p-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <NavLink to={"/"}>
                    <img
                      className="h-8 w-auto"
                      src="/logo.svg"
                      alt="Reputation Manager"
                    />
                  </NavLink>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {user ? (
                      <div className="space-y-1 px-2 pb-3 pt-2">
                        {navigationAuth.concat(navigationNoAuth).map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                              classNames(
                                isActive ? "activelink" : "notactivelink",
                                "ml-1 px-3 py-2 text-sm font-medium"
                              )
                            }
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    ) :
                      (
                        <div className="space-y-1 px-2 pb-3 pt-2">
                          {navigationNoAuth.map((item) => (
                            <NavLink
                              key={item.name}
                              to={item.path}
                              className={({ isActive }) =>
                                classNames(
                                  isActive ? "activelink" : "notactivelink",
                                  "ml-1 px-3 py-2 text-sm font-medium"
                                )
                              }
                            >
                              {item.name}
                            </NavLink>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="relative rounded-full p-1 bell focus:outline-none"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                {user ? (<Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full text-sm focus:outline-none">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={imgIcon.img}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute profiledropdown right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={"profile"}
                            className={classNames(
                              active ? "profiledropdownactive" : "",
                              "block px-4 py-2 text-sm profiledropdown"
                            )}
                          >
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={""}
                            onClick={logout}
                            className={classNames(
                              active ? "profiledropdownactive" : "",
                              "block px-4 py-2 text-sm profiledropdown"
                            )}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>) : (<div className="space-y-1 px-2 pb-3 pt-2">
                  {auth.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={({ isActive }) =>
                        classNames(
                          isActive ? "activelink" : "notactivelink",
                          "px-3 py-2 text-sm font-medium"
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>)}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            {user ? (
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigationAuth.concat(navigationNoAuth).map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      classNames(
                        isActive ? "activelink" : "notactivelink",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            ) :
              (
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigationNoAuth.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={({ isActive }) =>
                        classNames(
                          isActive ? "activelink" : "notactivelink",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
