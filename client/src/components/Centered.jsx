// import { withStyles } from "arwes";

import { styled } from '@mui/material/styles';

const Container = styled('div')(({theme}) => ({
  root: {
    margin: "0 auto",
    maxWidth: 800,
  },
  "@media (max-width: 800px)": {
    root: {
      margin: "0 12px",
    }
  }
}));


const Centered = props => {
  const {
    classes,
    className,
    children,
    ...rest
  } = props;
  return (
    <Container>
      {children}
    </Container>
  );
};

export default Centered;
