import SearchBox from "@/pages/components/custom/SearchBox"
import { Link, Outlet } from "react-router-dom"

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
              <Link
                to="/"
                className="block rounded-md px-2 py-1 hover:bg-blue-100 font-medium"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/portal/publishers"
                className="block rounded-md px-2 py-1 hover:bg-blue-100 font-medium"
              >
                Publishers
              </Link>
            </li>
            <li>
              <Link
                to="/portal/categories"
                className="block rounded-md px-2 py-1 hover:bg-blue-100 font-medium"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="/portal/categories"
                className="block rounded-md px-2 py-1 hover:bg-blue-100 font-medium"
              >
                Authors
              </Link>
            </li>
            <li>
              <Link
                to="/portal/categories"
                className="block rounded-md px-2 py-1 hover:bg-blue-100 font-medium"
              >
                Episodes
              </Link>
            </li>
            <li>
              <Link
                to="/portal/categories"
                className="block rounded-md px-2 py-1 hover:bg-blue-100 font-medium"
              >
                Podcasts
              </Link>
            </li>
            <li>
              <Link
                to="/epub"
                className="block rounded-md px-2 py-1 hover:bg-blue-100 font-medium"
              >
                Epub
              </Link>
            </li>
            <li>
              <Link
                to="/portal/settings"
                className="block rounded-md px-2 py-1 hover:bg-blue-100 font-medium"
              >
                Settings
              </Link>
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
