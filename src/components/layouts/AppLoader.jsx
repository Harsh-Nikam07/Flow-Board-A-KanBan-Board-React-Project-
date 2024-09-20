import { Stack, CircularProgress } from '@mui/material'

const AppLoader = () => {
  return (
    <Stack display="flex" alignItems="center" justifyContent="center" sx={{
        height:'100vh'
    }}>
        <CircularProgress />
    </Stack>
  )
}

export default AppLoader