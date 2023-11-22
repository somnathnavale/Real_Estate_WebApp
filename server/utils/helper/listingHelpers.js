export const generateQuery = (query, req) => {
  let queryObj = {};

  let {
    searchText,
    category,
    listingType,
    furnishing,
    minPrice,
    maxPrice,
    lift,
    parking,
    sort,
    limit,
    page,
  } = req.query;

  if (searchText) {
    const regex=new RegExp(searchText,'i');
    queryObj = {
      $or: [{ name:regex }, { description:regex }, { address: regex }],
    };
  }

  if (category) {
    queryObj.category = { $in: category.split(",") };
  }
  if (listingType) {
    queryObj.listingType = { $in: listingType.split(",") };
  }
  if (furnishing) {
    queryObj.furnishing = { $in: furnishing.split(",") };
  }
  if (minPrice) {
    queryObj.price = { $gte: Number(minPrice) };
  }
  if (maxPrice) {
    queryObj.price = { ...queryObj.price, $lte: Number(maxPrice) };
  }
  if (lift) {
    queryObj.lift = "Yes";
  }
  if (parking) {
    queryObj.parking = { $gt: 0 };
  }
  
  query=query.find(queryObj);

  if (sort) {
    query.sort(sort);
  } else {
    query.sort("-createdAt");
  }

  page = page * 1 || 1;
  limit = limit * 1 || 10;

  const skip = (page - 1) * limit;
  query.skip(skip).limit(limit).select("name price category listingType address photos");

  return query;
};