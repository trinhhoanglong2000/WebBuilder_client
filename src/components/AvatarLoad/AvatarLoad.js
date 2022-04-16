import React from "react";
import "./AvatarLoad.css";
import { Backdrop } from "@mui/material";
const AvatarLoad = ({ load }) => {
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        
          <div className="coin"></div>
        
      </Backdrop>
    </>
  );
};

export default AvatarLoad;
