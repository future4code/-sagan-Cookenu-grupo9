import { BaseDeDados } from './BaseDeDados'

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
        senha
      })
      .into(BaseDeDadosDeUsuario.NOME_DA_TABELA)
  }

  public async conectarUsuario(
    email: string,
    senha: string
  ): Promise<any> {
    const response = await this.getConnection()
      .select(
        'id'
      )
      .from(
        BaseDeDadosDeUsuario.NOME_DA_TABELA
      )
      .where(
        {
          email,
          senha
        }
      )
      return response[0]
  }
}