import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import styles from './TaskForm.module.css'
// Interface
import {ITask} from '../../interface/Task'

interface Props {
  btnText:string // Nome que o component ira renderizar na tela
  taskList: ITask[] // paramentro do component app, para criar nova lista
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>> // importado do componet App
  task?:ITask | null
  handleUpdate?(id:number, title: string, difficulty:number):void
}
const TaskForm = ({btnText, taskList, setTaskList, task, handleUpdate}: Props) =>{

  const [id, setId] = useState<number>(0)
  const [title, setTitle] = useState<string>('')
  const [difficulty, setDifficulty] = useState<number>(0)

  // função para renderizar o componente só quando houver alteração
  useEffect(() => {
    if(task){
      setId(task.id)
      setTitle(task.title)
      setDifficulty(task.difficulty)
    }
  }, [task])

  // Adiciona  tarefa na lista de tarefas
  const addTaskHandle = (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault(); 
    

    if(handleUpdate){
      handleUpdate(id, title, difficulty)
    }
    else{
      const id = Math.floor(Math.random() * 1000) // Adicionando ao Id numero aleatório

      const newTask: ITask = {id, title, difficulty} //Novo array que vai adicionar as funcionalidade da Interface ITask. title e difficulty vem do interface, id foi criado dentro da função de Add taks

   
    

    setTaskList!([...taskList, newTask]) // ... cria um novo array das tasklist adicionando as newTask
    setTitle(''); // Limpa campo apos a atualização do newTask o value do input tem que receber o valor inicial do estado.
    setDifficulty(0); // Limpa campo apos a atualização do newTask o value do input tem que receber o valor inicial do estado. 
    }
  }
// Função para pegar os valores digitado no input
  const handleChange = ({target}: ChangeEvent<HTMLInputElement>) =>{
    if(target.name === "title"){
      setTitle(target.value)
    }
    else {
      setDifficulty(parseInt(target.value)) // parseInt converte string em number
    }
  }
  
  return (
    <form onSubmit={addTaskHandle} className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="title">Título:</label>
        <input type="text"
         name="title" 
         placeholder='Título da tarefa' 
         onChange={handleChange}
         value={title}/>
      </div>
      
      <div className={styles.input_container}>
        <label htmlFor="difficulty">Dificuldade:</label>
        <input type="text"
         name="difficulty"
         placeholder='Dificuldade da tarefa' 
         onChange={handleChange} 
         value={difficulty}/>
      </div>
      <input type="submit" value={btnText} />
    </form>
  )
}

export default TaskForm