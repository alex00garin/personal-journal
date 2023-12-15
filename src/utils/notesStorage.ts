export interface Note {
    id: string;
    content: string;
    createdAt: number;
  }
  
  let notes: Note[] = JSON.parse(localStorage.getItem('notes') || '[]');
  
  export const getNotes = (): Note[] => notes;
  
  export const addNote = (newNote: Note): void => {
    notes = [...notes, newNote];
    localStorage.setItem('notes', JSON.stringify(notes));
  };
  
  export const deleteNote = (noteId: string): void => {
    notes = notes.filter(note => note.id !== noteId);
    localStorage.setItem('notes', JSON.stringify(notes));
  };
  
  export const updateNote = (updatedNote: Note): void => {
    notes = notes.map(note => note.id === updatedNote.id ? updatedNote : note);
    localStorage.setItem('notes', JSON.stringify(notes));
  };
  