import {
  useState,
} from "react";
import {
  Route, Router, Routes,
} from 'react-router-dom';


import usePlanets from "../hooks/usePlanets";
import useLaunches from "../hooks/useLaunches";

import { styled } from '@mui/material/styles';

import Centered from "../components/Centered";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Launch from "./Launch";
import History from "./History";
import Upcoming from "./Upcoming";

const ContentWrapper = styled('div')(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  margin: "auto",
}))

const CenteredWrapper = styled('div')(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  margin: "auto",
}))

const AppLayout = props => {
  // const { sounds, classes } = props;


  const [frameVisible, setFrameVisible] = useState(true);
  // const animateFrame = () => {
  //   setFrameVisible(false);
  //   setTimeout(() => {
  //     setFrameVisible(true);
  //   }, 600);
  // };

  const onSuccessSound = () => sounds.success && sounds.success.play();
  const onAbortSound = () => sounds.abort && sounds.abort.play();
  const onFailureSound = () => sounds.warning && sounds.warning.play();

  const {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  } = useLaunches(onSuccessSound, onAbortSound, onFailureSound);

  const planets = usePlanets();
  
  return (
    <ContentWrapper>
    <Header />
    <CenteredWrapper>
      {/*<Frame animate*/}
      {/*  show={frameVisible}*/}
      {/*  corners={4}*/}
      {/*  style={{visibility: frameVisible ? "visible" : "hidden"}}>*/}
      {/*  {anim => (*/}
          <div style={{padding: "20px"}}>
            {/*<Router>*/}
              <Routes>
                <Route path="/" element={<Launch
                  // entered={anim.entered}
                  planets={planets}
                  submitLaunch={submitLaunch}
                  isPendingLaunch={isPendingLaunch} />} />
                <Route path="/launch" element={<Launch
                  // entered={anim.entered}
                  planets={planets}
                  submitLaunch={submitLaunch}
                  isPendingLaunch={isPendingLaunch} />} />
                <Route path="/upcoming" element={ <Upcoming
                  // entered={anim.entered}
                  launches={launches}
                  abortLaunch={abortLaunch} />} />
                <Route path="/history" element={<History launches={launches} />} />
              </Routes>
            {/*</Router>*/}
          </div>
      {/*  )}*/}
      {/*</Frame>*/}
    </CenteredWrapper>
    <Footer />
  </ContentWrapper>
)};

export default AppLayout;