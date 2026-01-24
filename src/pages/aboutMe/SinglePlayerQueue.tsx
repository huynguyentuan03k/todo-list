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
  AudioQueueRepeatMode,
  AudioQueueShuffle,
} from "@/components/audio/queue";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAudioStore } from "@/lib/audio-store";
import { AudioProvider } from "@/components/audio/provider";
import { useEffect, useRef } from "react";
import { useAudio } from "@/hooks/use-audio";

export default function SinglePlayerQueue() {
  const unlockedRef = useRef(false);
  const { htmlAudio } = useAudio();

  useEffect(() => {
    useAudioStore.getState().setQueue(
      [
        {
          id: "1",
          title: "Lạc Trôi",
          artist: "Sơn Tùng",
          url: "/your_name.mp3",
        },
        {
          id: '2',
          title: 'kane and abel',
          artist: 'ajc',
          url: 'https://dn710605.ca.archive.org/0/items/hai-so-phan.sna/HaiSoPhan-Phan1.webm',
          images: ['https://th.bing.com/th/id/OIP.60aeV8ovYaWsJlaPLFe7RAHaKi?w=124&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'],
        },
        {
          id: '3',
          title: 'tottochan',
          artist: 'Tetsuko Kuroyanagi',
          url: '/Tottochan (1).mp3',
          images: ['https://th.bing.com/th/id/OIP.ubWDFKah7KyvCLqcQ-VzbwHaMd?w=115&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'],
        }
      ],
      0
    );
  }, []);

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

  console.log("demo ", document.querySelector('audio'))
  const audio = document.querySelector('audio')
  console.log(audio?.src, audio?.error)

  return (
    <AudioProvider>
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
                <AudioQueueRepeatMode />
                <AudioPlayerVolume />
                <AudioQueue />
              </AudioPlayerControlGroup>
            </AudioPlayerControlBar>
          </AudioPlayer>
        </div>
      </TooltipProvider>
    </AudioProvider>
  );
}
