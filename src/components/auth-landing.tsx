"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { TerminalGradient } from "@/components/backgrounds";
import { RedButton, MuteButton } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

interface AuthLandingProps {
  onSignIn: () => void;
  username?: string;
  onMusicStart?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

// Terminal log entry type
interface TerminalLog {
  type: "system" | "info" | "success" | "warning" | "data" | "command" | "ascii" | "error";
  text: string;
}

// ASCII art logo
const ASCII_LOGO = `
██╗  ██╗███████╗███████╗████████╗
╚██╗██╔╝██╔════╝██╔════╝╚══██╔══╝
 ╚███╔╝ █████╗  █████╗     ██║   
 ██╔██╗ ██╔══╝  ██╔══╝     ██║   
██╔╝ ██╗███████╗███████╗   ██║   
╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   
`.trim();

// Initial terminal content (before connecting)
const INITIAL_LOGS: TerminalLog[] = [
  { type: "system", text: "Last login: " + new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) },
  { type: "system", text: "" },
  ...ASCII_LOGO.split('\n').map(line => ({ type: "ascii" as const, text: line })),
  { type: "system", text: "" },
  { type: "info", text: "WRAPPED 2025 • YEAR IN REVIEW" },
  { type: "system", text: "────────────────────────────────────" },
  { type: "system", text: "" },
  { type: "data", text: "To begin, authenticate with Twitter:" },
  { type: "system", text: "" },
  { type: "command", text: "$ ./connect --provider twitter" },
];

// The terminal logs that will type out after connecting
const CONNECTION_LOGS: TerminalLog[] = [
  { type: "system", text: "" },
  { type: "info", text: "[oauth] Initializing Twitter OAuth 2.0..." },
  { type: "success", text: "[oauth] ✓ Redirect URI configured" },
  { type: "success", text: "[oauth] ✓ Scopes: tweet.read, users.read, follows.read" },
  { type: "system", text: "" },
  { type: "info", text: "[auth] Authenticating user..." },
  { type: "data", text: "       Waiting for callback..." },
  { type: "success", text: "[auth] ✓ Access token received" },
  { type: "success", text: "[auth] ✓ User verified" },
  { type: "system", text: "" },
  { type: "info", text: "[api] Fetching user data..." },
  { type: "data", text: "      GET /2/users/me" },
  { type: "data", text: "      GET /2/users/:id/tweets" },
  { type: "data", text: "      GET /2/users/:id/following" },
  { type: "success", text: "[api] ✓ 2,847 tweets loaded" },
  { type: "success", text: "[api] ✓ 156 interactions analyzed" },
  { type: "system", text: "" },
  { type: "info", text: "[wrapped] Generating your 2025 Wrapped..." },
  { type: "data", text: "          Processing timeline..." },
  { type: "data", text: "          Calculating statistics..." },
  { type: "data", text: "          Identifying top moments..." },
  { type: "success", text: "[wrapped] ✓ Analysis complete" },
  { type: "system", text: "" },
  { type: "system", text: "────────────────────────────────────" },
  { type: "success", text: "✓ Your Wrapped is ready!" },
  { type: "system", text: "" },
  { type: "command", text: "$ ./begin-wrapped" },
];

// Typing speed in milliseconds per character
const TYPING_SPEED = 12;
// Delay between lines
const LINE_DELAY = 50;

export function AuthLanding({ onSignIn, username = "user", onMusicStart, isMuted = false, onToggleMute }: AuthLandingProps) {
  const [hasConnected, setHasConnected] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [initialTypingDone, setInitialTypingDone] = useState(false);
  const [initialLineIndex, setInitialLineIndex] = useState(0);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const isDev = process.env.NODE_ENV === 'development';

  const handleConnect = useCallback(() => {
    setHasConnected(true);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
  }, []);

  const handleSkip = useCallback(() => {
    // Skip all animations and show final state immediately
    setHasConnected(true);
    setInitialTypingDone(true);
    setIsTypingComplete(true);
    setShowButton(true);
    
    // Set all displayed lines at once
    const allLines = [
      ...INITIAL_LOGS.map(log => log.text),
      ...CONNECTION_LOGS.map(log => log.text),
    ];
    setDisplayedLines(allLines);
    
    // Start music if available
    if (onMusicStart) {
      onMusicStart();
    }
  }, [onMusicStart]);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedLines]);

  // Start music when terminal is loaded and button shows
  useEffect(() => {
    if (showButton && onMusicStart) {
      onMusicStart();
    }
  }, [showButton, onMusicStart]);

  // Initial typing effect (before connect)
  useEffect(() => {
    if (hasConnected || initialTypingDone) return;
    if (initialLineIndex >= INITIAL_LOGS.length) {
      setInitialTypingDone(true);
      return;
    }

    // Type each line instantly but with delay between lines
    const timer = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, INITIAL_LOGS[initialLineIndex].text]);
      setInitialLineIndex((prev) => prev + 1);
    }, initialLineIndex === 0 ? 300 : 50);
    
    return () => clearTimeout(timer);
  }, [hasConnected, initialTypingDone, initialLineIndex]);

  // Connection typing effect
  useEffect(() => {
    if (!hasConnected) return;
    if (currentLineIndex >= CONNECTION_LOGS.length) {
      setIsTypingComplete(true);
      const timer = setTimeout(() => setShowButton(true), 500);
      return () => clearTimeout(timer);
    }

    const currentLog = CONNECTION_LOGS[currentLineIndex];
    const currentText = currentLog.text;

    if (currentCharIndex < currentText.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          const targetIndex = INITIAL_LOGS.length + currentLineIndex;
          if (newLines.length <= targetIndex) {
            newLines.push(currentText.charAt(0));
          } else {
            newLines[targetIndex] = currentText.substring(0, currentCharIndex + 1);
          }
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, TYPING_SPEED);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, LINE_DELAY);
      return () => clearTimeout(timer);
    }
  }, [hasConnected, currentLineIndex, currentCharIndex]);

  const getLogColor = (type: string) => {
    switch (type) {
      case "system":
        return "text-green-500/60";
      case "success":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "error":
        return "text-red-400";
      case "info":
        return "text-cyan-400";
      case "data":
        return "text-white/50";
      case "command":
        return "text-yellow-300";
      case "ascii":
        return "text-red-500";
      default:
        return "text-white";
    }
  };

  const getLogType = (index: number): string => {
    if (index < INITIAL_LOGS.length) {
      return INITIAL_LOGS[index].type;
    }
    return CONNECTION_LOGS[index - INITIAL_LOGS.length]?.type || "system";
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <TerminalGradient />

      {/* CRT overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-4 rounded-3xl"
          style={{
            boxShadow: "inset 0 0 100px rgba(0,0,0,0.5)",
          }}
        />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-3 mb-1 px-4 py-3 bg-gray-900/80 rounded-t-lg border border-green-500/20 border-b-0">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="font-mono text-white/60 text-sm flex-1 text-center">
                {hasConnected ? `${username}@xeet-wrapped` : "guest@xeet-wrapped"} ~ 
              </div>
              <div className="w-[52px]" /> {/* Spacer for centering */}
            </div>

            {/* Terminal content */}
            <div
              ref={terminalRef}
              className={cn(
                "bg-black/80 backdrop-blur-sm rounded-b-lg p-4 md:p-6 border border-green-500/20 border-t-0",
                "shadow-[0_0_30px_rgba(34,197,94,0.1)]",
                "h-[400px] overflow-y-auto scroll-smooth"
              )}
            >
              <div className="space-y-0 font-mono text-xs md:text-sm leading-relaxed">
                {displayedLines.map((line, index) => (
                  <div
                    key={index}
                    className={cn(
                      getLogColor(getLogType(index)),
                      "whitespace-pre",
                      getLogType(index) === "ascii" && "leading-none"
                    )}
                  >
                    {line || "\u00A0"}
                  </div>
                ))}

                {/* Blinking cursor */}
                {!isTypingComplete && (
                  <div className="flex items-center">
                    <span className="text-green-500/60">
                      {initialTypingDone && !hasConnected ? "$ " : ""}
                    </span>
                    <span className="inline-block w-2 h-4 bg-green-400 animate-blink" />
                  </div>
                )}
              </div>
            </div>

            {/* Connect button - shows after initial typing */}
            {initialTypingDone && !hasConnected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 flex flex-col items-center gap-4"
              >
                <RedButton
                  onClick={handleConnect}
                  className="px-8 py-4 text-base font-semibold"
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>Connect with Twitter</span>
                  </div>
                </RedButton>
                <p className="font-mono text-xs text-white/30">
                  Demo mode • No authentication required
                </p>
                {/* Dev-only skip button */}
                {isDev && (
                  <button
                    onClick={handleSkip}
                    className="mt-2 px-4 py-2 text-xs font-mono text-white/40 hover:text-white/60 border border-white/20 hover:border-white/40 rounded transition-colors"
                  >
                    [DEV] Skip Processing
                  </button>
                )}
              </motion.div>
            )}

            {/* Begin button - appears after typing completes */}
            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 flex justify-center"
              >
                <RedButton
                  onClick={onSignIn}
                  className="px-12 py-4 text-lg font-bold"
                >
                  BEGIN X WRAPPED
                </RedButton>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Mute button */}
      {onToggleMute && (
        <MuteButton isMuted={isMuted} onToggle={onToggleMute} />
      )}

      {/* Dev-only skip button (always visible in dev mode) */}
      {isDev && !showButton && (
        <button
          onClick={handleSkip}
          className="fixed top-4 right-4 z-50 px-3 py-1.5 text-xs font-mono text-white/40 hover:text-white/60 bg-black/40 hover:bg-black/60 border border-white/20 hover:border-white/40 rounded transition-colors backdrop-blur-sm"
          title="Skip all processing animations"
        >
          [DEV] Skip
        </button>
      )}
    </div>
  );
}



