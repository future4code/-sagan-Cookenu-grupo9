import { Request, Response } from "express";
import { BaseDeDadosDeUsuario } from "../data/BaseDeDadosDeUsuario";
import { GeradorDeId } from "../Serviços/GeradorDeId";

export const CriarUsuario = async (req: Request, res: Response) => {
  try {
    const dadosDoNovoUsuario = {
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
    }
    const baseDeDadosDeUsuario = new BaseDeDadosDeUsuario()
    const id = new GeradorDeId().gerador()

    await baseDeDadosDeUsuario.criarUsuario(
      id,
      dadosDoNovoUsuario.email,
      dadosDoNovoUsuario.nome,
      dadosDoNovoUsuario.senha
    )
    res.status(200).send({
      dadosDoNovoUsuario
    })
  } catch (error) {
    res.status(400).send({
      messagem: error.message,
    })
  }
}