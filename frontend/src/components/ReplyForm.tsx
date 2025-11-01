import { useState } from "react";
import { addOperation } from "../api/trees";

export default function ReplyForm({ treeId, parentId, onReplyAdded, onClose }: any) {
  const [operation, setOperation] = useState("+");
  const [value, setValue] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addOperation(treeId, parentId, operation, parseFloat(value));
      setValue("");
      onReplyAdded();
      if (onClose) onClose();
    } catch {
      alert("Failed to reply");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
      <select
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        className="border rounded p-1"
      >
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input
        type="number"
        placeholder="Right value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border rounded p-1 w-24"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
      >
        Reply
      </button>
    </form>
  );
}
