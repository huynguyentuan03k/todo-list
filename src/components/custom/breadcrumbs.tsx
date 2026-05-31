import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function Breadcrumbs() {
  const location = useLocation()
  // ham filter nhao vao gia tri gi thi tra ra gia tri do.
  const arrUrl = location.pathname.split('/').filter(n => n !== 'portal' && n != '')

  return (
    <Breadcrumb >
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {
          arrUrl.map((item, index) => {
            const isLast = index === (arrUrl.length - 1)
            return (
              <>
                <BreadcrumbItem>
                  {
                    isLast ? (
                      <span className="capitalize">{item}</span>
                    ) : (
                      <>
                      <BreadcrumbLink href={`/portal/${item}`}>{item}</BreadcrumbLink>
                      <BreadcrumbSeparator />
                      </>
                    )
                  }
                </BreadcrumbItem>
              </>
            )
          })
        }
      </BreadcrumbList>
    </Breadcrumb>
  )
}
