import { AudioTrackList } from "@/components/audio/track"
import { useAudioStore } from "@/lib/audio-store"
import { toast } from "sonner";

export default function ExternalQueueList() {

  const queue = useAudioStore((state) => state.queue);
  console.log("re-render")
  return (
    <AudioTrackList
      tracks={queue}
      onTrackSelect={(index) => {
        const track = queue[index];
        toast.info(`Playing ${track?.title}`);
      }}
      sortable
      variant={'grid'}
    />

  )
}
