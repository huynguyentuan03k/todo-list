import { ColumnDef } from "@tanstack/react-table"
import { Author } from "../shema";
import ActionsCellAuthor from "./ActionsCellAuthor";


export const columns: ColumnDef<Author>[] = [
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
    cell: ({ row }) => < ActionsCellAuthor author={row.original} />
  },
]
