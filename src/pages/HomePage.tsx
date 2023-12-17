import React, { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import Drawer from '../components/Drawer';
import LeftPanel from '../components/LeftPanel';
import CentralPanel from '../components/CentralPanel';
import RightPanel from '../components/RightPanel';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Note, getNotes } from '../utils/notesStorage'; // Ensure correct path

export default function HomePage() {
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  const handleLeftPanelToggle = () => setIsLeftPanelOpen(!isLeftPanelOpen);
  const handleRightPanelToggle = () => setIsRightPanelOpen(!isRightPanelOpen); // This stays inside HomePage

  useEffect(() => {
    setNotes(getNotes());
  }, []);
  
  return (
    <>
       <Box className='home-container flex w-[100vw] h-[100vh] bg-neutral-700 m-0 p-3'>
        <Drawer />
        <Box className='main-content mt-16 flex py-3 flex-grow'>
          <Box className='flex flex-grow gap-3'>
            <Box className='flex-col' sx={{ flex: isLeftPanelOpen ? '0 0 350px' : '0 0 0px' }}>
              <LeftPanel 
                isLeftPanelOpen={isLeftPanelOpen} 
                handleToggle={handleLeftPanelToggle} 
              />
            </Box>
            <Box className='flex-col flex-grow'>
              <CentralPanel setSelectedCardId={setSelectedCardId} />
            </Box>
            <Box className='flex-col' sx={{ flex: isRightPanelOpen ? '0 0 350px' : '0 0 0px' }}>
              <RightPanel
                isRightPanelOpen={isRightPanelOpen}
                handleToggle={handleRightPanelToggle}
                selectedCardId={selectedCardId}
                notes={notes}
              />            
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
