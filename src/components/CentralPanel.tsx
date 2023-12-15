import InputContainer from './InputContainer';
import { Box, Card, CardContent, IconButton, Input, Pagination, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Note, getNotes, addNote as storageAddNote, deleteNote as storageDeleteNote } from '../utils/notesStorage';
import React, { SetStateAction, Dispatch } from 'react';

interface CentralPanelProps {
  setSelectedCardId: Dispatch<SetStateAction<string | null>>;
}

const notesPerPage = 5;

const CentralPanel: React.FC<CentralPanelProps> = ({ setSelectedCardId }) => {
  const initialNotes = getNotes();
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(notes.length / notesPerPage);

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  const handleEditClick = (event: React.MouseEvent, noteId: string) => {
    event.stopPropagation(); // Prevent triggering card's onClick
    setEditNoteId(noteId);
    const noteToEdit = notes.find(note => note.id === noteId);
    if (noteToEdit) {
      setEditContent(noteToEdit.content);
    }
  };

  const handleDeleteClick = (event: React.MouseEvent, noteId: string) => {
    event.stopPropagation(); // Prevent triggering card's onClick
    handleDeleteNote(noteId);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (noteContent: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content: noteContent,
      createdAt: Date.now() 
    };
    storageAddNote(newNote); // Update in notesStorage
    setNotes(prevNotes => [...prevNotes, newNote]); // Update in local state
  };
  

  const handleDeleteNote = (noteId: string) => {
    storageDeleteNote(noteId);
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
  };


  const saveNote = (noteId: string) => {
    const updatedNotes = notes.map(note => {
      if (note.id === noteId) {
        return { ...note, content: editContent };
      }
      return note;
    });
    setNotes(updatedNotes);
    setEditNoteId(null);
  };

  
  return (
    <>
      <Box className={'h-full w-full bg-neutral-100 flex flex-col p-3 pb-0 rounded-lg'}>
        <Box flexGrow={1} overflow="auto">
        {currentNotes.map((note) => (
          <Card 
            key={note.id} 
            className={'my-3'} 
            onClick={() => setSelectedCardId(note.id)}
          >
            <CardContent className={'flex flex-col justify-between'}>
              <Box className={'flex justify-between'}>
                <Typography variant="body2" color="textSecondary">
                {new Date(note.createdAt).toLocaleString()}
                </Typography>
                <Box>
          <IconButton aria-label="edit" onClick={(e) => handleEditClick(e, note.id)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={(e) => handleDeleteClick(e, note.id)} size="small">
            <DeleteIcon />
          </IconButton>
        </Box>
              </Box>
              {editNoteId === note.id ? (
                <Input
                  fullWidth
                  multiline
                  rows={6}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onBlur={() => saveNote(note.id)}
                  autoFocus
                />
              ) : (
                <Typography 
                  noWrap 
                  style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  className={'flex max-w-2xl'}
                >
                  {note.content}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
        </Box>
        {totalPages > 1 && (
          <Box className={'mt-3'}>
            <Pagination
            className={'flex justify-end'}
              variant="outlined"
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
        <Box>
        <InputContainer addNote={handleAddNote}/>
        </Box>
      </Box>
    </>
  )
  }

  export default CentralPanel;
