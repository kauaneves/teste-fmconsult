import { MongoClient } from 'mongodb'

const database_url = process.env.DATABASE_URL

const client = new MongoClient(database_url!)

export default async function connect() {
  await client.connect()

const db = client.db("Empresas")

return { db, client }

}