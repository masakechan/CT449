const express = require("express");
const contacts = require("../controllers/contact.controller");

const router = express.Router();

// Route tĩnh trả về trang contact
router.get('/contact', (req, res) => {
  res.send('This is the contact page');
});

// Route CRUD cho contacts
router.route("/")
    .get(contacts.findAll)
    .post(contacts.create)
    .delete(contacts.deleteAll);

router.route("/favorite")
    .get(contacts.findAllFavorite);

router.route("/:id")
    .get(contacts.findOne)
    .put(contacts.update)
    .delete(contacts.delete);

module.exports = router;
