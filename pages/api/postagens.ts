import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Postagens } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      // Get all postagens
      const postagens = await prisma.postagens.findMany()
      res.json(postagens)
      break
    case 'POST':
      // Create a new postagem
      const newPostagem = await prisma.postagens.create({
        data: req.body,
      })
      res.json(newPostagem)
      break
    case 'PUT':
      // Update a postagem
      const updatedPostagem = await prisma.postagens.update({
        where: { id: req.body.id },
        data: req.body,
      })
      res.json(updatedPostagem)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
