import "./styles/Skills.css";

const skillCategories = [
  {
    title: "Cloud & Infrastructure",
    skills: ["AWS (EC2, VPC, ALB, Auto Scaling, etc)", "Terraform", "Nginx"],
  },
  {
    title: "Containerization & Orchestration",
    skills: ["Docker", "Kubernetes", "Helm", "Container Security"],
  },
  {
    title: "CI/CD & GitOps",
    skills: ["Jenkins", "Argo CD", "Git", "GitOps Workflows"],
  },
  {
    title: "Security (DevSecOps)",
    skills: ["Trivy", "SonarQube", "OWASP Dependency Check", "External Secrets"],
  },
  {
    title: "Scripting & OS",
    skills: ["Linux", "Bash / Shell Scripting", "YAML"],
  },
];

const Skills = () => {
  return (
    <div className="skills-section section-container" id="skills">
      <h2>
        My <span>&</span> Skills
      </h2>
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div className="skill-category" key={index}>
            <h3>{category.title}</h3>
            <div className="skill-tags">
              {category.skills.map((skill, idx) => (
                <div className="skill-tag" key={idx}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
