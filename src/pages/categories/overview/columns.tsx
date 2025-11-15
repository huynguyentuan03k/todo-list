import { ColumnDef } from "@tanstack/react-table"
import { Category } from "../shema";
import ActionsCellCategory from "./ActionsCellCategory";


export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize line-clamp-3">{row.getValue("description")}</div>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => < ActionsCellCategory category={row.original} />
  },
]
