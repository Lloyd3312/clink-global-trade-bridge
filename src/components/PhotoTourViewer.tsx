import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface Step { url: string; caption: string | null }

export default function PhotoTourViewer({ steps }: { steps: Step[] }) {
  const [i, setI] = useState(0);
  const [full, setFull] = useState(false);
  if (!steps.length) return null;
  const step = steps[i];
  const next = () => setI((p) => (p + 1) % steps.length);
  const prev = () => setI((p) => (p - 1 + steps.length) % steps.length);
  return (
    <div className={full ? "fixed inset-0 z-[100] bg-black flex items-center justify-center" : "relative bg-black rounded-lg overflow-hidden"}>
      <div className={full ? "relative w-full h-full" : "relative aspect-video w-full"}>
        <img src={step.url} alt={step.caption ?? `Step ${i + 1}`} className="w-full h-full object-contain" />
        {step.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
            <p className="text-sm font-medium">{step.caption}</p>
          </div>
        )}
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"><ChevronLeft className="h-5 w-5" /></button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"><ChevronRight className="h-5 w-5" /></button>
        <button onClick={() => setFull((f) => !f)} className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"><Maximize2 className="h-4 w-4" /></button>
        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">{i + 1} / {steps.length}</div>
      </div>
      {!full && (
        <div className="bg-background flex gap-1 p-2 overflow-x-auto">
          {steps.map((s, idx) => (
            <button key={idx} onClick={() => setI(idx)} className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 ${idx === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}>
              <img src={s.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
