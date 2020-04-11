import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
 const [repositories, setRepositories] =  useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])
  async function handleAddRepository() {
    const response =  api.post('repositories', {
        title:`👨‍🚀 Desafio02-NodeJs ${Date.now()} 🚀 `,
        url: "https://github.com/MarcosMthJr/Desafio03-React",
        techs:"ReactJS, Javascript, JSON"
    })
    const repository =  (await response).data;
    setRepositories([... repositories, repository]);
  }

  async function handleRemoveRepository(id) {

      await api.delete(`repositories/${id}`);
      //criando novo array, deletando o repositório que foi selecionado
      // fazendo dessa forma para não fazer outra requisição GET 
      const newRepositories = repositories.filter(
        repository => repository.id !== id
      )
      setRepositories(newRepositories);
    }
  

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>
          <p>{repository.title}</p>
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
