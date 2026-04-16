import { createPortal } from 'react-dom';
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import styles from './DropdownMenu.module.scss';

export interface DropdownMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  delay?: number;
  placement?: 'left' | 'right' | 'center';
  triggerMode?: 'hover' | 'click';
  usePortal?: boolean;
}

const MENU_OFFSET = 8;

function getMenuPosition(
  triggerRect: DOMRect,
  placement: 'left' | 'right' | 'center',
  openAbove: boolean,
  menuHeight: number
): { top: number; left: number; transform: string } {
  const top = openAbove ? triggerRect.top - MENU_OFFSET - menuHeight : triggerRect.bottom + MENU_OFFSET;

  switch (placement) {
    case 'left':
      return { top, left: triggerRect.left, transform: 'none' };
    case 'right':
      return { top, left: triggerRect.right, transform: 'translateX(-100%)' };
    case 'center':
    default:
      return { top, left: triggerRect.left + triggerRect.width / 2, transform: 'translateX(-50%)' };
  }
}

const DropdownMenu = ({
  trigger,
  children,
  delay = 500,
  placement = 'center',
  triggerMode = 'hover',
  usePortal = true,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
    transform: string;
  } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownId = `dropdown_${useId().replace(/:/g, '')}`;

  const updatePosition = useCallback(() => {
    if (!wrapperRef.current || !usePortal) {
      return;
    }

    const triggerRect = wrapperRef.current.getBoundingClientRect();
    const menuElement = menuRef.current;
    const menuHeight = menuElement ? menuElement.getBoundingClientRect().height : 0;
    const positionBelow = getMenuPosition(triggerRect, placement, false, 0);
    const openAbove = menuHeight > 0 && positionBelow.top + menuHeight + MENU_OFFSET > window.innerHeight;

    setMenuPosition(getMenuPosition(triggerRect, placement, openAbove, menuHeight));
  }, [placement, usePortal]);

  useLayoutEffect(() => {
    if (!isOpen || !usePortal) {
      return;
    }

    updatePosition();
    const rafId = requestAnimationFrame(() => {
      updatePosition();
    });

    const handleScrollOrResize = () => {
      updatePosition();
    };

    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen, updatePosition, usePortal]);

  useEffect(() => {
    const handleOtherOpen = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: string }>;

      if (customEvent.detail?.id !== dropdownId) {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }

        setIsOpen(false);
      }
    };

    window.addEventListener('dropdown-menu-open', handleOtherOpen as EventListener);

    return () => {
      window.removeEventListener('dropdown-menu-open', handleOtherOpen as EventListener);

      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [dropdownId]);

  const openMenu = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    window.dispatchEvent(
      new CustomEvent('dropdown-menu-open', {
        detail: { id: dropdownId },
      })
    );

    setIsOpen(true);
  }, [dropdownId]);

  const closeMenu = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsOpen(false);
  }, []);

  const scheduleCloseMenu = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      closeTimeoutRef.current = null;
    }, delay);
  }, [delay]);

  const cancelCloseMenu = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleTriggerClick = useCallback(() => {
    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  }, [closeMenu, isOpen, openMenu]);

  useEffect(() => {
    if (triggerMode !== 'click' || !isOpen) {
      return;
    }

    const handlePointerDownCapture = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (wrapperRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }

      closeMenu();
    };

    document.addEventListener('pointerdown', handlePointerDownCapture, true);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDownCapture, true);
    };
  }, [closeMenu, isOpen, triggerMode]);

  const placementClass = styles[`dropdownMenu__menu_${placement}`];

  const menuContent = isOpen ? (
    <div
      ref={menuRef}
      className={`${styles['dropdownMenu__menu']} ${placementClass} ${usePortal ? styles['dropdownMenu__menu_portal'] : ''}`}
      style={
        usePortal && menuPosition
          ? {
              position: 'fixed',
              top: menuPosition.top,
              left: menuPosition.left,
              transform: menuPosition.transform,
            }
          : undefined
      }
      onMouseEnter={triggerMode === 'hover' ? cancelCloseMenu : undefined}
      onMouseLeave={triggerMode === 'hover' ? scheduleCloseMenu : undefined}
      onClick={triggerMode === 'click' ? closeMenu : undefined}
    >
      {children}
    </div>
  ) : null;

  return (
    <div
      ref={wrapperRef}
      className={styles.dropdownMenu}
      onMouseEnter={triggerMode === 'hover' ? openMenu : undefined}
      onMouseLeave={triggerMode === 'hover' ? scheduleCloseMenu : undefined}
    >
      <div
        className={styles['dropdownMenu__trigger']}
        onClick={triggerMode === 'click' ? handleTriggerClick : undefined}
      >
        {trigger}
      </div>
      {usePortal ? (menuContent ? createPortal(menuContent, document.body) : null) : menuContent}
    </div>
  );
};

export default DropdownMenu;
