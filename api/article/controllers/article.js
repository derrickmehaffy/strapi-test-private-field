"use strict";

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.article.findOne({ id });

    let user = ctx.state.user;

    if (!user || user.role.name !== "Administrator") {
      delete entity.users_permissions_user;
    }

    return sanitizeEntity(entity, { model: strapi.models.article });
  },
};
