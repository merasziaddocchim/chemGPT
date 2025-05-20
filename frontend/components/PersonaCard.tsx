type PersonaCardProps = {
  icon: string;
  title: string;
  desc: string;
};

function PersonaCard({ icon, title, desc }: PersonaCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-7 flex flex-col items-start border hover:shadow-xl transition group min-h-[220px]">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-gray-600 text-base">{desc}</p>
    </div>
  );
}
export default PersonaCard;
