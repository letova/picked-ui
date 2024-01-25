export const mapTree = <T extends { children?: T[] }>(data: T[], mapper: (node: T) => T): T[] => {
  return data.map((node) => {
    const nextNode = mapper(node);

    if (nextNode.children) {
      nextNode.children = mapTree(nextNode.children, mapper);
    }

    return nextNode;
  });
};

export const forEachTree = <T extends { children?: T[] }>(data: T[], callback: (node: T) => void): void => {
  return data.forEach((node) => {
    callback(node);

    if (node.children) {
      forEachTree(node.children, callback);
    }
  });
};
