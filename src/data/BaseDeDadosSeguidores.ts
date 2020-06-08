import { BaseDeDados } from "./BaseDeDados";

export class BaseDeDadosSeguidores extends BaseDeDados {
  private static NOME_DA_TABELA = "Relacao_Seguidores";
  public async seguir(idSeguidor: string, idSeguido: string): Promise<void> {
    await this.getConnection()
      .insert({
        seguidor: idSeguidor,
        seguido: idSeguido,
      })
      .into(BaseDeDadosSeguidores.NOME_DA_TABELA);
  }

  public async verificarDadoDuplicado(
    idSeguidor: string,
    idSeguido: string
  ): Promise<any> {
    const resposta = await this.getConnection()
      .select("*")
      .from(BaseDeDadosSeguidores.NOME_DA_TABELA)
      .where({ seguidor: idSeguidor, seguido: idSeguido });
    return resposta[0];
  }

  public async deixarDeSeguir(
    idSeguidor: string,
    idSeguido: string
  ): Promise<void> {
    await this.getConnection()
      .delete()
      .from(BaseDeDadosSeguidores.NOME_DA_TABELA)
      .where({ seguidor: idSeguidor, seguido: idSeguido });
  }

  public async buscarSeguidores(id: string): Promise<any> {
    const resposta = await this.getConnection()
      .select("seguido")
      .from(BaseDeDadosSeguidores.NOME_DA_TABELA)
      .where({ seguidor: id });
    return resposta;
  }
}
