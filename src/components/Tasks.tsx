import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConnection";
import { TaskDTO } from "../models/TaskProps";

interface TaskProps {
    data: TaskDTO
    handleEdit: (data: TaskDTO) => void
}

export function TaskComponent({ data, handleEdit }: TaskProps) {
    async function handleDeleteTask() {
        const docRef = doc(db, 'tasks', data.id)
        await deleteDoc(docRef);

    }

    function handleEditTask(data: TaskDTO) {
        handleEdit(data);
    }

    return (
        <View style={data.status ==1 ? styles.containerComplet : styles.containerIncomplet }>
            <Text style={styles.text}>Task: {data.name}</Text>
            <Text style={styles.text}>Description: {data.description}</Text>
            <Text style={styles.text}>Status: {data.status == 1 ? 'Completa' : "Incompleta"}</Text>
            <TouchableOpacity style={styles.button} onPress={handleDeleteTask}>
                <Text style={styles.buttonText}>Delete Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonEdit}>
                <Text style={styles.buttonText} onPress={() => handleEditTask(data)}>Edit Task</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    containerComplet: {
        padding: 14,
        backgroundColor: '#006400',
        borderRadius: 8,
        marginTop: 14,
        marginBottom: 14,
    },
    containerIncomplet: {
        padding: 14,
        backgroundColor: '#121212',
        borderRadius: 8,
        marginTop: 14,
        marginBottom: 14,
    },
    text: {
        color: '#fff'
    },
    button: {
        backgroundColor: "#b3261e",
        alignSelf: "flex-start",
        padding: 4,
        borderRadius: 4,
        marginTop: 16
    },
    buttonEdit: {
        backgroundColor: "#FDDA0D",
        alignSelf: "flex-start",
        color: "#ffff",
        padding: 4,
        borderRadius: 4,
        marginTop: 16
    },
    buttonText: {
        color: '#FFF',
        paddingLeft: 8,
        paddingRight: 10
    }

})

function handleEdit(id: string) {
    throw new Error("Function not implemented.");
}
function onEdit(data: { id: string; name: string; description: string; status: boolean; }) {
    throw new Error("Function not implemented.");
}

