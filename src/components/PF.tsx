import { useEffect, useState } from "react";
import { HostType, JobIcons, Role, type KnownPFHosts, type PageResponse, type PFListing } from "../types/pfListings";
import { Tooltip } from 'react-tooltip'
import { useStore } from '@nanostores/react';

import { showCobEnjoyersState, showCobFriendsState, showHighlightingState, showOthersState } from "../services/controlStore";

//#region Roles
import tank from "../assets/roles/tank.png";
import healer from "../assets/roles/healer.png";
import dps from "../assets/roles/dps.png";
import any from "../assets/roles/any.png";
import tank_healer from "../assets/roles/tank_healer.png";
import tank_dps from "../assets/roles/tank_dps.png";
import healer_dps from "../assets/roles/healer_dps.png";
import dowm from "../assets/roles/dowm.png";
//#endregion

import creator from "../assets/icons/creator.svg";
import remaining from "../assets/icons/remaining.svg";
import updated from "../assets/icons/updated.svg";
import server from "../assets/icons/server.svg";


interface Props { page: number }
let string : string = "Opened";

const dateFilterListings = (listings: PageResponse<PFListing>, knownPFHosts: KnownPFHosts[], showCobEnjoyers: boolean, showCobFriends: boolean, showOthers) : PageResponse<PFListing> => {
  let dateFiltered : PageResponse<PFListing> = { data: [] };

  //Filter out listings older than 10 minutes
  listings.data.forEach(listing => {
    if (listing.updated.includes("minutes") && listing.updated.split(" ")[0] as unknown as number <= 10) {
      dateFiltered.data.push(listing);
    }

    if (!listing.updated.includes("hours") && !listing.updated.includes("hour") && !listing.updated.includes("minutes")) {
      dateFiltered.data.push(listing);
    }
  });

  console.log(knownPFHosts);

  let hostFiltered : PageResponse<PFListing> = { data: [] };
  if (showCobEnjoyers) {
    hostFiltered.data.push(...dateFiltered.data.filter(x => knownPFHosts.filter(x => x.HostType == HostType.CobEnjoyer).map(x => x.Username).includes(x.creator)));
  }

  if (showCobFriends) {
    hostFiltered.data.push(...dateFiltered.data.filter(x => knownPFHosts.filter(x => x.HostType == HostType.CobFriend).map(x => x.Username).includes(x.creator)));
  }

  if (showOthers) {
    hostFiltered.data.push(...dateFiltered.data.filter(x => !knownPFHosts.filter(x => x.HostType == HostType.CobEnjoyer).map(x => x.Username).includes(x.creator) && !knownPFHosts.filter(x => x.HostType == HostType.CobFriend).map(x => x.Username).includes(x.creator)));
  }

  return hostFiltered;
}

const pfComponent = ({ page } : Props) => {
  const [allListings, setAllListings] = useState<PageResponse<PFListing> | null>(null);
  const [listings, setListings] = useState<PageResponse<PFListing> | null>(null);
  const [knownPFHosts, setKnownPFHosts] = useState<KnownPFHosts[]>([]);
  const [lastFetch, setLastFetch] = useState<number>(0);

  const showCobEnjoyers = useStore(showCobEnjoyersState);
  const showCobFriends = useStore(showCobFriendsState);
  const showOthers = useStore(showOthersState); 

  const showHighlighting = useStore(showHighlightingState);

  useEffect(() => {
    fetch(`/api/knownpfhosts`, {
    method: "GET",
    }).then(pfHostsResp => {
      pfHostsResp.json().then((hostsJson: { success: boolean; data: KnownPFHosts[] }) => {
        console.log("Setting known PF Hosts:", hostsJson);
        setKnownPFHosts(hostsJson.data);
      })
    });
  }, [])

  useEffect(() => {
    let curFetchTime = new Date().getTime();

    if (knownPFHosts.length == 0) return;
    if (curFetchTime - lastFetch < 15 * 1000) {
      console.log("Fetched recently, just updating filtering.")
      let dateFilteredListings = dateFilterListings(allListings, knownPFHosts, showCobEnjoyers, showCobFriends, showOthers);
      setListings(dateFilteredListings);
      return;
    };

    console.log("Reloading PF listings...");
    fetch(`/api/getlistings`, {
      method: "GET",
    }).then(x => {
      console.log(x);
      string = "Fetched";
      x.json().then((y: { success: boolean; data: PageResponse<PFListing> }) => {
        string = "Parsed";
        console.log(y.data);

        let dateFilteredListings = dateFilterListings(y.data, knownPFHosts, showCobEnjoyers, showCobFriends, showOthers);

        setLastFetch(curFetchTime);
        setAllListings(y.data);
        setListings(dateFilteredListings);
      })
    }).catch(err => {
      console.log(err?.message ?? err?.error)
    });

    const interval = setInterval(() => {
      console.log("Reloading PF listings...");
      fetch(`/api/getlistings`, {
        method: "GET",
      }).then(x => {
        console.log(x);
        string = "Fetched";
        x.json().then((y: { success: boolean; data: PageResponse<PFListing> }) => {
          string = "Parsed";
          console.log(y.data);

          let dateFilteredListings = dateFilterListings(y.data, knownPFHosts, showCobEnjoyers, showCobFriends, showOthers);

          setLastFetch(curFetchTime);
          setAllListings(y.data);
          setListings(dateFilteredListings);
        })
      }).catch(err => {
        console.log(err?.message ?? err?.error)
      });
    }, 3 * 60 * 1000);
    
    return () => {
      clearInterval(interval);
    }

  }, [knownPFHosts, showCobEnjoyers, showCobFriends, showOthers]);

  return (
    <div className="pf-listings-container">
      {
        listings?.data.map((listing, index) => {
          let isOdd = (index + 1) % 2 !== 0;
          let classString = "";

          if (!isOdd) classString += " highlighted-row";

          let classStringCol = "tag-size";
          if (listing.tags.includes("Completion")) classStringCol += " completion";
          else if (listing.tags.includes("Practice")) classStringCol += " practice";
          else if (listing.tags.includes("Loot")) classStringCol += " loot";
          else classStringCol += " none";

          if (showHighlighting) {
            if (knownPFHosts.filter(x => x.HostType == HostType.CobEnjoyer).map(x => x.Username).includes(listing.creator)) {
              if (!isOdd) classString = "cob-enjoyers-highlight"
              else classString = "cob-enjoyers-base"
            }

            if (knownPFHosts.filter(x => x.HostType == HostType.CobFriend).map(x => x.Username).includes(listing.creator)) {
              if (!isOdd) classString = "cob-friend-highlight"
              else classString = "cob-friend-base"
            }
          }

          return <div key={listing.creator} className={classString}>
            <div className="listing-row">
              <div className="duty-info">
                <h2 className="duty-title">{listing.duty}</h2>
                <h3 className={classStringCol}>{listing.tags}</h3>
                <h3 className="duty-description">{listing.description}</h3>
                <div className="slots">
                  {
                    listing.party.map((slot, slotIndex) => {
                      let a = slot.Roles.Roles as Role[];
                      let iconPath : ImageMetadata;

                      if (!slot.Filled) {
                        if (a.length === 1) {
                          switch (a[0]) {
                            case Role.Tank:
                              iconPath = tank;
                              break;
                            case Role.Healer:
                              iconPath = healer;
                              break;
                            case Role.DPS:
                              iconPath = dps;
                              break;
                            case Role.Any:
                              iconPath = any;
                              break;
                          }
                        }
                        
                        if (a.length === 2) {
                          if (a.includes(Role.Tank) && a.includes(Role.Healer)) {
                            iconPath = tank_healer;
                          }
                          else if (a.includes(Role.Tank) && a.includes(Role.DPS)) {
                            iconPath = tank_dps;
                          }
                          else if (a.includes(Role.Healer) && a.includes(Role.DPS)) {
                            iconPath = healer_dps;
                          }
                        }

                        if (a.length === 3) {
                          iconPath = dowm;
                        }
                      }
                      
                      if (slot.Filled) {
                        iconPath = JobIcons[slot.Job];
                      }

                      return <div key={listing.creator + ":" +slotIndex}>
                        <img className="slot-image" src={iconPath?.src} alt="Icon" />
                      </div>
                    })
                  }
                </div>
              </div>

              <div className="meta-info">
                <span className="icon-row"><h5 className="meta-text">{listing.creator}</h5><img src={creator.src} alt="Creator Icon" data-tooltip-id="creator" data-tooltip-content="Creator" data-tooltip-place="right" className="meta-icon" /></span>
                <Tooltip id="creator" />
                <span className="icon-row"><h5 className="meta-text">{listing.datacenter}</h5><img src={server.src} alt="Server Icon" data-tooltip-id="datacenter" data-tooltip-content="Datacenter" data-tooltip-place="right" className="meta-icon" /></span>
                <Tooltip id="datacenter" />
                <span className="icon-row"><h5 className="meta-text">{listing.expires}</h5><img src={remaining.src} alt="Remaining Icon" data-tooltip-id="expires" data-tooltip-content="Expires" data-tooltip-place="right" className="meta-icon" /></span>
                <Tooltip id="expires" />
                <span className="icon-row"><h5 className="meta-text">{listing.updated}</h5><img src={updated.src} alt="Updated Icon" data-tooltip-id="updated" data-tooltip-content="Updated" data-tooltip-place="right" className="meta-icon" /></span>
                <Tooltip id="updated" />
              </div>
            </div>
          </div>
        })
      }
      { (listings == null || listings?.data.length === 0) && <h2 className="no-listings">No recent listings found. :(<br />Go make one!</h2> }
    </div>
  )
}

export default pfComponent;