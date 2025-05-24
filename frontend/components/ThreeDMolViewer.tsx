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
ATOM      7  H1  BEN A   1       0.000   2.479   0.000  1.00  0.00           H  
ATOM      8  H2  BEN A   1      -2.147   1.240   0.000  1.00  0.00           H  
ATOM      9  H3  BEN A   1      -2.147  -1.240   0.000  1.00  0.00           H  
ATOM     10  H4  BEN A   1       0.000  -2.479   0.000  1.00  0.00           H  
ATOM     11  H5  BEN A   1       2.147  -1.240   0.000  1.00  0.00           H  
ATOM     12  H6  BEN A   1       2.147   1.240   0.000  1.00  0.00           H  
END
`;

const ThreeDMolViewer: React.FC<ThreeDMolViewerProps> = ({ moleculeData }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

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

    if (!(window as any).$3Dmol) {
      const script = document.createElement("script");
      script.src = "/vendor/3Dmol-min.js";
      script.async = true;
      script.onload = () => renderMol();
      document.body.appendChild(script);
      return;
    }
    renderMol();
    // eslint-disable-next-line
  }, [moleculeData]);

  return (
    <div
      ref={viewerRef}
      className="three-dmol-viewer-canvas"
      style={{
        width: "100%",
        maxWidth: 340,
        height: 220,
        borderRadius: "18px",
        border: "1px solid #eee",
        margin: "auto",
        background: "#fafaff",
        boxShadow: "0 4px 24px rgba(110, 70, 255, 0.08)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    />
  );
};

export default ThreeDMolViewer;
