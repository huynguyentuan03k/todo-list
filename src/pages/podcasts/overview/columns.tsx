import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Podcast } from "../schema";
import { ActionsCell } from "./ActionCell";

export const columns: ColumnDef<Podcast>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => (

      <div className="capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "slug",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Slug
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("slug")}</div>,
  },
  {
    accessorKey: "cover_image",
    header: "Cover Image",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("cover_image")}</div>
    ),
  },
  {
    accessorKey: "publisher",
    header: "Publisher",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("publisher")}</div>
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
