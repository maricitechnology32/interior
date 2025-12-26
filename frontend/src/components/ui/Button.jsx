const Button = ({ children, type = 'button', onClick, className = '', variant = 'primary' }) => {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#D1B68A] text-[#182527] hover:bg-[#e0cba8] focus:ring-[#D1B68A]',
    secondary: 'border-2 border-[#D1B68A] text-[#D1B68A] hover:bg-[#D1B68A] hover:text-[#182527] focus:ring-[#D1B68A]',
    dark: 'bg-[#182527] text-white hover:bg-[#2a3d40] focus:ring-[#182527]',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;