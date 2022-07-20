import axios from "axios";
import { GetServerSideProps } from "next";
import Form from "../components/Form";

interface ObjProps {
  CNPJ: string,
	Nome: string,
	CEP: string,
	Endereco: string,
	Numero: string,
	UF: string,
	Cidade: string,
  _id: string
}

interface DataProps {
  data: {
    response: ObjProps[]
  }
}

export default function Portal({ data }: DataProps) {

  return (
    <>
      <div className="p-10">
        <Form />
      </div>
      <div className="border mx-10 flex justify-between">
        <div className="bg-gray-100 w-1/2 flex items-center border-r flex-col">
          <strong className="border-b border-gray-500 w-full text-center py-2">CNPJ</strong>
          {data.response.map(empresa => {
            return (
              <p className="border-b w-full text-center py-2" key={empresa._id}>{empresa.CNPJ}</p>
            )
          })}
        </div>

        <div className="bg-gray-100 w-1/2 flex items-center border-l border-gray-500 flex-col">
          <strong className="border-b border-gray-500 w-full text-center py-2">Nome da Empresa</strong>
          {data.response.map(empresa => {
            return (
              <p className="border-b w-full text-center py-2" key={empresa._id}>{empresa.Nome}</p>
            )
          })}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get('http://localhost:3000/api/Empresas')

  return {
    props:{
      data: response.data
    }
  }
}