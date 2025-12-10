"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RedButton } from "./red-button";

export interface ShareModalProps {
  children?: React.ReactNode;
  triggerClassName?: string;
}

export function ShareModal({ children, triggerClassName }: ShareModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <button
            className={
              triggerClassName ||
              "fixed bottom-6 right-6 z-50 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm font-medium transition-all hover:scale-105"
            }
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share
            </div>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#0A0A0F]/95 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">Share Your Wrapped</DialogTitle>
          <DialogDescription className="text-white/60">
            Share your 2025 Xeet Wrapped with your followers
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Placeholder for future slide capture */}
          <div className="aspect-square w-full bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
            <div className="text-center text-white/40">
              <svg
                className="w-12 h-12 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm">Slide preview coming soon</p>
            </div>
          </div>

          <div className="flex gap-2">
            <RedButton
              onClick={() => {
                // Placeholder for Twitter share
                console.log("Share to Twitter");
                setOpen(false);
              }}
              className="flex-1"
            >
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Share on Twitter
              </div>
            </RedButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

