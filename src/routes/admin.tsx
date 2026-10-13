import { createFileRoute } from "@tanstack/react-router";
import { Hash, Plus, MoreHorizontal, Shield, Users, MessageSquare, Video } from "lucide-react";
import { AppRail, Avatar } from "@/components/AppRail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { groups, users } from "@/lib/mock";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administration — TeamChat" },
      { name: "description", content: "Gérez les groupes, membres et permissions de votre espace." },
      { property: "og:title", content: "Administration — TeamChat" },
      { property: "og:description", content: "Gérez les groupes, membres et permissions de votre espace." },
    ],
  }),
  component: Admin,
});

const stats = [
  { label: "Membres", value: "48", icon: Users },
  { label: "Groupes", value: "12", icon: Hash },
  { label: "Messages / jour", value: "1 240", icon: MessageSquare },
  { label: "Appels cette semaine", value: "86", icon: Video },
];

function Admin() {
  return (
    <div className="flex h-screen">
      <AppRail />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-primary"><Shield className="h-4 w-4" />Espace administrateur</p>
              <h1 className="mt-1 text-3xl font-bold">Gestion de l'équipe</h1>
            </div>
            <Button><Plus className="h-4 w-4" />Nouveau groupe</Button>
          </div>

          <div className="mt-8 grid grid-cols-4 gap-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-2xl border bg-card p-5">
                <Icon className="h-5 w-5 text-primary" />
                <div className="mt-3 font-display text-3xl font-bold">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>

          <Tabs defaultValue="groups" className="mt-8">
            <TabsList>
              <TabsTrigger value="groups">Groupes</TabsTrigger>
              <TabsTrigger value="members">Membres</TabsTrigger>
            </TabsList>

            <TabsContent value="groups" className="mt-4 overflow-hidden rounded-2xl border bg-card">
              <table className="w-full text-sm">
                <thead className="bg-panel text-left text-muted-foreground">
                  <tr><th className="p-4">Groupe</th><th>Membres</th><th>Privé</th><th>Appels autorisés</th><th></th></tr>
                </thead>
                <tbody>
                  {groups.map((g, i) => (
                    <tr key={g.id} className="border-t">
                      <td className="p-4"><div className="flex items-center gap-2 font-semibold"><Hash className="h-4 w-4 text-muted-foreground" />{g.name}</div><div className="text-muted-foreground">{g.desc}</div></td>
                      <td>{g.members}</td>
                      <td><Switch defaultChecked={i % 2 === 1} /></td>
                      <td><Switch defaultChecked /></td>
                      <td className="pr-4 text-right"><RowMenu items={["Modifier", "Gérer les membres", "Archiver", "Supprimer"]} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>

            <TabsContent value="members" className="mt-4 rounded-2xl border bg-card">
              <div className="flex gap-3 border-b p-4">
                <Input placeholder="Rechercher un membre" className="max-w-xs" />
                <Button variant="outline" className="ml-auto"><Plus className="h-4 w-4" />Inviter</Button>
              </div>
              {users.map((u) => (
                <div key={u.id} className="flex items-center gap-4 border-b p-4 last:border-0">
                  <Avatar initials={u.initials} status={u.status} />
                  <div className="flex-1"><div className="font-semibold">{u.name}</div><div className="text-sm text-muted-foreground">{u.name.toLowerCase().replace(" ", ".")}@entreprise.com</div></div>
                  <Badge variant={u.role === "Admin" ? "default" : "secondary"}>{u.role === "Admin" ? "Admin" : "Membre"}</Badge>
                  <RowMenu items={["Promouvoir admin", "Ajouter à un groupe", "Suspendre"]} />
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

function RowMenu({ items }: { items: string[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((it) => <DropdownMenuItem key={it} className={it === "Supprimer" || it === "Suspendre" ? "text-destructive" : ""}>{it}</DropdownMenuItem>)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
