import './App.css'
import { AddTask } from './components/AddTask'
import { Tasks } from './components/Tasks'
import { FetchProvider } from './context/FetchProvider'

function App() {

  return (
    <FetchProvider>
      <div className='row col col-sm-8 col-lg-6 mt-5 mx-auto'>
        <code>El diseño no es mi fuerte :(</code>
        <AddTask />
        <Tasks />
      </div>
    </FetchProvider>
  )
}

export default App
