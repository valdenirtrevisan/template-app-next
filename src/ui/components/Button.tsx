import { ForwardRefRenderFunction, forwardRef } from 'react';
import { cn } from '@/ui/libs';
import { Loader } from 'react-feather';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
};

const ButtonRef: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  {
    children,
    variant = 'primary',
    loading = false,
    disabled,
    ...rest
  }: ButtonProps,
  ref,
) => {
  return (
    <button
      ref={ref}
      {...rest}
      disabled={disabled || loading}
      className={cn(
        'flex h-10 items-center justify-center gap-x-2 rounded px-3 text-center font-semibold transition-all disabled:cursor-not-allowed',
        {
          'bg-pink-500 text-white hover:bg-pink-700 disabled:bg-zinc-300':
            variant === 'primary',
          'border border-pink-500 bg-transparent text-pink-500 hover:border-pink-700 hover:text-pink-700 disabled:border-zinc-300 disabled:text-zinc-300':
            variant === 'secondary',
        },
      )}
    >
      {loading ? (
        <div className="w-min animate-spin">
          <Loader />
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export const Button = forwardRef(ButtonRef);
