import { useState } from "react";
import "./styles/Career.css";

const educationData = [
  {
    title: "Bachelor of Science in Computer Science",
    institution: "National Textile University, Faisalabad",
    year: "2023 - 2027",
    description:
      "Pursuing BSCS with a CGPA of 3.55/4.0. Focused on DevOps, cloud computing, and infrastructure automation alongside core CS fundamentals.",
  },
  {
    title: "DevOps & Cloud Engineering",
    institution: "Self-Directed Learning & Labs",
    year: "NOW",
    description:
      "Building hands-on expertise through real-world projects involving AWS infrastructure, Docker, Kubernetes, Jenkins - CI/CD pipelines, Terraform - Infrastructure as Code, GitOps with ArgoCD, and DevSecOps practices.",
  },
];

const certificationData = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2025",
    description:
      "Achieved AWS Cloud Practitioner certification, validating foundational knowledge of AWS cloud services, architecture, security, and pricing models.",
    badge: "☁️",
  },
];

const Career = () => {
  const [activeTab, setActiveTab] = useState<"education" | "certifications">(
    "education"
  );

  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> Certifications
        </h2>

        <div className="career-tabs">
          <button
            className={`career-tab ${activeTab === "education" ? "career-tab-active" : ""}`}
            onClick={() => setActiveTab("education")}
            data-cursor="disable"
          >
            Education
          </button>
          <button
            className={`career-tab ${activeTab === "certifications" ? "career-tab-active" : ""}`}
            onClick={() => setActiveTab("certifications")}
            data-cursor="disable"
          >
            Certifications
          </button>
        </div>

        <div className="career-tab-content">
          {activeTab === "education" && (
            <div className="career-info">
              <div className="career-timeline">
                <div className="career-dot"></div>
              </div>
              {educationData.map((item, index) => (
                <div className="career-info-box" key={index}>
                  <div className="career-info-in">
                    <div className="career-role">
                      <h4>{item.title}</h4>
                      <h5>{item.institution}</h5>
                    </div>
                    <h3>{item.year}</h3>
                  </div>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "certifications" && (
            <div className="cert-grid">
              {certificationData.map((cert, index) => (
                <div className="cert-card" key={index}>
                  <div className="cert-badge">{cert.badge}</div>
                  <div className="cert-details">
                    <div className="cert-header">
                      <div>
                        <h4>{cert.title}</h4>
                        <h5>{cert.issuer}</h5>
                      </div>
                      <h3>{cert.year}</h3>
                    </div>
                    <p>{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Career;
