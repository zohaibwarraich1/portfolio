import { PropsWithChildren, useEffect, useState } from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { FiEye } from "react-icons/fi";
import "./styles/Landing.css";\n\nconst Landing = ({ children }: PropsWithChildren) => {\n  const [visitorCount, setVisitorCount] = useState<number>(0);\n\n  useEffect(() => {\n    const count = parseInt(localStorage.getItem(\"visitorCount\") || \"0\", 10);\n    const visited = sessionStorage.getItem(\"visited\");\n    if (!visited) {\n      const newCount = count + 1;\n      localStorage.setItem(\"visitorCount\", String(newCount));\n      sessionStorage.setItem(\"visited\", \"true\");\n      setVisitorCount(newCount);\n    } else {\n      setVisitorCount(count);\n    }\n  }, []);\n\n  return (
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
        {children}
      </div>
    </>
  );
};

export default Landing;
