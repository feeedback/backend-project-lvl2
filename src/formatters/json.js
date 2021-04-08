import createDiffTree from '../create_diff.js';

export default (objA, objB) => {
  const diffAST = createDiffTree(objA, objB);

  return JSON.stringify(diffAST);
};
