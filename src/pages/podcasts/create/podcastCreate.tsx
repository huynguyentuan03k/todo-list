import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import http from "@/utils/http"
import { Podcast } from "../schema"
import { useToast } from "@/components/ui/hooks/use-toast"
import { useForm, SubmitHandler } from "react-hook-form"
import { AxiosError } from "axios"

/**
 * {
  "message": "The given data was invalid.",
  "errors": {
    "email": [
      "The email has already been taken."
    ],
    "name": [
      "The name field is required."
    ]
  }
}
Record<string, string[]> la kiểu dựng sẵn (utility type) trong TypeScript.
- errors là một object
- Key: tên field (vd: "email", "name") → string
- Value: mảng chứa các message → string[]
*/

type LaravelValidationError = {
  message: string;
  errors: Record<string, string[]>;
};

async function createPodcast(data: Podcast) {
  return http.post<Podcast>(`/podcasts`, data);
}

export default function PodcastCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const { control, register, handleSubmit, setValue, formState: { errors } } = useForm<Podcast>()

  const onSubmit: SubmitHandler<Podcast> = (data) => {
    mutation.mutate(data)
  }

  const mutation = useMutation({
    mutationFn: createPodcast,
    onSuccess: () => {
      toast({
        title: "create podcast successfully",
        description: "podcast has been store.",
      });
      navigate('/portal/podcasts')
    },
    onError: (error: AxiosError<LaravelValidationError>) => { // axios faild luon tra ra AxiosError<T>
      const backendMessage = error?.response?.data?.message || "Something went wrong";
      toast({
        title: "update podcast failed",
        description: backendMessage,
        variant: "destructive",
      });
    }

  })

  return (
    <div>
      <Button className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg mb-2" onClick={() => navigate(-1)}>Back</Button>
      <Card>
        <CardHeader>
          <CardTitle>Create Publisher</CardTitle>
          <CardDescription>description Create Publisher</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid grid-cols-3 gap-x-4 gap-y-6">

              <div className="flex flex-col col-span-1 space-y-2 ">
                <Label htmlFor="name">Title</Label>
                <Input {...register('title', { required: true })} id="title" placeholder="Title of your publisher" />
                {errors.title && <span className="text-xs text-red-500">This field is required</span>}
              </div>

              <div className="flex flex-col col-span-1 space-y-2 ">
                <Label htmlFor="description" >Description</Label>
                <Input  {...register('description')} id="description" placeholder="description of your" />
              </div>

              <div className="flex flex-col col-span-1 space-y-2">
                <Label htmlFor="publisher_id" >publisher</Label>
                <Input  {...register('publisher_id')} id="publisher_id" placeholder="publisher of your" />
              </div>

              <div className="flex flex-col col-span-1 space-y-2">
                <Label htmlFor="slug" >slug</Label>
                <Input  {...register('slug')} id="slug" placeholder="publisher of your" />
              </div>

            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
            >Save</Button>
          </CardFooter>
        </form>
      </Card>
    </div >
  )
}
