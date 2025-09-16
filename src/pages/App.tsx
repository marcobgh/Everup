import './App.css'
import Sidebar from "../components/sidebar/Sidebar"
import ClientList from '../components/clientList/ClientList'

function App() {

  return (
    <div className='container'>
      <Sidebar></Sidebar>
      <ClientList></ClientList>
    </div>
  )
}

export default App
