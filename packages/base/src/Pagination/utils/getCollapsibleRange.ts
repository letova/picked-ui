export const START_ELLIPSIS = 'start-ellipsis';
export const END_ELLIPSIS = 'end-ellipsis';

export const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

export const getCollapsibleRange = ({
  page = 1,
  pageCount = 1,
  siblingCount = 1,
  boundaryCount = 1,
}: {
  page?: number;
  pageCount?: number;
  siblingCount?: number;
  boundaryCount?: number;
}) => {
  const startRange = range(1, Math.min(boundaryCount, pageCount));
  const endRange = range(Math.max(pageCount - boundaryCount + 1, boundaryCount + 1), pageCount);

  const siblingStartPage = Math.max(
    Math.min(page - siblingCount, pageCount - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );

  const siblingEndPage = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endRange.length > 0 ? endRange[0] - 2 : pageCount - 1,
  );

  const centerRange = range(siblingStartPage, siblingEndPage);

  const result = [
    ...startRange,
    ...(siblingStartPage > boundaryCount + 2
      ? [START_ELLIPSIS]
      : boundaryCount + 1 < pageCount - boundaryCount
      ? [boundaryCount + 1]
      : []),
    ...centerRange,
    ...(siblingEndPage < pageCount - boundaryCount - 1
      ? [END_ELLIPSIS]
      : pageCount - boundaryCount > boundaryCount
      ? [pageCount - boundaryCount]
      : []),
    ...endRange,
  ];

  return result;
};
