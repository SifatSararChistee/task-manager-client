import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const UseTasks = () => {  
    const { user } = useContext(AuthContext);

    const { data: tasks = [], refetch, isLoading, isError, error } = useQuery({
        queryKey: ["tasks", user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axios.get(`http://localhost:5000/tasks/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, 
    });

    return [tasks, refetch, isLoading, isError, error];
};

export default UseTasks;
