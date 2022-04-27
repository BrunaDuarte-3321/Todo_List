import React, { ReactNode } from 'react'
import styles from './Modal.module.css'

interface Props {
  children: React.ReactNode
}
const Modal = ({children}: Props) =>{

  // função para fechar o modal
  const closeModal = (e:React.MouseEvent):void =>{
    const modal = document.querySelector('#modal') // pegando o id atribuido na estrutura renderizada do modal
    modal!.classList.add('hide') // adicionando a classe hide que foi adicionada no css global
    // Obs: ! é usando par informar para o ts com react ira vim
  }
  return(
    
    <div id="modal" className='hide'>
      <div className={styles.fade}/* tela fora do modal */ onClick={closeModal}>

      </div>
      <div className={styles.modal}>
        <h2>Editar tarefa</h2>
        {children} {/* Metodo para enviar um componente como propriedade para ser renderizado onde queremos*/}
      </div>
    </div>
  )
}

export default Modal