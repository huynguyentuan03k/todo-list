import { ColumnDef } from "@tanstack/react-table"
import { Activity } from "../shema";
import ActionsCellAuthor from "./ActionsCellActivity";

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "log_name",
    header: "Log Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("log_name")}</div>
    ),
  },
  {
    accessorKey: "event",
    header: "Event",
    cell: ({ row }) => (
      <div className="capitalize line-clamp-3">{row.getValue("event")}</div>
    ),
  },
  {
    accessorKey: "subject_type",
    header: "Subject Type",
    cell: ({ row }) => (
      <div className="capitalize line-clamp-3">{row.getValue("subject_type")}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created_at",
    cell: ({ row }) => (
      <div className="capitalize line-clamp-3">{row.getValue("created_at")}</div>
    ),
  },
  {
    accessorKey: "updated_at",
    header: "Updated_at",
    cell: ({ row }) => (
      <div className="capitalize line-clamp-3">{row.getValue("updated_at")}</div>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => < ActionsCellAuthor activity={row.original} />
  },
]
