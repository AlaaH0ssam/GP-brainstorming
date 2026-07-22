import { useState } from "react";
import type { Idea } from "../types/idea"; 

interface Props {
  onClose: () => void;

  onAdd: (idea: {
    title: string;
    description: string;
    status: "Inbox" | "Research" | "Finalists";
  }) => void;

  editingIdea?: Idea | null;
}

function AddIdeaModal({
  onClose,
  onAdd,
  editingIdea,
}: Props)
 {
const [title, setTitle] = useState(editingIdea?.title ?? "");
const [description, setDescription] = useState(
  editingIdea?.description ?? ""
);

const [status, setStatus] = useState<
  "Inbox" | "Research" | "Finalists"
>(
  editingIdea?.status ?? "Inbox"
);


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

onAdd({
  title,
  description,
  status,
});
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-[450px] rounded-xl bg-white p-6">
       <h2 className="mb-5 text-2xl font-bold">
  {editingIdea ? "Edit Idea" : "Add New Idea"}
</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            className="w-full rounded border p-3"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full rounded border p-3"
            rows={4}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
<select
  value={status}
  onChange={(e) =>
    setStatus(
      e.target.value as
        | "Inbox"
        | "Research"
        | "Finalists"
    )
  }
  className="w-full rounded border p-3"
>
  <option>Inbox</option>
  <option>Research</option>
  <option>Finalists</option>
</select>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-300 px-4 py-2"
            >
              Cancel
            </button>

            <button
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddIdeaModal;