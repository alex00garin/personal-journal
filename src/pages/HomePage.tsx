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
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  const handleLeftPanelToggle = () => setIsLeftPanelOpen(!isLeftPanelOpen);
  const handleRightPanelToggle = () => setIsRightPanelOpen(!isRightPanelOpen);

  useEffect(() => {
    setNotes(getNotes());
  }, []);
  
  return (
    <>
      <Box className='home-container flex'>
        <Drawer />
        <Box className='main-content mt-20 flex w-full py-3'>
          <Box className='sectors flex justify-between w-full gap-3'>
            <Box className='flex-col w-auto border-r'>
              <IconButton onClick={handleLeftPanelToggle}>
                {isLeftPanelOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
              <LeftPanel isLeftPanelOpen={isLeftPanelOpen} />
            </Box>
            <Box className='flex-col w-full border-r pr-3'>
            <CentralPanel setSelectedCardId={setSelectedCardId} />
            </Box>
            <Box className='flex-col w-auto'>
              <IconButton onClick={handleRightPanelToggle}>
                {isRightPanelOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
              <RightPanel isRightPanelOpen={isRightPanelOpen} selectedCardId={selectedCardId} notes={notes} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
