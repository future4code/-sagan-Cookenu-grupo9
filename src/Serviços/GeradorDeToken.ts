import * as jwt from "jsonwebtoken";

export class GeradorDeTokens {
  public token(id: string): string {
    return jwt.sign(
      {
        id,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: "1h",
      }
    );
  }

  public retornarId(token: string): string {
    const resposta = jwt.verify(token, process.env.JWT_KEY as string) as any;
    return resposta.id;
  }
}
