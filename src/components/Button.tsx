import { styled } from '@/styles/stitches.config';

export const Button = styled('button', {
  backgroundColor: '$primary',
  color: '$white',
  padding: '$4',
  borderRadius: '$md',
  border: 'none',
  fontSize: '$md',
  cursor: 'pointer',
  transition: 'all 0.2s',

  '&:hover': {
    opacity: '0.6',
  },
});
