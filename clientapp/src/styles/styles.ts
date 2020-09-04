import { createStyles, Theme, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginRight: theme.spacing(1),
    },
    card: {},
    cards: {
      display: 'grid',
      gridColumnGap: '16px',
      gridTemplateColumns: 'repeat(auto-fit, 7.3em)',
      gridTemplateRows: 'repeat(auto-fit, 9.5em)',
      height: 0,
      justifyContent: 'center',
      width: '100%',
    },
    cardDisplay: {
      alignSelf: 'center',
      fontSize: '2.5em',
      justifySelf: 'center',
    },
    cardSide: {
      borderColor: 'black',
      borderRadius: '.25em',
      borderStyle: 'solid',
      borderWidth: '1px',
      cursor: 'pointer',
      gridTemplateColumns: '100%',
      gridTemplateRows: '100%;',
      height: '9em',
      margin: '.25em',
      width: '7em',

      backgroundColor: 'steelblue',
      display: 'grid',
      '&.blank': {
        backgroundImage: ' url("/images/nami.png")',
      },
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    paper: {
      color: theme.palette.text.secondary,
      padding: theme.spacing(2),
      textAlign: 'start',
    },
  }),
)
