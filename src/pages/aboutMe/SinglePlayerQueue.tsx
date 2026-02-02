import {
  AudioPlayer,
  AudioPlayerControlBar,
  AudioPlayerControlGroup,
  AudioPlayerPlay,
  AudioPlayerSeekBar,
  AudioPlayerSkipBack,
  AudioPlayerSkipForward,
  AudioPlayerTimeDisplay,
  AudioPlayerVolume,
} from "@/components/audio/player";
import { AudioPlaybackSpeed } from "@/components/audio/playback-speed";
import {
  AudioQueue,
  AudioQueuePreferences,
  AudioQueueRepeatMode,
  AudioQueueShuffle,
} from "@/components/audio/queue";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAudioStore } from "@/lib/audio-store";
import { useRef } from "react";
import { useAudio } from "@/hooks/use-audio";

export default function SinglePlayerQueue() {
  const unlockedRef = useRef(false);
  const { htmlAudio } = useAudio();

  /**  unlock audio on first interaction */
  const unlockAudio = async () => {
    if (unlockedRef.current) return;

    const audio = htmlAudio.getAudioElement();
    if (!audio) return;

    try {
      await audio.play();
      audio.pause();
      unlockedRef.current = true;
      console.log(" Audio unlocked");
    } catch { }
  };

  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: "Những ký ức không phai",
      artist: "Frieren Podcast",
      album: "Frieren.io.vn",
      artwork: [
        {
          src: "/cover-512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/cover-1024.png",
          sizes: "1024x1024",
          type: "image/png",
        },
      ],
    });

    navigator.mediaSession.setActionHandler("play", () => {
      useAudioStore.getState().play();
    });

    navigator.mediaSession.setActionHandler("pause", () => {
      useAudioStore.getState().pause();
    });

    navigator.mediaSession.setActionHandler("previoustrack", () => {
      useAudioStore.getState().previous();
    });

    navigator.mediaSession.setActionHandler("nexttrack", () => {
      useAudioStore.getState().next();
    });
  }

  console.log("re-render media")
  return (
    <TooltipProvider>
      <div onClick={unlockAudio}>
        <AudioPlayer>
          <AudioPlayerControlBar variant="stacked">
            <AudioPlayerControlGroup>
              <AudioPlayerTimeDisplay />
              <AudioPlayerSeekBar />
              <AudioPlayerTimeDisplay remaining />
            </AudioPlayerControlGroup>

            <AudioPlayerControlGroup>

              <AudioPlayerControlGroup>
                <AudioPlayerSkipBack />
                <AudioPlayerPlay />
                <AudioPlayerSkipForward />
              </AudioPlayerControlGroup>

              <AudioPlaybackSpeed />
              <AudioQueueShuffle />
              {/* <AudioQueueRepeatMode /> */}
              <AudioQueuePreferences />
              <AudioPlayerVolume />
              <AudioQueue />

            </AudioPlayerControlGroup>

          </AudioPlayerControlBar>
        </AudioPlayer>
      </div>
    </TooltipProvider>

  );
}
