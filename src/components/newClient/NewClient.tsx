import './NewClient.css'

interface Props {
    clicked: () => void
}

function NewClient({ clicked }: Props) {
    return(
        <div className='new-client-container'>
            <form className=''>
                <h1>Adicione novo CNPJ para consulta</h1>
                <label htmlFor='cnpj'>CNPJ:</label>
                <input id='cnpj' type="text" />
                <div className='new-client-buttons'>
                    <div className='btn' onClick={() => clicked()}>Cancelar</div>
                    <div className='btn'>Adicionar</div>
                </div>
            </form>
        </div>
    )
}

export default NewClient;