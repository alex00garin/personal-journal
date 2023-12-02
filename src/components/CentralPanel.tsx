import InputContainer from './InputContainer'
import { Box, Card, CardContent, IconButton, Input, Typography } from '@mui/material'
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

interface Note {
  id: string;
  content: string;
  createdAt: number;
}

// function useLocalState(defaultValue: Note[], key: string): [Note[], Dispatch<SetStateAction<Note[]>>] {
//   const [state, setState] = useState<Note[]>(() => {
//     const localValue = localStorage.getItem(key);
//     return localValue !== null ? JSON.parse(localValue) : defaultValue;
//   });
//   const [notes, setNotes] = useState<Note[]>(() => {
//     const savedNotes = localStorage.getItem('notes');
//     return savedNotes ? JSON.parse(savedNotes) : [];
//   });
//   const [editNoteId, setEditNoteId] = useState(null);
//   const [editContent, setEditContent] = useState('');

//   const addNote = (note: Note) => {
//     setNotes(prevNotes => [...prevNotes, note]);
//   };

//   useEffect(() => {
//     localStorage.setItem('notes', JSON.stringify(notes));
//   }, [notes]);
//   return [state, setState];
// }

export default function CentralPanel() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (noteContent: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content: noteContent,
      createdAt: Date.now() // This captures the current timestamp
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
<Box className={'h-full w-full bg-neutral-100 flex flex-col p-3 rounded-lg'}>
  <Box flexGrow={1} overflow="auto">
    {notes.map((note) => (
      <Card key={note.id} className={'my-2'}>
        {/* Use flex column to stack date and content */}
        <CardContent className={'flex flex-col justify-between'}>
          {/* Date on top */}
          <Box className={'flex justify-between'}>
            <Typography variant="body2" color="textSecondary" className={'mb-2'}>
              {new Date(note.createdAt).toLocaleString()}
            </Typography>
            {/* Spacer div to push delete button to the right */}
            <Box flexGrow={1} />
            <IconButton aria-label="delete" onClick={() => deleteNote(note.id)} size="small">
              <DeleteIcon />
            </IconButton>
          </Box>
          {/* Note content or input below */}
          {editNoteId === note.id ? (
            <Input
              fullWidth
              multiline
              rows={3}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              onBlur={() => saveNote(note.id)}
              autoFocus
            />
          ) : (
            <Typography onClick={() => {
              setEditNoteId(note.id);
              setEditContent(note.content);
            }}>{note.content}</Typography>
          )}
        </CardContent>
      </Card>
    ))}
  </Box>
  <Box className={''}>
    <InputContainer addNote={addNote}/>
  </Box>
</Box>
    </>
  )
}