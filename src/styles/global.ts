import { globalCss } from './stitches.config';

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },
  body: {
    backgroundColor: '$background',
    color: '$text',
    '-webkit-font-smoothing': 'antialiased',
  },
});
