import { useAudioStore } from '@/lib/audio-store';
import { Track } from '@/lib/html-audio';
import { Podcast } from '@/pages/podcasts/schema';
import http from '@/utils/http';
import { useQuery } from '@tanstack/react-query';

// đối với 1 hook như này thì nên để toàn bộ vào 1 cái hàm rồi return
// ko thể gọi 1 hook trong 1 hàm ẩn danh, và ko đc đc gọi hook như 1 sự kiện kiểu onClick hay onChange
// Hook phải luôn được gọi ở cấp cao nhất của component.
/**
 * const enqueue = usePodcastQueue()
 *
  const handleSnap = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpinning) return;

    await enqueue(podcast.id)

    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
    }, 10000); // 10 giây
  };
 *
 */

// export type Props = {
//   podcastId: number;
// };
// ko dùng destructering và type khi làm việc với hook nhận giá trị trược tiếp : {podcastId}:Props

export default function usePodcastQueue(podcastId: number) {
  const { data } = useQuery<Podcast | undefined>({
    queryKey: ['podcasts', podcastId],
    queryFn: async () => (await http.get<{ data: Podcast }>(`/podcasts/${podcastId}`)).data.data,
  });

  const enqueue = async () => {
    if (!data?.episodes) return;

    console.log(data);
    
    const filterData: Track[] = data?.episodes?.map((item) => ({
      id: item.id,
      url: item.audio_path ?? '',
      title: item.title ?? '',
      artist: 'demo',
      images: item.cover_image?.split(',') ?? undefined,
      genre: 'demo',
      key: item.id,
    }));
    useAudioStore.getState().setQueue(filterData, 0);

    return true;
  };

  const enquueueSortAble = () => {};

  return { enqueue, enquueueSortAble };
}
