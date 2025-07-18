// npm run dev
//npx prisma studio
//node server.js

import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([]) // 1. useState para armazenar usuários

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()


  // Pegar usuários
  async function getUsers() {
    try {
      const response = await api.get('/users/')
      setUsers(response.data) // 2. atualiza o estado com os dados da API
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    }
  }
  // Criar usuários
  async function createUsers() {
     await api.post('/users/', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value
      })
      
      getUsers()
    
  }



   async function deleteUsers(id) {
      await api.delete(`/users/${id}`)
     
      getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])


  return (
    <div className='container'>
      <form>
        <h1>Cadastro dos usuários</h1>
        <input placeholder='Nome' name='name' type='text' ref={inputName} />
        <input placeholder='Idade' name='age' type='text' ref={inputAge} />
        <input placeholder='E-mail' name='email' type='text' ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Email: <span>{user.email}</span></p> 
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p> 
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} width={25} height={25} alt='Excluir usuário' />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
