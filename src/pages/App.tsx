import './App.css'
import Sidebar from "../components/sidebar/Sidebar"
import ClientList from '../components/clientList/ClientList'
import NewClient from '../components/newClient/NewClient'
import { useState } from 'react'
import { ClientContext, type Clients } from '../context'
import ViewClient from '../components/viewClient/ViewClient'

function App() {

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [blur, setBlur] = useState<boolean | null>(null);
  const [viewWindow, setViewWindow] = useState<string | null>(null);

  const handleSelectedOption = (selected: number) => {
    setSelectedOption(selected)
  }

  const handleClicked = (type: string) => {
    if (type === 'create') {
      setBlur(true);
      setViewWindow('create');
    }
    if (type === 'view') {
      setBlur(true);
      setViewWindow('view');
    }
    if (type === 'close') {
      setBlur(false);
      setViewWindow(null)
    }
  }

  const [client, setClient] = useState<Clients[]>([])

  return (
    <div>
      <ClientContext.Provider value={{client, setClient}}>
        <div className={blur ? 'container blur' : 'container'}>
          <Sidebar onSelectedOption={handleSelectedOption}></Sidebar>
          {selectedOption === 2 && <ClientList onClicked={handleClicked} />}
          {selectedOption === 1 && <></>}
        </div>
        {(viewWindow === 'create') ? <NewClient clicked={handleClicked}></NewClient> : null}
        {(viewWindow === 'view') ? <ViewClient clicked={handleClicked}></ViewClient> : null}
      </ClientContext.Provider>
    </div>
      
  )
  }

export default App
