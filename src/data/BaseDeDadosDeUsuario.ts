import { BaseDeDados } from "./BaseDeDados";

export class BaseDeDadosDeUsuario extends BaseDeDados {
  private static NOME_DA_TABELA = "Cadastro";

  public async criarUsuario(
    id: string,
    email: string,
    nome: string,
    senha: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        email,
        nome,
        senha,
      })
      .into(BaseDeDadosDeUsuario.NOME_DA_TABELA);
  }

  public async conectarUsuario(email: string): Promise<any> {
    const resposta = await this.getConnection().raw(
      `SELECT ID FROM ${BaseDeDadosDeUsuario.NOME_DA_TABELA} WHERE email= "${email}"`
    );
    return resposta[0][0].ID;
  }

  public async buscarDadosAPartirDoEmail(email: string): Promise<any> {
    const resposta = await this.getConnection()
      .select("*")
      .from(BaseDeDadosDeUsuario.NOME_DA_TABELA)
      .where({ email });
    return resposta[0].senha;
  }

  public async buscarDadosAPartirDoId(id: string): Promise<any> {
    const resposta = await this.getConnection()
      .select("id", "email", "nome")
      .from(BaseDeDadosDeUsuario.NOME_DA_TABELA)
      .where({ id });
    return resposta[0];
  }
}
