import { ColumnDef } from "@tanstack/react-table"
import { Episode } from "@/pages/episodes/shema";
import ActionsCellEpisode from "./ActionsCellEpisode";


export const columnsEpisode: ColumnDef<Episode>[] = [
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
    accessorKey: "Cover Image",
    header: "Cover Image",
    cell: ({ row }) => (
      <div>{row.getValue("cover_image") ?? ''}</div>
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
    cell: ({ row }) => < ActionsCellEpisode episode={row.original} />
  },
]
