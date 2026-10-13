import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Hash, Phone, Video, MonitorUp, Plus, Search, Send, Paperclip, Smile, Users } from "lucide-react";
import { AppRail, Avatar } from "@/components/AppRail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { groups, users, messages as initial } from "@/lib/mock";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Messages — TeamChat" },
      { name: "description", content: "Discutez avec vos collègues en groupes et messages directs." },
      { property: "og:title", content: "Messages — TeamChat" },
      { property: "og:description", content: "Discutez avec vos collègues en groupes et messages directs." },
    ],
  }),
  component: Chat,
});

function Chat() {
  const [active, setActive] = useState(groups[0]);
  const [msgs, setMsgs] = useState(initial);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    setMsgs([...msgs, { id: Date.now(), user: "Amina Diallo", initials: "AD", time: "maintenant", text, me: true }]);
    setText("");
  };

  return (
    <div className="flex h-screen">
      <AppRail />
      <aside className="flex w-72 shrink-0 flex-col border-r bg-panel">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher" className="bg-card pl-9" />
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Groupes
          <NewGroup />
        </div>
        {groups.map((g) => (
          <button key={g.id} onClick={() => setActive(g)}
            className={`mx-2 flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${active.id === g.id ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
            <Hash className="h-4 w-4 opacity-60" />
            <span className="flex-1">{g.name}</span>
            {g.unread > 0 && <span className="rounded-full bg-accent px-2 text-xs font-bold text-accent-foreground">{g.unread}</span>}
          </button>
        ))}
        <div className="px-4 pb-2 pt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Messages directs</div>
        {users.slice(1).map((u) => (
          <div key={u.id} className="mx-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-secondary">
            <Avatar initials={u.initials} status={u.status} size="sm" />
            <span>{u.name}</span>
          </div>
        ))}
      </aside>

      <main className="flex flex-1 flex-col bg-card">
        <header className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h1 className="flex items-center gap-1 text-lg font-semibold"><Hash className="h-5 w-5 text-muted-foreground" />{active.name}</h1>
            <p className="flex items-center gap-1 text-sm text-muted-foreground"><Users className="h-3.5 w-3.5" />{active.members} membres · {active.desc}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="icon" title="Appel audio"><Link to="/call" search={{ mode: "audio" }}><Phone className="h-4 w-4" /></Link></Button>
            <Button asChild variant="outline" size="icon" title="Appel vidéo"><Link to="/call" search={{ mode: "video" }}><Video className="h-4 w-4" /></Link></Button>
            <Button asChild title="Partager l'écran"><Link to="/call" search={{ mode: "screen" }}><MonitorUp className="h-4 w-4" /> Partager</Link></Button>
          </div>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
          <div className="rounded-xl border border-dashed p-3 text-center text-sm text-muted-foreground">
            📞 Appel vidéo en cours dans #{active.name} · 4 participants · <Link to="/call" className="font-semibold text-primary">Rejoindre</Link>
          </div>
          {msgs.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.me ? "flex-row-reverse" : ""}`}>
              <Avatar initials={m.initials} />
              <div className={`max-w-lg ${m.me ? "text-right" : ""}`}>
                <div className="text-sm"><span className="font-semibold">{m.user}</span> <span className="text-xs text-muted-foreground">{m.time}</span></div>
                <div className={`mt-1 inline-block rounded-2xl px-4 py-2 text-left ${m.me ? "rounded-tr-sm bg-primary text-primary-foreground" : "rounded-tl-sm bg-secondary"}`}>{m.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-4">
          <div className="flex items-center gap-2 rounded-xl border bg-background px-3 py-2">
            <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
            <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={`Écrire dans #${active.name}`} className="flex-1 bg-transparent outline-none" />
            <Button variant="ghost" size="icon"><Smile className="h-4 w-4" /></Button>
            <Button size="icon" onClick={send}><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      </main>
    </div>
  );
}

function NewGroup() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded p-1 hover:bg-secondary" title="Créer un groupe"><Plus className="h-4 w-4" /></button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Créer un groupe</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2"><Label>Nom du groupe</Label><Input placeholder="ex. projet-alpha" /></div>
          <div className="space-y-2"><Label>Description</Label><Input placeholder="À quoi sert ce groupe ?" /></div>
          <div className="space-y-2">
            <Label>Membres</Label>
            {users.map((u) => (
              <label key={u.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-secondary">
                <Checkbox /><Avatar initials={u.initials} size="sm" /><span className="text-sm">{u.name}</span>
              </label>
            ))}
          </div>
          <Button className="w-full">Créer le groupe</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
