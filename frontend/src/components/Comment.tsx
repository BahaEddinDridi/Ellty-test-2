import { useEffect, useState } from "react";
import ReplyForm from "./ReplyForm";
import { useAuth } from "../context/AuthContext";

export default function Comment({ node, allNodes, treeId, onReplyAdded }: any) {
  const { token } = useAuth();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const children = allNodes.filter((n: any) => n.parentId === node.id);

  useEffect(() => {
    if (!token) setShowReplyForm(false);
  }, [token]);
  
  return (
    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
      <p className="text-sm text-gray-800">
        <span className="font-medium">{node.createdBy.username}</span> →{" "}
        <span className="text-blue-700 font-semibold">{node.operation}</span>{" "}
        {node.rightValue} ={" "}
        <span className="font-bold text-green-700">{node.result}</span>
      </p>

      {token ? (
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-xs text-blue-500 hover:underline mt-1"
        >
          {showReplyForm ? "Cancel" : "Reply"}
        </button>
      ) : null}

      {showReplyForm && (
        <ReplyForm
          treeId={treeId}
          parentId={node.id}
          onReplyAdded={onReplyAdded}
          onClose={() => setShowReplyForm(false)}
        />
      )}

      {children.length > 0 && (
        <div className="ml-4 border-l-2 border-gray-300 mt-2 pl-2 space-y-2">
          {children.map((child: any) => (
            <Comment
              key={child.id}
              node={child}
              allNodes={allNodes}
              treeId={treeId}
              onReplyAdded={onReplyAdded}
            />
          ))}
        </div>
      )}
    </div>
  );
}
