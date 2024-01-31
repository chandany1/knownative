import { useState, useEffect } from 'react'
import './DashboardPage.css'
import * as textsAPI from '../../utilities/texts-api'
import NewTextForm from '../../components/NewTextForm/NewTextForm'
import TextListItem from '../../components/TextListItem/TextListItem'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

export default function DashboardPage() {
  const [texts, setTexts] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(function() {
    async function getTexts() {
      const texts = await textsAPI.getAll()
      setTexts(texts)
    }
    getTexts()
  }, [])

  function handleOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  async function handleAddText(textData) {
    const text = await textsAPI.addNewText(textData)
    setTexts([...texts, text])
    handleClose()
  }

  async function archiveText(text, id) {
    const updatedText = await textsAPI.archiveText(text, id)
    setTexts(prevTexts => 
      prevTexts.map(text =>
        text._id === updatedText._id ? updatedText : text))
  }

  async function deleteText(textToDelete, id) {
    setTexts(prevTexts => 
      prevTexts.filter(text => text._id !== textToDelete._id))

    try {
      await textsAPI.deleteText(textToDelete, id)
    } catch (error) {
      console.error(error)
    }
  }

  const textListItems = texts
    .filter(text => !text.archived)
    .map(text => (
      <TextListItem
      key={text._id}
      text={text}
      id={text._id}
      title={text.title}
      source={text.source}
      content={text.content}
      deleteText={deleteText}
      archiveText={archiveText}
      />
    ))

  const archivedListItems = texts
    .filter(text => text.archived)
    .map(text => (
      <TextListItem
      key={text._id}
      text={text}
      id={text._id}
      title={text.title}
      source={text.source}
      content={text.content}
      deleteText={deleteText}
      archiveText={archiveText}
      />
    ))

  return (
  <main className="DashboardPage page">
    <aside className="sidebar">
      <h1>Sidebar</h1>
      <p>Sidebar content</p>
    </aside>

    <section className="main-area">
      <div className="main-area-header">
        <h1>My Texts</h1>
        <button onClick={handleOpen}>+ New</button>

        <Dialog
          open={open}
          onClose={handleClose}   
          PaperComponent={({ children }) => (
            <div style={{ 
              minWidth: '400px', 
              maxWidth: '800px', 
              width: '80vw',
              backgroundColor: 'white',
              color: 'var(--drk-txt)' 
              }}>
              {children}
            </div>
          )}
        >
        <DialogTitle>Add New Text</DialogTitle>
        <DialogContent>
          <NewTextForm handleAddText={handleAddText} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      </div>
      <div className="textListItems">{textListItems}</div>
      <h1>Archived</h1>
      <div className="archivedListItems">{archivedListItems}</div>
    </section>
  </main>
  )
}