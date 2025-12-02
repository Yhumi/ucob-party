import { Button, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ThemeProvider } from "@mui/material";
import { useState } from "react";

import info from "../assets/icons/info.svg";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const FooterComponent = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    console.log("Opening info");
    setOpen(true);
  }

  const handleClose = () => {
    console.log("Closing info");
    setOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="footer-panel-container">
        <span className="footer-text">Listings automatically refresh every 3 minutes.</span>
        <span className="footer-text move-across">Created by Yhumi Miyei @ Midgardsormr | Shows NA PF only.</span>
        <IconButton onClick={handleOpen} aria-label="info">
          <img src={info.src} alt="Creator Icon" data-tooltip-id="creator" data-tooltip-content="Show more info" data-tooltip-place="top" className="meta-icon" />
        </IconButton>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="info-title"
      >
        <DialogTitle id="info-title">
          {"More information..."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Curated NA PF by/for the people of the <a href="https://discord.gg/77KUBgvKzz" target="_blank" rel="noopener">NA UCoB Enjoyers discord</a>.<br />
            PFs hosted by <span className="cob-enjoyers-color">Cob Enjoyers</span> and <span className="cob-friends-color">Cob Friends</span> parties are generally* good to join for consistency.<br /><br />
            <i>*Please note, while the leads may be consistent if the party is filled with randoms YMMV. These PF leads just often play with consistent players alongside them and they know their stuff..</i>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

export default FooterComponent;