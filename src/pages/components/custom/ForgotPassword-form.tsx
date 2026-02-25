import { cn } from "@/lib/utils"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate()
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Forgot your password?</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Please enter the email address associated with your account and we will email you a link to reset your password.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email" >Email</FieldLabel>
          <Input id="email" type="text" placeholder="example@email.com" required />

          <Button>
            Forgot Password
          </Button>

          {/* ghi đè hiệu ứng hover mặc định của button bằng cách  className="bg-transparent text-black hover:bg-gray-200" */}
          <Button
            className="bg-transparent text-black hover:bg-gray-200"
            onClick={() => navigate('/login')}
          >
            Back to Login
          </Button>

        </Field>

      </FieldGroup>
    </form>
  )
}
