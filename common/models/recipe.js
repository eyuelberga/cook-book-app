'use strict';

module.exports = function(Recipe) {
  Recipe.beforeRemote('create', function(ctx, instance, next) {
    console.log('before create...add owner id');
    // set creator to current user
    ctx.args.data.ownerId = ctx.req.accessToken.userId;
    next();
  });
};
