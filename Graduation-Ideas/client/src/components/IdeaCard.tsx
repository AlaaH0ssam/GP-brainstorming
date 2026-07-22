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
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="flex items-start justify-between">
        <h3 className="font-bold">{idea.title}</h3>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(idea)}
            className="text-sm text-blue-600"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(idea.id)}
            className="text-sm text-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="mt-2 text-gray-600">
        {idea.description}
      </p>


      <div className="mt-4 flex items-center justify-between">

 <button
  onClick={() => onVote(idea.id)}
  className="rounded bg-green-600 px-3 py-1 text-white"
>
  👍 {idea.votes}
</button>

  <span className="text-xs text-gray-500">
    {idea.status}
  </span>

</div>
    </div>
  );
}

export default IdeaCard;