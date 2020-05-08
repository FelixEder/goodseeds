import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    cardPlantNeedsWater: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border : '2px red solid'
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    cardNeedsWater: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border: '2px red solid'
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
      cursor: "pointer",
    },
    cardContent: {
      flexGrow: 1,
    },
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
}));

export default useStyles