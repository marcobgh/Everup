import express, { json } from "express";
import axios from "axios";
import cors from 'cors'

const app = express();
const PORT = 5001

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.post('/consult', async (req, res) => {

    const { cnpj } = req.body;

    if (!cnpj) {
        return res.status(400).json({ error: "CNPJ é obrigatório" });
    } 

    const formatedcnpj = cnpj.replace(/\D/g, "");

    const options = {
    method: 'GET',
    url: `https://receitaws.com.br/v1/cnpj/${formatedcnpj}`,
    headers: {Accept: 'application/json'}
    };

    try {
        const { data } = await axios.request(options);
        const clientData = {
            razao_social: data.nome,
            abertura: data.abertura,
            tipo: data.tipo,
        }
        
        res.json(clientData);
    } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
            if(error.response.status === 429) {
                return res.status(429).json({ error: "Muitas requisições, tente novamente mais tarde"})
            }
            
            console.error(error);
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})