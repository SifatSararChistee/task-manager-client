/* eslint-disable react/prop-types */
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";

const TaskColumn = ({ title, tasks }) => {
    const { setNodeRef } = useDroppable({ id: title });

    return (
        <div ref={setNodeRef} className="bg-white p-4 rounded-lg shadow-md min-h-[400px]">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <div className="space-y-2">
                <SortableContext items={tasks.map(task => task._id)} strategy={verticalListSortingStrategy}>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <Task key={task._id} id={task._id} title={task.title} description={task.description} category={task.category} />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No tasks available.</p>
                    )}
                </SortableContext>
            </div>
        </div>
    );
};

export default TaskColumn;




