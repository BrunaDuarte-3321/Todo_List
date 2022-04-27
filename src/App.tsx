import React, { useState } from 'react';

//components
import Footer from './components/Footer';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from './components/Modal';

//CSS
import styles from './App.module.css'

//Interface
import { ITask } from './interface/Task';

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]) // estado para criar lista
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null >(null) // estado para receber a alteração da task

  // Função para deletar task

  const deleteTask = (id:number) =>{
    // como a task vai sofrer alteração, dentro do setTask, realizamos um filter nas task para retornar um novo array task só com os elementos diferente do id.
    setTaskList( 
      taskList.filter((task) => { 
        return task.id !== id
      })
    );
  };
 

  
    //Função para ativar o modal quando clicar no icon d editar
   const hideorShowModal = (display: boolean) =>{
    const modal = document.querySelector('#modal')
    if(display){
      modal!.classList.remove('hide')
    }
    else{
      modal!.classList.add('hide')
    }
  }
  //Função para adionar as alterações realizada no modal 
  const updateTask = (id:number, title: string, difficulty:number) => {
    const updateTask:ITask = {id, title, difficulty}
    const updateItems = taskList.map((task) => {
      return task.id === updateTask.id ? updateTask: task
    })
    setTaskList(updateItems)
    hideorShowModal(false)
  }


  // Função para editar task no modal
  const editTask = (task:ITask):void =>{ // a task do paramentro é para poder enviar qual tarefa queremos editar, isso leva a alteração do state.
    hideorShowModal(true)
    setTaskToUpdate(task)
    
  }
  return (
    <>
    <Modal 
    children={<TaskForm btnText='Editar tarefa' /* TaskForm será renderizada onde atribuimos o {children} */
     taskList={taskList} 
     task={taskToUpdate} // para pegar os dados atuais, colocar no modal  para alteração
     handleUpdate={updateTask}/>}/>
      <Header/>
     <main className={styles.main}>
       <div>
       <h2>O que fazer?</h2>
       <TaskForm
        btnText='Criar Tarefa'
        taskList={taskList} 
        setTaskList={setTaskList}/>
        
       </div>
       <div>
         <h2>Suas Tarefas:</h2>
         {/* Obs: os nome das funções criada no proprio componente são os valores colocado  nas {}, a função que vai receber os valores d chaves, são os que são criados na interface do component */}
         <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>
       </div>
     </main>
      <Footer/>
    </>
    
  );
}

export default App;
