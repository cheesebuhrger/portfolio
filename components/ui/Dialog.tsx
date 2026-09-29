"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import Button from "./Button";

const CLOSE_DURATION_MS = 700; // matches the panel's duration-700 slide

type DialogProps = {
  open: boolean;
  /** Called once the close animation has finished. */
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  /** Accessible name, e.g. the current item's title. */
  label?: string;
  /**
   * Marks a dialog that has its own URL (an intercepted route). Page-level
   * scroll handling leaves the page behind it alone.
   */
  routeOverlay?: boolean;
  children: React.ReactNode;
};

/**
 * Bottom-sheet dialog with Close / Previous / Next controls.
 *
 * Built on the native <dialog> (showModal): the browser traps focus, makes
 * the page behind inert, handles Escape and restores focus on close.
 * While open, smooth scrolling is stopped (which also locks page scroll via
 * .lenis-stopped), and data-lenis-prevent lets the sheet scroll natively.
 */
export default function Dialog({
  open,
  onClose,
  onPrev,
  onNext,
  label,
  routeOverlay = false,
  children,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  // Drives the enter/exit transition; flipped a frame after opening so the
  // browser paints the start state first.
  const [shown, setShown] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const lenis = useLenis();

  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    if (!dialog.open) dialog.showModal();
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, [open]);

  // Lock the page behind the dialog while it's open.
  useEffect(() => {
    if (!open || !lenis) return;
    lenis.stop();
    return () => lenis.start();
  }, [open, lenis]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const requestClose = useCallback(() => {
    setShown(false);
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      ref.current?.close();
      onClose();
    }, CLOSE_DURATION_MS);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      data-lenis-prevent
      data-route-overlay={routeOverlay || undefined}
      onCancel={(e) => {
        // Escape: animate out instead of closing instantly.
        e.preventDefault();
        requestClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") onPrev();
        if (e.key === "ArrowRight") onNext();
      }}
      onClick={(e) => {
        // Clicks on the scrim (the dialog itself, not the sheet) close it.
        if (e.target === e.currentTarget) requestClose();
      }}
      className={`fixed inset-0 w-full h-full max-w-none max-h-none m-0 p-0 border-0 overflow-hidden text-inherit bg-surface-scrim backdrop:bg-transparent open:flex items-end justify-center z-50 transition-opacity duration-300 ${
        shown ? "opacity-100" : "opacity-0"
      }`}
    >
      {open && (
        <div
          className={`flex flex-col w-full h-[95%] bg-surface-background rounded-t-lg transition-transform duration-700 ease-out ${
            shown ? "translate-y-0" : "translate-y-6"
          }`}
        >
          <div className="sticky top-0 flex flex-row justify-between w-full px-6 py-4 border-b border-border-secondary z-10">
            <Button
              label="Close"
              onClick={requestClose}
              size="small"
              variant="secondary"
            />
            <div className="flex gap-4 text-xs">
              <Button
                label="Previous"
                onClick={onPrev}
                size="small"
                variant="secondary"
              />
              <Button
                label="Next"
                onClick={onNext}
                size="small"
                variant="secondary"
              />
            </div>
          </div>
          <div className="flex-grow overflow-y-auto">{children}</div>
        </div>
      )}
    </dialog>
  );
}
