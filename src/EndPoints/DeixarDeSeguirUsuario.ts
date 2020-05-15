import { Request, Response } from "express";
import { GeradorDeTokens } from "../Serviços/GeradorDeToken";
import { BaseDeDadosDeUsuario } from "../data/BaseDeDadosDeUsuario";
import { BaseDeDadosSeguidores } from "../data/BaseDeDadosSeguidores";

export const DeixarDeSeguirUsuario = async (req: Request, res: Response) => {
  try {
    const token = req.headers.token;
    const idSeguido = req.body.seguido;

    const geradorDeToken = new GeradorDeTokens();
    const idSeguidor = geradorDeToken.retornarId(token as string);

    const baseDeDadosUsuario = new BaseDeDadosDeUsuario();
    const dadosUsuarioSeguido = await baseDeDadosUsuario.buscarDadosAPartirDoId(
      idSeguido
    );
    const baseDeDadosSeguidores = new BaseDeDadosSeguidores();
    const itemDuplicado = await baseDeDadosSeguidores.verificarDadoDuplicado(
      idSeguidor,
      idSeguido
    );

    if (!idSeguidor) {
      throw new Error("Coloque o id de quem voce quer seguir");
    }

    if (!dadosUsuarioSeguido) {
      throw new Error("Id inválido");
    }
    if (!itemDuplicado) {
      throw new Error("Usuário não segue esse perfil");
    }

    await baseDeDadosSeguidores.deixarDeSeguir(idSeguidor, idSeguido);

    res.status(200).send("Deixado de seguir");
    
  } catch (error) {
    res.status(400).send({
      messagem: error.message,
    });
  }
};
