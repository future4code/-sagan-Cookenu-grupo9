import knex from "knex";
import dotenv from "dotenv";
import express, {Request, Response} from "express";
import { AddressInfo } from "net";
import {BaseDeDadosDeUsuario} from './data/BaseDeDadosDeUsuario'
import {GeradorDeId} from './Serviços/GeradorDeId'
import { CriarUsuario } from "./EndPoints/CriarUsuario";
import { GeradorDeTokens } from "./Serviços/GeradorDeToken";
import { ConectarUsuario } from "./EndPoints/ConectarUsuario";


dotenv.config();

const connection = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
  },
});

const app = express();

app.use(express.json());

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});

// const funcaoTeste = async () => {
//   await teste
// }

// console.log(teste)

const teste2= new GeradorDeTokens()
console.log(teste2.token('123'))

app.post('/cadastrar', CriarUsuario )
app.post('/logar', ConectarUsuario )