import knex from 'knex'
import Knex from 'knex'

export abstract class BaseDeDados {
  private static connection: Knex | null = null

  protected getConnection(): Knex {
    if (!BaseDeDados.connection) {
      BaseDeDados.connection = knex({
        client: 'mysql',
        connection: {
          host: process.env.DB_HOST,
          port: 3306,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE_NAME
        }
      })
    }
    return BaseDeDados.connection
  }

  public static async destroyConnection(): Promise<void> {
    if (BaseDeDados.connection) {
      await BaseDeDados.connection.destroy()
      BaseDeDados.connection = null
    }
  }
}

