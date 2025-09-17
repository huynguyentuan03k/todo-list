import { ColumnDef } from "@tanstack/react-table"
import { Publisher } from "../../types/publisher.type"

export const columns: ColumnDef<Publisher>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "website",
    header: "Website",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
]
