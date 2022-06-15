import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from '@mui/material/Skeleton';
import './Saveload.css'
const SaveLoad = ({ isSaving }) => {
  return (
    <Backdrop
      sx={!isSaving ? { color: "rgb(25, 118, 210)", zIndex: (theme) => theme.zIndex.drawer + 1, opacity: 1, background: '#f6faf6' } : { color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" sx={{ width: "25vh!important", height: "25vh!important", zIndex: 99, }} />
      <div className="NavigationPanel-Skeleton" style={isSaving ? {
        display: 'none',
      } : {}}>
        <div className="block-panel-Skeleton" >
          <Skeleton variant="rectangular" width={30} height={30} animation="wave" />

        </div>
        <div className="device-panel-Skeleton" >
          <Skeleton sx={{ marginRight: '10px' }} variant="rectangular" width={30} height={30} animation="wave" />
          <Skeleton sx={{ marginRight: '10px' }} variant="rectangular" width={30} height={30} animation="wave" />
          <Skeleton sx={{ marginRight: '10px' }} variant="rectangular" width={30} height={30} animation="wave" />
        </div>
        <div className="tools-panel-Skeleton" >
          <Skeleton sx={{ marginRight: '10px' }} variant="rectangular" width={30} height={30} animation="wave" />
          <Skeleton sx={{ marginRight: '10px' }} variant="rectangular" width={30} height={30} animation="wave" />
          <Skeleton sx={{ marginRight: '10px' }} variant="rectangular" width={30} height={30} animation="wave" />
          <Skeleton sx={{ marginRight: '10px' }} variant="rectangular" width={30} height={30} animation="wave" />
          <Skeleton sx={{ marginRight: '10px' }} variant="rectangular" width={30} height={30} animation="wave" />
        </div>
        <div className="views-panel-Skeleton">
          <Skeleton sx={{ marginLeft: '10px' }} variant="rectangular" width={30} height={30} animation="wave" />
          <Skeleton sx={{ marginRight: '10px' }} variant="rectangular" width={30} height={30} animation="wave" />

        </div>

      </div>
      <div className="Canvas-Skeleton" style={isSaving ? {
        display: 'none',
      } : {}}>

        <span className="blocksection-skeleton">
          <Skeleton animation="wave" height={50} ></Skeleton>
          <Skeleton animation="wave" height={50} />
          <Skeleton animation="wave" height={50} />
          <Skeleton animation="wave" height={50} />
          <Skeleton animation="wave" height={50} />
          <Skeleton animation="wave" height={50} />
          <Skeleton animation="wave" height={50} />
          <Skeleton animation="wave" height={50} />


        </span>
        <span className="canvassection-skeleton">
          <Skeleton variant="rectangular" sx={{ width: '100%', height: '10%', marginBottom: '20px' }} />
          <Skeleton variant="rectangular" sx={{ width: '100%', height: '75%' }} />
          <Skeleton variant="text" sx={{ width: '100%', height: '15%' }} />

        </span>
        <span className="viewsection-skeleton">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={150} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />


        </span>
      </div>
    </Backdrop>
  );
};

export default SaveLoad;
