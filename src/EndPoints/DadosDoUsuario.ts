import { Request, Response } from "express";
import { GeradorDeTokens } from "../Serviços/GeradorDeToken";
import { BaseDeDadosDeUsuario } from "../data/BaseDeDadosDeUsuario";

export const DadosDoUsuario = async (req: Request, res: Response) => {
  try {
    const token = req.headers.token;

    const geradorDeToken = new GeradorDeTokens();
    const id = geradorDeToken.retornarId(token as string);

    const baseDeDadosDeUsuario = new BaseDeDadosDeUsuario();
    const informacoes = await baseDeDadosDeUsuario.buscarDadosAPartirDoId(id);
    res.status(200).send(informacoes);
    
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
