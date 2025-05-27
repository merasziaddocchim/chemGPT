"use client";
import React from "react";
import dynamic from "next/dynamic";

// ✅ Safe dynamic import (no typing of the import itself)
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface UVPeak {
  wavelength: number;
  intensity: string;
  type: string;
}

interface IRPeak {
  wavenumber: number;
  intensity: string;
  assignment: string;
}

interface SpectroPlotProps {
  uv?: UVPeak[];
  ir?: IRPeak[];
}

const SpectroPlot: React.FC<SpectroPlotProps> = ({ uv = [], ir = [] }) => {
  const uvX = uv.map(p => p.wavelength);
  const uvY = uv.map(p =>
    p.intensity === "strong" ? 1.0 : p.intensity === "medium" ? 0.6 : 0.3
  );

  const irX = ir.map(p => p.wavenumber);
  const irY = ir.map(p =>
    p.intensity === "strong" ? 1.0 : p.intensity === "medium" ? 0.6 : 0.3
  );

  return (
    <div className="my-4">
      {uv.length > 0 && (
        <Plot
          {...{
            data: [{
              x: uvX,
              y: uvY,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "blue" },
              name: "UV Absorbance"
            }],
            layout: {
              title: "📈 UV Spectrum",
              xaxis: { title: "Wavelength (nm)" },
              yaxis: { title: "Relative Intensity" },
              height: 300
            },
            config: { responsive: true }
          } as any}
        />
      )}

      {ir.length > 0 && (
        <Plot
          {...{
            data: [{
              x: irX,
              y: irY,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
              name: "IR Absorbance"
            }],
            layout: {
              title: "🔬 IR Spectrum",
              xaxis: { title: "Wavenumber (cm⁻¹)", autorange: "reversed" },
              yaxis: { title: "Relative Absorbance" },
              height: 300
            },
            config: { responsive: true }
          } as any}
        />
      )}
    </div>
  );
};

export default SpectroPlot;
