import { Box, Card, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { Note } from '../utils/notesStorage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface RightPanelProps {
  isRightPanelOpen: boolean;
  handleToggle: () => void;
  selectedCardId: string | null;
  notes: Note[];
}

const RightPanel: React.FC<RightPanelProps> = ({ isRightPanelOpen, handleToggle, selectedCardId, notes }) => {
  const selectedCard = selectedCardId ? notes.find((note: Note) => note.id === selectedCardId) : null;

  const rightPanelStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: isRightPanelOpen ? '350px' : '60px',
    overflowX: 'hidden',
  };
  
  return (
    <Box className={'bg-neutral-100 h-full flex flex-col rounded-lg shadow-lg'}>
      <Box sx={rightPanelStyle}>
        <Box className='flex justify-start m-2'>
          <IconButton onClick={handleToggle}>
            {isRightPanelOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>
        {isRightPanelOpen && (
      <Box className={'flex flex-col items-center'}>
        {selectedCard && (
          <Card className={'bg-neutral-200 p-3 m-3 rounded-lg '}>
            <Box>
              {selectedCard.content}
            </Box>
        </Card>
        )}      
        </Box>
        )}

        </Box>
      
    </Box>
  )
}

export default RightPanel;