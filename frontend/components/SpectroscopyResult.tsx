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

function extractTable(markdown: string, heading: string): string[] | null {
  const section = markdown.split(heading)[1];
  if (!section) return null;
  const lines = section.split("\n").filter(l => l.includes("|"));
  if (lines.length < 2) return null;
  return lines[1].includes("---") ? [lines[0], ...lines.slice(2)] : lines;
}

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

function intensityToY(val: string): number {
  const lower = val.toLowerCase();
  if (lower.includes("strong")) return 3;
  if (lower.includes("medium")) return 2;
  if (lower.includes("weak")) return 1;
  if (lower.includes("broad")) return 2;
  return 1;
}

const SpectroscopyResult: React.FC<Props> = ({ spectraMarkdown }) => {
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

  const irPlotData = irData && {
    labels: irData.map(d => d.x),
    datasets: [
      {
        label: "IR Intensity",
        data: irData.map(d => d.y),
        borderWidth: 2,
        tension: 0.2,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 7,
      },
    ],
  };

  const uvPlotData = uvData && {
    labels: uvData.map(d => d.x),
    datasets: [
      {
        label: "UV-Vis Intensity",
        data: uvData.map(d => d.y),
        borderWidth: 2,
        tension: 0.2,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 7,
      },
    ],
  };

  // Animation config for fade-in (Tailwind + framer-motion is best, but basic CSS included)
  // For extra polish, wrap div with motion.div and use fade-in

  return (
    <div className="max-w-2xl mx-auto my-12 p-6 rounded-2xl bg-white/70 shadow-2xl border border-indigo-100 backdrop-blur-lg transition-all duration-500 hover:shadow-3xl">
      <h2 className="text-2xl font-extrabold mb-6 text-indigo-700 flex items-center gap-2">
        <span role="img" aria-label="spectra">🔬</span>
        Spectral Analysis
      </h2>

      {/* Render markdown (tables, explanations, etc) */}
      <div className="prose prose-indigo prose-lg bg-white/20 rounded-xl p-4 shadow mb-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {spectraMarkdown}
        </ReactMarkdown>
      </div>

      {/* IR Spectrum Plot */}
      {irPlotData && (
        <div className="my-8 px-2 py-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-inner transition-transform hover:scale-[1.015]">
          <h3 className="text-lg font-bold text-indigo-600 mb-4 flex items-center gap-2">
            <span role="img" aria-label="IR">🌈</span>
            IR Spectrum <span className="text-xs text-gray-400">(cm⁻¹ vs. intensity)</span>
          </h3>
          <Line
            data={irPlotData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true, position: "top" as const },
                title: { display: false }
              },
              scales: {
                x: {
                  title: { display: true, text: "Wavenumber (cm⁻¹)" },
                  reverse: true,
                  grid: { color: "#ddd" }
                },
                y: {
                  title: { display: true, text: "Intensity" },
                  min: 0,
                  max: 3,
                  ticks: { stepSize: 1 },
                  grid: { color: "#eee" }
                }
              }
            }}
          />
        </div>
      )}

      {/* UV-Vis Spectrum Plot */}
      {uvPlotData && (
        <div className="my-8 px-2 py-6 bg-gradient-to-br from-pink-50 to-white rounded-xl shadow-inner transition-transform hover:scale-[1.015]">
          <h3 className="text-lg font-bold text-pink-600 mb-4 flex items-center gap-2">
            <span role="img" aria-label="UV-Vis">☀️</span>
            UV-Vis Spectrum <span className="text-xs text-gray-400">(nm vs. intensity)</span>
          </h3>
          <Line
            data={uvPlotData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true, position: "top" as const },
                title: { display: false }
              },
              scales: {
                x: {
                  title: { display: true, text: "Wavelength (nm)" },
                  grid: { color: "#ddd" }
                },
                y: {
                  title: { display: true, text: "Intensity" },
                  min: 0,
                  max: 3,
                  ticks: { stepSize: 1 },
                  grid: { color: "#eee" }
                }
              }
            }}
          />
        </div>
      )}

      {/* Suggestions for further improvement: */}
      {/* - Add export buttons for PNG/SVG */}
      {/* - Tooltip customization for chemical context */}
      {/* - Mini legend for intensity scale */}
    </div>
  );
};

export default SpectroscopyResult;
