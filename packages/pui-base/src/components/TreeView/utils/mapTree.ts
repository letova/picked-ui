import { NodeType } from '../TreeView.types';

export const mapTree = (tree: NodeType[], mapper: (node: NodeType) => NodeType): NodeType[] => {
  return tree.map((node) => {
    let nextNode = mapper(node);

    if (nextNode.children) {
      nextNode = { ...nextNode, children: mapTree(nextNode.children, mapper) };
    }

    return nextNode;
  });
};
