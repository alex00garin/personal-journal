import InputContainer from './InputContainer'
import { Box, Card, CardContent, IconButton, Input, Pagination, Typography } from '@mui/material'
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Note {
  id: string;
  content: string;
  createdAt: number;
}

const notesPerPage = 5;

export default function CentralPanel() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(notes.length / notesPerPage);

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (noteContent: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content: noteContent,
      createdAt: Date.now() 
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
  };
  

  const deleteNote = (noteId: string) => {
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
          <Card key={note.id} className={'my-3'} >
            <CardContent className={'flex flex-col justify-between'}>
              <Box className={'flex justify-between'}>
                <Typography variant="body2" color="textSecondary">
                  {new Date(note.createdAt).toLocaleString()}
                </Typography>
                <Box>
                  <IconButton aria-label="edit" onClick={() => {
                    setEditNoteId(note.id);
                    setEditContent(note.content);
                  }} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => deleteNote(note.id)} size="small">
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
          <InputContainer addNote={addNote}/>
        </Box>
      </Box>
    </>
  )
  }