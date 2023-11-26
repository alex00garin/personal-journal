import React from 'react';
import Box from '@mui/material/Box';
import DigitalClock from './DigitalClock';
import BasicDateRangeCalendar from './BasicDatePicker';

interface LeftPanelProps {
  isLeftPanelOpen: boolean;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ isLeftPanelOpen }) => {
  const leftPanelStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    height: 'calc(100% - 80px)',
    width: isLeftPanelOpen ? 'fit-content' : '0px',
    overflowX: 'hidden',
  };

  return (
    <Box className={'transition-all duration-500 ease-in-out'} sx={leftPanelStyle}>
      {isLeftPanelOpen && (
        <Box className={'flex flex-col justify-start items-center w-fit'}>        
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
