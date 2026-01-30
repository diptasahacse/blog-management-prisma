import defaultPaginationValue from "../constant/pagination";

const handlePagination = ({
  page,
  limit,
}: {
  page: number | undefined;
  limit: number | undefined;
}): { skip: number; take: number } => {
  const pageLimit = () => {
    if (limit && !isNaN(Number(limit))) {
      if (limit < defaultPaginationValue.minLimit) {
        return defaultPaginationValue.maxLimit;
      }
      if (limit > defaultPaginationValue.maxLimit) {
        return defaultPaginationValue.maxLimit;
      }
      return Number(limit);
    }
    return defaultPaginationValue.maxLimit;
  };
  const pageData = () => {
    if (page && !isNaN(Number(page))) {
      if (page < defaultPaginationValue.page) {
        return defaultPaginationValue.page;
      }
      return Number(page);
    }
    return defaultPaginationValue.page;
  };

  const skip = (pageData() - 1) * pageLimit();

  return {
    take: pageLimit(),
    skip,
  };
};

export default handlePagination;
