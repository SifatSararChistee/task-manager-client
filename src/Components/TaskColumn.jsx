/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import UseTasks from "../Hooks/UseTasks";
import toast from "react-hot-toast";

const TaskColumn = ({ title, tasks }) => {
    const [, refetch] = UseTasks();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/tasks/${id}`)
            .then((response) => {
                if (response.data.deletedCount > 0) {
                    toast.success("Task Deleted");
                }
                refetch();
            });
    };

    const handleEditClick = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedTask = {
            title: e.target.title.value,
            description: e.target.description.value,
            category: e.target.category.value,
        };

        axios.put(`http://localhost:5000/tasks/${selectedTask._id}`, updatedTask)
            .then((response) => {
                if (response.data.modifiedCount > 0) {
                    toast.success("Task Updated Successfully");
                    setIsModalOpen(false);
                    refetch();
                }
            });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md min-h-[400px]">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <div className="space-y-2">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div
                            key={task._id}
                            className="bg-gray-200 p-3 rounded-lg shadow flex justify-between items-center"
                            id={task._id}
                        >
                            <div>
                                <h3 className="font-bold">{task.title}</h3>
                                <p className="text-sm">{task.description}</p>
                            </div>
                            <button onClick={() => handleEditClick(task)} className="hover:text-blue-400">Edit</button>
                            <button onClick={() => handleDelete(task._id)} className="hover:text-red-500">Delete</button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No tasks available.</p>
                )}
            </div>

            {isModalOpen && selectedTask && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                        <form onSubmit={handleUpdate}>
                            <label className="block mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                defaultValue={selectedTask.title}
                                className="w-full p-2 border rounded mb-3"
                                required
                            />

                            <label className="block mb-2">Description</label>
                            <textarea
                                name="description"
                                defaultValue={selectedTask.description}
                                className="w-full p-2 border rounded mb-3"
                                required
                            />

                            <label className="block mb-2">Category</label>
                            <input
                                type="text"
                                name="category"
                                defaultValue={selectedTask.category}
                                className="w-full p-2 border rounded mb-3"
                                required
                            />

                            <div className="flex justify-end space-x-2">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskColumn;
