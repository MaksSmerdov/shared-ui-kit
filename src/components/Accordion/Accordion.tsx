import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  type AccordionProps as MuiAccordionProps,
} from '@mui/material';
import type { ReactNode } from 'react';
import styles from './Accordion.module.scss';

export interface AccordionProps extends Omit<MuiAccordionProps, 'children' | 'title'> {
  title: ReactNode;
  children: ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

const Accordion = ({ title, children, defaultExpanded = false, className, ...props }: AccordionProps) => {
  return (
    <MuiAccordion {...props} defaultExpanded={defaultExpanded} className={`${styles['accordion']} ${className ?? ''}`}>
      <MuiAccordionSummary
        expandIcon={<ExpandMore className={styles['expand-icon']} />}
        className={styles['accordion-summary']}
      >
        <div className={styles['accordion-title']}>{title}</div>
      </MuiAccordionSummary>
      <MuiAccordionDetails className={styles['accordion-details']}>{children}</MuiAccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
