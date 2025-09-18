import { useRef } from 'react';
import { useClientContext } from '../../context';
import './NewClient.css'

interface Props {
    clicked: (type: string) => void
}

function formatCNPJ(value: string) {
  return value
    .replace(/\D/g, "") // remove tudo que não for número
    .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

function NewClient({ clicked }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const { client, setClient } = useClientContext()
    
    function handleClick() {
        const cnpj = String(inputRef.current?.value);
        if(cnpj.length === 14 || cnpj.length === 18)  {
            addNewClient();
            clicked('close');
        }
    }

    function addNewClient() {
        setClient(
            [...client, 
                {
                    razao: `Empresa ${client.length+1}`,
                    cnpj: formatCNPJ(String(inputRef.current?.value)),
                    status: 'Ativo'
                }
            ]
        )
    }

    
    return(
        <div className='new-client-container'>
            <form className=''>
                <h1>Adicione novo CNPJ para consulta</h1>
                <label htmlFor='cnpj'>CNPJ:</label>
                <input id='cnpj' type="text" ref={inputRef} />
                <div className='new-client-buttons'>
                    <div className='btn' onClick={() => clicked('close')}>Cancelar</div>
                    <div className='btn' onClick={() => handleClick()}>Adicionar</div>
                </div>
            </form>
        </div>
    )
}

export default NewClient;