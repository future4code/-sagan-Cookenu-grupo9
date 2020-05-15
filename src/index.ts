import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";
import { CriarUsuario } from "./EndPoints/CriarUsuario";
import { ConectarUsuario } from "./EndPoints/ConectarUsuario";
import { DadosDoUsuario } from "./EndPoints/DadosDoUsuario";
import { CriarReceitas } from "./EndPoints/CriarReceitas";
import { BuscarPerfil } from "./EndPoints/BuscarPerfil";
import { PegarReceita } from "./EndPoints/PegarReceita";
import { SeguirUsuario } from "./EndPoints/SeguirUsuario";
import { DeixarDeSeguirUsuario } from "./EndPoints/DeixarDeSeguirUsuario";
import { BuscarReceitasDosSeguidores } from "./EndPoints/BuscarReceitasDosSeguidores";

dotenv.config();

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

app.post("/signup", CriarUsuario);
app.post("/login", ConectarUsuario);
app.post("/recipe", CriarReceitas);
app.post("/user/follow", SeguirUsuario);
app.post("/user/unfollow", DeixarDeSeguirUsuario);
app.get("/user/profile", DadosDoUsuario);
app.get("/user/", BuscarPerfil);
app.get("/recipe/", PegarReceita);
app.get("/user/feed", BuscarReceitasDosSeguidores);
