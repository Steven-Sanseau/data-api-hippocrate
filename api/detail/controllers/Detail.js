'use strict';

/**
 * Detail.js controller
 *
 * @description: A set of functions called "actions" for managing `Detail`.
 */

module.exports = {

  /**
   * Retrieve detail records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.detail.fetchAll(ctx.query);
  },

  /**
   * Retrieve a detail record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.detail.fetch(ctx.params);
  },

  /**
   * Count detail records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.detail.count(ctx.query);
  },

  /**
   * Create a/an detail record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.detail.add(ctx.request.body);
  },

  /**
   * Update a/an detail record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.detail.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an detail record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.detail.remove(ctx.params);
  }
};
