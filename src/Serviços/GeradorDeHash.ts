import * as bcrypt from "bcryptjs";

export class GeradorDeHash {
  public async hash(s: string): Promise<string> {
    const rodadas = Number(process.env.RODADA_BCRYPT);
    const sal = await bcrypt.genSalt(rodadas);
    const result = await bcrypt.hash(s, sal);
    return result;
  }

  public async comparar(s: string, hash: string): Promise<boolean> {
    return bcrypt.compare(s, hash);
  }
}
