import { Request, Response } from "express";
import { BaseDeDadosDeUsuario } from "../data/BaseDeDadosDeUsuario";
import { GeradorDeTokens } from "../Serviços/GeradorDeToken";
import { GeradorDeHash } from "../Serviços/GeradorDeHash";

export const ConectarUsuario = async (req: Request, res: Response) => {
  try {
    const dadosDoUsuario = {
      email: req.body.email,
      senha: req.body.senha,
    };
    const baseDeDadosDeUsuario = new BaseDeDadosDeUsuario();

    const hash = await baseDeDadosDeUsuario.buscarDadosAPartirDoEmail(
      dadosDoUsuario.email
    );
    const geradorDeHash = new GeradorDeHash();
    const comparar = await geradorDeHash.comparar(dadosDoUsuario.senha, hash);

    if (!comparar) {
      throw new Error("Email ou senha incorreto");
    }
        
    const id = await baseDeDadosDeUsuario.conectarUsuario(dadosDoUsuario.email);
    const geradorDeToken = new GeradorDeTokens();
    const token = geradorDeToken.token(id);
    res.status(200).send({ token: token });

  } catch (error) {
    res.status(400).send({
      mensagem: error.message,
    });
  }
};
