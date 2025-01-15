import { CSSObject } from '@emotion/css';

export type Slot = { component: React.ElementType<any>; props?: Record<string, unknown> };

export type GetCSSObjectFn = (state: Record<string, any>) => CSSObject;

export type CustomStyle = CSSObject | GetCSSObjectFn;
