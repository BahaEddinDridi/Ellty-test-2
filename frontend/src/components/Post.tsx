import { useEffect, useState } from "react";
import Comment from "./Comment";
import ReplyForm from "./ReplyForm";
import { useAuth } from "../context/AuthContext";

export default function Post({ tree, onReplyAdded }: any) {
  const { token } = useAuth();
  const rootNode = tree.nodes.find((n: any) => n.parentId === null);
  const replies = tree.nodes.filter((n: any) => n.parentId === rootNode.id);
  const [showReplyForm, setShowReplyForm] = useState(false);

  useEffect(() => {
    if (!token) setShowReplyForm(false);
  }, [token]);
  
  return (
    <div className="bg-white shadow rounded-xl p-5 mb-6 border border-gray-200">
      <div className="mb-3">
        <p className="text-lg font-semibold text-green-700">
          Conversation #{tree.id}
        </p>
        <p className="text-gray-700">
          Started by{" "}
          <span className="font-medium">{tree.createdBy.username}</span> with{" "}
          <span className="font-bold">{rootNode.result}</span>
        </p>
      </div>

      {token ? (
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-sm text-blue-600 hover:underline mb-2"
        >
          {showReplyForm ? "Cancel" : "Reply to root"}
        </button>
      ) : (
        <p className="text-sm text-gray-500 italic mb-2">
          Sign in to reply to this post.
        </p>
      )}

      {showReplyForm && (
        <ReplyForm
          treeId={tree.id}
          parentId={rootNode.id}
          onReplyAdded={onReplyAdded}
          onClose={() => setShowReplyForm(false)}
        />
      )}

      <div className="ml-4 border-l pl-4 mt-4 space-y-2">
        {replies.map((node: any) => (
          <Comment
            key={node.id}
            node={node}
            allNodes={tree.nodes}
            treeId={tree.id}
            onReplyAdded={onReplyAdded}
          />
        ))}
      </div>
    </div>
  );
}
