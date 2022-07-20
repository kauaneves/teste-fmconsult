import Button from "../components/Button";
import Logo from "../components/Logo";

export default function Home() {
  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col items-center gap-10">
        <Logo/>
        <div className="text-center">
          <strong className="text-3xl">Seja Bem-Vindo</strong>
          <p className="text-gray-600">Gerenciamento de cadastros de clientes</p>
        </div>
        <Button title="Acessar Portal"/>
      </div>
    </div>
  )
}