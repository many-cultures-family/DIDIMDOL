import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: '#2e7d5b' },
  },
  typography: {
    fontFamily: [
      'Pretendard',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Apple SD Gothic Neo"',
      '"Noto Sans KR"',
      'sans-serif',
    ].join(','),
  },
})

export default theme
