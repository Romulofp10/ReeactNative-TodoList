import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput} from "react-native";
import { db } from '../firebaseConnection'
import { doc, collection, orderBy, onSnapshot, addDoc, updateDoc, query,where, getDocs } from 'firebase/firestore'
import { TaskComponent } from './Tasks'
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { TaskDTO } from "../models/TaskProps";
import Toast from 'react-native-toast-message'
import { useTasksContext } from "../context/TasksContext";


export function FormTasks() {
    function showNotify(){
        Toast.show({
            type: 'success',
            text1: 'Cadastrado!',
            text2: 'item cadastrado com sucesso',
            autoHide: true,
            position: 'top',
            visibilityTime: 4000
        })
    }

    const {
        name,
        setName,
        description,
        setDescription,
        error,
        setError,
        status,
        setStatus,
    } = useTasksContext();

    const [showInput, setShowInput] = useState(false)
    const [isEditing, setIsEditing] = useState('');

    const [tasks, setTasks] = useState<TaskDTO[]>([])

    useEffect(() => {
        getData();
    }, [])

    

    const   handleClickComplet = async () =>{
        setTasks([])
        const q = query(collection(db,'tasks'),where('status', "==", 1))
        const querySnapShot = await getDocs(q);
        let list = []  as TaskDTO [];

        querySnapShot.forEach((doc)=>{
            list.push({
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                status: doc.data().status
            })
        })
        setTasks(list);

    }
    const handleClickIncomplet = async () =>{
        setTasks([])
        const q = query(collection(db,'tasks'),where('status', "==", 2))
        const querySnapShot = await getDocs(q);
        let list = []  as TaskDTO [];

        querySnapShot.forEach((doc)=>{
            list.push({
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                status: doc.data().status
            })
        })
        setTasks(list);
    }
    const handleClickTodos =() =>{
        getData();

    }

    async function handleAdd() {
        setError('');
        let error = verify();
        if(error){
            return setError("Complete todos os campos")
        }
        else{
            await addDoc(collection(db, "tasks"), {
                name: name,
                description: description,
                status: status
            }).then(() => {
                
                clear();
            })
                .catch((error) => {

                })
        }
        showNotify();

    }
    async function handleEditTask() {
        const docRef = doc(db, 'tasks', isEditing)
        await updateDoc(docRef, {
            name: name,
            description: description,
            status: status
        })
        clear();
    }

    async function getData() {
        const tasksRef = collection(db, 'tasks');
        onSnapshot(tasksRef, (snapshot) => {
            let list = [] as TaskDTO[];
            snapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    status: doc.data().status
                })
            })
            setTasks(list);
        })

    }

    function clear() {
        setName('')
        setDescription('')
        setStatus(2);
        setIsEditing('');
        setShowInput(!showInput);
    }

    function verify() {
        if(!name || !description){
            return true;
        }
        else{
            return false;
        }
    }


    function editTask(data: TaskDTO) {
        setShowInput(true);
        setName(data.name);
        setDescription(data.description);
        setStatus(data.status)
        setIsEditing(data.id);
        setError('')
    }

  

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.title}>Projeto To Do List</Text>
                <TouchableOpacity onPress={() => setShowInput(!showInput)}>
                    <Text style={styles.title}>{showInput ? 'x' : '+ '}</Text>
                </TouchableOpacity>
            </View>
            {showInput && (
                <View style={styles.areaInput}>
                    <Text style={styles.label}>Name da Task:</Text>
                    <TextInput style={styles.input} placeholder="Digite o nome da task..." value={name} onChangeText={(text) => setName(text)} />
                    <Text style={styles.label}>Description da task:</Text>
                    <TextInput style={styles.input}  placeholder="Digite a descrição da task..." value={description} onChangeText={(text) => setDescription(text)} />
                    <Picker selectedValue={status} onValueChange={(itemValue) => setStatus(itemValue)}>
                        <Picker.Item key={1} value={1} label="Completa" />
                        <Picker.Item key={2} value={2} label="Incompleta" />
                    </Picker>

                    {isEditing !== "" ? (
                        <TouchableOpacity style={styles.buttonInput} onPress={handleEditTask}>
                            <Text style={styles.text}>Editar Task</Text>
                           {error && <Text style={styles.text}>{error}</Text>}
                        </TouchableOpacity>
                    ) : (<TouchableOpacity style={styles.buttonInput} onPress={handleAdd}>
                        <Text style={styles.text}>Cadastrar</Text>
                        {error && <Text style={styles.text}>{error}</Text>}
                    </TouchableOpacity>
                )}

                </View>
            )}
            <Toast/>
            <View style={styles.containerButtons}>
               
                <TouchableOpacity style={styles.buttonSeach}>
                    <Text style={styles.text} onPress={handleClickTodos}>Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSeach} onPress={handleClickComplet}>
                    <Text style={styles.text}>Completas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSeach} onPress={handleClickIncomplet}>
                    <Text style={styles.text}>Incompletas</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                style={{ flex: 1, paddingLeft: 14, paddingRight: 14 }}
                data={tasks}
                keyExtractor={(item: TaskDTO) => item.id}
                renderItem={({ item }) => (
                    <TaskComponent data={item} handleEdit={(data: TaskDTO) => editTask(data)} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    containerButtons:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 14,
        paddingTop: 25,
        marginBottom: 25
    },
    label: {
        color: '#000',
        fontSize: 16,
        marginBottom: 4
    },
    input: {
        borderWidth: 1,
        backgroundColor: '#ddd',
        color: '#000',
        padding: 8,
        borderRadius: 8

    },
    areaInput: {
        paddingLeft: 14,
        paddingRight: 14,
        marginBottom: 14,
        gap: 8
    },
    buttonInput: {
        padding: 14,
        backgroundColor: '#121212',
        color: "#ffff",
        borderRadius: 8
    },
    buttonSeach:{
        padding: 10,
        height: 40,
        backgroundColor: '#121212',
        color: "#ffff",
        marginBottom: 10,
        marginTop: 20,
        borderRadius: 8
    },
    text:{
        color: '#fff',
         textAlign: 'center'
    }
})