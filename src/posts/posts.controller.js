const service = require("./posts.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function postExists(req, res, next) {
  const { postId } = req.params;

  const post = await service.read(postId);
  if (post) {
    res.locals.post = post;
    return next();
  }
  return next({ status: 404, message: `Post cannot be found.` });
}

async function create(req, res) {
  // your solution here
  const { data = {} } = req.body
  const serveCreate = await service.create(req.body.data);
//   console.log(serveCreate);
  res.json({ data: serveCreate });
}

async function update(req, res) {
  // your solution here
  const updatedPost = {
    ...req.body.data,
//     postId: res.locals.post.post_id,
  };
  const updated = await service.update(updatedPost);
//   console.log(updated);
  res.json({ data: updated });
}

async function destroy(req, res) {
  // your solution here
//   console.log(res.locals.post.post_id);
  const postId = res.locals.post.post_id;
  await service.delete(postId);
  res.sendStatus(204);
//   console.log(deleted);
//   res.json({ data: deleted });
}

module.exports = {
  create: asyncErrorBoundary(create),
  update: [asyncErrorBoundary(postExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(postExists), asyncErrorBoundary(destroy)],
};
