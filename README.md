# Aplicação desenvolvida com Next + TypeScript + Prisma + Tailwindcss

# 1 Instalação e criação do APP:
    npx create-next-app@latest my-project --typescript --eslint

# 2 Instalação do Prisma | Dica: Instalar extensão do Prisma
    npm install prisma --save-dev
    npx prisma init //Cria uma pasta do Prisma automáticamente

2.1 Após isso defina o modelo do BD:

model NOME DA TABELA {
  id Int @default(autoincrement()) @id
  nome String
  endereco String
}

2.2 CONECTANDO O BANCO DE DADOS AO PRISMA CRIAREMOS UMA URL:
Nesse exemplo usei a railway.app para criar um DB postgre
Copie a informação da URL e coloque em ".env"
    DATABASE_URL= URL DO BD

2.3 Usar o comando abaixo para gerar o modelo do banco de dados no servidor:
    npx prisma migrate dev

(MUDOU INFORMAÇÕES?)Se for feito alguma mudança no modelo após a migração, usar o comando abaixo para atualizar o modelo no server:
    npx prisma generate

2.4 Criar o caminho abaixo na raiz do projeto:
    "lib/db.ts"

Dentro de db.ts colar a função singleton do Prisma

import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
    return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

# 3 Configurando funções do backend

3.1 Criar o caminho abaixo na "/src" do projeto:
"api/user/route.ts"

Dentro de route.ts vão as configurações para as ROTAS usando HTTP Verbs (No caso aqui só utilizei o GET e o POST)

Primeiramente faça os devidos imports:
    import { NextRequest, NextResponse } from "next/server";
    import prisma from "../../../../lib/db";


##################################################

export async function GET(req: NextRequest) {
    try {
        const users = await prisma.cliente.findMany();
        return Response.json({message: "OK", users});
    } catch (err) {
        return NextResponse.json(
            {
                message:"Error",
                err,
            },
            {
                status: 500,
            }
        );
    }
}

##############################################

export async function POST(req: NextRequest) {
  const { nome, endereco } = await req.json();

  try {
    const cliente = await prisma.cliente.create({
      data: {
        nome,
        endereco,
      },
    });
    return Response.json({ message: "OK", cliente });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error",
        err,
      },
      {
        status: 500,
      }
    );
  }
}

# 4 (DO FRONTEND PARA O BACKEND) Capturando informações para enviar dados para o BD

4.1 Configure o componente :

"use client";
import { useRef } from "react"; ---------------------------------------// Importa a função useRef() para capturar dados de um componente.

export default function Home() {
  const nome = useRef<HTMLInputElement>(null); ------------------------// Declarando variável que vai receber o dado.

  Utilizando AXIOS:
    const user = {nome} // Para enviar no POST!!!
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

  POST Utilizando Método antigo ABAIXO:

  async function enviar() { -------------------------------------------// Ela precisa ser asyncrona porque ela precisa esperar que a busca no backend retorne alguma coisa.
    const res = await fetch("http://localhost:3000/api/user", {
      method: "POST", -------------------------------------------------// Utilizando metodo POST para envio de dados
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nome: nome.current?.value, --------------------------------------------// Passando o valor capturado através do body para o backend.
        endereco: endereco.current?.value, ------------------------------------// Passando o valor capturado através do body para o backend.
      }),
    });
    console.log(res);
  }

  return (
        <input type="text" ref={nome}/> ---------------------------------------// Ref é chamada passando o nome da variável designada.
  );
}

# 5 Como criar um lugar para guardar os dados que são recebidos da API

5.1 Criando um Array para receber os dados da API
---> import { useState } from "react"

---> const [ bancoDeDados, setBancoDeDados ] = useState[]([])

Para uma melhor organização podemos definir que tipo de dado será puxado
da API, usando Interfaces.

--->interface IDados {
--->  id: number;
--->  name: string;
--->}

Após criar a interface, devemos modificar o "useState" que criamos:
---> const [ bancoDeDados, setBancoDeDados ] = useState<IDados[]>([])
Fazendo isso não será necessário configurar o tipo na hora de mapear no HTML.

5.2 Fazendo aparecer no Front-End:
Englobo a parte do código que desejo que apareça os dados da api.
Passo a propriedade "key" no primeiro elemento depois da função .map()
para não ter erros com o TYPESCRIPT.

---> {bancoDeDados.map( (user) => { 
--->   <div key={user.id}>
--->     <p>{user.id}</p>
--->     <p>{user.name}</p>
--->   </div>
---> } ) }

IMPORTANTE! ---> O "user" usado dentro da função ".map((user) => {<div>...})"
é o nome que eu quis dar para cada dado mapeado dentro da api.
Poderia ser "x", "y", "dado".