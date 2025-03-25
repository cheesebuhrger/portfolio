import React, { useState, useEffect, useCallback } from "react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onPrev,
  onNext,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsVisible(false);
    }, 700);
  }, [onClose]);

  const handleScrimClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          handleClose();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onPrev, onNext, handleClose]);

  if (!isOpen && !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-surface-scrim flex items-end justify-center z-50 transition-opacity duration-300 ${
        isVisible && !isClosing ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleScrimClick}
    >
      <div
        className={`flex flex-col w-full h-[95%] bg-surface-background rounded-t-lg transition-transform duration-700 ease-out ${
          isVisible && !isClosing ? "translate-y-0" : "translate-y-6"
        }`}
      >
        <div className="sticky top-0 flex flex-row justify-between w-full px-6 py-4 border-b border-border-secondary z-10">
          <Button
            label="Close"
            onClick={handleClose}
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
    </div>
  );
};

export default Modal;
