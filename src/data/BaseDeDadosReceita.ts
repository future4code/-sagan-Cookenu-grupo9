import { BaseDeDados } from "./BaseDeDados";
export class BaseDeDadosReceita extends BaseDeDados {
  private static NOME_DA_TABELA = "Receitas";

  public async criarReceita(
    id: string,
    idUsuario: string,
    titulo: string,
    modoDePreparo: string,
    dataDeCriacao: Date
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
}
