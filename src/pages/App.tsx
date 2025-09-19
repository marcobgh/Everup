import './App.css'
import Sidebar from "../components/sidebar/Sidebar"
import ClientList from '../components/clientList/ClientList'
import NewClient from '../components/newClient/NewClient'
import { useState } from 'react'
import { ClientContext, type Clients } from '../context'
import ViewClient from '../components/viewClient/ViewClient'

function App() {

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [blur, setBlur] = useState<boolean | null>(null);
  const [window, setWindow] = useState<string | null>(null);
  const [choseClient, setChoseClient] = useState<string | null>(null);

  const handleSelectedOption = (selected: string) => {
    setSelectedOption(selected)
  }

  const handleClicked = (type: string, cnpj?:string) => {
    if (type === 'create') {
      setBlur(true);
      setWindow('create');
    }
    if (type === 'viewClient') {
      setSelectedOption('viewClient')
      setChoseClient(String(cnpj))
    }
    if (type === 'close') {
      setBlur(false);
      setWindow(null)
    }
  }

  const [client, setClient] = useState<Clients[]>([])

  return (
    <div>
      <ClientContext.Provider value={{client, setClient}}>
        <div className={blur ? 'container blur' : 'container'}>
          <Sidebar onSelectedOption={handleSelectedOption}></Sidebar>
          {selectedOption === 'clientList' && <ClientList onClicked={handleClicked}/>}
          {selectedOption === 'home' && <></>}
          {selectedOption === 'viewClient' && <ViewClient clicked={handleSelectedOption} cnpj={String(choseClient)}></ViewClient>}
        </div>
        {(window === 'create') ? <NewClient clicked={handleClicked}></NewClient> : null}
      </ClientContext.Provider>
    </div>
      
  )
  }

export default App
