type CommunityCardProps = {
  icon: string;
  title: string;
  desc: string;
  link: string;
  linkText: string;
};

function CommunityCard({ icon, title, desc, link, linkText }: CommunityCardProps) {
  return (
    <div className="bg-slate-50 border rounded-2xl shadow p-8 flex flex-col items-start hover:shadow-lg transition">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{desc}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-5 py-2 bg-violet-600 text-white rounded-lg font-bold hover:bg-violet-700 transition"
      >
        {linkText}
      </a>
    </div>
  );
}

export default CommunityCard;
