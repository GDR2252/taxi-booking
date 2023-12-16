import React from "react";

import "./Testimonials.scss";

const Testimonials = () => {
  return (
    <div className="testimonials-contain">
      <div className="testimonials-main-contain">
        <div className="testimonials-text">Testimonials</div>
        <div className="testimonials">
          <figure className="snip1192">
            <blockquote>
              Calvin: Sometimes when I'm talking with others, my words can't
              keep up with my thoughts. I wonder why we think faster than we
              speak. Hobbes: Probably so we can think twice.{" "}
            </blockquote>
            <div className="author">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample1.jpg"
                alt="sq-sample1"
              />
              <h5>
                Pelican Steve <span> LittleSnippets</span>
              </h5>
            </div>
          </figure>
          <figure className="snip1192 hover">
            <blockquote>
              Thank you. before I begin, I'd like everyone to notice that my
              report is in a professional, clear plastic binder...When a report
              looks this good, you know it'll get an A. That's a tip kids. Write
              it down.
            </blockquote>
            <div className="author">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample24.jpg"
                alt="sq-sample24"
              />
              <h5>
                Max Conversion<span> LittleSnippets</span>
              </h5>
            </div>
          </figure>
          <figure className="snip1192">
            <blockquote>
              My behaviour is addictive functioning in a disease process of
              toxic co-dependency. I need holistic healing and wellness before
              I'll accept any responsibility for my actions.
            </blockquote>
            <div className="author">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample29.jpg"
                alt="sq-sample29"
              />
              <h5>
                Eleanor Faint<span> LittleSnippets</span>
              </h5>
            </div>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
