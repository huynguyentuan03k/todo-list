import SearchBox from "@/pages/components/custom/SearchBox"
import { NavLink, Outlet } from "react-router-dom"

export default function Root() {

  return (
    <div className="h-screen grid grid-cols-[350px_1fr]">
      {/* Sidebar */}
      <div className="border-r border-gray-200 bg-gray-50 flex flex-col">
        {/* Search + New */}
        <div className="p-4 space-y-2 bg-gray-200">
          <SearchBox />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2 px-4">
            <li>
              <NavLink
                to="/"
                className={
                  ({ isActive }) => ` ${isActive ? 'bg-blue-200 text-blue-700' : ''} block rounded-md px-2 py-1 hover:bg-blue-100 font-medium`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/portal/publishers"
                className={
                  ({ isActive }) => ` ${isActive ? 'bg-blue-200 text-blue-700' : ''} block rounded-md px-2 py-1 hover:bg-blue-100 font-medium`
                }
              >
                Publishers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/portal/categories"
                className={
                  ({ isActive }) => ` ${isActive ? 'bg-blue-200 text-blue-700' : ''} block rounded-md px-2 py-1 hover:bg-blue-100 font-medium`
                }
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/portal/authors"
                className={
                  ({ isActive }) => ` ${isActive ? 'bg-blue-200 text-blue-700' : ''} block rounded-md px-2 py-1 hover:bg-blue-100 font-medium`
                }
              >
                Authors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/portal/episodes"
                className={
                  ({ isActive }) => ` ${isActive ? 'bg-blue-200 text-blue-700' : ''} block rounded-md px-2 py-1 hover:bg-blue-100 font-medium`
                }
              >
                Episodes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/portal/podcasts"
                className={
                  ({ isActive }) => ` ${isActive ? 'bg-blue-200 text-blue-700' : ''} block rounded-md px-2 py-1 hover:bg-blue-100 font-medium`
                }
              >
                Podcasts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/epub"
                className={
                  ({ isActive }) => ` ${isActive ? 'bg-blue-200 text-blue-700' : ''} block rounded-md px-2 py-1 hover:bg-blue-100 font-medium`
                }
              >
                Epub
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/portal/settings"
                className={
                  ({ isActive }) => ` ${isActive ? 'bg-blue-200 text-blue-700' : ''} block rounded-md px-2 py-1 hover:bg-blue-100 font-medium`
                }
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>

        <h1 className="text-lg font-semibold px-4 py-3 border-t">
          React Router Contacts
        </h1>
      </div>

      {/* Detail */}
      <div id="detail" className="p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
