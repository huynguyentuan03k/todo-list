
import ExternalQueueList from "./ExternalQueueList";
import SectionOne from "./SectionOne";
import SinglePlayerQueue from "./SinglePlayerQueue";

export default function AboutMe() {
  return (

    <div>
      <SectionOne />
      <div className="grid lg:col-span-2 p-3">
        <ExternalQueueList />
      </div>
      <div>
        <SinglePlayerQueue />
      </div>
    </div>

  )
}
