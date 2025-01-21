type GeneratorParams = {
  block: string;
  element?: string;
  modificator?: string;
};

const defaultGenerator = ({ block, element, modificator }: GeneratorParams) => {
  if (modificator) {
    if (!element) {
      return `${block}--${modificator}`;
    }

    return `${block}-${element}--${modificator}`;
  }

  if (element) {
    return `${block}-${element}`;
  }

  return block;
};

const createClassNameGenerator = () => {
  let generator = defaultGenerator;

  return {
    configure(userGenerator: typeof generator) {
      generator = userGenerator;
    },
    generate(params: GeneratorParams) {
      return generator(params);
    },
    reset() {
      generator = defaultGenerator;
    },
  };
};

export const ClassNameGenerator = createClassNameGenerator();
