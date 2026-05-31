import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function HeaderPage() {
  const navigate = useNavigate()
  return (
    <>
      <Button
        onClick={() => navigate(-1)}
      >Back</Button>
    </>
  )
}
