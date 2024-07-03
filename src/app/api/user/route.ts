import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db";
import { request } from "http";
import { useId } from "react";

//Os HTTPS VERBS devem ser usados para rota API -> localhost:3000/api
// (GET, POST, PUT ....)

// Passando req:Request retorna o que foi requisitado pelo client.
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


// Método Delete :
// export async function DELETE(req: NextRequest) {
//   try {
//       const users = await prisma.cliente.delete();
//       return Response.json({message: "OK", users});
//   } catch (err) {
//       return NextResponse.json(
//           {
//               message:"Error",
//               err,
//           },
//           {
//               status: 500,
//           }
//       );
//   }
// }
