// import { Link } from 'react-router-dom';
import Clickable from './Clickable';
import Centered from './Centered';
import { Grid, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const Banner = styled('h1')(({theme}) => ({
  display: 'inherit',
  fontWeight: 'bold',
  marginLeft: '10px',
  marginRight: '15px',
  fontSize: 28,
}));

const Button = styled('button')(({theme}) => ({
  padding: [0, 3],
}));

const styles = theme => ({
  // root: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   lineHeight: '80px',
  // },
  // logo: {
  //   display: 'inherit',
  //   marginTop: '15px',
  // },
  nav: {
    display: 'inherit',
  },
  // banner: {
  //   display: 'inherit',
  //   fontWeight: 'bold',
  //   marginLeft: '10px',
  //   marginRight: '15px',
  //   fontSize: 28,
  // },
  clickable: {
    fontSize: 21,
    '& i': {
      marginRight: theme.padding / 2,
      fontSize: 24,
    },
  },
  // link: {
  //   color: theme.color.content,
  //   textDecoration: 'none',
  // },
  // button: {
  //   padding: [0, theme.padding / 2],
  // },
  '@media (max-width: 800px)': {
    logo: {
      display: 'none',
    },
    img: {
      display: 'none',
    },
    banner: {
      display: 'none',
    },
    button: {
      padding: [0, 8],
    },
    // clickable: {
    //   fontSize: 16,
    // },
  },
});

const Header = props => {
  const {classes, onNav, ...rest} = props;
  // return <ArwesHeader animate>
  return (
    <Grid container>
      <img src="/favicon.png" alt="" style={{
        margin: '15px 10px 15px 0',
        height: '50px',
        width: 'auto',
      }}/>
      {/*<Logo animate size={50} className={classes.logo} layer="header"/>*/}
      <Banner>NASA Mission Control</Banner>
      <nav>
        {/*<Button onClick={onNav}>*/}
          <Link href="/launch">
            <i className="material-icons">check_circle_outline</i>Launch
          </Link>
        {/*</Button>*/}
        {/*<Button onClick={onNav}>*/}
          <Link href="/upcoming">
            <i className="material-icons">update</i>Upcoming
          </Link>
        {/*</Button>*/}
        <Button onClick={onNav}>
          <Link href="/history">
            <i className="material-icons">history</i>History
          </Link>
        </Button>
      </nav>
    </Grid>
    // </ArwesHeader>;
  );
};

export default Header;