"use client";
import React, { useEffect, useRef } from "react";

const MOL_DATA = `
  Benzene
  OpenAI

  6  6  0  0  0  0            999 V2000
    1.3960    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    0.6980    1.2094    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   -0.6980    1.2094    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   -1.3960    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   -0.6980   -1.2094    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    0.6980   -1.2094    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
  1  2  2  0  0  0  0
  2  3  1  0  0  0  0
  3  4  2  0  0  0  0
  4  5  1  0  0  0  0
  5  6  2  0  0  0  0
  6  1  1  0  0  0  0
M  END
`;

const ThreeDMolViewer: React.FC = () => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import 3Dmol (npm package) for client-side rendering
    import("3dmol").then(($3Dmol) => {
      if (viewerRef.current) {
        viewerRef.current.innerHTML = ""; // Clear previous
        const element = $3Dmol.createViewer(viewerRef.current, {
          backgroundColor: "#fff",
        });
        element.addModel(MOL_DATA, "mol");
        element.setStyle({}, { stick: { radius: 0.17, color: "#9333EA" } });
        element.zoomTo();
        element.animate({ loop: "backAndForth" });
        element.render();
      }
    });
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <div
        ref={viewerRef}
        style={{
          width: "220px",
          height: "220px",
          borderRadius: "16px",
          boxShadow: "0 2px 12px #e9e9f9",
          background: "#fff",
        }}
      />
    </div>
  );
};

export default ThreeDMolViewer;
