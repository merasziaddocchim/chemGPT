// frontend/components/SpectroscopyResult.jsx
import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Line } from "react-chartjs-2";

// Extract IR table section from markdown
function extractIRTable(markdown) {
  const irSection = markdown.split("Infrared (IR) Spectrum Table")[1];
  if (!irSection) return null;
  const lines = irSection.split("\n").filter(l => l.includes("|"));
  if (lines.length < 2) return null;
  return lines[1].includes("---") ? [lines[0], ...lines.slice(2)] : lines;
}

// Parse IR table for chart data
function parseIRTable(irTableLines) {
  if (!irTableLines || irTableLines.length < 2) return null;
  const header = irTableLines[0].split("|").map(h => h.trim()).filter(Boolean);
  const rows = irTableLines.slice(1).map(row =>
    row.split("|").map(cell => cell.trim()).filter(Boolean)
  );

  const wavIdx = header.findIndex(h => h.toLowerCase().includes("wavenumber"));
  const intIdx = header.findIndex(h => h.toLowerCase().includes("intens"));

  if (wavIdx === -1 || intIdx === -1) return null;

  const data = rows.map(cells => {
    const wn = parseFloat(cells[wavIdx]);
    let y = 1;
    if (cells[intIdx].toLowerCase().includes("strong")) y = 3;
    else if (cells[intIdx].toLowerCase().includes("medium")) y = 2;
    else if (cells[intIdx].toLowerCase().includes("weak")) y = 1;
    else if (cells[intIdx].toLowerCase().includes("broad")) y = 2;
    return !isNaN(wn) ? { wn, y } : null;
  }).filter(Boolean);

  return data;
}

export default function SpectroscopyResult({ spectraMarkdown }) {
  const irTableLines = useMemo(() => extractIRTable(spectraMarkdown), [spectraMarkdown]);
  const irPlotData = useMemo(() => {
    const data = parseIRTable(irTableLines);
    if (!data) return null;
    return {
      labels: data.map(d => d.wn),
      datasets: [
        {
          label: "IR Intensity (arbitrary units)",
          data: data.map(d => d.y),
          borderWidth: 2,
          tension: 0.2,
        },
      ],
    };
  }, [irTableLines]);

  return (
    <div className="max-w-2xl mx-auto my-8">
      <h2 className="text-xl font-bold mb-4">Spectral Analysis</h2>
      {/* Render markdown (tables, explanations, etc) */}
      <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
        {spectraMarkdown}
      </ReactMarkdown>
      {/* Plot IR spectrum */}
      {irPlotData && (
        <div className="my-8">
          <h3 className="text-lg font-semibold mb-2">IR Spectrum (cm⁻¹ vs. intensity)</h3>
          <Line
            data={irPlotData}
            options={{
              scales: {
                x: { title: { display: true, text: "Wavenumber (cm⁻¹)" }, reverse: true },
                y: { title: { display: true, text: "Intensity" }, ticks: { stepSize: 1, max: 3, min: 0 } },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
