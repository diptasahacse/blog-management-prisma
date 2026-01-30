import { ISortingQuery, SortOrder, SortOrderEnum } from "../types/sorting";

const handleSorting = ({
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
  }

  if (
    sort_order &&
    Object.values(SortOrder).includes(sort_order as SortOrderEnum)
  ) {
    res.sort_order = sort_order as SortOrderEnum;
  }

  return res;
};
export default handleSorting;
