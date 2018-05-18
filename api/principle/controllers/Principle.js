'use strict';

/**
 * Principle.js controller
 *
 * @description: A set of functions called "actions" for managing `Principle`.
 */

module.exports = {

  /**
   * Retrieve principle records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.principle.fetchAll(ctx.query);
  },

  /**
   * Retrieve a principle record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.principle.fetch(ctx.params);
  },

  /**
   * Create a/an principle record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.principle.add(ctx.request.body);
  },

  /**
   * Update a/an principle record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.principle.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an principle record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.principle.remove(ctx.params);
  }
};
