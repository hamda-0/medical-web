'use client';

import React from 'react';
import { Button as UIButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive';
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  icon,
  className = '',
  variant = 'default'
}) => {
  return (
    <UIButton onClick={onClick} variant={variant} className={cn(className,'cursor-pointer')}>
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </UIButton>
  );
};

export default Button;
