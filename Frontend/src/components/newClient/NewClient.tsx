import { useRef, useState } from 'react';
import './NewClient.css'
import { useUi } from "../../contexts/AlertContext";


interface Props {
    clicked: (type: string) => void;
}

const URL = 'http://localhost:5001';

// function formatCNPJ(value: string) {
//     return value
//     .replace(/\D/g, '')
//     .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
// }

function NewClient({ clicked }: Props) {
    const { showAlert } = useUi();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false); 

    const handleClick = async () => {

        const raw = String(inputRef.current?.value || '').trim();
        const cnpj = raw.replace(/\D/g, '');
        if (!raw) {
            showAlert('O campo não pode estar em branco', "error");
            return;
        }

        // aceita digitado com/sem máscara
        
        if (cnpj.length !== 14) {
            showAlert('O CNPJ deve ter 14 dígitos', "error");
            return;
        }
        
        setIsLoading(true);
        const clientExists =  await findClient(cnpj);

        if (clientExists) {
            showAlert('O CNPJ informado já está cadastrado', "error")
            setIsLoading(false);
            return;
        }

        const ok = await addNewClient(cnpj);

        if (ok) {
            showAlert("Cliente adicionado com sucesso!", 'success');
            clicked('close');
        }

    };

    const findClient = async (rawCnpj: string) => {
        try {
            const resp = await fetch(`${URL}/client/${rawCnpj}`, {
                headers: { 'Accept': 'application/json' },
            });
            
            if (resp.status === 404) {
                return false;
            }
            return true;
        }   
        catch (err) {
            showAlert('Não foi possível consultar a base de dados', 'error');
        }
    }

    const addNewClient = async (rawCnpj: string): Promise<boolean> => {

        try {
            setIsLoading(true);

            const resp = await fetch(`${URL}/consult`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cnpj: rawCnpj }),
            });

            if (resp.status === 429) {
                showAlert('Tente novamente mais tarde', 'alert')
            }

            if (!resp.ok) {
                    console.log(resp)
                    showAlert('Falha na consulta', 'error');
                    return false;
            }

            return true;
            
        } catch (e) {
            console.log(e)
            showAlert('Erro inesperado ao consultar', 'error');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    
    return(
        <div className='new-client-container'>
            <form className=''>
                <div className='close-btn' onClick={() => clicked('close')}><i className="fa-solid fa-xmark"></i></div>
                <h1>Adicione novo CNPJ para consulta</h1>
                <label htmlFor='cnpj'>CNPJ:</label>
                <input id='cnpj' type="text" ref={inputRef}  placeholder='00.000.000/0000-00 ou só números' />
                <div className='new-client-buttons'>
                    <div className='add-btn' onClick={() => handleClick()}>{isLoading ? 'Consultando...' : 'Adicionar'}<i className="fa-solid fa-user-plus"></i></div>
                </div>
            </form>
        </div>
    )
}

export default NewClient;