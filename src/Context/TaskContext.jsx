/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchTasks = async () => {
        const res = await axios.get(
          `https://task-manager-server-bice-one.vercel.app/tasks/${user.email}`
        );
        setTasks(res.data);
  
    };

    fetchTasks();
  }, [user?.email]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
