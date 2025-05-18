import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

type MessageProps = {
  role: "user" | "bot";
  content: string;
};

const Message: React.FC<MessageProps> = ({ role, content }) => {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} w-full`}>
      <div
        className={`
          max-w-[80vw] md:max-w-[60%]
          px-4 py-3 rounded-2xl shadow-lg transition-all animate-fadein
          ${isUser
            ? "bg-cyan-600 text-white rounded-br-md"
            : "bg-neutral-800 text-neutral-100 rounded-bl-md"
          }
        `}
        style={{
          wordBreak: "break-word",
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code({ inline, children, ...props }) {
              return !inline ? (
                <pre className="bg-neutral-900 text-white rounded-lg p-3 overflow-x-auto">
                  <code>{children}</code>
                </pre>
              ) : (
                <code className="bg-neutral-200 text-neutral-800 rounded px-1 py-0.5" {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {typeof content === "string" ? content : JSON.stringify(content, null, 2)}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Message;
