import { ColumnDef } from "@tanstack/react-table"
import { IconEdit, IconTrash } from '@tabler/icons-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useNavigate } from "react-router-dom";
import http from "@/utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/hooks/use-toast";
import { Category } from "../shema";

function ActionsCell({ category }: { category: Category }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  function deleteCategory(id: number | string) {

    return http.delete(`/categories/${id}`)
  };

  const mutation = useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories']
      });
      toast({
        title: "update category successfully",
        description: "category has been store.",
      })
    },
    onError: (err) => {
      console.error("Delete failed ", err)
    }
  })

  return (
    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <IconEdit
              size={20}
              className="text-blue-500  cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/portal/categories/${category.id}/edit`)
              }}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm shadow-lg">
            Edit
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* tooltip and alertDialog */}
      <AlertDialog>

        {/* tooltip */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild
              >
                <IconTrash
                  size={20}
                  className=" text-red-500 cursor-pointer"
                />
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent className="bg-red-500 text-white">
              Remove
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* dialog */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => mutation.mutate(category.id)}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Deleting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>


      </AlertDialog>
    </div >

  )
}

export const columns: ColumnDef<Category>[] = [
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
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => < ActionsCell category={row.original} />
  },
]
