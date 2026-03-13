import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { getCachedPerformanceSettings } from "../utils/performance";

const perfSettings = getCachedPerformanceSettings();

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "/images/aws.webp",
  "/images/docker.webp",
  "/images/kubernetes.webp",
  "/images/jenkins.webp",
  "/images/terraform.webp",
  "/images/argocd.webp",
  "/images/prometheus.webp",
  "/images/grafana.webp",
  "/images/linux.webp",
  "/images/bash-scripting.webp",
  "/images/git.webp",
  "/images/nginx.webp"
];
const textures = imageUrls.map((url) => textureLoader.load(url));

// Optimized sphere geometry based on device performance
const sphereGeometry = new THREE.SphereGeometry(1, perfSettings.sphereSegments, perfSettings.sphereSegments);

const spheres = imageUrls.map(() => ({
  scale: [0.8, 1, 0.9, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame(({ invalidate }, delta) => {
    if (!isActive) return;
    invalidate(); // Request next frame for demand mode
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport, invalidate }) => {
    if (!isActive) return;
    invalidate(); // Request next frame for demand mode
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  const [activeTab, setActiveTab] = useState<"interactive" | "grid">("interactive");

  const techList = [
    { name: "AWS", image: "/images/aws-logo.webp" },
    { name: "Docker", image: "/images/docker-logo.webp" },
    { name: "Kubernetes", image: "/images/kubernetes-logo.png" },
    { name: "Jenkins", image: "/images/jenkins-logo.png" },
    { name: "Terraform", image: "/images/terraform-logo.webp" },
    { name: "ArgoCD", image: "/images/argocd-logo.webp" },
    { name: "Prometheus", image: "/images/prometheus-logo.png" },
    { name: "Grafana", image: "/images/grafana-logo.png" },
    { name: "Linux", image: "/images/linux-logo.png" },
    { name: "Bash", image: "/images/bash-logo.png" },
    { name: "Git", image: "/images/git-logo.png" },
    { name: "Nginx", image: "/images/nginx-logo.png" },
  ];

  return (
    <div className="techstack" id="techstack">
      <h2>My Techstack</h2>

      <div className="techstack-content-wrapper">
        <div className="career-tabs" style={{ marginBottom: "40px" }}>
          <button
            className={`career-tab ${activeTab === "interactive" ? "career-tab-active" : ""}`}
            onClick={() => setActiveTab("interactive")}
            data-cursor="disable"
          >
            Interactive Globe
          </button>
          <button
            className={`career-tab ${activeTab === "grid" ? "career-tab-active" : ""}`}
            onClick={() => setActiveTab("grid")}
            data-cursor="disable"
          >
            Technology Grid
          </button>
        </div>

        <div style={{ display: activeTab === "interactive" ? "block" : "none", width: "100%", flex: 1, minHeight: 0 }}>
          {perfSettings.enablePhysics ? (
          <Canvas
            shadows
            gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
            camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
            onCreated={(state) => {
              state.gl.toneMappingExposure = 1.5;
              state.gl.setPixelRatio(perfSettings.pixelRatio);
            }}
            className="tech-canvas"
            frameloop="demand"
          >
            <ambientLight intensity={1} />
            <spotLight
              position={[20, 20, 25]}
              penumbra={1}
              angle={0.2}
              color="white"
              castShadow
              shadow-mapSize={[perfSettings.shadowMapSize, perfSettings.shadowMapSize]}
            />
            <directionalLight position={[0, 5, -4]} intensity={2} />
            <Physics gravity={[0, 0, 0]}>
              <Pointer isActive={isActive && activeTab === "interactive"} />
              {spheres.map((props, i) => (
                <SphereGeo
                  key={i}
                  {...props}
                  material={materials[i]}
                  isActive={isActive && activeTab === "interactive"}
                />
              ))}
            </Physics>
            <Environment
              files="/models/char_enviorment.hdr"
              environmentIntensity={0.5}
              environmentRotation={[0, 4, 2]}
            />
            {perfSettings.enablePostProcessing && (
              <EffectComposer enableNormalPass={false}>
                <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
              </EffectComposer>
            )}
          </Canvas>
          ) : (
            <div className="tech-grid-view" style={{ display: "flex" }}>
              {techList.map((tech, index) => (
                <div className="tech-card" key={index}>
                  <div className="tech-icon-wrapper">
                    <img src={tech.image} alt={tech.name} loading="lazy" />
                  </div>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: activeTab === "grid" ? "flex" : "none" }} className="tech-grid-view">
          {techList.map((tech, index) => (
            <div className="tech-card" key={index}>
              <div className="tech-icon-wrapper">
                <img src={tech.image} alt={tech.name} loading="lazy" />
              </div>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
