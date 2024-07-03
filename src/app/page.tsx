"use client";
import { useState, useRef } from "react";
import axios from "axios"

export default function Home() {
  const nomeInput = useRef<HTMLInputElement>(null);
  const enderecoInput = useRef<HTMLInputElement>(null);

  const [bd, setBd] = useState<IDados[]>([]);

  interface IDados {
    id: number;
    nome: string;
    endereco: string;
  }

// Método GET :
  const buscarUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/user');
      const qtdClientes = response.data.users.length
      setBd(response.data.users)
      console.log(response.data.users)

      if (qtdClientes === 0) {
        console.log('O BD está vazio!')
      } else {
        console.log(`O BD tem ${qtdClientes} Clientes!`)
      }

    } catch (error:any) {
      console.error('Erro ao fazer a requisição:', error.message);
    }
  }

// Método POST : Usando AXIOS.post()
  const enviar = async () => {

    const dadoParaPost = {nome: nomeInput.current?.value, endereco: enderecoInput.current?.value}

    try {
      const response = await axios.post('http://localhost:3000/api/user', dadoParaPost)
      console.log('Dados:', response);
      setBd(response.data.users)

    } catch (error:any) {
      console.error('Erro ao fazer a requisição:', error.message);
    }
  }

// Método DELETE :
  const apagar = async (id:number) => {
    console.log('ID do card para exclusão: ', id)
    try{
      const response = await axios.delete('http://localhost:3000/api/user', {
        data: JSON.stringify(id)
      })
      buscarUsers() // Atualiza Lista - Para remapear o DB Novamente.
      console.log('Resposta do BACKEND: ', response)
    } catch (error:any){
      console.log(error)
    }
  }

  return (
    <div>
    <main className="flex justify-center items-center flex-col ">
      <div className="flex flex-col w-[400px] bg-[#141920] p-4 m-10 rounded shadow">
        <form className="flex flex-col">
          <div className="flex justify-center">
            <h1>Cadastro do usuário</h1>
          </div>
          <label htmlFor="nome">Nome: </label>
          <input name="nome" type="text" ref={nomeInput}/>
          <label htmlFor="endereco">Endereço: </label>
          <input name="endereco" type="text" ref={enderecoInput}/>
          <div className="flex flex-col mt-5">
          <button className="bg-green-600 hover:bg-green-500 mt-4 p-2 rounded" type="button" onClick={enviar}>
            Enviar Pedido
          </button>
          <button className="bg-blue-600 hover:bg-blue-500 mt-4 p-2 rounded" type="button" onClick={buscarUsers}>
            Buscar Users
          </button>
          </div>
        </form>
      </div>
      <div className="max-w-[1300px] flex justify-center flex-wrap gap-4 ">
      {bd?.map((user) => (
        <div key={user.id} className="w-[400px] flex flex-col p-4 rounded bg-[#141920]">
          <p>Nome: {user.nome}</p>
          <p>Endereço: {user.endereco}</p>
          <button onClick={() => apagar(user.id)} className="bg-red-600 mt-4 p-2 rounded">Apagar</button>
        </div>
      ))}
      </div>
    </main>
  </div>
  );
}
