import './App.css'
import Sidebar from "../components/sidebar/Sidebar"
import ClientList from '../components/clientList/ClientList'
import NewClient from '../components/newClient/NewClient'
import { useState } from 'react'
import { ClientContext, type Clients } from '../context'

function App() {

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [blur, setBlur] = useState<boolean | null>(null);

  const handleSelectedOption = (selected: number) => {
    setSelectedOption(selected)
  }

  const handleClicked = (type: string) => {
    if(type === 'create' || type === 'view') {
      if(!blur) {
         setBlur(true)
      }
      else {
        setBlur(false)
      }
    }
    else {
      setBlur(false)
    }
  }

  const [client, setClient] = useState<Clients[]>(
    [
    ]
  )

  return (
    <div>
      <ClientContext.Provider value={{client, setClient}}>
        <div className={blur ? 'container blur' : 'container'}>
          <Sidebar onSelectedOption={handleSelectedOption}></Sidebar>
          {selectedOption === 2 && <ClientList onClicked={handleClicked} />}
          {selectedOption === 1 && <></>}
        </div>
        {blur && <NewClient clicked={handleClicked}></NewClient>}
      </ClientContext.Provider>
    </div>
      
  )
}

export default App
