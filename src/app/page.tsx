// import { writeFileSync } from "fs";

export default function Home() {
  // const history = () => {
  //   console.log("Start Write")
  //   writeFileSync("file.txt", "Compra de 1 produto R$15,00", {flag: "w"})
  //   console.log("End Write")
  // }

  function enviar () {
    
  }

  return (
    <main className="flex justify-center">
      <div className="flex flex-col w-[300px]">
        <input type="text" value=""/>
        <input type="text" value=""/>
        <button onClick={enviar}>Finalizar Compra</button>
      </div>
    </main>
  );
}
