import { useEffect, useState } from "react";
import { JobIcons, Role, type PageResponse, type PFListing } from "../types/pfListings";
import { set } from "astro:schema";

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

interface Props { page: number }
let string : string = "Opened";

const reloadTable = (setListings : React.Dispatch<React.SetStateAction<PageResponse<PFListing>>>) => {
  fetch(`http://api.miyei.me:7050/listings/ucob`, {
    method: "GET",
  }).then(x => {
    console.log(x);
    string = "Fetched";
    x.json().then(y => {
      string = "Parsed";
      console.log(y);
      setListings(filterListings(y));
    })
  }).catch(err => {
    console.log(err?.message ?? err?.error)
  });
}

const filterListings = (listings: PageResponse<PFListing>) : PageResponse<PFListing> => {
  let filtered : PageResponse<PFListing> = { data: [] };
  listings.data.forEach(listing => {
    if (listing.updated.includes("minutes") && listing.updated.split(" ")[0] as unknown as number <= 10) {
      filtered.data.push(listing);
    }

    if (!listing.updated.includes("hours") && !listing.updated.includes("minutes")) {
      filtered.data.push(listing);
    }
  });

  return filtered;
}

const pfComponent = ({ page } : Props) => {
  const [listings, setListings] = useState<PageResponse<PFListing> | null>(null);
  const [domLoaded, setDomLoaded] = useState(false);
  const [stringState, setStringState] = useState(string);

  useEffect(() => {
    try {
      setStringState("Loading");
      setDomLoaded(true);
      reloadTable(setListings);
    } catch (ex: unknown) {
      if (ex instanceof Error) {
        console.log(ex.message)
      }
    }
  }, []);

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
                <h5 className="">{listing.creator}</h5>
                <h5 className="">{listing.datacenter}</h5>
                <h5 className="">{listing.expires}</h5>
                <h5 className="">{listing.updated}</h5>
              </div>
            </div>
          </div>
        })
      }
      { domLoaded && (listings == null || listings?.data.length === 0) && <h2 className="no-listings">No recent listings found. :(<br />Go make one!</h2> }
    </div>
  )
}

export default pfComponent;