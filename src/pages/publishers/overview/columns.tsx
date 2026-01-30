import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Publisher } from "../shema";
import { ActionsCell } from "./ActionCell";

export const columns: ColumnDef<Publisher>[] = [
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
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("address")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("website")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "established_year",
    header: "Established Year",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("established_year")}</div>
    ),
  },
  {
    // header: "Actions",
    header: () => <div className="text-blue-500">Actions</div>,
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => < ActionsCell publisher={row.original} />
  },
]
