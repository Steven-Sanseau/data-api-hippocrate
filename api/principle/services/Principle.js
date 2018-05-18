'use strict';

/**
 * Principle.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all principles.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    const convertedParams = strapi.utils.models.convertParams('principle', params);

    return Principle
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.principle.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch a/an principle.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    return Principle
      .findOne(_.pick(params, _.keys(Principle.schema.paths)))
      .populate(_.keys(_.groupBy(_.reject(strapi.models.principle.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to add a/an principle.
   *
   * @return {Promise}
   */

  add: async (values) => {
    const query = await Principle.create(_.omit(values, _.keys(_.groupBy(strapi.models.principle.associations, 'alias'))));
    const data = query.toJSON ? query.toJSON() : query;

    await strapi.hook.mongoose.manageRelations('principle', _.merge(data, { values }));

    return query;
  },

  /**
   * Promise to edit a/an principle.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    await strapi.hook.mongoose.manageRelations('principle', _.merge(_.clone(params), { values }));
    return Principle.update(params, values, { multi: true });
  },

  /**
   * Promise to remove a/an principle.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Principle.findOneAndRemove(params, {})
      .populate(_.keys(_.groupBy(_.reject(strapi.models.principle.associations, {autoPopulate: false}), 'alias')).join(' '));

    _.forEach(Principle.associations, async association => {
      const search = (_.endsWith(association.nature, 'One')) ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
      const update = (_.endsWith(association.nature, 'One')) ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

      await strapi.models[association.model || association.collection].update(
        search,
        update,
        { multi: true });
    });

    return data;
  }
};
