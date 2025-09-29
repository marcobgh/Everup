import './App.css'
import Sidebar from "../components/sidebar/Sidebar"
import ClientList from '../components/clientList/ClientList'
import NewClient from '../components/newClient/NewClient'
import { useState } from 'react'
import ViewClient from '../components/viewClient/ViewClient'
import { UiProvider } from "../contexts/AlertContext";
import Actions from '../components/actions/Actions'


function App() {

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [window, setWindow] = useState<string | null>(null);
  const [choseClient, setChoseClient] = useState<string | null>(null);

  const handleSelectedOption = (selected: string) => {
    setSelectedOption(selected)
  }

  const handleClicked = (type: string, cnpj?:string) => {
    if (type === 'create') {
      setWindow('create');
    }
    if (type === 'viewClient') {
      setSelectedOption('viewClient')
      setChoseClient(String(cnpj))
    }
    if (type === 'close') {
      setWindow(null)
    }

    
  }

  return (
    <div>
      <UiProvider>
        <div className='container'>
          <Sidebar onSelectedOption={handleSelectedOption}></Sidebar>
          {selectedOption === 'clientList' && <ClientList onClicked={handleClicked}/>}
          {selectedOption === 'home' && <></>}
          {selectedOption === 'actions' && <Actions></Actions>}
          {selectedOption === 'viewClient' && <ViewClient clicked={handleSelectedOption} cnpj={String(choseClient)}></ViewClient>}
        </div>
        {(window === 'create') ? <NewClient clicked={handleClicked}></NewClient> : null}
      </UiProvider>
    </div>
      
  )
  }

export default App
