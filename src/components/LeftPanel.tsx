import React from 'react';
import Box from '@mui/material/Box';
import DigitalClock from './DigitalClock';
import BasicDateRangeCalendar from './BasicDatePicker';
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface LeftPanelProps {
  isLeftPanelOpen: boolean;
  handleToggle: () => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ isLeftPanelOpen, handleToggle }) => {
  const leftPanelStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: isLeftPanelOpen ? '350px' : '60px',
    overflowX: 'hidden',
  };

  return (
    <Box sx={leftPanelStyle} className={'bg-neutral-100 h-full w-auto flex flex-col rounded-lg shadow-lg'}>
      <Box className='flex justify-end m-2'>
      <IconButton onClick={handleToggle}>
          {isLeftPanelOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      {isLeftPanelOpen && (
        
        <Box className={'flex flex-col justify-start items-center'}>        
          <Box className={'flex flex-col text-center'}>
            <DigitalClock />
            <BasicDateRangeCalendar />
          </Box>
          <Box></Box>
        </Box>
      )}
    </Box>
  );
};

export default LeftPanel;
