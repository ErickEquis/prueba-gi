import { useState } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "../helpers/tasks";
import { FetchContext } from "./FetchContext";


export const FetchProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    const get = async () => {
        const fetchTasks = await getTasks();
        setTasks(fetchTasks);
    }

    const create = async (payload) => {
        await createTask(payload);
    }

    const update = async (id, payload) => {
        const upTask = await updateTask(id, payload);
        setTasks([...tasks, upTask]);
    }

    const deleteT = async (id) => {
        const delTask = await deleteTask(id);
    }

    return (
        <FetchContext.Provider value={{ get, create, update, deleteT, tasks, isUpdated, setIsUpdated }}>
            {children}
        </FetchContext.Provider>
    )
}
