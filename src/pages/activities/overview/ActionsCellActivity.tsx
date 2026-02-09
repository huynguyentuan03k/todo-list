import { Activity } from "../shema"
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
export default function ActionsCellActivity({ activity }: { activity: Activity }) {

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  function deleteAuthor(id: number | string) {

    return http.delete(`/activities/${id}`)
  };

  const mutation = useMutation({
    mutationFn: (id: number) => deleteAuthor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['Activities']
      });
      toast({
        title: "delete activity successfully",
        description: "activity has been unstore.",
      })
    },
    onError: (err) => {
      console.error("Delete failed ", err)
    }
  })

  return (
    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>

    </div >

  )
}
