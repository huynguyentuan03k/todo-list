import { ColumnDef } from "@tanstack/react-table"
import { Author } from "../shema";
import ActionsCellAuthor from "./ActionsCellAuthor";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";


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
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => (
      <Avatar className="h-16 w-16">
        <AvatarImage src={row.original.avatar_url ?? undefined} />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "bio",
    header: "Bio",
    cell: ({ row }) => (
      <div className="capitalize line-clamp-3">{row.getValue("bio")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="capitalize line-clamp-3">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => (
      <div className="capitalize line-clamp-3">{row.getValue("website")}</div>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => < ActionsCellAuthor author={row.original} />
  },
]
