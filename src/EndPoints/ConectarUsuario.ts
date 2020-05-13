import { Request, Response } from "express";
import { BaseDeDadosDeUsuario } from "../data/BaseDeDadosDeUsuario";

export const ConectarUsuario = async (req: Request, res: Response) => {
  try {
    const dadosDoUsuario = {
      email: req.body.email,
      senha: req.body.senha
    }
    const baseDeDadosDeUsuario = new BaseDeDadosDeUsuario()
    const id = await baseDeDadosDeUsuario.conectarUsuario(
      dadosDoUsuario.email,
      dadosDoUsuario.senha
    )
    res.status(200).send(id)
  } catch (error) {
    res.status(400).send({
      mensagem: error.message
    })
  }
}