import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#B8955A]/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs tracking-wider uppercase',
    md: 'px-6 py-3 text-sm tracking-wider uppercase',
    lg: 'px-8 py-4 text-base tracking-wide font-medium',
  }[size];

  const variantStyles = {
    primary: 'bg-[#B8955A] hover:bg-[#A07D45] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-[#191715] hover:bg-[#2A2623] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
    outline: 'border border-[#B8955A] text-[#B8955A] hover:bg-[#B8955A] hover:text-white bg-transparent hover:-translate-y-0.5',
    ghost: 'text-[#191715] hover:text-[#B8955A] hover:bg-[#EFE3D5]/50 bg-transparent',
    whatsapp: 'bg-[#1D8A6E] hover:bg-[#176B57] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
  }[variant];

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </a>
      );
    }
    return (
      <Link to={href} className={combinedClasses}>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};
