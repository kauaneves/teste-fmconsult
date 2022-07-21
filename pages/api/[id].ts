// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../utils/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id }:any = req.query
  const myid = new ObjectId(id)
  const { CNPJ, Nome, CEP, Endereco, Numero, Bairro, UF, Cidade } = req.body

  const MyQuery = {
    CNPJ,
    Nome,
    CEP,
    Endereco,
    Numero,
    Bairro,
    UF,
    Cidade
  }


  if (req.method === 'GET') {
    const { db } = await connect()
    const response = await db.collection('Empresas').findOne({_id: myid})

    res.status(200).json({response})
  } else if (req.method === 'PUT') {
    const { db } = await connect()
    const response = await db.collection('Empresas').replaceOne({_id: myid}, MyQuery)

    res.status(200).json({response})
  } else {
    res.status(400).json({Error: 'Wrong Method Request.'})
  }
}
