import './App.css'
import Sidebar from "../components/sidebar/Sidebar"
import ClientList from '../components/clientList/ClientList'
import NewClient from '../components/newClient/NewClient'
import { useState } from 'react'
import { ClientContext, type Clients } from '../context'

function App() {

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [AddNew, setAddNew] = useState<boolean | null>(null);

  const handleSelectedOption = (selected: number) => {
    setSelectedOption(selected)
  }

  const handleClicked = () => {
    if (AddNew === true) {
      setAddNew(false)
    }
    else {
      setAddNew(true)
    }
  }

  const [client, setClient] = useState<Clients[]>(
    [
    ]
  )

  return (
    <div>
      <ClientContext.Provider value={{client, setClient}}>
        <div className={AddNew ? 'container blur' : 'container'}>
          <Sidebar onSelectedOption={handleSelectedOption}></Sidebar>
          {selectedOption === 2 && <ClientList onSelectedAddNew={handleClicked} />}
          {selectedOption === 1 && <></>}
        </div>
        {AddNew && <NewClient clicked={handleClicked}></NewClient>}
      </ClientContext.Provider>
    </div>
      
  )
}

export default App
