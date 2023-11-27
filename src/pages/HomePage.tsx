import React, { useState } from 'react';
import { Box } from '@mui/material'
import Drawer from '../components/Drawer'
import LeftPanel from '../components/LeftPanel'
import CentralPanel from '../components/CentralPanel'
import RightPanel from '../components/RightPanel'
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


export default function HomePage() {
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  const handleLeftPanelToggle = () => {
    setIsLeftPanelOpen(!isLeftPanelOpen);
  };

  const handleRightPanelToggle = () => {
    setIsRightPanelOpen(!isRightPanelOpen);
  };

  return (
<>
      <Box className="home-container flex">
        <Drawer />
        <Box className="main-content mt-20 flex w-full py-3">
          <Box className="sectors flex justify-between w-full gap-3">
          <Box className="flex-col w-auto border-r">
              <IconButton onClick={handleLeftPanelToggle}>
                {isLeftPanelOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
              <LeftPanel isLeftPanelOpen={isLeftPanelOpen} />
            </Box>
            <Box className={'flex-col w-full border-r pr-3'}>
              <CentralPanel />
            </Box>
            <Box className="flex-col w-auto">
              <IconButton onClick={handleRightPanelToggle}>
                {isRightPanelOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
              <RightPanel isRightPanelOpen={isRightPanelOpen} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>  
  )
}
