import { ColumnDef } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ArrowUpDown, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Podcast } from "../schema";
import { ActionsCell } from "./ActionCell";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const columns: ColumnDef<Podcast>[] = [
  {
    accessorKey: "id",
    header: (({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          {
            column.getIsSorted() === "asc" ? (
              <ArrowUp />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown />
            ) : (
              <ArrowUpDown />
            )
          }
        </Button>
      )
    }),
    cell: ({ row }) => (

      <div className="capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "cover_url",
    header: "Cover Image",
    cell: ({ row }) => (
      <AspectRatio ratio={1.1 / 1.5} className="bg-muted rounded-none">
        {
          row.original.cover_url ?
            <img
              src={row.original.cover_url ?? undefined}
              alt="https://placehold.co/600x400"
              className="h-full w-full object-cover"
            /> : <ImageIcon
              className="h-full w-full object-cover"
            />
        }

      </AspectRatio>
    ),
  },
  {
    accessorKey: "title",
    header: (({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          {
            column.getIsSorted() === "asc" ? (
              <ArrowUp />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown />
            ) : (
              <ArrowUpDown />
            )
          }
        </Button>
      )
    }),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      // ko can responsive de max-w la md toan bo ,
      <div className="capitalize max-w-sm line-clamp-4">{row.getValue("description")}</div>
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
    accessorKey: "publisher",
    header: "publisher",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.publisher?.name}</div>
    ),
  },
  {
    // header: "Actions",
    header: () => <div className="text-blue-500">Actions</div>,
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => < ActionsCell podcast={row.original} />
  },
]
