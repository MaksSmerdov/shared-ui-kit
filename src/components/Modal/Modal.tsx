import Close from '@mui/icons-material/Close';
import { Box, IconButton, Modal as MuiModal, type ModalProps as MuiModalProps, Typography } from '@mui/material';
import type { MouseEvent, ReactNode } from 'react';

export interface ModalProps extends Omit<MuiModalProps, 'children'> {
  title?: string;
  width?: string;
  height?: string;
  allowOverflow?: boolean;
  children: ReactNode;
}

const Modal = ({
  open,
  onClose,
  title,
  width = 'auto',
  height,
  allowOverflow = false,
  children,
  ...rest
}: ModalProps) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          style: {
            cursor: 'pointer',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(2px)',
          },
        },
      }}
      {...rest}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'var(--white)',
          boxShadow:
            '0 24px 80px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.18)',
          outline: 'none',
          borderRadius: '12px',
          border: '1px solid var(--steam)',
          width: width === 'auto' ? 'auto' : width,
          minWidth: width === 'auto' ? '300px' : 'auto',
          maxWidth: '95vw',
          maxHeight: '90vh',
          height: height ?? 'auto',
          overflow: allowOverflow ? 'visible' : 'hidden',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Bitter, sans-serif',
          '@media (max-width: 600px)': {
            minWidth: '280px',
            maxWidth: '95vw',
            margin: '0 10px',
          },
          '@media (max-width: 400px)': {
            minWidth: '260px',
            maxWidth: '98vw',
            margin: '0 5px',
          },
          '& .MuiTypography-root': {
            fontFamily: 'inherit',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            padding: '20px 24px',
            borderBottom: '1px solid var(--steam)',
            background: 'linear-gradient(135deg, var(--doctor) 0%, var(--snowflake) 40%, var(--white) 100%)',
            flexShrink: 0,
            '@media (max-width: 600px)': {
              padding: '16px 20px',
            },
            '@media (max-width: 400px)': {
              padding: '12px 16px',
            },
          }}
        >
          {title && (
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                color: 'var(--black)',
                fontSize: '20px',
                lineHeight: '28px',
              }}
            >
              {title}
            </Typography>
          )}
          <IconButton
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              onClose?.(event, 'backdropClick');
            }}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'var(--grey)',
              backgroundColor: 'transparent',
              transition: 'all 0.2s ease',
              '@media (max-width: 600px)': {
                top: 12,
                right: 12,
              },
              '&:hover': {
                backgroundColor: 'var(--snowflake)',
                color: 'var(--black)',
                transform: 'rotate(90deg)',
              },
            }}
            aria-label="close"
          >
            <Close />
          </IconButton>
        </Box>
        <Box
          sx={{
            padding: '24px',
            overflowY: allowOverflow ? 'visible' : 'auto',
            overflowX: allowOverflow ? 'visible' : 'hidden',
            flex: 1,
            '@media (max-width: 600px)': {
              padding: '20px',
            },
            '@media (max-width: 400px)': {
              padding: '16px',
            },
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'var(--beluga)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'var(--grey)',
              borderRadius: '4px',
              '&:hover': {
                background: 'var(--carbon)',
              },
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </MuiModal>
  );
};

export default Modal;
