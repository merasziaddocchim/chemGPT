// frontend/components/ThreeDMolViewer.tsx

import React, { useEffect, useRef } from "react";

interface ThreeDMolViewerProps {
  moleculeData?: string;
}

const DEFAULT_PDB = `
ATOM      1  C1  BEN A   1       0.000   1.396   0.000  1.00  0.00           C  
ATOM      2  C2  BEN A   1      -1.209   0.698   0.000  1.00  0.00           C  
ATOM      3  C3  BEN A   1      -1.209  -0.698   0.000  1.00  0.00           C  
ATOM      4  C4  BEN A   1       0.000  -1.396   0.000  1.00  0.00           C  
ATOM      5  C5  BEN A   1       1.209  -0.698   0.000  1.00  0.00           C  
ATOM      6  C6  BEN A   1       1.209   0.698   0.000  1.00  0.00           C  
END
`;

const ThreeDMolViewer: React.FC<ThreeDMolViewerProps> = ({ moleculeData }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!(window as any).$3Dmol) {
      const script = document.createElement("script");
      script.src = "/vendor/3Dmol-min.js";
      script.async = true;
      script.onload = () => renderMol();
      document.body.appendChild(script);
      return;
    }
    renderMol();

    function renderMol() {
      if (viewerRef.current && (window as any).$3Dmol) {
        viewerRef.current.innerHTML = "";
        const $3Dmol = (window as any).$3Dmol;
        const element = $3Dmol.createViewer(viewerRef.current, {
          backgroundColor: "white",
        });
        element.addModel(moleculeData || DEFAULT_PDB, "pdb");
        element.setStyle({}, { stick: {}, sphere: { scale: 0.25 } });
        element.zoomTo();
        element.render();
      }
    }
    // eslint-disable-next-line
  }, [moleculeData]);

  return (
    <div
      ref={viewerRef}
      style={{
        width: "400px",
        height: "320px",
        borderRadius: "18px",
        border: "1px solid #eee",
        margin: "auto",
        background: "#fafaff",
        boxShadow: "0 4px 24px rgba(110, 70, 255, 0.08)"
      }}
    />
  );
};

export default ThreeDMolViewer;
