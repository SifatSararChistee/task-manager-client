/* eslint-disable react/prop-types */
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "./Task";

const TaskColumn = ({ title, tasks }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md min-h-[400px]">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <SortableContext items={tasks.map(task => task._id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <Task key={task._id} id={task._id} title={task.title} description={task.description} category={task.category} />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No tasks available.</p>
                    )}
                </div>
            </SortableContext>
        </div>
    );
};

export default TaskColumn;





