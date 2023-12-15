import { Box, Card } from '@mui/material'
import React from 'react'
import { Note } from '../utils/notesStorage';

interface RightPanelProps {
  isRightPanelOpen: boolean;
  selectedCardId: string | null;
  notes: Note[];
}

const RightPanel: React.FC<RightPanelProps> = ({ isRightPanelOpen, selectedCardId, notes }) => {
  const selectedCard = selectedCardId ? notes.find((note: Note) => note.id === selectedCardId) : null;

  const rightPanelStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 80px)',
    width: isRightPanelOpen ? '300px' : '0px',
    overflowX: 'hidden',
  };
  
  return (
    <Box>
        <Box sx={rightPanelStyle}>
        {isRightPanelOpen && selectedCard && (
        <Box className={'flex flex-col justify-start items-center w-fit'}>
           {selectedCard && (
              <Card>
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