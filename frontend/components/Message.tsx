import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

type MessageProps = {
  role: "user" | "bot";
  content: string | { answer?: string };
};

const Message: React.FC<MessageProps> = ({ role, content }) => {
  // Normalize content
  let safeContent = "";
  if (typeof content === "object" && content !== null && "answer" in content) {
    safeContent = content.answer || "";
  } else if (typeof content === "string") {
    safeContent = content;
  } else {
    safeContent = JSON.stringify(content, null, 2);
  }

  return (
    <div
      style={{
        background: role === "user" ? "#cce3ff" : "#f0f0f0",
        color: role === "user" ? "#08335c" : "#111",
        borderRadius: 14,
        padding: "14px 18px",
        margin: "12px 0",
        maxWidth: "85%",
        alignSelf: role === "user" ? "flex-end" : "flex-start",
        fontSize: 16,
        boxShadow:
          role === "user"
            ? "0 2px 8px rgba(80,160,255,0.10)"
            : "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ inline, className, children, ...props }) {
            return !inline ? (
              <pre
                className="bg-gray-900 text-white rounded-md p-3 overflow-x-auto"
                {...props}
              >
                <code>{children}</code>
              </pre>
            ) : (
              <code className="bg-gray-200 rounded px-1 py-0.5" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {safeContent}
      </ReactMarkdown>
    </div>
  );
};

export default Message;
