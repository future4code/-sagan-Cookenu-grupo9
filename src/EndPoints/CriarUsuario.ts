import { Request, Response } from "express";
import { BaseDeDadosDeUsuario } from "../data/BaseDeDadosDeUsuario";
import { GeradorDeId } from "../Serviços/GeradorDeId";
import { GeradorDeHash } from "../Serviços/GeradorDeHash";
import { GeradorDeTokens } from "../Serviços/GeradorDeToken";

export const CriarUsuario = async (req: Request, res: Response) => {
  try {
    const dadosDoNovoUsuario = {
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
    };

    const baseDeDadosDeUsuario = new BaseDeDadosDeUsuario();
    const id = new GeradorDeId().gerador();

    const geradorDeHash = new GeradorDeHash();
    const hash = await geradorDeHash.hash(dadosDoNovoUsuario.senha);

    const geradorDeTokens = new GeradorDeTokens();
    const token = geradorDeTokens.token(id);

    await baseDeDadosDeUsuario.criarUsuario(
      id,
      dadosDoNovoUsuario.email,
      dadosDoNovoUsuario.nome,
      hash
    );
    
    res.status(200).send({
      token: token,
    });

  } catch (error) {
    res.status(400).send({
      messagem: error.message,
    });
  }
};
