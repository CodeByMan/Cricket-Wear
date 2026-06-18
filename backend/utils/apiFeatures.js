class ApiFeatures {
  // query ==> Product.find()
  // queryString ==> req.query
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // Product search by keyword
  search() {
    const keyword =
      this.queryString.keyword && this.queryString.keyword.trim() !== ""
        ? {
            name: {
              $regex: this.queryString.keyword,
              $options: "i",
            },
          }
        : {};

    this.query = this.query.find({ ...keyword });

    return this;
  }

  // Filter products by category, price, ratings, etc.
  filter() {
    const queryCopy = { ...this.queryString };

    // Remove non-filter fields
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Convert gt/gte/lt/lte into MongoDB operators: $gt, $gte, $lt, $lte
    let queryStr = JSON.stringify(queryCopy);

    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );

    const finalQuery = JSON.parse(queryStr);

    this.query = this.query.find(finalQuery);

    return this;
  }

  // Pagination
  Pagination(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;