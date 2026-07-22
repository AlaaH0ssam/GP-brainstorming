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
}: Props) {
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
      <div className="w-[450px] rounded-xl bg-gray-900 border border-gray-800 p-6 shadow-2xl text-white">
        <h2 className="mb-5 text-2xl font-bold">
          {editingIdea ? "Edit Idea" : "Add New Idea"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white placeholder-gray-400 outline-none focus:border-blue-500"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white placeholder-gray-400 outline-none focus:border-blue-500"
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
            className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white outline-none focus:border-blue-500"
          >
            <option value="Inbox" className="bg-gray-900 text-white">Inbox</option>
            <option value="Research" className="bg-gray-900 text-white">Research</option>
            <option value="Finalists" className="bg-gray-900 text-white">Finalists</option>
          </select>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-700 px-4 py-2 text-gray-200 hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>

            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddIdeaModal;