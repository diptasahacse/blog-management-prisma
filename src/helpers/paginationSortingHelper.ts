import defaultPaginationValue from "../constant/pagination";
import { IPaginationQuery } from "../types/pagination";
import { ISortingQuery, SortOrder, SortOrderEnum } from "../types/sorting";

export const handleSorting = ({
  allowedFields,
  defaultSortBy,
  sort_by,
  sort_order,
}: ISortingQuery & { allowedFields: string[]; defaultSortBy: string }): {
  sort_by: string;
  sort_order: SortOrderEnum;
} => {
  const res: { sort_by: string; sort_order: SortOrderEnum } = {
    sort_by: defaultSortBy,
    sort_order: SortOrder.DESC,
  };
  if (
    sort_by &&
    Object.values(allowedFields).includes(sort_by) &&
    sort_order &&
    Object.values(SortOrder).includes(sort_order as SortOrderEnum)
  ) {
    res.sort_by = sort_by;
    res.sort_order = sort_order as SortOrderEnum;
  }else if (
    sort_order &&
    Object.values(SortOrder).includes(sort_order as SortOrderEnum)
  ) {
    res.sort_order = sort_order as SortOrderEnum;
  }

  return res;
};

export const handlePagination = ({
  page,
  limit,
}: {
  page: number | undefined;
  limit: number | undefined;
}): { skip: number; take: number; page: number } => {
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
    page: pageData(),
  };
};

export const paginationSortingHelper = ({
  page,
  limit,
  sort_by,
  sort_order,
  allowedFields,
  defaultSortBy,
}: IPaginationQuery &
  ISortingQuery & { allowedFields: string[]; defaultSortBy: string }): {
  skip: number;
  take: number;
  sort_order: SortOrderEnum;
  page: number;
  sort_by: string;
} => {
  const {
    take,
    skip,
    page: paginationPage,
  } = handlePagination({
    page,
    limit,
  });

  const sortData = handleSorting({
    sort_by,
    sort_order,
    allowedFields,
    defaultSortBy,
  });

  return {
    take,
    skip,
    sort_by: sortData.sort_by,
    sort_order: sortData.sort_order,
    page: paginationPage,
  };
};
