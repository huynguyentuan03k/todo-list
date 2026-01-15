import { ChartLineLabelCustom } from "../components/custom/ChartLineLabelCustom";
import { ChartPieLegend } from "../components/custom/ChartPieLegend";
import { ChartBarLabel } from "../components/custom/BarChartLabel";
import { ChartAreaInteractive } from "../components/custom/ChartAreaInteractive";

export default function Dashboard() {
  return (
    <>
      {/*
    meo nho responsive :
    sm < 640px
    md > 768 va < 1024
    lg > 1024
    */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="sm:col-span-1 md:col-span-2 lg:col-span-3">
          <ChartAreaInteractive />
        </div>

        <ChartLineLabelCustom />
        <ChartPieLegend />
        <ChartBarLabel />
      </div>

    </>
  )
}
