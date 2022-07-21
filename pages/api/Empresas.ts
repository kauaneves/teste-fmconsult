// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../utils/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { CNPJ, Nome, CEP, Endereco, Numero, Bairro, selectUf, Cidade } = req.body

  if (req.method === 'POST') {

    const MyQuery = {
      CNPJ,
      Nome,
      CEP,
      Endereco,
      Numero,
      Bairro,
      UF: req.body.selectUf,
      Cidade
    }

    const { db } = await connect()

    const response = await db.collection('Empresas').insertOne(MyQuery)


    res.status(200).json({ response })
  } else if (req.method === 'GET') {

    const { db } = await connect()
    const response = await db.collection('Empresas').find().toArray()

    res.status(200).json({response})
  } else {
    res.status(400).json({Error: 'Wrong Method Request.'})
  }
}
