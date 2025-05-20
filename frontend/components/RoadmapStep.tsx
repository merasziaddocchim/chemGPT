type RoadmapStepProps = {
  date: string;
  phase: string;
  title: string;
  desc: string;
  complete?: boolean;
};

function RoadmapStep({ date, phase, title, desc, complete }: RoadmapStepProps) {
  return (
    <div className="flex items-start mb-10 relative z-10">
      <div className="flex flex-col items-center mr-6">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center
          ${complete ? "bg-green-400 text-white border-2 border-green-600" : "bg-white border-2 border-violet-400 text-violet-700"}
          font-bold shadow`}>
          {complete ? "✓" : "•"}
        </div>
        {/* Vertical connector */}
        <div className="flex-1 w-px bg-violet-100" />
      </div>
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-violet-500">{phase}</span>
        <h3 className="text-lg md:text-xl font-bold mt-1 mb-1">{title}</h3>
        <div className="text-gray-600 text-base mb-1">{desc}</div>
        <span className="text-sm text-gray-400">{date}</span>
      </div>
    </div>
  );
}
export default RoadmapStep;
