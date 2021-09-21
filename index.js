import express, { response } from "express";
import consign from "consign";
import path from 'path';

const PORT = 3000;
const app = express();
var __dirname = path.resolve();

app.use(express.json());
app.use(express.static(__dirname + '/public'));

consign().include("models").then("libs/middlewares.js").then("routes").then("libs/boot.js").into(app);
