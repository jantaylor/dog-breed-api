const knex = require('../connection')

/**
 * Get's All Breeds from the database
 * @returns {Breed[]}
 */
function getAllBreeds () {
  return knex('breeds')
    .select('*')
}

/**
 * Gets a single breed where it takes the id passed to query
 * @param {number} id
 * @returns {Breed}
 */
function getSingleBreed (id) {
  return knex('breeds')
    .select('*')
    .where({ id: parseInt(id) })
}

// Posts a single breed where it takes the data body passed in
// and return everything
function addBreed (breed) {
  return knex('breeds')
    .insert(breed)
    .returning('*')
}

// Updates the breed based on the passed in body, but uses the
// id to update it
function updateBreed (id, breed) {
  return knex('breeds')
    .update(breed)
    .where({ id: parseInt(id) })
    .returning('*')
}

// Deletes the breed whose id is passed in and returns the
// deleted breed if successfull
function deleteBreed (id) {
  return knex('breeds')
    .del()
    .where({ id: parseInt(id) })
    .returning('*')
}

module.exports = {
  getAllBreeds,
  getSingleBreed,
  addBreed,
  updateBreed,
  deleteBreed
}
