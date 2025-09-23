import { useRef } from 'react'
import { ReactEpubViewer } from 'react-epub-viewer'

const PageEpub = () => {
  const viewerRef = useRef(null);

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <ReactEpubViewer
        url={'http://localhost:8000/storage/episodes/audio/episode-2/truyen_duong_rung__lan_khai.epub'}
        ref={viewerRef}
      />
    </div>
  );
}

export default PageEpub
