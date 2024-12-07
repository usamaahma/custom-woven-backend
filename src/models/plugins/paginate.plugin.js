const paginate = (schema) => {
  /* eslint-disable no-param-reassign */
  schema.statics.paginate = async function (filter, options) {
    let sort = '';
    if (options.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = 'createdAt';
    }

    // If limit is 0 or not defined, fetch all results
    const isUnlimited = options.limit === 0 || !options.limit;

    const limit = (() => {
      if (isUnlimited) return null;
      const parsedLimit = parseInt(options.limit, 10);
      return parsedLimit > 0 ? parsedLimit : 10;
    })();

    const page = (() => {
      if (isUnlimited) return 1;
      const parsedPage = parseInt(options.page, 10);
      return parsedPage > 0 ? parsedPage : 1;
    })();

    const skip = isUnlimited ? 0 : (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter).sort(sort);

    // Apply limit and skip only if not unlimited
    if (!isUnlimited) {
      docsPromise = docsPromise.skip(skip).limit(limit);
    }

    if (options.populate) {
      options.populate.split(',').forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }))
        );
      });
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values;
      const totalPages = isUnlimited ? 1 : Math.ceil(totalResults / limit);
      const result = {
        results,
        page,
        limit: isUnlimited ? totalResults : limit,
        totalPages,
        totalResults,
      };
      return Promise.resolve(result);
    });
  };
  /* eslint-enable no-param-reassign */
};

module.exports = paginate;
