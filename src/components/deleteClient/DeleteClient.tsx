import "./DeleteClient.css"

interface Props {
    clicked: (choice: string) => void;
}

function DeleteClient({clicked}:Props) {
    return(
        <div className='delete-client-container'>
            <div className="delete-client-info">
                <h1>Deseja deletar esse cadastro?</h1>
                <span>Essa ação não pode ser desfeita</span>
                <div className='new-client-buttons'>
                    <button className='yes-btn'onClick={() => clicked('delete')}>Sim </button>
                    <button className='no-btn' onClick={() => clicked('cancel')}> Não </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteClient