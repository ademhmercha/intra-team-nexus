import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Video, MonitorUp, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Connexion — TeamChat" },
      { name: "description", content: "Messagerie interne, appels vidéo et partage d'écran pour votre équipe." },
      { property: "og:title", content: "Connexion — TeamChat" },
      { property: "og:description", content: "Messagerie interne, appels vidéo et partage d'écran pour votre équipe." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-rail p-12 text-primary-foreground lg:flex">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent font-display text-lg font-bold text-accent-foreground">T</div>
          <span className="font-display text-xl font-semibold">TeamChat</span>
        </div>
        <div>
          <h1 className="max-w-md text-5xl font-bold leading-tight">Votre équipe, au même endroit.</h1>
          <div className="mt-10 space-y-4 text-primary-foreground/80">
            <p className="flex items-center gap-3"><Users className="h-5 w-5 text-accent" /> Groupes gérés par vos admins</p>
            <p className="flex items-center gap-3"><Video className="h-5 w-5 text-accent" /> Appels audio & vidéo en un clic</p>
            <p className="flex items-center gap-3"><MonitorUp className="h-5 w-5 text-accent" /> Partage d'écran intégré</p>
          </div>
        </div>
        <p className="text-sm text-primary-foreground/50">© 2026 TeamChat · Communication interne</p>
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/40 blur-3xl" />
      </div>
      <div className="flex items-center justify-center p-8">
        <form
          className="w-full max-w-sm space-y-6"
          onSubmit={(e) => { e.preventDefault(); navigate({ to: "/chat" }); }}
        >
          <div>
            <h2 className="text-3xl font-bold">Connexion</h2>
            <p className="mt-2 text-muted-foreground">Utilisez votre adresse professionnelle.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="vous@entreprise.com" className="h-11" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label htmlFor="pw">Mot de passe</Label><a className="text-sm text-primary" href="#">Oublié ?</a></div>
            <Input id="pw" type="password" placeholder="••••••••" className="h-11" />
          </div>
          <Button type="submit" className="h-11 w-full">Se connecter</Button>
          <p className="text-center text-sm text-muted-foreground">Pas de compte ? Demandez une invitation à votre admin.</p>
        </form>
      </div>
    </div>
  );
}
