import { Box, CardContent, IconButton, Input, InputAdornment, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function InputContainer() {


  return (
    <Box className={'flex flex-col w-full'}>
      <CardContent className={'flex w-full border rounded-lg'}>
        <Input
            fullWidth
            className='border border-b-none rounded-lg mt-5 p-1'
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="send">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
        />
      </CardContent>
    </Box>
  );
}
