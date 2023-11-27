import { Box } from '@mui/material'
import React from 'react'

interface RightPanelProps {
  isRightPanelOpen: boolean;
}

const RightPanel: React.FC<RightPanelProps> = ({ isRightPanelOpen }) => {
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
        {isRightPanelOpen && (
        <Box className={'flex flex-col justify-start items-center w-fit'}>        
        </Box>
        )}

        </Box>
      
    </Box>
  )
}

export default RightPanel;