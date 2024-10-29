import { useContext, useEffect, useState } from "react";
import { TaskItem } from "./TaskItem";
import { FetchContext } from "../context/FetchContext";

export const Tasks = () => {

    const { isUpdated, setIsUpdated, get, tasks } = useContext(FetchContext)

    useEffect(() => {
        get();
        setIsUpdated(false);
    }, [isUpdated])

    return (
        <>
            {
                tasks.map(task => <TaskItem key={task.id} task={task} />)
            }
        </>
    )
}
