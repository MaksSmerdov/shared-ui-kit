import type { HTMLAttributes } from 'react';
import styles from './Skeleton.module.scss';

type SkeletonVariant = 'text' | 'rect' | 'circle';

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  animated?: boolean;
}

const toCssSize = (value: number | string | undefined): string | undefined => {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === 'number' ? `${value}px` : value;
};

const Skeleton = ({
  variant = 'rect',
  width,
  height,
  animated = true,
  className,
  style,
  ...restProps
}: SkeletonProps) => {
  const rootClassName = [
    styles.skeleton,
    styles[`skeleton_variant_${variant}`],
    animated ? styles.skeleton_animated : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      aria-hidden="true"
      className={rootClassName}
      style={{
        width: toCssSize(width),
        height: toCssSize(height),
        ...style,
      }}
      {...restProps}
    />
  );
};

export default Skeleton;
