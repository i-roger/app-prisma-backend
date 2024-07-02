"use client";
import { useState, useRef } from "react";
import axios from "axios"

export default function Home() {
  const nomeInput = useRef<HTMLInputElement>(null);
  const enderecoInput = useRef<HTMLInputElement>(null);
  const name = nomeInput.current?.value;
  const address = enderecoInput.current?.value;

  const [bd, setBd] = useState<IDados[]>([]);

  interface IDados {
    id: number;
    nome: string;
    endereco: string;
  }

  const buscarUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/user');
      console.log('Dados:', response.data.users);
      setBd(response.data.users)

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

  // Método POST : Antigo, via FETCH
  // async function enviar() {
  //   //Ela precisa ser asyncrona porque ela busca nos servidor backend
  //   const res = await fetch("http://localhost:3000/api/user", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       nome: nomeInput.current?.value,
  //       endereco: enderecoInput.current?.value,
  //     }),
  //   });
  //   console.log(res);
  // }

  // Método DELETE
  const apagar = async () => {
    
    try{
      const response = await axios.delete('http://localhost:3000/api/user', )
    }
  }
  return (
    <div>
    <main className="flex justify-center items-center flex-col ">
      <div className="flex flex-col w-[300px]">
        <form className="flex flex-col">
          <div className="flex justify-center">
            <h1>Cadastro do usuário</h1>
          </div>
          <label htmlFor="nome">Nome: </label>
          <input name="nome" type="text" ref={nomeInput}/>
          <label htmlFor="endereco">Endereço: </label>
          <input name="endereco" type="text" ref={enderecoInput}/>
          <button type="button" onClick={enviar}>
            Enviar Pedido
          </button>
          <button type="button" onClick={buscarUsers}>
            Buscar Users
          </button>
        </form>
      </div>
      <div className="flex mt-10 flex-col gap-4">
      {bd?.map((user) => (
        <div key={user.id} className="flex flex-col p-2 rounded bg-red-300">
          <p>Nome: {user.nome}</p>
          <p>Endereço: {user.endereco}</p>
          <button onClick={apagar}className="bg-red-600 p-2 rounded">Apagar</button>
        </div>
      ))}
      </div>
    </main>
  </div>
  );
}
