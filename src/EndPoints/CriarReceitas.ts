import { Request, Response } from "express";
import { BaseDeDadosReceita } from "../data/BaseDeDadosReceita";
import { GeradorDeTokens } from "../Serviços/GeradorDeToken";
import { GeradorDeId } from "../Serviços/GeradorDeId";
import { BaseDeDados } from "../data/BaseDeDados";

export const CriarReceitas = async (req: Request, res: Response) => {
  try {
    const dadosReceita = {
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      dataDeCriacao: req.body.dataDeCriacao,
      tokenUsuario: req.headers.token,
    };

    const geradorDeId = new GeradorDeId();
    const idReceita = geradorDeId.gerador();

    const geradorDeToken = new GeradorDeTokens();
    const idUsuario = geradorDeToken.retornarId(dadosReceita.tokenUsuario);

    const baseDeDadosReceita = new BaseDeDadosReceita();
    await baseDeDadosReceita.criarReceita(
      idReceita,
      idUsuario,
      dadosReceita.titulo,
      dadosReceita.descricao,
      dadosReceita.dataDeCriacao
    );
    res.status(200).send("Receita criada com sucesso");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }

  BaseDeDados.destroyConnection();
};
