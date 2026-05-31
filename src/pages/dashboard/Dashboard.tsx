import { ChartLineLabelCustom } from "../../components/custom/ChartLineLabelCustom";
import { ChartPieLegend } from "../../components/custom/ChartPieLegend";
import { ChartBarLabel } from "../../components/custom/BarChartLabel";
import { ChartAreaInteractive } from "../../components/custom/ChartAreaInteractive";

export default function Dashboard() {
  return (
    <div >
      <div>
        <div>
          <ChartAreaInteractive />
        </div>

        <ChartLineLabelCustom />
        <ChartPieLegend />
        <ChartBarLabel />
      </div>

    </div>
  )
}
