import { Request, Response } from "express";
import { BaseDeDadosReceita } from "../data/BaseDeDadosReceita";
import { GeradorDeTokens } from "../Serviços/GeradorDeToken";

export const PegarReceita = async (req: Request, res: Response) => {
  try {
    const token = req.headers.token
    const idDaReceita = req.query.id as string

    const baseDeDadosReceita = await new BaseDeDadosReceita().pegarReceitaPeloId(idDaReceita)

    const geradorDeToken = new GeradorDeTokens()
    geradorDeToken.retornarId(token as string)

    res.status(200).send(baseDeDadosReceita)

  } catch (error) {
    res.status(400).send(error.message)
  }
}