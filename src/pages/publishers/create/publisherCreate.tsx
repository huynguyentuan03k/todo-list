import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PhoneInput } from "../../components/custom/PhoneInput"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import http from "@/utils/http"
import { Publisher } from "../shema"
import { useToast } from "@/components/ui/hooks/use-toast"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { YearSelect } from "@/pages/components/custom/YearSelect"

async function createPublisher(data: Publisher) {
  return http.post<Publisher>(`/publishers`, data);
}

export default function PublisherCreate() {

  const navigate = useNavigate()
  const { toast } = useToast()
  const { control, register, handleSubmit, setValue, formState: { errors } } = useForm<Publisher>()

  const onSubmit: SubmitHandler<Publisher> = (data) => {
    mutation.mutate(data)
  }

  const mutation = useMutation({
    mutationFn: createPublisher,
    onSuccess: () => {
      toast({
        title: "update publisher successfully",
        description: "publisher has been store.",
      })
    },
    onError: () => {
      toast({
        title: "update publisher error",
        description: "cannot update publisher .",
      })
    },
  })

  return (
    <div>
      <Button className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg" onClick={() => navigate(-1)}>Back</Button>
      <Card>
        <CardHeader>
          <CardTitle>Create Publisher</CardTitle>
          <CardDescription>description Create Publisher</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid grid-cols-3 gap-x-4 gap-y-6">

              <div className="flex flex-col col-span-1 space-y-2 ">
                <Label htmlFor="name">Name</Label>
                <Input {...register('name', { required: true })} id="name" placeholder="Name of your publisher" />
                {errors.name && <span className="text-xs text-red-500">This field is required</span>}
              </div>

              <div className="flex flex-col col-span-1 space-y-2 ">
                <Label htmlFor="address" >Address</Label>
                <Input  {...register('address')} id="address" placeholder="address of your" />
              </div>

              <div className="flex flex-col col-span-1 space-y-2">
                <Label htmlFor="email" >Email</Label>
                <Input  {...register('email')} id="email" placeholder="email of your" />
              </div>

              <div className="flex flex-col col-span-1 space-y-2">
                <Label htmlFor="website" >Website</Label>
                <Input  {...register('website')} id="website" placeholder="website of your" />
              </div>

              <div className="flex flex-col col-span-1 space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <PhoneInput
                  onChange={(value) => setValue('phone', value)}
                />
              </div>

              <div className="flex flex-col col-span-1 space-y-2">
                <Label htmlFor="updated_at" >Established Year</Label>
                {/*
                  value: giá trị hiện tại của field
                  onChange: callback khi field thay đổi
                  onBlur: callback khi mất focus
                  1 name: tên field (để form biết đây là field gì)
                  2 value={field.value}          // giá trị hiện tại
                  3 onChange={field.onChange}    // gọi khi thay đổi
                  4 onBlur={field.onBlur}        // khi mất focus
                  5 ref={field.ref}              // tham chiếu tới input (nếu cần)
                */}
                <Controller
                  name="established_year"
                  control={control}
                  render={({ field }) => (
                    <YearSelect
                      onChange={(value) => field.onChange(Number(value))}
                      value={field.value}
                    // conflict type , cach 1 dung ep kieu as, cach 2 dung doi schema, cach 3 convert
                    />
                  )}
                />
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
