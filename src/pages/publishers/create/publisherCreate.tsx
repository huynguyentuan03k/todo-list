
// import { Publisher } from "@/types/publisher.type"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "../../components/custom/DatePicker"
import { PhoneInput } from "../../components/custom/PhoneInput"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import http from "@/utils/http"
import { Publisher } from "../shema"
import { useToast } from "@/components/ui/hooks/use-toast"
import { useForm, SubmitHandler } from "react-hook-form"

const getPublisher = async (id: number | string) => http.get<Publisher>(`/publishers/${id}`);

export default function PublisherCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { register, handleSubmit } = useForm<Publisher>()
  const onSubmit: SubmitHandler<Publisher> = (data) => console.log("data ", data)

  const mutation = useMutation({
    mutationFn: getPublisher,
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
                <Input {...register('name')} id="name" placeholder="Name of your publisher" />
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
                <PhoneInput />
              </div>

              <div className="flex flex-col col-span-1 space-y-2">
                <Label htmlFor="established_year" >Established Year</Label>
                <DatePicker />
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
