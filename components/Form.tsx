import axios from "axios";
import { FormEvent, useState } from "react";
import { useCidades } from "../hooks/useCidades";
import { useEstados } from "../hooks/useEstados";

export default function Form() {
  const [CNPJ, setCNPJ] = useState('')
  const [Nome, setNome] = useState('')
  const [CEP, setCEP] = useState('')
  const [Endereco, setEndereco] = useState('')
  const [Numero, setNumero] = useState('')
  const [Bairro, setBairro] = useState('')
  const [selectUf, setSelectUf] = useState('')
  const [Cidade, setCidade] = useState('')

  const { estados } = useEstados()
  const { cidades, loading: loadingCidades } = useCidades(selectUf);

  const MyQyery = {
    CNPJ,
    Nome,
    CEP,
    Endereco,
    Numero,
    Bairro,
    selectUf,
    Cidade
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    await axios.post('http://localhost:3000/api/Empresas', MyQyery)
    location.reload()
  }

  function handleCancel() {
    setCNPJ('')
    setNome('')
    setCEP('')
    setEndereco('')
    setNumero('')
    setBairro('')
    setCidade('')
    setSelectUf('')
  }

  return (
    <>
      <h1 className="w-full bg-gray-100 px-3">Formulário de Cadastro</h1>
      <form onSubmit={handleSubmit} className="border border-gray-100 grid grid-rows-4 grid-flow-col p-10">
        <input required value={CNPJ} onChange={e => setCNPJ(e.target.value)} placeholder="CNPJ" className="rounded-lg border border-gray-300 mb-3 mx-3 p-1 placeholder:text-gray-600" type="text" name="cpf" maxLength={14} />
        <input required value={Nome} onChange={e => setNome(e.target.value)} placeholder="Nome da Empresa" className="rounded-lg border border-gray-300 mb-3 mx-3 p-1 placeholder:text-gray-600" type="text" />
        <input required value={CEP} onChange={e => setCEP(e.target.value)} placeholder="CEP" className="rounded-lg border border-gray-300 mb-3 mx-3 p-1 placeholder:text-gray-600" type="text" maxLength={8} />
        <input required value={Endereco} onChange={e => setEndereco(e.target.value)} placeholder="Endereço" className="rounded-lg border border-gray-300 mb-3 mx-3 p-1 placeholder:text-gray-600" type="text" />
        <input required value={Numero} onChange={e => setNumero(e.target.value)} placeholder="Número" className="rounded-lg border border-gray-300 mb-3 mx-3 p-1 placeholder:text-gray-600" type="text" />
        <input required value={Bairro} onChange={e => setBairro(e.target.value)} placeholder="Bairro" className="rounded-lg border border-gray-300 mb-3 mx-3 p-1 placeholder:text-gray-600" type="text" />
        <div>
          <select required value={selectUf} onChange={e => setSelectUf(e.target.value)} className="rounded-lg border border-gray-300 mb-3 mx-3 p-1 placeholder:text-gray-600" name="" id="">
            <option disabled value={''}>Selecione Seu Estado</option>
            {estados.map(estado => {
              return (
                <option key={estado.id} value={estado.sigla}>{estado.sigla}</option>
              )
            })}
          </select>
          <select required value={Cidade} onChange={e => setCidade(e.target.value)} className="rounded-lg border border-gray-300 mb-3 mx-3 p-1 placeholder:text-gray-600" disabled={loadingCidades} name="" id="">
            <option disabled value={''}>Selecione Sua Cidade</option>
            {cidades.map(cidade => {
              return (
                <option value={cidade.nome} key={cidade.codigo_ibge}>{cidade.nome}</option>
              )
            })}
          </select>
        </div>
        <div className="flex gap-5">
          <button onClick={handleCancel} className="bg-gray-400 p-3 rounded-lg w-24 transition-colors hover:bg-red-600" type="button">Cancelar</button>
          <button className="bg-green-500 p-3 rounded-lg w-24 transition-colors hover:bg-green-600" type="submit">Salvar</button>
        </div>
      </form>
    </>
  )
}