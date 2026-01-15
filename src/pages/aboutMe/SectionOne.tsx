import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function SectionOne() {
  return (
    <div className="w-full">

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {/* ===== JENKINS ===== */}
        <Link
          to="https://jenkins.huynguyen-nginx.io.vn/"
          target="_blank"
        >
          <Card className="h-full">
            <CardContent className="p-4 flex items-center justify-center">
              <div className="w-full aspect-[16/9]">
                <img
                  src="https://frieren.io.vn/jenkins.png"
                  alt="Jenkins"
                  className="w-full h-full object-contain"
                />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* ===== SWAGGER ===== */}
        <Link
          to="https://huynguyen-nginx.io.vn/api/documentation"
          target="_blank"
        >
          <Card className="h-full">
            <CardContent className="p-4 flex items-center justify-center">
              <div className="w-full aspect-[16/9]">
                <img
                  src="https://frieren.io.vn/swagger.webp"
                  alt="Swagger"
                  className="w-full h-full object-contain"
                />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* ===== CỘT PHẢI ===== */}

        {/* GRAFANA */}
        <Link
          to="https://grafana.huynguyen-nginx.io.vn"
          target="_blank"
        >
          <Card className="h-full">
            <CardContent className="p-4 flex items-center justify-center">
              <div className="w-full aspect-[16/9]">
                <img
                  src="https://frieren.io.vn/grafana.png"
                  alt="Grafana"
                  className="w-full h-full object-contain"
                />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* FACEBOOK + GITHUB */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="https://www.facebook.com/tuanhuy.nguyen.56808/" target="_blank">
            <Card className="h-full">
              <CardContent className="p-3 flex items-center justify-center">
                <div className="w-full aspect-square">
                  <img
                    src="https://frieren.io.vn/facebook.png"
                    alt="Facebook"
                    className="w-full h-full object-contain"
                  />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="https://github.com/huynguyentuan03k" target="_blank">
            <Card className="h-full">
              <CardContent className="p-3 flex items-center justify-center">
                <div className="w-full aspect-square">
                  <img
                    src="https://frieren.io.vn/github.png"
                    alt="Github"
                    className="w-full h-full object-contain"
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

    </div >
  );
}
