import {createTheme} from '@material-ui/core'
import {indigo, deepPurple} from '@material-ui/core/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[600],
    },
    secondary: {
      main: deepPurple[600],
    },
  },
})

export default theme
