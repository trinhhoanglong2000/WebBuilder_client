import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from '@mui/material/Skeleton';
import './Saveload.css'
const SaveLoad = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: "rgb(25, 118, 210)", zIndex: (theme) => theme.zIndex.drawer + 1, opacity: 1, background: '#f6faf6' }}
      open={open}
    >
      <CircularProgress color="inherit" sx={{ width: "25vh!important", height: "25vh!important"}} />
      <div className="NavigationPanel-Skeleton">
        <Skeleton className="block-panel-Skeleton" variant="rectangular" width={30} height={30} animation="wave" />
        <div className="device-panel-Skeleton" >
          <Skeleton sx={{ marginRight: '10px' }} variant="rectangular" width={30} height={30} animation="wave" />
          <Skeleton sx={{ marginRight: '10px' }} variant="rectangular" width={30} height={30} animation="wave" />
          <Skeleton sx={{ marginRight: '10px' }} variant="rectangular" width={30} height={30} animation="wave" />
        </div>

      </div>
    </Backdrop>
  );
};

export default SaveLoad;
