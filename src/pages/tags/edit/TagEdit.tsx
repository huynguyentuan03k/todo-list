import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SpinnerLoading } from "@/components/custom/SpinnerLoading"
import { useToast } from "@/components/ui/hooks/use-toast"
import { getTag, updateTag } from "@/apis/tags.api"
import { TagSchema, type TagForm } from "../shema"

export default function TagEdit() {
  const { id } = useParams()
  const form = useForm<TagForm>({ defaultValues: { name: "", slug: "" } })
  const navigate = useNavigate()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ["tag", id], queryFn: () => getTag(Number(id)) })

  useEffect(() => {
    if (data?.data?.data) {
      const tag = TagSchema.parse(data.data.data)
      form.reset({ name: tag.name ?? "", slug: tag.slug ?? "" })
    }
  }, [data, form])

  const mutation = useMutation({
    mutationFn: (payload: TagForm) => updateTag(Number(id), payload as unknown as never),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] })
      toast({ title: "Update tag successfully" })
      navigate("/portal/tags")
    },
  })

  if (isLoading) return <SpinnerLoading />

  return (
    <Card>
      <CardHeader><CardTitle>Edit Tag</CardTitle></CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))}>
          <CardContent className="grid gap-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )} />
            <FormField control={form.control} name="slug" render={({ field }) => (
              <FormItem><FormLabel>Slug</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )} />
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
