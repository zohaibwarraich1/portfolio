import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> Certifications
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor of Science in Computer Science</h4>
                <h5>National Textile University, Faisalabad</h5>
              </div>
              <h3>2023 - 2027</h3>
            </div>
            <p>
              Pursuing BSCS with a CGPA of 3.55/4.0. Focused on DevOps, cloud
              computing, and infrastructure automation alongside core CS
              fundamentals.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AWS Certified Cloud Practitioner</h4>
                <h5>Amazon Web Services</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Achieved AWS Cloud Practitioner certification, validating
              foundational knowledge of AWS cloud services, architecture,
              security, and pricing models.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>DevOps & Cloud Engineering</h4>
                <h5>Self-Directed Learning & Labs</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Building hands-on expertise through real-world projects involving
              AWS infrastructure, Docker, Kubernetes, Jenkins CI/CD pipelines,
              GitOps with ArgoCD, and DevSecOps practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
