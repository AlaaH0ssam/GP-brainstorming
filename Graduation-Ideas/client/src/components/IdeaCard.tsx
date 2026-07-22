import type { Idea } from "../types/idea";

interface Props {
  idea: Idea;
  onDelete: (id: number) => void;
  onEdit: (idea: Idea) => void;
  onVote: (id: number) => void;
}

function IdeaCard({
  idea,
  onDelete,
  onEdit,
  onVote,
}: Props) {
  return (
    <div className="rounded-lg bg-gray-800 border border-gray-700 p-4 shadow-md text-white">
      <div className="flex items-start justify-between">
        <h3 className="font-bold text-lg text-gray-100">{idea.title}</h3>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(idea)}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(idea.id)}
            className="text-sm text-red-400 hover:text-red-300"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="mt-2 text-gray-300 text-sm leading-relaxed">
        {idea.description}
      </p>

      <div className="mt-4 flex items-center justify-between pt-2 border-t border-gray-700/50">
        <button
          onClick={() => onVote(idea.id)}
          className="rounded bg-green-700 px-3 py-1 text-white text-xs font-medium hover:bg-green-600 transition-colors"
        >
          👍 {idea.votes}
        </button>

        <span className="text-xs text-gray-400 bg-gray-900 px-2 py-1 rounded">
          {idea.status}
        </span>
      </div>
    </div>
  );
}

export default IdeaCard;