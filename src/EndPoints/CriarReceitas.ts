import { Request, Response } from "express";
import { BaseDeDadosReceita } from "../data/BaseDeDadosReceita";
import { GeradorDeTokens } from "../Serviços/GeradorDeToken";
import { GeradorDeId } from "../Serviços/GeradorDeId";
import moment from "moment";

export const CriarReceitas = async (req: Request, res: Response) => {
  try {
    const dataDeCriacaoDaReceita: string = moment().format("DD/MM/YYYY");

    const dadosReceita = {
      titulo: req.body.titulo,
      descricao: req.body.modo_de_preparo,
      tokenUsuario: req.headers.token,
    };

    const geradorDeId = new GeradorDeId();
    const idReceita = geradorDeId.gerador();

    const geradorDeToken = new GeradorDeTokens();
    const idUsuario = geradorDeToken.retornarId(
      dadosReceita.tokenUsuario as string
    );

    const baseDeDadosReceita = new BaseDeDadosReceita();
    await baseDeDadosReceita.criarReceita(
      idReceita,
      idUsuario,
      dadosReceita.titulo,
      dadosReceita.descricao,
      dataDeCriacaoDaReceita
    );
    res.status(200).send("Receita criada com sucesso");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
