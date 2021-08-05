const express = require("express");
const router = express.Router();

const {
  ensureAuthenticated,
  addUserData,
} = require("../middlewares/auth.middleware");

const {
  getPC,
  postPC,
  deletePC,
  getPCList,
  paymentDonePC,
  selectPC,
  getEditPC,
  postEditPC
} = require("../controllers/programmingContest.controller");

router.get("/register", ensureAuthenticated, addUserData, getPC);
router.post("/register", ensureAuthenticated, addUserData, postPC);
router.get("/list", ensureAuthenticated, addUserData, getPCList);
router.get("/delete/:id", ensureAuthenticated, addUserData, deletePC);
router.get("/paymentDone/:id", ensureAuthenticated, addUserData, paymentDonePC);
router.get("/select/:id", ensureAuthenticated, addUserData, selectPC);
router.get("/edit/:id", ensureAuthenticated, addUserData, getEditPC);
router.post("/edit/:id", ensureAuthenticated, addUserData, postEditPC);

// router.get("/paymentDone/:id", ensureAuthenticated, addUserData, paymentDoneMO);

module.exports = router;
