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
    <div className="rounded-xl bg-gray-200 p-5">
      <h2 className="mb-5 text-center text-xl font-bold">
        {title}
      </h2>

      <div className="space-y-4">
        {ideas.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-400 p-6 text-center text-gray-500">
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