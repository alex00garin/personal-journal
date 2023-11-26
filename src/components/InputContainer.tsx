import React, { useState } from 'react';
import { Box } from '@mui/material';
import FileInput from './FileInputProps';

export default function InputContainer() {

  const [textInput, setTextInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleTextChange = (text: string) => {
    setTextInput(text);
  };

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  return (
    <Box className={'flex flex-col w-full'}>
            <p>Text input: {textInput}</p>

      <FileInput 
        onTextChange={handleTextChange}
        onFileChange={handleFileChange}
      />
      {/* You can display the text or file info here if needed */}
      <p>Selected file: {selectedFile ? selectedFile.name : 'None'}</p>
    </Box>
  );
}
