import { Request, Response } from "express";
import { GeradorDeTokens } from "../Serviços/GeradorDeToken";
import { BaseDeDadosSeguidores } from "../data/BaseDeDadosSeguidores";
import { BaseDeDadosReceita } from "../data/BaseDeDadosReceita";
import { BaseDeDadosDeUsuario } from "../data/BaseDeDadosDeUsuario";

export const BuscarReceitas = async (req: Request, res: Response) => {
  try {
    const token = req.headers.token;

    const geradorDeToken = new GeradorDeTokens();
    const id = geradorDeToken.retornarId(token as string);

    const baseDeDadosSeguidores = new BaseDeDadosSeguidores();
    const seguidores = await baseDeDadosSeguidores.buscarSeguidores(id);

    const baseDeDadosReceita = new BaseDeDadosReceita();

    const baseDeDadosDeUsuario = new BaseDeDadosDeUsuario();

    const Receitas = [];

    for (const i of seguidores) {
      debugger;
      const resposta = await baseDeDadosReceita.pegarReceitaPeloIdusuario(
        i.seguido
      );
      Receitas.push(resposta);
    }
    res.status(200).send({ Receitas });
  } catch (error) {
    res.status(200).send({ message: error.message });
  }
};
