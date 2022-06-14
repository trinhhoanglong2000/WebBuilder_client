import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
const SaveLoad = ({open}) => {
  return (
    <Backdrop
      sx={{ color: "rgb(25, 118, 210)", zIndex: (theme) => theme.zIndex.drawer + 1,opacity:1,background: '#f6faf6' }}
      open={open}
    >
      <CircularProgress color="inherit"  sx={{width:"25vh!important",height:"25vh!important"}}/>
    </Backdrop>
  );
};

export default SaveLoad;
