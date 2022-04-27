//CSS
import { ITask } from '../../interface/Task'
//Interface
import styles from './TaskList.module.css'

interface Props {
  taskList: ITask[] 
  handleDelete(id:number): void // metodo de excluir task efetuado no component App
  handleEdit(task:ITask):void  // paramentro da função para editar task
}
const TaskList  = ({taskList, handleDelete, handleEdit}:Props) => {
  return(
    <>
      { taskList.length > 0 ? // verificando se ha tarefas cadastradas
        (taskList.map((task) => ( // renderizando as tarefas  cadastradas.
          <div key={task.id} className={styles.task}>
            <div className={styles.datails}>
              <h4>{task.title}</h4>
              <p>Dificuldade: {task.difficulty}</p>
            </div>
            <div className={styles.actions}>
              <i className='bi bi-pencil' onClick={() => {handleEdit(task)}}></i>
              <i className='bi bi-trash' onClick={() => {handleDelete((task.id))}}></i> {/* onClick recebe a função de deletar task, sempre passar como arrow function para evitar que o metodo seja execultado assim que o component for renderizado. */}
            </div>
          </div>
        ))):
        (<p>Não há tarefas</p>)
      }
    </>
  )
}

export default TaskList