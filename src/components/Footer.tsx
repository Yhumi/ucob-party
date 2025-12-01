import { useStore } from "@nanostores/react";
import { useEffect } from "react";

const FooterComponent = () => {
  return (
    <div className="footer-panel-container">
      <span className="footer-text">Listings automatically refresh every 3 minutes.</span>
      <span className="footer-text">Created by Yhumi Miyei @ Midgardsormr | Shows NA PF only.</span>
    </div>
  )
}

export default FooterComponent;