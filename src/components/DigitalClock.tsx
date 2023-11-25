import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

function DigitalClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <Typography variant="h5">
      {currentTime.toLocaleTimeString()}
    </Typography>
  );
}

export default DigitalClock;
