import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import BoardColumn from "../components/BoardColumn";
import AddIdeaModal from "../components/AddIdeaModal";

import { ideas } from "../data/ideas";
import type { Idea } from "../types/idea";

function Home() {
const [allIdeas, setAllIdeas] = useState<Idea[]>(() => {
  const savedIdeas = localStorage.getItem("ideas");

  if (savedIdeas) {
    return JSON.parse(savedIdeas);
  }

  return ideas;
});
const [showModal, setShowModal] = useState(false);
const [search, setSearch] = useState("");
const [editingIdea, setEditingIdea] = useState<Idea | null>(null);

useEffect(() => {
  localStorage.setItem(
    "ideas",
    JSON.stringify(allIdeas)
  );
}, [allIdeas]); 
function deleteIdea(id: number) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this idea?"
  );

  if (!confirmDelete) return;

  setAllIdeas(allIdeas.filter((idea) => idea.id !== id));
}

function editIdea(idea: Idea) {
  setEditingIdea(idea);
  setShowModal(true);
}


async function voteIdea(id: number) {
  try {
    await fetch(`http://localhost:5000/ideas/${id}/vote`, {
      method: "PUT",
    });

    setAllIdeas((ideas) =>
      ideas.map((idea) =>
        idea.id === id
          ? { ...idea, votes: idea.votes + 1 }
          : idea
      )
    );
  } catch (err) {
    console.log(err);
  }
}

function addIdea(data: {
  title: string;
  description: string;
  status: "Inbox" | "Research" | "Finalists";
}) {

  if (editingIdea) {

    setAllIdeas(
      allIdeas.map((idea) =>
        idea.id === editingIdea.id
          ? {
              ...idea,
              title: data.title,
              description: data.description,
              status: data.status,
            }
          : idea
      )
    );

    setEditingIdea(null);

    return;
  }

const newIdea: Idea = {
  id: Date.now(),
  title: data.title,
  description: data.description,
  status: data.status,
  votes: 0,
  notes: "",

};

  setAllIdeas([newIdea, ...allIdeas]);
}

const filteredIdeas = allIdeas.filter((idea) =>
  idea.title.toLowerCase().includes(search.toLowerCase())
);
  return (
    <>
     <SearchBar
  search={search}
  setSearch={setSearch}
/>

<div className="mx-auto mt-6 flex max-w-7xl justify-end px-6">
  <button
onClick={() => {
  setEditingIdea(null);
  setShowModal(true);
}}    className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
  >
    + Add Idea
  </button>
</div>

      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-3 gap-6 px-6">
<BoardColumn
  title="Inbox"
  ideas={filteredIdeas.filter((idea) => idea.status === "Inbox")}
  onDelete={deleteIdea}
  onEdit={editIdea}
onVote={voteIdea}/>

        <BoardColumn
  title="Research"
  ideas={filteredIdeas.filter((idea) => idea.status === "Research")}
  onDelete={deleteIdea}
  onEdit={editIdea}
onVote={voteIdea}/>

       <BoardColumn
  title="Finalists"
  ideas={filteredIdeas.filter((idea) => idea.status === "Finalists")}
  onDelete={deleteIdea}
  onEdit={editIdea}
onVote={voteIdea}/>
      </div>

      {showModal && (
<AddIdeaModal
  key={editingIdea?.id ?? "new"}
  onClose={() => {
    setShowModal(false);
    setEditingIdea(null);
  }}
  onAdd={addIdea}
  editingIdea={editingIdea}
/>
      )}
    </>
  );
}

export default Home;