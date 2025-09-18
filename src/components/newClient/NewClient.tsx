import { useClientContext } from '../../context';
import './NewClient.css'

interface Props {
    clicked: () => void
}


function NewClient({ clicked }: Props) {
    const { client, setClient } = useClientContext()
    
    function handleClick() {
        addNewClient();
        clicked();
    }

    function addNewClient() {
        setClient(
            [...client, 
                {
                    razao: `Empresa ${client.length+1}`,
                    cnpj: '08.253.539/00001-64',
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
                <input id='cnpj' type="number" />
                <div className='new-client-buttons'>
                    <div className='btn' onClick={() => clicked()}>Cancelar</div>
                    <div className='btn' onClick={() => handleClick()}>Adicionar</div>
                </div>
            </form>
        </div>
    )
}

export default NewClient;