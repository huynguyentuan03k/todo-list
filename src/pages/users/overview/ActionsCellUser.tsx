import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/hooks/use-toast"
import { User } from "../shema"
import { deleteUser } from "@/apis/users.api"

export function ActionsCellUser({ user }: { user: User }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const mutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast({ title: "Delete user successfully" })
    },
  })
  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={() => navigate(`/portal/users/${user.id}/show`)}>View</Button>
      <Button variant="outline" onClick={() => navigate(`/portal/users/${user.id}/edit`)}>Edit</Button>
      <Button variant="destructive" onClick={() => mutation.mutate(user.id)}>Delete</Button>
    </div>
  )
}
