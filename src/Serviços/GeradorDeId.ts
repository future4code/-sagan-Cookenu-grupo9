import {v4} from 'uuid'

export class GeradorDeId {

  public gerador(): string {
    return v4()
  }
}