import { useUi } from '../../contexts/AlertContext';
import './Actions.css'

function Actions() {
    const URL = 'http://localhost:5001';
    const { showAlert } = useUi();

    const handleClick = async () => {  
        try {
            const resp = await fetch(`${URL}/consult/all`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})}
            );

            if(resp.status === 200) {
                showAlert('Todos os cadastros foram atualizados', 'success')
            }
            else {
                showAlert('Não foi possível atualizar os cadastros', 'error')
            }
        }
        catch (err) {
            console.log(err)
            showAlert('Não foi possível atualizar os cadastros', 'error')
        }

    }

    return (
        <div className='actions-container'>
            <div className='consult-all-btn' onClick={handleClick}> Realizar reconsulta de todos os clientes </div>
        </div>
    );
}

export default Actions;