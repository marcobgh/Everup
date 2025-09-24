
import { fastify } from 'fastify'
import { DatabaseMemory } from './database-in-memory.js'
import axios from 'axios';
import cors from 'cors'

const server = fastify()
const PORT = 5001

server.register(cors({
    origin: "http://localhost:3000", // ou ["http://localhost:3000", "https://meusite.com"]
    methods: ["GET", "POST", "PUT", "DELETE"], // métodos permitidos
    credentials: true // se precisar mandar cookies/autenticação
}));

const database = new DatabaseMemory();

server.post('/clients', (req, res) => {

    database.create({})


    return res.status(201).send();
})

server.post('/consult', async (req, res) => {
    const rawCnpj = req.body.cnpj;
    const cnpj = rawCnpj.replace(/\D/g, "");

    const options = {
        method: 'GET',
        url: `https://receitaws.com.br/v1/cnpj/${cnpj}`,
        headers: {Accept: 'application/json'}
    };

    const { data } = await axios.request(options);

    const clientData = {
        cnpj: data.cnpj,
        razao_social: data.nome,
        abertura: data.abertura,
        tipo: data.tipo,
        situacao: data.situacao
    }

    database.create(clientData);

    return res.status(201).send();
})

server.listen({
    port: PORT,
}, () => {
    console.log(`Server running on port ${PORT}`)
})

















// import express, { json } from "express";
// import axios from "axios";
// import cors from 'cors'

// const app = express();
// const PORT = 5001

// app.use(cors({
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

// app.use(express.json());

// app.post('/consult', async (req, res) => {

//     const { cnpj } = req.body;

//     if (!cnpj) {
//         return res.status(400).json({ error: "CNPJ é obrigatório" });
//     } 

//     const formatedcnpj = cnpj.replace(/\D/g, "");

//     const options = {
//     method: 'GET',
//     url: `https://receitaws.com.br/v1/cnpj/${formatedcnpj}`,
//     headers: {Accept: 'application/json'}
//     };

//     try {
//         const { data } = await axios.request(options);
//         const clientData = {
//             razao_social: data.nome,
//             abertura: data.abertura,
//             tipo: data.tipo,
//             situacao: data.situacao 
//         }

//         if (data.fantasia) {
//             clientData.fantasia = data.fantasia
//         }
//         else {
//             clientData.fantasia = "Não há informações"
//         }

        
//         res.json(clientData);
//     } catch (error) {
//         if(error.response.status === 429) {
//             return res.status(429).json({ error: "Muitas requisições, tente novamente mais tarde"})
//         }
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })