import { ColumnDef } from "@tanstack/react-table"
import { Tag } from "../shema"
import { ActionsCellTag } from "./ActionsCellTag"

export const columns: ColumnDef<Tag>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.original.id}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => <div>{row.original.slug}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCellTag tag={row.original} />,
  },
]
