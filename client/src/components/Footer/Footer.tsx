import React from "react";

import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer-contain">
      <div className="footer-content">
        <div className="footer-main-content">
          <div>
            <div className="header-logo">Texicog</div>
            <p>
              We provide the best
              <br /> taxi services for you
              <br /> all over the country.
            </p>
            <button className="footer-button">Order Now</button>
          </div>
          <div>
            <div className="footer-title">About</div>
            <ul>
              <li>About</li>
              <li>Help</li>
              <li>Safety</li>
            </ul>
          </div>
          <div>
            <div className="footer-title">Quick Links</div>
            <ul>
              <li>Sign Up</li>
              <li>Login</li>
              <li>Privacy Policy</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <div className="footer-title">Contacts</div>
            <ul>
              <li>Info@demolink.org</li>
              <li>+223 323 2233</li>
              {/* <li>Privacy Policy</li>
              <li>Blog</li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
