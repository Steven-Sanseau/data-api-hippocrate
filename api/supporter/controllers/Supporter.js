'use strict';

/**
 * Supporter.js controller
 *
 * @description: A set of functions called "actions" for managing `Supporter`.
 */

module.exports = {

  /**
   * Retrieve supporter records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.supporter.fetchAll(ctx.query);
  },

  /**
   * Retrieve a supporter record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.supporter.fetch(ctx.params);
  },

  /**
   * Count supporter records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.supporter.count(ctx.query);
  },

  /**
   * Create a/an supporter record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.supporter.add(ctx.request.body);
  },

  /**
   * Update a/an supporter record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.supporter.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an supporter record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.supporter.remove(ctx.params);
  }
};
