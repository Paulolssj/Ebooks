import React from 'react';
import { COLORS } from '../../constants/colors';

type TypographyProps = {
  as?: 'h1' | 'h2' | 'p' | 'span';
  variant?: 'headline' | 'sub' | 'label';
  color?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const styles: Record<string, React.CSSProperties> = {
  headline: {
    fontSize: 100,
    fontWeight: 900,
    lineHeight: 0.95,
    letterSpacing: -4,
    textTransform: 'uppercase',
    color: '#ffffff',
    margin: 0,
    fontFamily: 'Inter, sans-serif',
  },
  sub: {
    fontSize: 36,
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: COLORS.textMuted,
    margin: 0,
    fontFamily: 'Inter, sans-serif',
  },
  label: {
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: 6,
    textTransform: 'uppercase',
    color: COLORS.cyan,
    fontFamily: 'monospace',
    margin: 0,
  },
};

export const Typography: React.FC<TypographyProps> = ({
  as: Tag = 'h1',
  variant = 'headline',
  color,
  children,
  style,
}) => {
  return (
    <Tag style={{ ...styles[variant], ...(color ? { color } : {}), ...style }}>
      {children}
    </Tag>
  );
};
