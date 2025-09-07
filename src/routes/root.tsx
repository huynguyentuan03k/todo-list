import SearchBox from "@/pages/components/custom/SearchBox";
import { Link, Outlet, } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudents } from "@/apis/students.api";
import { Students } from "@/types/students.type";


export default function Root() {
  const [students, setStudents] = useState<Students | []>([])

  useEffect(() => {
    getStudents(1, 100)
      .then(function (data) {
        console.log("data then 1 ", data)
        return data
      })
      .then(response =>
        setStudents(response.data)
      )
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
          {students && students.length > 0 ? (
            <ul className="space-y-1 px-4">
              {students.map((student) => (
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
        <h1 className="text-lg font-semibold px-4 py-3 border-b">React Router Contacts</h1>
      </div>

      {/* Detail */}
      <div id="detail" className="p-6 overflow-y-auto">
        <Outlet />
      </div>

    </div>
  );
}
