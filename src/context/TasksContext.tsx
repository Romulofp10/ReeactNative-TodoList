import React, { Children, createContext } from "react";

type TaskItem = {

} & TaskProviderProps

type TaskProviderProps = {
    children: React.ReactNode
};

type TaskContextData = {

}

export const TaskContext = createContext<TaskContextData>({} as )

const TaskProvider = ({children}: TaskProviderProps) =>{}