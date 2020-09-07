import { createStyles, Theme, makeStyles } from '@material-ui/core'

export const cardWidth = '7.3em'
export const cardHeight = '9.5em'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginRight: theme.spacing(1),
    },
    cardSkeleton: {
      height: cardHeight,
      width: cardWidth,
    },
    cards: {
      display: 'grid',
      gridColumnGap: '16px',
      gridRowGap: '10px',
      gridTemplateColumns: `repeat(auto-fit, ${cardWidth})`,
      gridTemplateRows: `repeat(auto-fit, ${cardHeight})`,
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

      boxShadow: '5px 5px 5px gray',
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
