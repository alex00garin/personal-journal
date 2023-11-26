import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

interface FileInputProps {
  onTextChange: (text: string) => void;
  onFileChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onTextChange, onFileChange }) => {
  const [text, setText] = useState('');

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setText(newText);
    onTextChange(newText);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    onFileChange(selectedFile || null);
  };

  return (
    <div>
      <TextField
        label="Text Input"
        variant="outlined"
        value={text}
        onChange={handleTextChange}
      />
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="file-input"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="file-input">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <Button variant="contained" component="span">
        Upload
      </Button>
    </div>
  );
};

export default FileInput;
