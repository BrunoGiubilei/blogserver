import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Usuario } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      // Get all usuarios
      const usuarios = await prisma.usuario.findMany()
      res.json(usuarios)
      break
    case 'POST':
      // Create a new usuario
      const newUsuario = await prisma.usuario.create({
        data: req.body,
      })
      res.json(newUsuario)
      break
    case 'PUT':
      // Update a usuario
      const updatedUsuario = await prisma.usuario.update({
        where: { id: req.body.id },
        data: req.body,
      })
      res.json(updatedUsuario)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
