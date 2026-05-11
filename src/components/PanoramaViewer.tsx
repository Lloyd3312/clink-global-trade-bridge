import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";

export default function PanoramaViewer({ src, height = 480 }: { src: string; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const v = new Viewer({ container: ref.current, panorama: src, navbar: ["zoom", "fullscreen"] });
    return () => v.destroy();
  }, [src]);
  return <div ref={ref} style={{ width: "100%", height }} className="rounded-lg overflow-hidden bg-muted" />;
}
