import { css } from '@emotion/css';

// import { getSize } from '../../../utils';

import { HeadingProps } from './Heading.types';

const getDynamicStyle = (level: number) => {
  switch (level) {
    case 1: {
      return {
        xs: { fontSize: '1.550rem', padding: '32px' }, // 200 +
        s: { fontSize: '2.300rem', padding: '32px' }, // 400
        m: { fontSize: '2.800rem', padding: '32px' }, // 450
      };
    }
    default:
    case 2: {
      return {
        xs: { fontSize: '1.350rem', padding: '28px' }, // 150
        s: { fontSize: '1.900rem', padding: '28px' }, // 300
        m: { fontSize: '2.350rem', padding: '28px' }, // 350
      };
    }
    case 3: {
      return {
        xs: { fontSize: '1.200rem', padding: '24px' }, // 125
        s: { fontSize: '1.600rem', padding: '24px' }, // 250
        m: { fontSize: '2rem', padding: '24px' }, // 300
      };
    }
    case 4: {
      return {
        xs: { fontSize: '1.075rem', padding: '20px' }, // 100
        s: { fontSize: '1.350rem', padding: '20px' }, // 200
        m: { fontSize: '1.700rem', padding: '20px' }, // 250
      };
    }
    case 5: {
      return {
        xs: { fontSize: '0.975rem', padding: '16px' }, // 75
        s: { fontSize: '1.150rem', padding: '16px' }, // 150
        m: { fontSize: '1.450rem', padding: '16px' }, // 200
      };
    }
    case 6: {
      return {
        xs: { fontSize: '0.900rem', padding: '12px' },
        s: { fontSize: '1rem', padding: '12px' },
        m: { fontSize: '1.250rem', padding: '12px' },
      };
    }
  }
};

export const getClassName = ({ level = 2, size = 's' }: HeadingProps) => {
  const dynamicStyle = getDynamicStyle(level)[size];

  return css`
    margin: 0;
    margin-bottom: ${dynamicStyle.padding};
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 700;
    font-size: ${dynamicStyle.fontSize};
  `;
};
