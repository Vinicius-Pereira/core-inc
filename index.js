import express, { response } from "express";
import consign from "consign";
import path from 'path';
import favicon from "serve-favicon";

const PORT = 3000;
const app = express();
var __dirname = path.resolve();

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))
app.use(express.json());
app.use(express.static(__dirname + '/public'));

consign().include("models").then("libs/middlewares.js").then("routes").then("libs/boot.js").into(app);
