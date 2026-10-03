import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CalendarDays, Check, Clock3, Download, Expand, Hash, Image, Layers3, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ticket1 from "@/assets/ticket-1.png.asset.json";
import ticket2 from "@/assets/ticket-2.png.asset.json";
import ticket3 from "@/assets/ticket-3.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "TicketGen DZ — Générateur mobile" },
      { name: "description", content: "Créez depuis Telegram une maquette de ticket personnalisée sur votre téléphone." },
      { property: "og:title", content: "TicketGen DZ — Générateur mobile" },
      { property: "og:description", content: "Créez depuis Telegram une maquette de ticket personnalisée sur votre téléphone." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const tickets = [ticket1.url, ticket2.url, ticket3.url];
const sizes = {
  Petit: "w-[62%] max-w-[560px]",
  Moyen: "w-[82%] max-w-[820px]",
  Grand: "w-full max-w-[1100px]",
} as const;

type TicketSize = keyof typeof sizes;
type GeneratedTicket = {
  number: string;
  date: string;
  time: string;
  ticket: number;
  size: TicketSize;
};

const initialTicket: GeneratedTicket = {
  number: "1329731579",
  date: "2026-10-02",
  time: "18:03",
  ticket: 0,
  size: "Moyen",
};

function Index() {
  const [number, setNumber] = useState(initialTicket.number);
  const [date, setDate] = useState(initialTicket.date);
  const [time, setTime] = useState(initialTicket.time);
  const [ticket, setTicket] = useState(initialTicket.ticket);
  const [size, setSize] = useState<TicketSize>(initialTicket.size);
  const [generated, setGenerated] = useState(initialTicket);
  const [generatedImage, setGeneratedImage] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    const ticketSource = tickets[generated.ticket];
    if (!ticketSource) return;
    image.src = ticketSource;
    image.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.drawImage(image, 0, 0);

      context.save();
      context.rotate(-0.037);
      context.fillStyle = "#f4f6f5";
      context.fillRect(538, 160, 305, 20);
      context.fillStyle = "#242832";
      context.font = "700 10px Arial";
      const formattedDate = generated.date ? generated.date.split("-").reverse().join("/") : "--/--/----";
      context.fillText(`Ticket n° :  ${generated.number || "----------"}  |  ${formattedDate}  ${generated.time || "--:--"}:01`, 543, 174);
      context.restore();

      context.save();
      context.translate(canvas.width - 32, canvas.height - 26);
      context.rotate(-Math.PI / 2);
      context.globalAlpha = 0.48;
      context.fillStyle = "#ffffff";
      context.font = "800 13px Arial";
      context.fillText("MAQUETTE DÉMO", 0, 0);
      context.restore();
      setGeneratedImage(canvas.toDataURL("image/png"));
    };
  }, [generated]);

  useEffect(() => {
    if (!fullscreen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [fullscreen]);

  const generate = () => {
    setGenerated({ number, date, time, ticket, size });
    setConfirmed(true);
    window.setTimeout(() => setConfirmed(false), 1800);
    window.setTimeout(() => previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const download = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.download = `ticket-demo-${generated.number || "apercu"}.png`;
    link.href = generatedImage;
    link.click();
  };

  return (
    <main className="min-h-screen bg-background pb-8">
      <header className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground"><Layers3 size={20} /></div>
            <div className="min-w-0"><h1 className="truncate font-display text-lg font-bold">TicketGen <span className="text-primary">DZ</span></h1><p className="truncate text-xs text-muted-foreground">Assistant pour Telegram</p></div>
          </div>
          <div className="grid size-9 shrink-0 place-items-center rounded-full bg-cyan-soft text-accent-foreground" aria-label="Application Telegram"><Send size={17} /></div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-3 pt-4 sm:px-6 sm:pt-6">
        <div className="mb-4 px-1 sm:mb-6">
          <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase text-primary"><Sparkles size={14} /> Générateur mobile</div>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Personnalisez votre ticket</h2>
          <p className="mt-1 text-sm text-muted-foreground">Renseignez les informations puis appuyez sur Générer.</p>
        </div>

        <div className="grid items-start gap-4 lg:grid-cols-[350px_minmax(0,1fr)] lg:gap-6">
          <aside className="space-y-4">
            <section className="rounded-lg border border-border bg-card p-4 shadow-sm sm:p-5">
              <div className="mb-4"><p className="text-xs font-bold uppercase text-primary">Informations du ticket</p></div>
              <div className="space-y-3">
                <label className="block"><span className="mb-1.5 flex items-center gap-2 text-sm font-semibold"><Hash size={15} className="text-primary" /> Numéro de ticket</span><input value={number} onChange={(event) => setNumber(event.target.value.replace(/\D/g, "").slice(0, 12))} className="h-11 w-full rounded-md border border-input bg-background px-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" inputMode="numeric" /></label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="min-w-0"><span className="mb-1.5 flex items-center gap-2 text-sm font-semibold"><CalendarDays size={15} className="shrink-0 text-primary" /> Date</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="h-11 w-full min-w-0 rounded-md border border-input bg-background px-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" /></label>
                  <label className="min-w-0"><span className="mb-1.5 flex items-center gap-2 text-sm font-semibold"><Clock3 size={15} className="shrink-0 text-primary" /> Heure</span><input type="time" value={time} onChange={(event) => setTime(event.target.value)} className="h-11 w-full min-w-0 rounded-md border border-input bg-background px-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" /></label>
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <p className="text-xs font-bold uppercase text-muted-foreground">Modèle</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {tickets.map((src, index) => (
                    <Button key={src} type="button" variant="ghost" onClick={() => setTicket(index)} className={cn("relative h-auto aspect-video overflow-hidden border-2 p-0", ticket === index ? "border-primary opacity-100" : "border-transparent opacity-65")} aria-label={`Choisir le modèle ${index + 1}`}>
                      <img src={src} alt="" className="h-full w-full object-cover" />
                      {ticket === index && <span className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-primary text-primary-foreground"><Check size={12} /></span>}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs font-bold uppercase text-muted-foreground">Dimension du ticket</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(Object.keys(sizes) as TicketSize[]).map((label) => <Button key={label} type="button" variant={size === label ? "primary" : "secondary"} className="h-10 px-1 text-xs" onClick={() => setSize(label)}>{label}</Button>)}
                </div>
              </div>

              <Button type="button" size="lg" className="mt-5 w-full text-base" onClick={generate}><Sparkles size={18} /> {confirmed ? "Ticket généré" : "Générer"}</Button>
            </section>

            <div className="rounded-lg bg-orange-soft p-3 text-xs leading-5"><strong>Usage responsable</strong> — chaque image conserve le marquage « Maquette Démo ».</div>
          </aside>

          <section ref={previewRef} className="scroll-mt-3 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
              <div className="min-w-0"><h2 className="truncate font-display font-bold">Aperçu généré</h2><p className="truncate text-xs text-muted-foreground">Dimension {generated.size} · format 16:9</p></div>
              <div className="flex shrink-0 gap-2">
                <Button variant="secondary" size="icon" onClick={() => setFullscreen(true)} disabled={!generatedImage} aria-label="Afficher uniquement le ticket en plein écran"><Expand size={18} /></Button>
                <Button size="icon" onClick={download} disabled={!generatedImage} aria-label="Télécharger le ticket"><Download size={18} /></Button>
              </div>
            </div>
            <div className="ticket-grid flex min-h-[240px] items-center justify-center overflow-hidden bg-canvas p-3 sm:min-h-[520px] sm:p-8">
              <canvas ref={canvasRef} className={cn("h-auto rounded-sm shadow-2xl transition-[width] duration-300", sizes[generated.size])} aria-label="Aperçu personnalisé du ticket" />
            </div>
          </section>
        </div>
      </div>

      {fullscreen && generatedImage && (
        <div className="fixed inset-0 z-50 bg-foreground" role="dialog" aria-modal="true" aria-label="Ticket en plein écran" onClick={() => setFullscreen(false)}>
          <img src={generatedImage} alt="Ticket personnalisé en plein écran" className="h-full w-full object-contain" />
        </div>
      )}
    </main>
  );
}