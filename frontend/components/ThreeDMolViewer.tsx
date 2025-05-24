// frontend/components/ThreeDMolViewer.tsx

import React, { useEffect, useRef } from "react";

interface ThreeDMolViewerProps {
  // You can pass different molecule data (as a string in SDF, MOL, or PDB format)
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
    // Only run on client
    if (typeof window === "undefined") return;

    // Dynamically load 3Dmol.js if it doesn't exist
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
