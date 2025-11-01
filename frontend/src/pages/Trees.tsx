import { useEffect, useState } from "react";
import { fetchTrees, createTree } from "../api/trees";
import { useAuth } from "../context/AuthContext";
import Post from "../components/Post";

export default function TreesPage() {
  const { token, logout } = useAuth();
  const [trees, setTrees] = useState<any[]>([]);
  const [startNumber, setStartNumber] = useState("");

  const loadTrees = async () => {
    const data = await fetchTrees();
    setTrees(data);
  };

  const handleCreate = async (e: any) => {
    e.preventDefault();
    const num = parseFloat(startNumber);
    if (isNaN(num)) return alert("Enter valid number");
    await createTree(num);
    setStartNumber("");
    loadTrees();
  };

  useEffect(() => {
    loadTrees();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">🌿 Conversations</h1>
        {token ? (
          <button
            onClick={logout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <div className="space-x-3">
            <a
              href="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </a>
            <a
              href="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </a>
          </div>
        )}
      </div>

      {token && (
        <form onSubmit={handleCreate} className="flex gap-3 mb-8">
          <input
            type="number"
            placeholder="Start number..."
            value={startNumber}
            onChange={(e) => setStartNumber(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Start Conversation
          </button>
        </form>
      )}

      <div>
        {trees.length === 0 ? (
          <p className="text-gray-500 text-center">No conversations yet.</p>
        ) : (
          trees.map((tree) => (
            <Post key={tree.id} tree={tree} onReplyAdded={loadTrees} />
          ))
        )}
      </div>
    </div>
  );
}
