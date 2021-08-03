import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView, StatusBar, 
  TouchableOpacity, FlatList, Modal, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable';

const AnimatableBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  //Função para deletar
  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key);
    setTask(find);
  })

  //Buscando todas tarefas ao iniciar o app
  useEffect(()=> {
  
    async function loadTasks() {
      const taskStorage = await AsyncStorage.getItem('@task');

      if(taskStorage){
        setTask(JSON.parse(taskStorage));
      }
    }
  
    loadTasks();
  
  }, []);

  //Salvando caso haja alguma tarefa alterada
  useEffect(() => {

    async function saveTasks() {
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }

    saveTasks();
  
  }, [task] );

  function handleAdd() {
    if(input === '') return;

    const data = {
      key: input,
      task: input
    }

    setTask([...task, data]);
    setOpen(false);
    setInput('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1C1C1C" barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>

      {/*
      Lista onde vão ficar as tarefas
      */}
      <FlatList
      marginHorizontal={10}
      showsHorizontalScrollIndicator={false}
      data={task}
      keyExtractor={ (item) => String(item.key) }
      renderItem={ ({ item }) => <TaskList data={item} handleDelete={handleDelete} /> }
      />

      {/*
      Nova aba
      */}
      <Modal animationType="slide" transparent={false} visible={open} >
        <SafeAreaView style={styles.modal}>

          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={ ( ) => setOpen(false)}>
              <Ionicons name="md-arrow-back" style={styles.arrow} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nova tarefa</Text>
          </View>

          <Animatable.View style={styles.modalBody} animation="fadeInUp" useNativeDriver>
            <TextInput
            autoCorrect={false}
            multiline={true}
            placeholder="O que precisa fazer hoje?"
            placeholderTextColor="#BEBEBE"
            style={styles.input}
            value={input}
            onChangeText={ (texto) => setInput(texto) }
            />

            <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
              <Text style={styles.handleAddText}>Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>

        </SafeAreaView>
      </Modal>

      <AnimatableBtn 
      style={styles.fab}
      useNativeDriver
      animation="bounceInRight"
      duration={2000}
      onPress={ ( ) => setOpen(true) }
      >
        <Ionicons name="ios-add" size={35} color="#FFF" />
      </AnimatableBtn>

    </SafeAreaView>
  ) 
}

const styles = StyleSheet.create({
  arrow:{
    color: '#FFF',
    marginLeft: 0,
    marginTop: 15,
    fontSize: 32
  },
  container:{
    flex:1,
    backgroundColor: '#1C1C1C'
  },
  fab:{
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#FFC800',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset:{
      width: 1,
      height: 3
    }
  },
  handleAdd:{
    alignItems: 'center',
    backgroundColor: '#FFC800',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
  },
  handleAddText:{
    fontSize: 18,
    color: "#FFF"
  },
  input:{
    fontSize: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#1C1C1C',
    height: 100,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    padding: 9,
    textAlignVertical: 'top'
  },
  modal:{
    flex: 1,
    backgroundColor: "#1C1C1C"
  },
  modalBody:{
    marginTop: 15
  },
  modalHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15
  },
  modalTitle:{
    marginLeft: 15,
    marginTop: 12,
    fontSize: 19,
    color: '#FFF'
  },
  title:{
    marginTop: 20,
    paddingBottom: 10,
    fontSize: 20,
    textAlign: 'center',
    color: '#FFF'
  }
})