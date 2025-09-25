import Fastify from 'fastify'
import { DatabaseMemory } from './database-in-memory.js'
import axios from 'axios';
import cors from '@fastify/cors'

const server = Fastify()
const PORT = 5001


await server.register(cors, {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true,
});

const database = new DatabaseMemory();

server.get('/clients', () => {
    return database.listClients();
})

server.get('/client/:cnpj', (req, res) => {
    const { cnpj } = req.params;

    const client = database.findClientByCnpj(String(cnpj));

    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    return client;

})

server.post('/consult', async (req, res) => {
    const rawCnpj = req.body.cnpj;
    const cnpj = rawCnpj.replace(/\D/g, "");
    
    try{
        const wsoptions = {
            method: 'GET',
            url: `https://receitaws.com.br/v1/cnpj/${cnpj}`,
            headers: {Accept: 'application/json'}
        };

        const { data } = await axios.request(wsoptions);

        const clientData = {
            cnpj: data.cnpj.replace(/\D/g, ""),
            razao_social: data.nome,
            abertura: data.abertura,
            tipo: data.tipo,
            situacao: data.situacao
        }

        if (data.fantasia) {
            clientData.fantasia = data.fantasia;
        }
        else {
            clientData.fantasia = "Não há informações"
        }

        database.create(clientData);

        return res.status(201).send();
    }
    catch(err) {
        console.log(e)
    }
})

server.delete('/client/:cnpj', async (req, res) => {
    const { cnpj } = req.params;
    database.delete(cnpj);
    return res.status(204).send();
})

server.put('/client/:cnpj', async (req, res) => {
    const { cnpj } = req.params;

    const wsoptions = {
        method: 'GET',
        url: `https://receitaws.com.br/v1/cnpj/${cnpj}`,
        headers: {Accept: 'application/json'}
    };

    const { data } = await axios.request(wsoptions);

    const clientData = {
        cnpj: data.cnpj.replace(/\D/g, ""),
        razao_social: data.nome,
        abertura: data.abertura,
        tipo: data.tipo,
        situacao: data.situacao
    }
    if (data.fantasia) {
        clientData.fantasia = data.fantasia;
    }
    else {
        clientData.fantasia = "Não há informações"
    }

    database.update(cnpj, clientData);

    return res.status(200).send();
});

server.listen({ port: PORT })
    .then(() => console.log(`🚀 Server running on port ${PORT}`))
    .catch(err => {
        console.error(err)
        process.exit(1)
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