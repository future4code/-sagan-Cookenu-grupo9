import { BaseDeDados } from "./BaseDeDados";

export class BaseDeDadosReceita extends BaseDeDados {
  private static NOME_DA_TABELA = "Receitas";

  public async criarReceita(
    id: string,
    idUsuario: string,
    titulo: string,
    modoDePreparo: string,
    dataDeCriacao: string,
    nomeUsuario: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        titulo,
        modo_de_preparo: modoDePreparo,
        data_de_criacao: dataDeCriacao,
        id_usuario: idUsuario,
        nome_usuario: nomeUsuario
      })
      .into(BaseDeDadosReceita.NOME_DA_TABELA);
  }

  public async pegarReceitaPeloId(id: string): Promise<any> {
    const resultado = await this.getConnection()
      .select("titulo", "modo_de_preparo", "data_de_criacao")
      .from(BaseDeDadosReceita.NOME_DA_TABELA)
      .where({ id });

    return resultado[0];
  }

  public async pegarReceitaPeloIdusuario(id: string): Promise<any> {
    const resultado = await this.getConnection()
      .select("*")
      .from(BaseDeDadosReceita.NOME_DA_TABELA)
      .where({ id_usuario: id });

    return resultado[0];
  }
}
