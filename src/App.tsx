import { Box } from '@chakra-ui/react';
import { AgeCalculator } from './Components/AgeCalculator/AgeCalculator';

function App() {
  return (
    <>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        alignContent='center'
        height="100vh"
      >

        <AgeCalculator />
      </Box>
    </>
  );
}

export default App;
