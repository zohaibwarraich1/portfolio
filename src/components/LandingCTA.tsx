import { useEffect, useState } from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { FiEye } from "react-icons/fi";

const LandingCTA = () => {
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
    <div className="landing-cta">
      <a
        className="landing-cta-btn"
        href="/resume/DevOps%20M%20Zohaib%20warraich%20CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="disable"
      >
        <HiOutlineDownload /> Download CV
      </a>
      <div className="visitor-counter">
        <FiEye /> <span className="visitor-count">{visitorCount}</span> visits
      </div>
    </div>
  );
};

export default LandingCTA;
