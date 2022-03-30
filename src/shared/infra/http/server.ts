import 'reflect-metadata';
import express from 'express';
import { router } from './routes';
import "../../../shared/container";
import cors from 'cors';
import "../typeorm";

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

app.listen(3333, ()=> console.log("Server is Running"));