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
import { Podcast } from "../schema";
import { IconCircleX, IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function ActionsCell({ podcast }: { podcast: Podcast }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  function deletePodcast(id: number | string) {

    return http.delete(`/podcasts/${id}`)
  };

  const mutation = useMutation({
    mutationFn: (id: number) => deletePodcast(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['podcasts']
      });
      toast({
        title: "update podcast successfully",
        description: "podcast has been store.",
      })
    },
    onError: (err) => {
      console.error("Delete failed ", err)
    }
  })
  return (
    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>

      {/* section icon Preview Content */}
      <AlertDialog>

        {/* this is a show tooltip */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <IconEye
                  size={20}
                  className="text-green-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                />
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent className="bg-green-400 text-white px-3 py-1 rounded-md text-sm shadow-lg">
              Preview Content
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* this is a dialog of icon preview content*/}
        {/* trong component kich thuoc toi da chi la 512px tuc la 32rem thuoc tinh css la max-w-lg , muon width to hon phai ghi de css  */}
        <AlertDialogContent
          className="lg:max-w-7xl"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Preview Content of : {podcast.title}</AlertDialogTitle>
          </AlertDialogHeader>

          {/* parse tu text thuan sang html dung dangerouslySetInnerHTML */}
          <div
            className="max-h-[80vh] overflow-auto"
            dangerouslySetInnerHTML={{ __html: podcast.content ?? "" }}
          >
          </div>

          <AlertDialogFooter>

            <AlertDialogCancel asChild>
              <Button
                className="bg-transparent hover:bg-black hover:text-white text-black font-medium border-none shadow-slate-400"
              >
                <IconCircleX />
                Close
              </Button>
            </AlertDialogCancel>

            {/* trong shadcn AlertDialog chỉ cho phép điều khiển bằng Action / Cancel, muon click va thuc hien logic phai asChild, tuc la truyen vao cho 1 element tiep theo va thuoc tinh trong element do  */}
            <AlertDialogCancel asChild>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  // su dung hash de di chuyen de doan editer, trong component editor phai co id cho the div
                  navigate(`/portal/podcasts/${podcast.id}/edit#cc`)
                }}
                className="bg-white hover:bg-black hover:text-white text-black font-medium border-none shadow-slate-400"
              >
                <IconEdit />
                Edit
              </Button>
            </AlertDialogCancel>

          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>

      {/* section icon edit */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <IconEdit
              size={20}
              className="text-blue-500  cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/portal/podcasts/${podcast.id}/edit`)
              }}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm shadow-lg">
            Edit
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>



      {/* section icon remove */}
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
              onClick={() => mutation.mutate(podcast.id)}
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
