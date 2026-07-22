export interface Idea {
  id: number;
  title: string;
  description: string;
  status: "Inbox" | "Research" | "Finalists";

  votes: number;
  notes: string;
}