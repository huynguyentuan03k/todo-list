import { useEffect } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { getUser, updateUser } from "@/apis/users.api"
import { SpinnerLoading } from "@/components/custom/SpinnerLoading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/hooks/use-toast"
import { UserSchema, type UserForm } from "../shema"

export default function UserEdit() {
  const { id } = useParams()
  const form = useForm<UserForm>({ defaultValues: { name: "", email: "", password: "" } })
  const { data, isLoading } = useQuery({ queryKey: ["user", id], queryFn: () => getUser(Number(id)) })
  const navigate = useNavigate()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  useEffect(() => {
    if (data?.data?.data) {
      const user = UserSchema.parse(data.data.data)
      form.reset({ name: user.name ?? "", email: user.email ?? "", password: "" })
    }
  }, [data, form])
  const mutation = useMutation({
    mutationFn: (payload: UserForm) => updateUser(Number(id), payload as never),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast({ title: "Update user successfully" })
      navigate("/portal/users")
    },
  })
  if (isLoading) return <SpinnerLoading />
  return (
    <Card>
      <CardHeader><CardTitle>Edit User</CardTitle></CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))}>
          <CardContent className="grid gap-4">
            <FormField control={form.control} name="name" render={({ field }) => <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
            <FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
            <FormField control={form.control} name="password" render={({ field }) => <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl></FormItem>} />
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>Back</Button>
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
