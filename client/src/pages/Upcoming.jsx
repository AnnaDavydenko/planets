import { useMemo } from "react";
// import {
//   withStyles,
//   Appear,
//   Link,
//   Paragraph,
//   Table,
//   Words,
// } from "arwes";

import Clickable from "../components/Clickable";
import { styled } from '@mui/material/styles';

const Link = styled('div')(({theme}) => ({
  color: "red",
  textDecoration: "none",
}));

const Upcoming = props => {
  const { 
    entered,
    launches,
    classes,
    abortLaunch,
  } = props;

  const tableBody = useMemo(() => {
    return launches?.filter((launch) => launch.upcoming)
      .map((launch) => {
        return <tr key={String(launch.flightNumber)}>
          <td>
            <Clickable style={{color:"red"}}>
              <Link onClick={() => abortLaunch(launch.flightNumber)}>
                ✖
              </Link>
            </Clickable>
          </td>
          <td>{launch.flightNumber}</td>
          <td>{new Date(launch.launchDate).toDateString()}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.target}</td>
        </tr>;
      });
  }, [launches, abortLaunch]);

  return (
    // <Appear id="upcoming" animate show={entered}>
    <>
    <span>Upcoming missions including both SpaceX launches and newly scheduled Zero to Mastery rockets.</span>
    <span>Warning! Clicking on the ✖ aborts the mission.</span>
    {/*<Table animate show={entered}>*/}
      <table style={{tableLayout: "fixed"}}>
        <thead>
          <tr>
            <th style={{width: "3rem"}}></th>
            <th style={{width: "3rem"}}>No.</th>
            <th style={{width: "10rem"}}>Date</th>
            <th style={{width: "11rem"}}>Mission</th>
            <th style={{width: "11rem"}}>Rocket</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    {/*</Table>*/}
  {/*// </Appear>*/}
</>
  )
}

export default Upcoming;