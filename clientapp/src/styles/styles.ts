import { createStyles, Theme, makeStyles } from '@material-ui/core'

export const xsCardWidth = '4.4em'
export const xsCardHeight = '5em'

export const smCardWidth = '5.5em'
export const smCardHeight = '7em'

export const mdCardWidth = '6em'
export const mdCardHeight = '8em'

export const lgCardWidth = '6em'
export const lgCardHeight = '8em'

export const xlCardWidth = '8.5em'
export const xlCardHeight = '11em'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginRight: theme.spacing(1),
    },
    cardSkeleton: {
      height: mdCardHeight,
      width: mdCardWidth,
    },
    cards: {
      display: 'grid',
      gridColumnGap: '16px',
      gridRowGap: '10px',
      gridTemplateColumns: `repeat(auto-fit, ${mdCardWidth})`,
      gridTemplateRows: `repeat(auto-fit, ${mdCardHeight})`,
      justifyContent: 'center',
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: `repeat(auto-fit, ${xsCardWidth})`,
        gridTemplateRows: `repeat(auto-fit, ${xsCardHeight})`,
      },
      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: `repeat(auto-fit, ${smCardWidth})`,
        gridTemplateRows: `repeat(auto-fit, ${smCardHeight})`,
      },
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: `repeat(auto-fit, ${mdCardWidth})`,
        gridTemplateRows: `repeat(auto-fit, ${mdCardHeight})`,
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: `repeat(auto-fit, ${lgCardWidth})`,
        gridTemplateRows: `repeat(auto-fit, ${lgCardHeight})`,
      },
      [theme.breakpoints.up('xl')]: {
        gridTemplateColumns: `repeat(auto-fit, ${xlCardWidth})`,
        gridTemplateRows: `repeat(auto-fit, ${xlCardHeight})`,
      },
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
      margin: '.25em',

      backgroundColor: 'steelblue',
      display: 'grid',
      '&.blank': {
        backgroundImage: ' url("/images/nami.png")',
      },

      boxShadow: '5px 5px 5px gray',

      height: mdCardHeight,
      width: mdCardWidth,

      [theme.breakpoints.down('xs')]: {
        height: xsCardHeight,
        width: xsCardWidth,
      },
      [theme.breakpoints.up('sm')]: {
        height: smCardHeight,
        width: smCardWidth,
      },
      [theme.breakpoints.up('md')]: {
        height: mdCardHeight,
        width: mdCardWidth,
      },
      [theme.breakpoints.up('lg')]: {
        height: lgCardHeight,
        width: lgCardWidth,
      },
      [theme.breakpoints.up('xl')]: {
        height: xlCardHeight,
        width: xlCardWidth,
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
    userCards: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(4, 0, 4),
    },
    userCard: {
      backgroundColor: 'WhiteSmoke',
      display: 'inline-block',
      margin: '.5em',
    },
    userCardContent: {
      padding: '2em',
    },
  }),
)
