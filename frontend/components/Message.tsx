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
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`
          rounded-2xl px-4 py-3 shadow
          ${isUser
            ? "bg-cyan-600 text-white rounded-br-md"
            : "bg-neutral-800 text-neutral-100 rounded-bl-md"
          }
          max-w-[92vw] sm:max-w-[80vw] md:max-w-[60%]
          text-base leading-relaxed
          break-words
        `}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code({ inline, className, children, ...props }) {
              return !inline ? (
                <pre className="bg-gray-900 text-white rounded-md p-3 overflow-x-auto">
                  <code>{children}</code>
                </pre>
              ) : (
                <code className="bg-gray-200 rounded px-1 py-0.5">{children}</code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Message;
