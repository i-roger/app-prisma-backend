"use client";
import { useRef } from "react";

export default function Home() {
  const nome = useRef<HTMLInputElement>(null);
  const endereco = useRef<HTMLInputElement>(null);

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
    <main className="flex justify-center">
      <div className="flex flex-col w-[300px]">
        <form className="flex flex-col">
          <div className="flex justify-center">
            <h1>Cadastro do usuário</h1>
          </div>
          <label htmlFor="nome">Nome: </label>
          <input name="nome" type="text" ref={nome} />
          <label htmlFor="endereco">Endereço: </label>
          <input name="endereco" type="text" ref={endereco} />
          <button type="button" onClick={enviar}>
            Enviar Pedido
          </button>
        </form>
      </div>
    </main>
  );
}
