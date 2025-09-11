import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterDialog() {
  return (
    <Dialog>
      {/* Nút mở dialog */}
      <DialogTrigger asChild>
        <Button className="ml-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg shadow">
          New
        </Button>
      </DialogTrigger>

      {/* Nội dung popup */}
      <DialogContent
        className="sm:max-w-[500px] rounded-xl shadow-xl bg-white border border-gray-200"
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            How to install Docker on Ubuntu 24.04
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Fill in the details below and click save.
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <form className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name-1" className="text-sm font-medium text-gray-700">
              Name
            </Label>
            <Input
              id="name-1"
              name="name"
              defaultValue="Pedro Duarte"
              className="rounded-md border-gray-300 focus:border-blue-400 focus:ring-blue-400"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="username-1" className="text-sm font-medium text-gray-700">
              Username
            </Label>
            <Input
              id="username-1"
              name="username"
              defaultValue="@peduarte"
              className="rounded-md border-gray-300 focus:border-blue-400 focus:ring-blue-400"
            />
          </div>

          {/* Footer */}
          <DialogFooter className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="rounded-md border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="rounded-md bg-blue-500 text-white hover:bg-blue-600 shadow"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
