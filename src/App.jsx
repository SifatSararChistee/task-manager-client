import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import TaskColumn from "./Components/TaskColumn";

export default function TaskManager() {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/tasks/${user.email}`);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [user?.email]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const newTask = {
      userEmail: user?.email,
      title,
      description,
      category,
      timestamp: new Date().toISOString(),
    };

    axios
      .post("http://localhost:5000/tasks", newTask)
      .then((response) => {
        if (response.data.insertedId) {
          toast.success("Task added successfully!");
        }
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });

    // Clear form & close modal
    setTitle("");
    setDescription("");
    setCategory("To-Do");
    setIsOpen(false);
  };

  const getTasksByCategory = (category) => tasks.filter((task) => task.category === category);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Task Manager</h1>
        {/* Add Task Button */}
        <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          + Add Task
        </button>
      </header>

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
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

   
        <div className="grid grid-cols-3 gap-4 mt-4">
          {/* To-Do Column */}
          <TaskColumn title="To-Do" tasks={getTasksByCategory("To-Do")} />

          {/* In Progress Column */}
          <TaskColumn title="In Progress" tasks={getTasksByCategory("In Progress")} />

          {/* Done Column */}
          <TaskColumn title="Done" tasks={getTasksByCategory("Done")} />
        </div>
    </div>
  );
}


