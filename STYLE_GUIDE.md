# STYLE GUIDE

## Typescript

### React props

```ts
interface ComponentProps {
  children?: React.ReactNode;
  // FunctionComponent | ComponentClass
  component?: React.ComponentType<any>;
  // 'button' | FunctionComponent | ComponentClass
  component2?: React.ElementType;
  props: Props & React.ComponentPropsWithoutRef<'button'>;
  props2: Props & React.ComponentPropsWithRef<typeof Button>;
  props3: Record<string, unknown>;
}
```
