import { ColumnDef } from "@tanstack/react-table"
import { User } from "../shema"
import { ActionsCellUser } from "./ActionsCellUser"

export const columns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID", cell: ({ row }) => row.original.id },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { id: "actions", header: "Actions", cell: ({ row }) => <ActionsCellUser user={row.original} /> },
]
