import {createTheme} from '@material-ui/core'

const theme = createTheme({
  palette: {
    primary: {
      main: colorTable['indigo-600'],
    },
    secondary: {
      main: colorTable['deep-purple-600'],
    },
  },
})

export default theme
