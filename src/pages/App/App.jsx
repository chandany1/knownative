import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import './App.css'
import * as textsAPI from '../../utilities/texts-api'
import AuthPage from '../AuthPage/AuthPage'
import TextPage from '../TextPage/TextPage'
import NavBar from '../../components/NavBar/NavBar'
import DashboardPage from '../DashboardPage/DashboardPage'

function App() {
  const [user, setUser] = useState(getUser())
  const [texts, setTexts] = useState([])

  useEffect(function() {
    async function getTexts() {
      const texts = await textsAPI.getAll()
      setTexts(texts)
    }
    getTexts()
  }, [])

  function getText(textId) {
    return texts.find(text => text._id === textId)
  }

  function updateText(updatedText){  
    const textsCopy = [...texts]
    const textIdx = textsCopy.findIndex(text => text._id === updatedText._id)
    textsCopy[textIdx] = updatedText
    setTexts(textsCopy)
}
  
  return (
    <main className='App'>
      { user ?
      <>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route 
          path='/dashboard' 
          element={<
            DashboardPage 
            user={user} 
            texts={texts}
            setTexts={setTexts}
            />} 
          />
          {/* <Route path='/read' element={<TextPage />} /> */}
          <Route path='/read/:textId' element={<TextPage 
          getText={getText} 
          updateText={updateText}
          />} />
        </Routes>
      </>
        :
        <AuthPage setUser={setUser}/>
      }
    </main>
  )
}

export default App;
