import { View, StyleSheet,Animated} from "react-native";
import { FormTasks } from "./src/components/FormTasks";
import { useEffect, useRef } from "react";
import { TasksProvider } from "./src/context/TasksContext";


export default function App() {
  const xAnimate = useRef(new Animated.Value(150)).current
  const yAnimate = useRef(new Animated.Value(50)).current
  const opacityAnimate = useRef(new Animated.Value(1)).current

  useEffect(()=>{
    Animated.sequence([
      Animated.timing(xAnimate,{
        toValue: 300,
        duration:2000,
        useNativeDriver:false
      }),
      Animated.timing(yAnimate,{
        toValue: 300,
        duration:2000,
        useNativeDriver:false
      }),
    ]).start()
  },[])

  return (
    <View style={styles.container}>
      <TasksProvider>
        <FormTasks/>
      </TasksProvider>
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    backgroundColor: '#fff'
  },
})