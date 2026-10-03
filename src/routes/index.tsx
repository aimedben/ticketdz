import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, CalendarDays, Check, Clock3, Download, Expand, Hash, Image, Layers3, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ticket1 from "@/assets/ticket-1.png.asset.json";
import ticket2 from "@/assets/ticket-2.png.asset.json";
import ticket3 from "@/assets/ticket-3.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "TicketGen DZ — Studio de tickets" },
      { name: "description", content: "Personnalisez le numéro, la date et l’heure de vos maquettes de tickets." },
      { property: "og:title", content: "TicketGen DZ — Studio de tickets" },
      { property: "og:description", content: "Personnalisez le numéro, la date et l’heure de vos maquettes de tickets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const tickets = [ticket1.url, ticket2.url, ticket3.url];
const sizes = { Petit: "max-w-xl", Moyen: "max-w-3xl", Grand: "max-w-5xl" } as const;

function Index() {
  const [studio, setStudio] = useState(false);
  const [ticket, setTicket] = useState(0);
  const [number, setNumber] = useState("1329731579");
  const [date, setDate] = useState("2026-10-02");
  const [time, setTime] = useState("18:03");
  const [size, setSize] = useState<keyof typeof sizes>("Moyen");
  const [fullscreen, setFullscreen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!studio) return;
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.src = tickets[ticket];
    image.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.drawImage(image, 0, 0);

      // The source photos are fixed 16:9 references. This clean patch updates only the requested header line.
      context.save();
      context.translate(0, 0);
      context.rotate(-0.037);
      context.fillStyle = "#f4f6f5";
      context.fillRect(538, 160, 305, 20);
      context.fillStyle = "#242832";
      context.font = "700 10px Arial";
      const formattedDate = date ? date.split("-").reverse().join("/") : "--/--/----";
      context.fillText(`Ticket n° :  ${number || "----------"}  |  ${formattedDate}  ${time || "--:--"}:01`, 543, 174);
      context.restore();

      context.save();
      context.translate(canvas.width - 32, canvas.height - 26);
      context.rotate(-Math.PI / 2);
      context.globalAlpha = 0.48;
      context.fillStyle = "#ffffff";
      context.font = "800 13px Arial";
      context.fillText("MAQUETTE DÉMO", 0, 0);
      context.restore();
    };
  }, [studio, ticket, number, date, time]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `ticket-demo-${number || "apercu"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (!studio) {
    return (
      <main className="min-h-screen overflow-hidden bg-background">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-md bg-primary text-primary-foreground"><Layers3 size={20} /></div>
            <div><p className="font-display text-lg font-bold">TicketGen <span className="text-primary">DZ</span></p><p className="text-xs text-muted-foreground">Creative ticket studio</p></div>
          </div>
          <span className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground">Maquettes de démonstration</span>
        </header>

        <section className="mx-auto max-w-6xl px-5 pb-16 pt-12 lg:px-8 lg:pt-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-violet-soft px-3 py-1.5 text-xs font-bold text-primary"><Sparkles size={14} /> STUDIO CRÉATIF</div>
            <h1 className="font-display text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">Créez votre maquette de ticket <span className="text-primary">en quelques clics.</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Choisissez une base, ajustez le numéro, la date et l’heure, puis téléchargez votre aperçu haute définition.</p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <button onClick={() => setStudio(true)} className="group relative overflow-hidden rounded-lg border border-border bg-card p-7 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <div className="absolute right-0 top-0 h-full w-2 bg-primary" />
              <div className="flex items-start justify-between gap-4"><div className="grid size-12 place-items-center rounded-md bg-violet-soft text-primary"><Image size={23} /></div><span className="rounded-full bg-cyan-soft px-3 py-1 text-xs font-bold text-accent-foreground">DISPONIBLE</span></div>
              <h2 className="mt-8 font-display text-3xl font-bold">TemTem Studio</h2>
              <p className="mt-2 max-w-md text-muted-foreground">Trois scènes réalistes prêtes à personnaliser, avec aperçu immédiat.</p>
              <div className="mt-8 flex items-center gap-2 font-bold text-primary">Ouvrir le studio <span className="transition-transform group-hover:translate-x-1">→</span></div>
            </button>
            <div className="relative overflow-hidden rounded-lg border border-border bg-card p-7 opacity-80">
              <div className="absolute right-0 top-0 h-full w-2 bg-accent" />
              <div className="flex items-start justify-between gap-4"><div className="grid size-12 place-items-center rounded-md bg-cyan-soft text-accent-foreground"><Sparkles size={23} /></div><span className="rounded-full bg-orange-soft px-3 py-1 text-xs font-bold">BIENTÔT</span></div>
              <h2 className="mt-8 font-display text-3xl font-bold">Gifty Studio</h2>
              <p className="mt-2 max-w-md text-muted-foreground">Une seconde collection créative arrive prochainement.</p>
              <div className="mt-8 font-bold text-muted-foreground">En préparation</div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3"><Button variant="ghost" size="icon" onClick={() => setStudio(false)} aria-label="Retour à l’accueil"><ArrowLeft size={19} /></Button><div><h1 className="font-display text-lg font-bold">TemTem Studio</h1><p className="text-xs text-muted-foreground">Personnalisation en direct</p></div></div>
          <div className="hidden items-center gap-2 text-xs font-semibold text-success sm:flex"><span className="size-2 rounded-full bg-success" /> Aperçu prêt</div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-5 p-4 sm:p-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="space-y-5">
          <section className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="mb-5"><p className="text-xs font-bold uppercase text-primary">Étape 01</p><h2 className="mt-1 font-display text-xl font-bold">Informations du ticket</h2></div>
            <div className="space-y-4">
              <label className="block"><span className="mb-2 flex items-center gap-2 text-sm font-semibold"><Hash size={15} className="text-primary" /> Numéro de ticket</span><input value={number} onChange={(event) => setNumber(event.target.value.replace(/\D/g, "").slice(0, 12))} className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" inputMode="numeric" /></label>
              <label className="block"><span className="mb-2 flex items-center gap-2 text-sm font-semibold"><CalendarDays size={15} className="text-primary" /> Date</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" /></label>
              <label className="block"><span className="mb-2 flex items-center gap-2 text-sm font-semibold"><Clock3 size={15} className="text-primary" /> Heure</span><input type="time" value={time} onChange={(event) => setTime(event.target.value)} className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" /></label>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-bold uppercase text-primary">Étape 02</p><h2 className="mt-1 font-display text-xl font-bold">Choisir la scène</h2>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {tickets.map((src, index) => <button key={src} onClick={() => setTicket(index)} className={`relative aspect-video overflow-hidden rounded-md border-2 transition ${ticket === index ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}><img src={src} alt={`Scène ${index + 1}`} className="h-full w-full object-cover" />{ticket === index && <span className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-primary text-primary-foreground"><Check size={12} /></span>}</button>)}
            </div>
            <p className="mt-5 text-xs font-bold uppercase text-muted-foreground">Taille de l’aperçu</p>
            <div className="mt-2 grid grid-cols-3 gap-2">{Object.keys(sizes).map((label) => <Button key={label} variant={size === label ? "primary" : "secondary"} className="h-9 px-2 text-xs" onClick={() => setSize(label as keyof typeof sizes)}>{label}</Button>)}</div>
          </section>

          <div className="rounded-lg bg-orange-soft p-4 text-sm leading-6"><strong>Usage responsable</strong><br />Chaque export conserve un marquage « Maquette Démo ».</div>
        </aside>

        <section className="flex min-h-[680px] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
            <div><h2 className="font-display font-bold">Aperçu du rendu</h2><p className="text-xs text-muted-foreground">Format 16:9 · haute définition</p></div>
            <div className="flex gap-2"><Button variant="secondary" size="icon" onClick={() => setFullscreen(true)} aria-label="Afficher en plein écran"><Expand size={18} /></Button><Button onClick={download}><Download size={17} /> <span className="hidden sm:inline">Télécharger</span></Button></div>
          </div>
          <div className="ticket-grid flex flex-1 items-center justify-center bg-canvas p-4 sm:p-8">
            <canvas ref={canvasRef} className={`h-auto w-full ${sizes[size]} rounded-sm shadow-2xl transition-all duration-300`} aria-label="Aperçu personnalisé du ticket" />
          </div>
        </section>
      </div>

      {fullscreen && <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/95 p-3" role="dialog" aria-modal="true"><Button variant="secondary" size="icon" onClick={() => setFullscreen(false)} className="absolute right-4 top-4" aria-label="Fermer"><X size={20} /></Button><img src={canvasRef.current?.toDataURL("image/png")} alt="Ticket personnalisé en plein écran" className="max-h-[94vh] max-w-full object-contain" /></div>}
    </main>
  );
}
