import FormGroup from '@mui/material/FormGroup';
import { showCobEnjoyersState, showCobFriendsState, showHighlightingState, showOthersState } from '../services/controlStore';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';

const ControlComponent = () => {
  const [cobEnjoyersChecked , setCobEnjoyersChecked] = useState(showCobEnjoyersState.value);
  const [cobFriendsChecked , setCobFriendsChecked] = useState(showCobFriendsState.value);
  const [othersChecked , setOthersChecked] = useState(showOthersState.value);
  const [highlighting , setHighlight] = useState(showOthersState.value);

  const updateCobEnjoyers = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Updating Cob Enjoyers to:", event.target.checked);
    setCobEnjoyersChecked(event.target.checked);

    showCobEnjoyersState.set(event.target.checked);
  }

  const updateCobFriends = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Updating Cob Friends to:", event.target.checked);
    setCobFriendsChecked(event.target.checked);

    showCobFriendsState.set(event.target.checked);
  }

  const updateOthers = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Updating Others to:", event.target.checked);
    setOthersChecked(event.target.checked);

    showOthersState.set(event.target.checked);
  }

  const updateHighlighting = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Updating Highlighting to:", event.target.checked);
    setHighlight(event.target.checked);

    showHighlightingState.set(event.target.checked);
  }

  return (
    <div className="control-panel-container">
      <FormGroup row className="control-section">
        <FormControlLabel className="form-control-text" control={<Switch checked={cobEnjoyersChecked} onChange={updateCobEnjoyers} color="secondary" />} label="Cob Enjoyers" data-tooltip-id="enjoyers" data-tooltip-content="PFs hosted by Certified Cob Enjoyers™" data-tooltip-place="top" />
        <Tooltip id="enjoyers" />
        <FormControlLabel className="form-control-text" control={<Switch checked={cobFriendsChecked} onChange={updateCobFriends} />} label="Cob Friends" data-tooltip-id="friends" data-tooltip-content="PFs hosted by friends of the Cob Enjoyers" data-tooltip-place="top" />
        <Tooltip id="friends" />
        <FormControlLabel className="form-control-text" control={<Switch checked={othersChecked} onChange={updateOthers} />} label="Others" data-tooltip-id="others" data-tooltip-content="PFs hosted by others" data-tooltip-place="top" />
        <Tooltip id="others" />
      </FormGroup>

      <FormGroup row className="control-section">
        <FormControlLabel className="form-control-text" control={<Switch checked={highlighting} onChange={updateHighlighting} color="secondary" />} label="Show Highlighting" />
      </FormGroup>
    </div>
  )
}

export default ControlComponent;