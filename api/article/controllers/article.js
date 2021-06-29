"use strict";

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.article.search(ctx.query);
    } else {
      entities = await strapi.services.article.find(ctx.query);
    }

    let user = ctx.state.user;

    if (!user || user.role.name !== "Administrator") {
      entities.forEach((entity) => {
        delete entity.users_permissions_user;
      });
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.article })
    );
  },

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
