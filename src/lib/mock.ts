export const users = [
  { id: "1", name: "Amina Diallo", role: "Admin", status: "online", initials: "AD" },
  { id: "2", name: "Koffi Mensah", role: "Développeur", status: "online", initials: "KM" },
  { id: "3", name: "Sarah Okafor", role: "Design", status: "away", initials: "SO" },
  { id: "4", name: "Yann Lefèvre", role: "Marketing", status: "offline", initials: "YL" },
  { id: "5", name: "Fatou Ndiaye", role: "RH", status: "online", initials: "FN" },
];

export const groups = [
  { id: "g1", name: "général", members: 42, unread: 3, desc: "Annonces de toute l'équipe" },
  { id: "g2", name: "produit", members: 12, unread: 0, desc: "Roadmap et sprints" },
  { id: "g3", name: "design", members: 6, unread: 8, desc: "Maquettes et retours" },
  { id: "g4", name: "marketing", members: 9, unread: 0, desc: "Campagnes" },
];

export const messages = [
  { id: 1, user: "Koffi Mensah", initials: "KM", time: "09:12", text: "Bonjour à tous ! La build de ce matin est en ligne 🚀" },
  { id: 2, user: "Sarah Okafor", initials: "SO", time: "09:15", text: "Top ! J'ai mis à jour les maquettes de l'écran d'accueil, je partage mon écran à 10h." },
  { id: 3, user: "Amina Diallo", initials: "AD", time: "09:20", text: "Parfait, je lance l'appel vidéo pour le groupe produit à 10h.", me: true },
  { id: 4, user: "Fatou Ndiaye", initials: "FN", time: "09:24", text: "Rappel : entretiens annuels la semaine prochaine." },
];
