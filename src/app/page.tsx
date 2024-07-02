"use client";
import { useState, useRef } from "react";
import axios from "axios"

export default function Home() {
  const nome = useRef<HTMLInputElement>(null);
  const endereco = useRef<HTMLInputElement>(null);

  const [bd, setBd] = useState<IDados[]>([]);

  interface IDados {
    id: number;
    name: string;
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      // console.log('Dados:', response.data);
      setBd(response.data)
      console.log(bd)

    } catch (error:any) {
      console.error('Erro ao fazer a requisição:', error.message);
    }
  }

  const user = {nome, endereco} // Para enviar no POST!!!
  const dataPost = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
      console.log('Dados:', response.data);
      setBd(response.data)
      console.log(bd)

    } catch (error:any) {
      console.error('Erro ao fazer a requisição:', error.message);
    }
  }

  async function enviar() {
    //Ela precisa ser asyncrona porque ela busca nos servidor backend
    const res = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nome: nome.current?.value,
        endereco: endereco.current?.value,
      }),
    });
    console.log(res);
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
          <input name="nome" type="text" ref={nome}/>
          <label htmlFor="endereco">Endereço: </label>
          <input name="endereco" type="text" ref={endereco}/>
          <button type="button" onClick={enviar}>
            Enviar Pedido
          </button>
          <button type="button" onClick={fetchData}>
            Teste
          </button>
        </form>
      </div>
      {bd.map((user) => (
        <div key={user.id} className="flex justify-center items-center gap-4">
          <p>{user.id}</p>
          <p>{user.name}</p>
        </div>
      ))}
    </main>
  </div>
  );
}
