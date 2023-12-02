import React, { useState, useRef } from 'react';
import { Box, CardContent, CircularProgress, IconButton, TextareaAutosize } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

interface InputContainerProps {
  addNote: (noteContent: string) => void;
}

export default function InputContainer({ addNote }: InputContainerProps) {
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleAttachClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setIsLoading(true); // Start loading
      // Simulate file upload
      setIsLoading(false); // End loading
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== '') {
      addNote(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box className={'flex flex-col w-full'}>
      <CardContent className={'flex w-full items-center'}>
        <IconButton aria-label="attach" onClick={handleAttachClick} disabled={isLoading}>
          <AttachFileIcon />
        </IconButton>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={isLoading}
        />
        <TextareaAutosize
        className={'bg-neutral-100 border rounded-lg'}
          minRows={1}
          maxRows={6}
          style={{ 
            width: '100%',
            padding: '10px', 
            resize: 'none', 
            marginInline: '10px'
          }}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a note..."
          onKeyDown={handleKeyDown}
        />
        {isLoading && <CircularProgress size={24} />} 
        <IconButton  aria-label="send" onClick={handleSubmit} size="medium">
          <SendIcon />
        </IconButton>
      </CardContent>
    </Box>
  );
}
