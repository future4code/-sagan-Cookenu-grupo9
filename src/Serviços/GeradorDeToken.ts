import * as jwt from 'jsonwebtoken'

export class GeradorDeTokens {
  public token = (id: string): string => {
    return jwt.sign(
      {
        id
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: '1h'
      })
  }
}



