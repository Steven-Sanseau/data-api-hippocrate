'use strict';

/**
 * Step.js controller
 *
 * @description: A set of functions called "actions" for managing `Step`.
 */

module.exports = {

  /**
   * Retrieve step records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.step.fetchAll(ctx.query);
  },

  /**
   * Retrieve a step record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.step.fetch(ctx.params);
  },

  /**
   * Count step records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.step.count(ctx.query);
  },

  /**
   * Create a/an step record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.step.add(ctx.request.body);
  },

  /**
   * Update a/an step record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.step.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an step record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.step.remove(ctx.params);
  }
};
