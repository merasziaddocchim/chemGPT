import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
  spectraMarkdown: string;
};

// Extract a table section from markdown after a given heading
function extractTable(markdown: string, heading: string): string[] | null {
  const section = markdown.split(heading)[1];
  if (!section) return null;
  const lines = section.split("\n").filter(l => l.includes("|"));
  if (lines.length < 2) return null;
  // Some LLM markdown tables have "---" separator after header
  return lines[1].includes("---") ? [lines[0], ...lines.slice(2)] : lines;
}

// Generic parser for tables
function parseTable(
  tableLines: string[] | null,
  xHeaderMatch: (header: string) => boolean,
  yHeaderMatch: (header: string) => boolean,
  yTransform?: (val: string) => number
) {
  if (!tableLines || tableLines.length < 2) return null;
  const header = tableLines[0].split("|").map(h => h.trim().toLowerCase()).filter(Boolean);
  const rows = tableLines.slice(1).map(row =>
    row.split("|").map(cell => cell.trim()).filter(Boolean)
  );
  const xIdx = header.findIndex(xHeaderMatch);
  const yIdx = header.findIndex(yHeaderMatch);
  if (xIdx === -1 || yIdx === -1) return null;

  const data = rows.map(cells => {
    const x = parseFloat(cells[xIdx]);
    let y: number;
    if (yTransform) y = yTransform(cells[yIdx]);
    else y = parseFloat(cells[yIdx]);
    return !isNaN(x) && !isNaN(y) ? { x, y } : null;
  }).filter(Boolean);
  return data;
}


// Intensity transform for IR/UV tables (simple logic)
function intensityToY(val: string): number {
  const lower = val.toLowerCase();
  if (lower.includes("strong")) return 3;
  if (lower.includes("medium")) return 2;
  if (lower.includes("weak")) return 1;
  if (lower.includes("broad")) return 2;
  return 1;
}

const SpectroscopyResult: React.FC<Props> = ({ spectraMarkdown }) => {
  // IR Table & Data
  const irTableLines = useMemo(() => extractTable(spectraMarkdown, "Infrared (IR) Spectrum Table"), [spectraMarkdown]);
  const irData = useMemo(
    () =>
      parseTable(
        irTableLines,
        h => h.includes("wavenumber"),
        h => h.includes("intens"),
        intensityToY
      ),
    [irTableLines]
  );

  // UV Table & Data
  const uvTableLines = useMemo(() => extractTable(spectraMarkdown, "UV-Visible (UV-Vis) Spectrum Table"), [spectraMarkdown]);
  const uvData = useMemo(
    () =>
      parseTable(
        uvTableLines,
        h => h.includes("wavelength"),
        h => h.includes("intens"),
        intensityToY
      ),
    [uvTableLines]
  );

  // Chart.js IR plot config
  const irPlotData = irData && {
    labels: irData.map(d => d.x),
    datasets: [
      {
        label: "IR Intensity",
        data: irData.map(d => d.y),
        borderWidth: 2,
        tension: 0.2,
      },
    ],
  };

  // Chart.js UV-Vis plot config
  const uvPlotData = uvData && {
    labels: uvData.map(d => d.x),
    datasets: [
      {
        label: "UV-Vis Intensity",
        data: uvData.map(d => d.y),
        borderWidth: 2,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-4 rounded-2xl bg-white/60 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Spectral Analysis</h2>
      <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
        {spectraMarkdown}
      </ReactMarkdown>

      {/* IR Spectrum Plot */}
      {irPlotData && (
        <div className="my-8">
          <h3 className="text-lg font-semibold mb-2">IR Spectrum (cm⁻¹ vs. Intensity)</h3>
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

      {/* UV-Vis Spectrum Plot */}
      {uvPlotData && (
        <div className="my-8">
          <h3 className="text-lg font-semibold mb-2">UV-Vis Spectrum (nm vs. Intensity)</h3>
          <Line
            data={uvPlotData}
            options={{
              scales: {
                x: { title: { display: true, text: "Wavelength (nm)" } },
                y: { title: { display: true, text: "Intensity" }, ticks: { stepSize: 1, max: 3, min: 0 } },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SpectroscopyResult;
