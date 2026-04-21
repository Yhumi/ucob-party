import FormGroup from '@mui/material/FormGroup';
import { listingSearchState, roleFilterState, ALL_FILTER_ROLES, showCobEnjoyersState, showCobFriendsState, showHighlightingState, showOthersState } from '../services/controlStore';
import Switch from '@mui/material/Switch';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { Role } from '../types/pfListings';

const roleNames: Record<Role, string> = {
  [Role.Any]: "Any",
  [Role.Tank]: "Tank",
  [Role.Healer]: "Healer",
  [Role.DPS]: "DPS",
};

const roleDisplayOrder: Record<Role, number> = {
  [Role.Tank]: 0,
  [Role.Healer]: 1,
  [Role.DPS]: 2,
  [Role.Any]: 3,
};

const ALL_ROLES = ALL_FILTER_ROLES;

const ControlComponent = () => {
  const [cobEnjoyersChecked , setCobEnjoyersChecked] = useState(showCobEnjoyersState.value);
  const [cobFriendsChecked , setCobFriendsChecked] = useState(showCobFriendsState.value);
  const [othersChecked , setOthersChecked] = useState(showOthersState.value);
  const [highlighting , setHighlight] = useState(showHighlightingState.value);
  const [listingSearch , setListingSearch] = useState(listingSearchState.value);
  const [roleFilter, setRoleFilter] = useState<Role[]>(roleFilterState.value);

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

  const updateListingSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListingSearch(event.target.value);
    listingSearchState.set(event.target.value);
  }

  const updateRoleFilter = (event: SelectChangeEvent<Role[]>) => {
    const { value } = event.target;
    const normalized = typeof value === 'string'
      ? value.split(',').map(v => Number(v) as Role)
      : (value as Role[]);

    if (normalized.length === 0) {
      return;
    }

    setRoleFilter(normalized);
    roleFilterState.set(normalized);
  }

  return (
    <div className="control-panel-container">
      <FormGroup row className="control-section control-section-left">
        <div className="listing-search-container">
          <TextField
            value={listingSearch}
            onChange={updateListingSearch}
            label="Search listings"
            className="listing-search-input"
            size="small"
            variant="outlined"
          />
        </div>

        <FormControl size="small" className="listing-role-select">
          <InputLabel>Roles</InputLabel>
          <Select
            multiple
            value={roleFilter}
            onChange={updateRoleFilter}
            input={<OutlinedInput label="Roles" />}
            MenuProps={{
              PaperProps: { className: "listing-role-menu-paper" },
              MenuListProps: { className: "listing-role-menu-list" },
            }}
            renderValue={(selected) => {
              const roles = selected as Role[];
              if (!roles) return "No Roles";
              if (roles.length === ALL_ROLES.length) return "All Roles";
              if (roles.length === 2) {
                const ordered = [...roles].sort((a, b) => roleDisplayOrder[a] - roleDisplayOrder[b]);
                return ordered.map(r => roleNames[r]).join(", ");
              }

              return roles.map(r => roleNames[r]).join(", ");
            }}
          >
            {ALL_ROLES.map(role => (
              <MenuItem
                className="listing-role-menu-item"
                key={role}
                value={role}
                disabled={roleFilter.length === 1 && roleFilter.includes(role)}
              >
                <Checkbox className="listing-role-menu-checkbox" checked={roleFilter.includes(role)} />
                {roleNames[role]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormGroup>

      <FormGroup row className="control-section control-section-middle">
        <FormControlLabel className="form-control-text" control={<Switch checked={cobEnjoyersChecked} onChange={updateCobEnjoyers} color="secondary" />} label="Cob Enjoyers" data-tooltip-id="enjoyers" data-tooltip-content="PFs hosted by Certified Cob Enjoyers™" data-tooltip-place="top" />
        <Tooltip id="enjoyers" />
        <FormControlLabel className="form-control-text" control={<Switch checked={cobFriendsChecked} onChange={updateCobFriends} />} label="Cob Friends" data-tooltip-id="friends" data-tooltip-content="PFs hosted by friends of the Cob Enjoyers" data-tooltip-place="top" />
        <Tooltip id="friends" />
        <FormControlLabel className="form-control-text" control={<Switch checked={othersChecked} onChange={updateOthers} />} label="Others" data-tooltip-id="others" data-tooltip-content="PFs hosted by others" data-tooltip-place="top" />
        <Tooltip id="others" />
      </FormGroup>
 
      <FormGroup row className="control-section control-section-right">
        <FormControlLabel className="form-control-text" control={<Switch checked={highlighting} onChange={updateHighlighting} color="secondary" />} label="Show Highlighting" />
      </FormGroup>
    </div>
  )
}

export default ControlComponent;
