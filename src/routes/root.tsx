import SearchBox from "@/pages/components/custom/SearchBox"
import { Link, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUsers } from "@/apis/users.api"
import { Users } from "@/types/users.type"

export default function Root() {
  const [users, setUsers] = useState<Users | []>([])

  useEffect(() => {
    getUsers(1, 100)
      .then((data) => data)
      .then((response) => setUsers(response.data))
  }, [])

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
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block rounded-md px-2 py-1 hover:bg-blue-100 font-medium"
              >
                About
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
          </ul>

          {/* Users (contacts) */}
          {users && users.length > 0 ? (
            <ul className="mt-4 space-y-1 px-4">
              {users.map((student) => (
                <li key={student.id}>
                  <Link
                    to={`/contacts/${student.id}`}
                    className="block rounded-md px-2 py-1 hover:bg-blue-100 text-blue-700 font-medium"
                  >
                    {student.email}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4">
              <i>No Contacts</i>
            </p>
          )}
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
