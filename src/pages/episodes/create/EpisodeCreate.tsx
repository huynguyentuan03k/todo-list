import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { Episode, episodeForm } from "../shema"
import { useToast } from "@/components/ui/hooks/use-toast"
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { AxiosError } from "axios"
import { Textarea } from "@/components/ui/textarea"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { comboboxOption, ComboboxSelect } from "@/pages/components/custom/ComboboxSelect"
import { Podcasts } from "@/pages/podcasts/schema"
import ValidationUrlAudio from "@/pages/components/custom/ValidationUrlAudio"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import React from "react"

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

async function createEpisode(data: episodeForm) {
  return http.post<Episode>(`/episodes`, data);
}

export default function EpisodeCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [value, setValue] = React.useState("")

  const mutation = useMutation({
    mutationFn: createEpisode,
    onSuccess: () => {
      toast({
        title: "create episode successfully",
        description: "episode has been store.",
      });
      navigate(-1)
    },
    onError: (error: AxiosError<LaravelValidationError>) => { // axios faild luon tra ra AxiosError<T>
      const backendMessage = error?.response?.data?.message || "Something went wrong";
      toast({
        title: "update episode failed",
        description: backendMessage,
        variant: "destructive",
      });
    }
  })


  const form = useForm<episodeForm>({
    defaultValues: {
      title: '',
      description: '',
      audio_path: '',
      slug: '',
      episodes: [
        {
          audio_path: '', title: '', slug: '', description: ''
        }
      ]

    }
  })

  const { fields, append, prepend, insert, swap, remove } = useFieldArray({
    name: 'episodes',
    control: form.control
  })

  const onSubmit: SubmitHandler<episodeForm> = (data) => {
    const fieldsArray = data.episodes
    const payload = {
      ...data,
      title: `${data.title}  ${Number(value)}`,
      slug: `${data.slug} ${Number(value)}`,
      episodes: fieldsArray.map((item, index) =>
        index === 0 ?
          {
            ...item,
            slug: `${data.slug} ${(Number(value) + index + 1)}`,
            podcast_id: data.podcast_id,
            title: `${data.title} ${Number(value) + index + 1}`
          } :
          {
            ...item,
            podcast_id: data.podcast_id,
            slug: `${data.slug} ${(Number(value) + index + 1)}`,
            title: `${data.title} ${Number(value) + index + 1}`
          }
      )
    }

    console.log('debug ', payload)
    mutation.mutate(payload)
  }

  const { data: podcastOptions } = useQuery<comboboxOption[] | undefined>({
    queryKey: ['pocasts'],
    queryFn: async () => {
      const res = await http.get<{ data: Podcasts }>('/podcasts');
      return res.data.data.map(item => ({
        value: item.id,
        label: item.title
      })) ?? []
    }
  })
  console.log("re-render ", value)
  return (
    <div>
      <div className="flex justify-between">
        <Breadcrumbs />
        <Button className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg mb-2" onClick={() => navigate(-1)}>Back</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Create Episode</CardTitle>
          <CardDescription>description Create Episode</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              {/**
                * sm sẽ là >= 640
                  md là >= 768
                  lg là >= 1024
                  nếu ko ghi gì thì là <640px
                  tức là: grid-cols-1
                *
                */}
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-x-4 gap-y-6">

                <div className="lg:col-span-1 md:col-span-2 ">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            // type text luon tra ra string , 'abc', '',
                            type="text"
                            placeholder="Title of Podcast"
                            {...field}
                          />
                        </FormControl>
                        <div>
                          <InputOTP maxLength={2} defaultValue="01"
                            onChange={(value) => setValue(value)}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="lg:col-span-1 md:col-span-2  ">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder=""
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="lg:col-span-1 md:col-span-2  ">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input
                            // type text luon tra ra string , 'abc', '',
                            type="text"
                            placeholder="Title of Podcast"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="lg:col-span-1 md:col-span-2  ">
                  <FormField
                    control={form.control}
                    name="podcast_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>podcast Id</FormLabel>
                        <FormControl>
                          <ComboboxSelect
                            /***
                            nguyen tac : chi duoc truyen vao 1 number
                            - muon hien thi gi vao component ma load len
                            const field = {
                              value: 3,
                              onChange: (value: number) => {},
                              onBlur: () => {},
                              name: "podcast_id",
                              ref: () => {}
                            }
                              <ComboboxSelect
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                              />
                            */
                            options={podcastOptions ?? []}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                  <FormField
                    control={form.control}
                    name="audio_path"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Audio Url</FormLabel>
                        <FormControl>
                          <ValidationUrlAudio
                            url={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-2 mt-11">
                {
                  fields.map((field, index) => (
                    <div className="lg:col-span-1 md:col-span-2">
                      <FormField
                        key={field.id}
                        control={form.control}
                        name={`episodes.${index}.audio_path`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Audio Url {(Number(value) + index + 1)}</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))
                }
              </div>

            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                type="button"
                onClick={() => append({
                  title: form.getValues('title'),
                  description: '',
                  audio_path: '',
                  podcast_id: form.getValues('podcast_id'),
                  slug: form.getValues('slug')
                })}
              >append</Button>
              <Button
                type="button"
                // giá trị truyền vào là index của array , tức là index của array episodes
                onClick={() => remove(fields.length - 1)}
              >remove</Button>
              <Button
                type="submit"
                className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
              >Save</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div >
  )
}
