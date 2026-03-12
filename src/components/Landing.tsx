import { PropsWithChildren, useEffect, useState } from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { FiEye } from "react-icons/fi";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    const count = parseInt(localStorage.getItem("visitorCount") || "0", 10);
    const visited = sessionStorage.getItem("visited");
    if (!visited) {
      const newCount = count + 1;
      localStorage.setItem("visitorCount", String(newCount));
      sessionStorage.setItem("visited", "true");
      setVisitorCount(newCount);
    } else {
      setVisitorCount(count);
    }
  }, []);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              MUHAMMAD
              <br />
              ZOHAIB
              <br />
              <span>WARRAICH</span>
            </h1>
            <div className="landing-cta">
              <a
                className="landing-cta-btn"
                href="/resume/DevOps M Zohaib warraich CV.pdf"
                target="_blank"
                data-cursor="disable"
              >
                <HiOutlineDownload /> Download CV
              </a>
              <div className="visitor-counter">
                <FiEye /> <span className="visitor-count">{visitorCount}</span> visits
              </div>
            </div>
          </div>
          <div className="landing-info">
            <h3>A Junior</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">DevOps</div>
              <div className="landing-h2-2">DevOps</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Engineer</div>
              <div className="landing-h2-info-1">Engineer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
