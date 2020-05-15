import { BaseDeDados } from "./BaseDeDados";
import { response } from "express";

export class BaseDeDadosReceita extends BaseDeDados {
  private static NOME_DA_TABELA = "Receitas";

  public async criarReceita(
    id: string,
    idUsuario: string,
    titulo: string,
    modoDePreparo: string,
    dataDeCriacao: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        titulo,
        modo_de_preparo: modoDePreparo,
        data_de_criacao: dataDeCriacao,
        id_usuario: idUsuario,
      })
      .into(BaseDeDadosReceita.NOME_DA_TABELA);
  }

  public async pegarReceitaPeloId(id: string): Promise<any> {

    const resultado = await this.getConnection()
      .select('titulo', 'modo_de_preparo', 'data_de_criacao')
      .from(BaseDeDadosReceita.NOME_DA_TABELA)
      .where({ id })

    return resultado[0]
  }
}
