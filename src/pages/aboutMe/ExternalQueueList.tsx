import { AudioTrackList } from "@/components/audio/track"
import { useAudioStore } from "@/lib/audio-store"
import { toast } from "sonner";

export default function ExternalQueueList() {

  const queue = useAudioStore((state) => state.queue);

  return (
    
    <AudioTrackList
      onTrackSelect={(index) => {
        const track = queue[index];
        toast.info(`Playing ${track?.title}`);
      }}
      sortable
      variant={'grid'}
    />

  )
}
