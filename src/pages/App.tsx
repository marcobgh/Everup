import './App.css'
import Sidebar from "../components/sidebar/Sidebar"
import ClientList from '../components/clientList/ClientList'
import NewClient from '../components/newClient/NewClient'
import { useState } from 'react'

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


  return (
    <div>
      <div className={AddNew ? 'container add-new' : 'container'}>
        <Sidebar onSelectedOption={handleSelectedOption}></Sidebar>
        {selectedOption === 2 && <ClientList onSelectedAddNew={handleClicked} />}
        {selectedOption === 1 && <></>}
      </div>
      {AddNew && <NewClient clicked={handleClicked}></NewClient>}
    </div>
      
  )
}

export default App
