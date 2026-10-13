import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mic, MicOff, Video, VideoOff, MonitorUp, PhoneOff, MessageSquare, Users, Hand } from "lucide-react";
import { Avatar } from "@/components/AppRail";
import { users } from "@/lib/mock";

type Mode = "audio" | "video" | "screen";

export const Route = createFileRoute("/call")({
  validateSearch: (s: Record<string, unknown>): { mode?: Mode } => ({
    mode: ["audio", "video", "screen"].includes(s.mode as string) ? (s.mode as Mode) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Appel — TeamChat" },
      { name: "description", content: "Appels audio, vidéo et partage d'écran avec votre équipe." },
      { property: "og:title", content: "Appel — TeamChat" },
      { property: "og:description", content: "Appels audio, vidéo et partage d'écran avec votre équipe." },
    ],
  }),
  component: Call,
});

function Call() {
  const { mode = "video" } = Route.useSearch();
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(mode !== "audio");
  const [screen, setScreen] = useState(mode === "screen");
  const people = users.slice(0, 4);

  const btn = (on: boolean) =>
    `grid h-12 w-12 place-items-center rounded-full transition ${on ? "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20" : "bg-destructive text-destructive-foreground"}`;

  return (
    <div className="flex h-screen flex-col bg-stage text-primary-foreground">
      <header className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold">#produit · Point hebdo</h1>
          <p className="text-sm text-primary-foreground/60"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-destructive" />En cours · 12:34</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary-foreground/70"><Users className="h-4 w-4" />{people.length} participants</div>
      </header>

      <div className="flex flex-1 gap-4 overflow-hidden px-6 pb-4">
        {screen ? (
          <div className="flex flex-1 gap-4">
            <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-primary-foreground/10 bg-rail">
              <div className="flex items-center gap-2 bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"><MonitorUp className="h-4 w-4" />Vous partagez votre écran</div>
              <div className="grid flex-1 place-items-center p-8">
                <div className="aspect-video w-full max-w-3xl rounded-xl bg-card p-6 text-card-foreground">
                  <div className="mb-4 h-4 w-40 rounded bg-muted" />
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => <div key={i} className="h-24 rounded-lg bg-bubble" />)}
                  </div>
                  <div className="mt-4 h-32 rounded-lg bg-secondary" />
                </div>
              </div>
            </div>
            <div className="flex w-56 flex-col gap-3">
              {people.map((p) => <Tile key={p.id} p={p} small cam={cam} />)}
            </div>
          </div>
        ) : (
          <div className="grid flex-1 grid-cols-2 gap-4">
            {people.map((p) => <Tile key={p.id} p={p} cam={cam} />)}
          </div>
        )}
      </div>

      <footer className="flex items-center justify-center gap-3 pb-6">
        <button className={btn(mic)} onClick={() => setMic(!mic)} title="Micro">{mic ? <Mic /> : <MicOff />}</button>
        <button className={btn(cam)} onClick={() => setCam(!cam)} title="Caméra">{cam ? <Video /> : <VideoOff />}</button>
        <button className={`grid h-12 w-12 place-items-center rounded-full transition ${screen ? "bg-accent text-accent-foreground" : "bg-primary-foreground/10 hover:bg-primary-foreground/20"}`} onClick={() => setScreen(!screen)} title="Partager l'écran"><MonitorUp /></button>
        <button className={btn(true)} title="Lever la main"><Hand /></button>
        <Link to="/chat" className={btn(true)} title="Chat"><MessageSquare /></Link>
        <Link to="/chat" className="ml-4 flex h-12 items-center gap-2 rounded-full bg-destructive px-6 font-semibold text-destructive-foreground" title="Raccrocher"><PhoneOff className="h-5 w-5" />Quitter</Link>
      </footer>
    </div>
  );
}

function Tile({ p, small, cam }: { p: (typeof users)[number]; small?: boolean; cam: boolean }) {
  return (
    <div className={`relative grid place-items-center overflow-hidden rounded-2xl border border-primary-foreground/10 ${cam ? "bg-gradient-to-br from-primary/40 to-rail" : "bg-rail"} ${small ? "h-32" : ""}`}>
      <Avatar initials={p.initials} size={small ? "md" : "lg"} />
      <span className="absolute bottom-2 left-2 rounded-md bg-stage/70 px-2 py-1 text-xs">{p.name}</span>
      {p.id === "2" && <span className="absolute inset-0 rounded-2xl ring-2 ring-success" />}
    </div>
  );
}
