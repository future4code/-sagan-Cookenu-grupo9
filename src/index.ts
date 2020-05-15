import knex from "knex";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { AddressInfo } from "net";
import { BaseDeDadosDeUsuario } from "./data/BaseDeDadosDeUsuario";
import { GeradorDeId } from "./Serviços/GeradorDeId";
import { CriarUsuario } from "./EndPoints/CriarUsuario";
import { GeradorDeTokens } from "./Serviços/GeradorDeToken";
import { ConectarUsuario } from "./EndPoints/ConectarUsuario";
import { DadosDoUsuario } from "./EndPoints/DadosDoUsuario";
import { CriarReceitas } from "./EndPoints/CriarReceitas";
import { BuscarPerfil } from "./EndPoints/BuscarPerfil";
import { PegarReceita } from "./EndPoints/PegarReceita";
import { SeguirUsuario } from "./EndPoints/SeguirUsuario";
import { DeixarDeSeguirUsuario } from "./EndPoints/DeixarDeSeguirUsuario";
import { BuscarReceitas } from "./EndPoints/BuscarReceitas";

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

app.post("/signup", CriarUsuario);
app.post("/login", ConectarUsuario);
app.post("/recipe", CriarReceitas);
app.post("/user/follow", SeguirUsuario);
app.post("/user/unfollow", DeixarDeSeguirUsuario);

app.get("/user/profile", DadosDoUsuario);
app.get("/user/", BuscarPerfil);
app.get("/recipe/", PegarReceita);
app.get("/user/feed", BuscarReceitas);
