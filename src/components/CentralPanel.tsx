import InputContainer from './InputContainer'
import { Box, Card, CardContent, Typography } from '@mui/material'

export default function CentralPanel() {
  return (
    <>
    <Box className={'h-full w-full bg-neutral-100 flex flex-col justify-between p-3 rounded-lg'}>
        <Card>
        <CardContent>
          <Typography>Description of the card.</Typography>
        </CardContent>
      </Card>
      <InputContainer />
    </Box>
    </>
  )
}
