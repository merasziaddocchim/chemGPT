type FeatureCardProps = {
  icon: string;
  title: string;
  desc: string;
  soon?: boolean;
};

export default function FeatureCard({ icon, title, desc, soon }: FeatureCardProps) {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg p-7 flex flex-col items-start border hover:shadow-xl transition group">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-gray-600 text-base mb-1">{desc}</p>
      {soon && (
        <span className="absolute top-4 right-4 bg-yellow-200 text-yellow-900 px-2 py-1 text-xs rounded-full font-bold">
          Coming Soon
        </span>
      )}
    </div>
  );
}
