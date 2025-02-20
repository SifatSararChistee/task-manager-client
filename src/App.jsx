import { useState } from "react";

export default function TaskManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const newTask = {
      id: Date.now(), // Temporary unique ID
      title,
      description,
      category,
      timestamp: new Date().toISOString(),
    };

    console.log("Task Added:", newTask); // Replace with database call

    // Clear form & close modal
    setTitle("");
    setDescription("");
    setCategory("To-Do");
    setIsOpen(false);
  };

  return (
    <div className="p-4">
      {/* Add Task Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        + Add Task
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title Input */}
              <input
                type="text"
                placeholder="Task Title"
                maxLength={50}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg p-2"
                required
              />

              {/* Description Input */}
              <textarea
                placeholder="Task Description (optional)"
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-lg p-2"
              ></textarea>

              {/* Category Dropdown */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg p-2"
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>

              {/* Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
