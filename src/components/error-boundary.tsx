"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { GlassPanel, RedButton } from "./ui";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary component that catches JavaScript errors anywhere in the child
 * component tree and displays a fallback UI instead of crashing the whole app.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }
    // In production, you could log to an error reporting service here
  }

  handleReset = () => {
    // Reset error state and try to recover
    this.setState({ hasError: false, error: undefined });
  };

  handleReload = () => {
    // Full page reload as last resort
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI matching design system
      return (
        <div className="fixed inset-0 bg-background flex items-center justify-center p-8">
          {/* Background effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute inset-0 animate-pulse-slower"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(255, 0, 51, 0.15), transparent 70%)",
              }}
            />
          </div>

          {/* Error content */}
          <div className="relative z-10 w-full max-w-2xl">
            <GlassPanel elevation="medium" glow className="p-8 md:p-12">
              <div className="text-center space-y-6">
                {/* Error icon */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-red-primary/10 border-2 border-red-primary/30 flex items-center justify-center">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-red-primary"
                    >
                      <path
                        d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Error heading */}
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold headline-condensed text-white">
                    Something went wrong
                  </h1>
                  <p className="text-lg text-white/60">
                    We encountered an unexpected error while loading your wrapped
                  </p>
                </div>

                {/* Error details (development only) */}
                {process.env.NODE_ENV === "development" && this.state.error && (
                  <div className="mt-6 p-4 rounded-lg bg-black/40 border border-white/10 text-left">
                    <p className="mono-caption text-red-primary mb-2">
                      Development Error Details
                    </p>
                    <p className="text-xs font-mono text-white/70 break-all">
                      {this.state.error.message}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <RedButton
                    variant="solid"
                    onClick={this.handleReset}
                    className="min-w-[140px]"
                  >
                    Try Again
                  </RedButton>
                  <RedButton
                    variant="outline"
                    onClick={this.handleReload}
                    className="min-w-[140px]"
                  >
                    Reload Page
                  </RedButton>
                </div>

                {/* Help text */}
                <p className="text-sm text-white/40 pt-4">
                  If the problem persists, try refreshing your browser
                </p>
              </div>
            </GlassPanel>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}



