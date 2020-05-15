import { Request, Response } from "express";
import { BaseDeDadosDeUsuario } from "../data/BaseDeDadosDeUsuario";
import { GeradorDeTokens } from "../Serviços/GeradorDeToken";

export const BuscarPerfil = async (req: Request, res: Response) => {
  try {
    const token = req.headers.token
    const idDaBuscaDePerfil = req.query.id as string

    const baseDeDadosDeUsuario = new BaseDeDadosDeUsuario()
    const dadosDoUsuario = await baseDeDadosDeUsuario.buscarDadosAPartirDoId(idDaBuscaDePerfil)

    const geradorDeToken = new GeradorDeTokens()
    geradorDeToken.retornarId(token as string)

    res.status(200).send(dadosDoUsuario)

  } catch (error) {
    res.status(400).send(error.message)
  }
}