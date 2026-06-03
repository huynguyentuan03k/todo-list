import { ChartLineLabelCustom } from "../../components/custom/ChartLineLabelCustom";
import { ChartPieLegend } from "../../components/custom/ChartPieLegend";
import { ChartBarLabel } from "../../components/custom/BarChartLabel";
import { ChartAreaInteractive } from "../../components/custom/ChartAreaInteractive";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-border/70 bg-background/80 p-4 shadow-sm backdrop-blur sm:p-6 lg:p-8">
        <ChartAreaInteractive />
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-3xl border border-border/70 bg-background/80 p-4 shadow-sm backdrop-blur sm:p-6 xl:col-span-2">
          <ChartLineLabelCustom />
        </section>

        <section className="rounded-3xl border border-border/70 bg-background/80 p-4 shadow-sm backdrop-blur sm:p-6">
          <ChartPieLegend />
        </section>
      </div>

      <section className="rounded-3xl border border-border/70 bg-background/80 p-4 shadow-sm backdrop-blur sm:p-6 lg:p-8">
        <ChartBarLabel />
      </section>
    </div>
  )
}
