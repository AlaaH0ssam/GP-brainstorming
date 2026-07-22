import type { Idea } from "../types/idea";
import IdeaCard from "./IdeaCard";

interface Props {
  title: string;
  ideas: Idea[];
  onDelete: (id: number) => void;
  onEdit: (idea: Idea) => void;
  onVote: (id: number) => void;
}

function BoardColumn({
  title,
  ideas,
  onDelete,
  onEdit,
  onVote,
}: Props) {
  return (
    <div className="rounded-xl bg-gray-900 border border-gray-800 p-5 shadow-lg">
      <h2 className="mb-5 text-center text-xl font-bold text-white">
        {title}
      </h2>

      <div className="space-y-4">
        {ideas.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-700 p-6 text-center text-gray-500 bg-gray-950/40">
            No Ideas
          </div>
        ) : (
          ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onDelete={onDelete}
              onEdit={onEdit}
              onVote={onVote}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default BoardColumn;