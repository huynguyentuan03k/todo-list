import { Search } from "lucide-react";
import { Form } from "react-router-dom"
import { RegisterDialog } from "./RegisterUserDialog";
export default function SearchBox() {
  return (
    <Form method="post" className="flex items-center">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          id="q"
          aria-label="Search contacts"
          placeholder="Search"
          type="search"
          name="q"
          className="w-full rounded-md border border-gray-300 pl-8 pr-2 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </div>
      <RegisterDialog />
    </Form>
  );
}
