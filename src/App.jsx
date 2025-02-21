import { useContext, useState } from "react";
import { AuthContext } from "./Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import TaskColumn from "./Components/TaskColumn";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { TaskContext } from "./Context/TaskContext";
import Footer from "./Components/Footer";

export default function TaskManager() {
  const { user, logOut, setUser } = useContext(AuthContext);
  const {tasks, setTasks} =useContext(TaskContext)
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");


  const handleSubmit = async (e) => {
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

    
      const response = await axios.post("https://task-manager-server-bice-one.vercel.app/tasks", newTask);
      if (response.data.insertedId) {
        toast.success("Task added successfully!");
        setTasks((prev) => [...prev, { ...newTask, _id: response.data.insertedId }]);
      }
    
    setTitle("");
    setDescription("");
    setCategory("To-Do");
    setIsOpen(false);
  };

  const getTasksByCategory = (category) => tasks.filter((task) => task.category === category);

  const onDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((task) => task._id === active.id);
    const newIndex = tasks.findIndex((task) => task._id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    // Reorder tasks locally
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(oldIndex, 1);
    updatedTasks.splice(newIndex, 0, movedTask);

    // Update order property for backend
    const reorderedTasks = updatedTasks.map((task, index) => ({
      ...task,
      order: index,
    }));

    setTasks(reorderedTasks);


  };

  const handleLogOut = () => {
    logOut();
    setUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 mx-auto max-w-screen">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Task Manager</h1>
        <div>
        <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          + Add Task
        </button>
        </div>

        <div className="flex items-center">
        <div className="mr-3 relative group">
          <img
            className="w-12 h-12 rounded-full group-hover:opacity-75 transition-opacity duration-200"
            src={user.photoURL}
            alt=""
            referrerPolicy="no-referrer"
          />
          <span
            className="absolute top-1/2 left-[-150%] transform -translate-y-1/2 -translate-x-0 mt-2 px-2 py-1 text-base text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            {user.displayName}
          </span>
        </div>

        <button
          onClick={handleLogOut}
          className="btn bg-blue-500 px-4 py-2 rounded-lg text-white transition-transform transform hover:scale-105"
        >
          Log Out
        </button>
        </div>
        
      </header>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                maxLength={50}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg p-2"
                required
              />
              <textarea
                placeholder="Task Description (optional)"
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-lg p-2"
              ></textarea>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded-lg p-2">
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-300 px-4 py-2 rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Drag & Drop Task Columns */}
      <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-4 mt-4">
          <TaskColumn title="To-Do" tasks={getTasksByCategory("To-Do")} />
          <TaskColumn title="In Progress" tasks={getTasksByCategory("In Progress")} />
          <TaskColumn title="Done" tasks={getTasksByCategory("Done")} />
        </div>
      </DndContext>
      <div className="bg-gray-100 mt-14">
      <Footer></Footer>
        </div>
    </div>
  );
}
