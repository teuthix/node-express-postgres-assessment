const knex = require("../db/connection");

function create(post) {
  //your solution here
  return knex("posts")
    .insert(post)
    .returning("*")
    .then((createdPost) => createdPost[0]);
}

function read(postId) {
  return knex("posts").select("*").where({ post_id: postId }).first();
}

function update(updatedPost) {
  //your solution here
  return knex("posts")
    .select("*")
    .where({ post_id: updatedPost.post_id })
    .update(updatedPost, ["post_body", "post_id", "post_title"])
    .then((updatedPost) => updatedPost[0]);
}

function destroy(postId) {
  //your solution here
  return knex("posts").where({post_id: postId}).del();
}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
};