  // import { useState } from "react";
  // import { Mic, Send, Menu } from "lucide-react";

  // export default function SyncAI() {
  //   const [message, setMessage] = useState("");
  //   const [screen, setScreen] = useState("chat"); // chat | voice

  //   return (
  //     <div className="min-h-screen bg-black text-white flex flex-col">
  //       {/* Background Glow */}
  //       <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-500/10 to-transparent pointer-events-none" />

  //       {/* Status Bar */}
  //       <header className="relative z-10 flex items-center justify-between px-5 py-4">
  //         <h1 className="text-lg font-semibold tracking-wide">SyncAI</h1>
  //         <Menu className="w-6 h-6 text-white/80" />
  //       </header>

  //       {/* Main Content */}
  //       <main className="relative z-10 flex-1 px-5">
  //         {screen === "chat" ? <ChatScreen /> : <VoiceScreen />}
  //       </main>

  //       {/* Bottom Navigation */}
  //       <footer className="relative z-10 px-4 py-3">
  //         {screen === "chat" ? (
  //           <ChatInput
  //             message={message}
  //             setMessage={setMessage}
  //             onVoice={() => setScreen("voice")}
  //           />
  //         ) : (
  //           <button
  //             onClick={() => setScreen("chat")}
  //             className="w-full py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20"
  //           >
  //             Back to Chat
  //           </button>
  //         )}
  //       </footer>
  //     </div>
  //   );
  // }

  // /* ---------------- Chat Screen ---------------- */

  // function ChatScreen() {
  //   return (
  //     <div className="space-y-6">
  //       {/* Welcome Card */}
  //       <div className="rounded-3xl p-6 bg-white/10 backdrop-blur border border-white/20 shadow-lg">
  //         <h2 className="text-3xl font-light mb-3">
  //           Welcome to <span className="font-semibold">Sync AI</span>
  //         </h2>
  //         <p className="text-white/70">
  //           Your next-generation AI assistant for intelligent conversations.
  //         </p>
  //       </div>

  //       {/* Feature Pills */}
  //       <div className="flex flex-wrap gap-3">
  //         {[
  //           "⚡ Faster response time",
  //           "🚀 Priority access",
  //           "✨ General access to benefits",
  //         ].map((item) => (
  //           <span
  //             key={item}
  //             className="px-4 py-2 rounded-full text-sm bg-white/10 backdrop-blur border border-white/20"
  //           >
  //             {item}
  //           </span>
  //         ))}
  //       </div>

  //       {/* Placeholder Chat Bubble */}
  //       <div className="rounded-2xl p-4 bg-gradient-to-br from-purple-500/20 to-blue-500/10 border border-white/10">
  //         <p className="text-sm text-white/80">
  //           Ask anything about your course material…
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  // /* ---------------- Voice Screen ---------------- */

  // function VoiceScreen() {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
  //       <p className="text-white/70 max-w-sm">
  //         Voice interaction creates a more emotional, natural AI experience.
  //         Speak freely while SyncAI listens and understands.
  //       </p>

  //       {/* Mic Button */}
  //       <div className="relative">
  //         <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-2xl animate-pulse" />
  //         <button className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-xl">
  //           <Mic className="w-10 h-10 text-white" />
  //         </button>
  //       </div>

  //       <p className="text-lg tracking-wide text-white/80">Listening…</p>
  //     </div>
  //   );
  // }

  // /* ---------------- Chat Input ---------------- */

  // function ChatInput({ message, setMessage, onVoice }) {
  //   return (
  //     <div className="flex items-center gap-3 bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-4 py-2">
  //       <button onClick={onVoice}>
  //         <Mic className="w-5 h-5 text-white/70" />
  //       </button>

  //       <input
  //         value={message}
  //         onChange={(e) => setMessage(e.target.value)}
  //         placeholder="Type your question…"
  //         className="flex-1 bg-transparent outline-none text-sm placeholder-white/50"
  //       />

  //       <button className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
  //         <Send className="w-4 h-4 text-white" />
  //       </button>
  //     </div>
  //   );
  // }
