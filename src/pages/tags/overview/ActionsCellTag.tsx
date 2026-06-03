import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/hooks/use-toast"
import { Tag } from "../shema"
import { deleteTag } from "@/apis/tags.api"

export function ActionsCellTag({ tag }: { tag: Tag }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: (id: number) => deleteTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] })
      toast({
        title: "Delete tag successfully",
        description: "Tag has been removed.",
      })
    },
  })

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={() => navigate(`/portal/tags/${tag.id}/show`)}>
        View
      </Button>
      <Button variant="outline" onClick={() => navigate(`/portal/tags/${tag.id}/edit`)}>
        Edit
      </Button>
      <Button variant="destructive" onClick={() => mutation.mutate(tag.id)}>
        Delete
      </Button>
    </div>
  )
}
