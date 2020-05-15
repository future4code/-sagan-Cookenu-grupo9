import { Request, Response } from "express";
import { GeradorDeTokens } from "../Serviços/GeradorDeToken";
import { BaseDeDadosDeUsuario } from "../data/BaseDeDadosDeUsuario";

export const SeguirUsuario = async (req: Request, res: Response) => {
  try {
    const token = req.headers.token;

    const idSeguido = req.body.seguido;

    const geradorDeToken = new GeradorDeTokens();
    const idSeguidor = geradorDeToken.retornarId(token as string);

    const baseDeDadosUsuario = new BaseDeDadosDeUsuario();
    const dadosUsuarioSeguido = await baseDeDadosUsuario.buscarDadosAPartirDoId(
      idSeguido
    );

    const itemDuplicado = await baseDeDadosUsuario.verificarDadoDuplicado(
      idSeguidor,
      idSeguido
    );
    if (itemDuplicado) {
      throw new Error("Usuário já segue esse perfil");
    }

    if (!idSeguidor) {
      throw new Error("Coloque o id de quem voce quer seguir");
    }

    if (!dadosUsuarioSeguido) {
      throw new Error("Id inválido");
    }

    await baseDeDadosUsuario.seguir(idSeguidor, idSeguido);

    res.status(200).send({ messagem: "usuario seguido com suceso" });
  } catch (error) {
    res.status(400).send({
      messagem: error.message,
    });
  }
};
