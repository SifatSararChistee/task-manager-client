/* eslint-disable react/prop-types */

import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskContext } from "../Context/TaskContext";
import { LiaEdit } from "react-icons/lia";
import { MdDelete } from "react-icons/md";

const Task = ({ id, title, description, category }) => {
    const {setTasks} =useContext(TaskContext)
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transition,
        transform: transform ? CSS.Transform.toString(transform) : undefined,
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState({ id, title, description, category });


    // Handle Delete
    const handleDelete = async (id) => {
        
            const response = await axios.delete(`https://task-manager-server-bice-one.vercel.app/tasks/${id}`);
            if (response.data.deletedCount > 0) {
                toast.success("Task Deleted");
                // Update state by filtering out the deleted task
                setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
            }
    };
    

    // Handle Edit Click
    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
    

            const response = await axios.put(`https://task-manager-server-bice-one.vercel.app/tasks/${selectedTask.id}`, selectedTask);
            if (response.data.modifiedCount > 0) {
                toast.success("Task Updated Successfully");
                setIsModalOpen(false);
                // Update the task in the state
                setTasks((prevTasks) => 
                    prevTasks.map((task) => 
                        task._id === selectedTask.id ? { ...task, ...selectedTask } : task
                    )
                );
            }
        
    };
    

    // Handle Task Completion
    const handleCompletion = async () => {
        
            const updatedTask = { ...selectedTask, category: "Done" };
            const response = await axios.put(`https://task-manager-server-bice-one.vercel.app/tasks/${id}`, updatedTask);
            if (response.data.modifiedCount > 0) {
                toast.success("Task Marked as Done");
                setTasks((prevTasks) => 
                    prevTasks.map((task) => 
                        task._id === selectedTask.id ? { ...task, ...selectedTask } : task
                    )
                );
            }
        
    };

    return (
        <div
            ref={setNodeRef}
            style={style}

            className="bg-gray-200 p-3 rounded-lg shadow flex justify-between items-center"
        >
            <div
                        {...attributes}
                        {...listeners}
            className="flex items-center space-x-2 min-w-3/4">
                <input
                    type="checkbox"
                    className="w-5 h-5"
                    onChange={handleCompletion}
                    checked={category === "Done"}
                />
                <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-sm">{description}</p>
                </div>
            </div>
            <div className="flex items-center gap-4 justify-center">   
            <button onClick={handleEditClick} className="hover:text-blue-400 text-2xl"><LiaEdit /></button>
            <button onClick={() => handleDelete(id)} className="hover:text-red-500 text-2xl"><MdDelete /></button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    onClick={() => setIsModalOpen(false)}
                    aria-hidden="true"
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg w-96"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                        <form onSubmit={handleUpdate}>
                            <label className="block mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={selectedTask.title}
                                onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                                className="w-full p-2 border rounded mb-3"
                                required
                            />

                            <label className="block mb-2">Description</label>
                            <textarea
                                name="description"
                                value={selectedTask.description}
                                onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                                className="w-full p-2 border rounded mb-3"
                                required
                            />

                            <label className="block mb-2">Category</label>
                            <select
                                name="category"
                                value={selectedTask.category}
                                onChange={(e) => setSelectedTask({ ...selectedTask, category: e.target.value })}
                                className="w-full p-2 border rounded mb-3"
                                required
                            >
                                <option value="To-Do">To-Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>

                            <div className="flex justify-end space-x-2">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Task;
