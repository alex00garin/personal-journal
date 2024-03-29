import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Drawer from '../components/Drawer';
import LeftPanel from '../components/LeftPanel';
import CentralPanel from '../components/CentralPanel';
import RightPanel from '../components/RightPanel';
import { Note, getNotes } from '../utils/notesStorage';

export default function HomePage() {
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  const handleLeftPanelToggle = () => setIsLeftPanelOpen(!isLeftPanelOpen);
  const handleRightPanelToggle = () => setIsRightPanelOpen(!isRightPanelOpen);

  useEffect(() => {
    setNotes(getNotes());
  }, []);
  
  return (
    <>
       <Box className='flex w-[100vw] h-[100vh] bg-neutral-700 m-0 p-3'>
        <Drawer />
        <Box className='mt-12 flex pt-3 flex-grow'>
          <Box className='flex flex-grow gap-2'>
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
