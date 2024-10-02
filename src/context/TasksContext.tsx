import { useState,useContext,createContext } from "react";

type FormContextData = {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
    status: number;
    setStatus: React.Dispatch<React.SetStateAction<number>>;
};

const TasksContext = createContext<FormContextData>({} as FormContextData)

export const useTasksContext = () => useContext(TasksContext)

export const TasksProvider: React.FC<{children: React.ReactNode}> = ({children}) =>{
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [status,setStatus] = useState(2);
    const [error,setError] = useState('');

    return(
        <TasksContext.Provider value={
          {  name,
            setName,
            description,
            setDescription,
            error,
            setError,
            status,
            setStatus}
        }>{children}</TasksContext.Provider>
    )

}
