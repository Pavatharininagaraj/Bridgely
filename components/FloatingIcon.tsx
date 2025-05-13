import { BotIcon } from "lucide-react";

export default function FloatingAppIcon() {
  return (
    <a href="https://jarvis-u2w6.vercel.app/"// 🔁 Replace with your actual chatbot URL
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-xl transition-transform transform group-hover:scale-110">
        <BotIcon size={30} />
      </div>
      <span className="absolute bottom-16 right-0 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs rounded px-2 py-1">
        Jarvis
      </span>
    </a>
  );
}
