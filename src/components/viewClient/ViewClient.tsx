//import { useClientContext } from '../../context';
import './ViewClient.css'

// const { client } = useClientContext();

interface Props {
    clicked: (type: string) => void;
}

function ViewClient({ clicked }: Props) {
    return(
        <div className='view-client-container'>
            <div>
                <div className='close-btn'><i onClick={() => clicked('close')} className="fa-solid fa-xmark"></i></div>
                <h1>Cadastro</h1>
                <div className='client-info'>

                </div>
            </div>
        </div>
    )
}

export default ViewClient;