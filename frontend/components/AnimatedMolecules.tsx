// frontend/components/AnimatedMolecules.tsx
import React from "react";

const AnimatedMolecules: React.FC = () => (
  <div className="w-full flex justify-center items-center py-8">
    <svg
      viewBox="0 0 420 180"
      width="320"
      height="140"
      className="max-w-[95vw] h-auto"
      style={{ background: "none" }}
    >
      {/* Benzene */}
      <g>
        <g>
          <polygon
            points="40,60 60,40 90,40 110,60 90,80 60,80"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 8; 0 0"
              keyTimes="0; 0.5; 1"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </polygon>
          <line x1="50" y1="50" x2="70" y2="50" stroke="#7c3aed" strokeWidth="1.3" />
          <line x1="80" y1="50" x2="100" y2="65" stroke="#7c3aed" strokeWidth="1.3" />
          <line x1="100" y1="75" x2="80" y2="75" stroke="#7c3aed" strokeWidth="1.3" />
        </g>
        <text x="60" y="100" fontSize="12" fill="#777" fontWeight="bold">Benzene</text>
      </g>
      {/* Methanol */}
      <g>
        <g>
          <circle cx="210" cy="60" r="16" stroke="#06b6d4" strokeWidth="2" fill="none">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 -10; 0 0"
              keyTimes="0; 0.5; 1"
              dur="2.7s"
              repeatCount="indefinite"
            />
          </circle>
          <line x1="210" y1="44" x2="210" y2="24" stroke="#06b6d4" strokeWidth="2" />
          <circle cx="210" cy="22" r="3" fill="#06b6d4" />
          <text x="206" y="72" fontSize="11" fill="#06b6d4" fontWeight="bold">CH₃OH</text>
        </g>
        <text x="190" y="100" fontSize="12" fill="#777" fontWeight="bold">Methanol</text>
      </g>
      {/* Aspirin */}
      <g>
        <g>
          <ellipse
            cx="360"
            cy="70"
            rx="28"
            ry="20"
            fill="none"
            stroke="#6366f1"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 8; 0 0"
              keyTimes="0; 0.5; 1"
              dur="3s"
              repeatCount="indefinite"
            />
          </ellipse>
          <line x1="360" y1="90" x2="380" y2="115" stroke="#6366f1" strokeWidth="2" />
          <circle cx="385" cy="120" r="4" fill="#6366f1" />
          <text x="344" y="60" fontSize="10" fill="#6366f1" fontWeight="bold">COOH</text>
        </g>
        <text x="345" y="105" fontSize="12" fill="#777" fontWeight="bold">Aspirin</text>
      </g>
    </svg>
  </div>
);

export default AnimatedMolecules;
