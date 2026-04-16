import { useEffect, type ReactNode } from 'react';
import styles from './FullscreenOverlay.module.scss';

export interface FullscreenOverlayProps {
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
  contentClassName?: string;
}

const FullscreenOverlay = ({ open, children, onClose, contentClassName }: FullscreenOverlayProps) => {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className={styles.fullscreenOverlay}>
      <div className={[styles['fullscreenOverlay__content'], contentClassName].filter(Boolean).join(' ')}>
        {children}
      </div>
    </div>
  );
};

export default FullscreenOverlay;
