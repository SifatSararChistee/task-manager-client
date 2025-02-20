/* eslint-disable react/prop-types */

const TaskColumn = ({ title, tasks }) => {



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
                  {/* Delete Button */}
                  <button className="hover:text-blue-400">Edit</button>
                  <button className="hover:text-red-500">Delete</button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No tasks available.</p>
            )}
          </div>
      </div>
    );
};

export default TaskColumn;




