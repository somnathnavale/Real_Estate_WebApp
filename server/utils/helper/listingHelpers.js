const generateQuery = (query, req) => {
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
    userId,
    long,
    lat,
  } = req.query;

  if (userId) {
    queryObj.owner = userId;
  }

  if (searchText) {
    const regex = new RegExp(searchText, "i");
    queryObj = {
      $or: [
        { name: regex },
        { description: regex },
        { "address.locality": regex },
        { "address.street": regex },
        { "address.city": regex },
        { "address.zipCode": regex },
      ],
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

  const radius = 30;

  if (long !== null && long !== undefined) {
    queryObj.location = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(long), parseFloat(lat)],
        },
        $maxDistance: radius * 1000,
      },
    };
  }

  query = query.find(queryObj);
  const countQuery = query.clone().count();

  if (sort) {
    query.sort(sort);
  } else {
    query.sort("-createdAt");
  }

  page = page * 1 || 1;
  limit = limit * 1 || 6;

  const skip = (page - 1) * limit;
  query
    .skip(skip)
    .limit(limit)
    .select("name price category listingType address photos");

  return { query, countQuery };
};

module.exports = { generateQuery };
