const ProgrammingContest = require("../models/ProgrammingContest.model");

const getPC = (req, res) => {
  res.render("programming-contest/register.ejs", { error: req.flash("error") });
};

const postPC = (req, res) => {
  const {
    teamName,
    institution,
    coachName,
    coachEmail,
    coachContact,
    coachTshirt,
    m_name0,
    m_email0,
    m_contact0,
    m_tshirt0,
    m_name1,
    m_email1,
    m_contact1,
    m_tshirt1,
    m_name2,
    m_email2,
    m_contact2,
    m_tshirt2,
  } = req.body;
  let registrationFee = 2500;

  const total = registrationFee;
  const paid = 0;
  const selected = false;
  let error = "";
  ProgrammingContest.findOne({ teamName: teamName, institution: institution }).then(
    (team) => {
      if (team) {
        error = "Team with this name and contact number already exists!";
        console.log(error);
        req.flash("error", error);
        res.redirect("/ProgrammingContest/register");
      } else {
        const team = new ProgrammingContest({
          teamName: teamName,
          institution: institution,
          coachName: coachName,
          coachEmail: coachEmail,
          coachContact: coachContact,
          coachTshirt: coachTshirt,
          m_name0: m_name0,
          m_email0: m_email0,
          m_contact0: m_contact0,
          m_tshirt0: m_tshirt0,
          m_name1: m_name1,
          m_email1: m_email1,
          m_contact1: m_contact1,
          m_tshirt1: m_tshirt1,
          m_name2: m_name2,
          m_email2: m_email2,
          m_contact2: m_contact2,
          m_tshirt2: m_tshirt2,
          total : total,
          paid : paid,
          selected : selected,
        });
        team
          .save()
          .then(() => {
            error = "Team has been registered succesfully!";
            console.log(error);
            req.flash("error", error);
            res.redirect("/ProgrammingContest/register");
          })
          .catch((err) => {
            error = "Unexpected error has occured!";
            console.log(err);
            req.flash("error", error);
            res.redirect("/ProgrammingContest/register");
          });
      }
    }
  );
};

const deletePC = (req, res) => {
  const id = req.params.id;
  let error = "";

  console.log(id);

  ProgrammingContest.deleteOne({ _id: id }, (err) => {
    if (err) {
      error = "Failed to delete data.";
      req.flash("error", error);

      res.redirect("/ProgrammingContest/list");
    } else {
      error = "Data Successfully deleted.";
      req.flash("error", error);

      res.redirect("/ProgrammingContest/list");
    }
  });
};
const getPCList = (req, res) => {
  let all_partcipant = [];
  let error = "";
  ProgrammingContest.find()
    .then((data) => {
      all_partcipant = data;
      res.render("math-olympiad/list.ejs", {
        error: req.flash("error"),
        participants: all_partcipant,
      });
    })
    .catch(() => {
      error = "Failed to fetch data!";
      res.render("math-olympiad/list.ejs", {
        error: req.flash("error", error),
        participants: all_partcipant,
      });
    });
};

const paymentDonePC = (req, res) => {
  const id = req.params.id;
  let error = "";

  console.log(id);

  ProgrammingContest.findOne({ _id: id })
    .then((participant) => {
      participant.paid = participant.total;

      participant
        .save()
        .then(() => {
          error = "Payment Accepted Successfully.";
          req.flash("error", error);

          console.log(error);
          res.redirect("/ProgrammingContest/list");
        })
        .catch(() => {
          error = "Unknown Error occured and Payment was denied.";
          req.flash("error", error);

          console.log(error);
          res.redirect("/ProgrammingContest/list");
        });
    })
    .catch(() => {
      error = "Unknown Error occured and Participant was not found.";
      req.flash("error", error);

      console.log(error);
      res.redirect("/ProgrammingContest/list");
    });
};

const selectPC = (req, res) => {
  const id = req.params.id;
  let error = "";

  console.log(id);

  ProgrammingContest.findOne({ _id: id })
    .then((participant) => {
      participant.selected = true;

      participant
        .save()
        .then(() => {
          error = "Participant has been selected successfully!";
          req.flash("error", error);

          console.log(error);
          res.redirect("/ProgrammingContest/list");
        })
        .catch(() => {
          error = "Error Occured Participant couldn't be selected";
          req.flash("error", error);

          console.log(error);
          res.redirect("/ProgrammingContest/list");
        });
    })
    .catch(() => {
      error = "Unknown Error occured and Participant was not found.";
      req.flash("error", error);

      console.log(error);
      res.redirect("/ProgrammingContest/list");
    });
};

const getEditPC = (req, res) => {
  const id = req.params.id;
  let Participant = [];
  let error = "";

  console.log(id);

  ProgrammingContest.findOne({ _id: id })
    .then((data) => {
      Participant = data;

      res.render("math-olympiad/edit.ejs", {
        participant: Participant,
        error: req.flash("error"),
      });
    })
    .catch(() => {
      error = "An Unexpected Error occured while fetching data.";

      res.render("math-olympiad/edit.ejs", {
        username: username,
        participant: Participant,
        error: req.flash("error", error),
      });
    });
};

const postEditPC = (req, res) => {
  const id = req.params.id;
  let error = "";

  console.log(id);

  ProgrammingContest.findOne({ _id: id }).then((participant) => {
    if (participant) {
      const { name, category, contact, email, institution, tshirt } = req.body;

      participant.name = name;
      participant.category = category;
      participant.contact = contact;
      participant.email = email;
      participant.institution = institution;
      participant.tshirt = tshirt;

      participant
        .save()
        .then(() => {
          error = "Participant Data was edited successfully.";
          req.flash("error", error);

          console.log(error);
          res.redirect("/ProgrammingContest/Participant-list");
        })
        .catch(() => {
          error = "Unknown Error occured and Data was not Edited.";
          req.flash("error", error);

          console.log(error);
          res.redirect("/ProgrammingContest/Participant-list");
        });
    } else {
      error = "Unknown Error occured and Data was not Edited.";
      req.flash("error", error);

      console.log(error);
      res.redirect("/ProgrammingContest/Participant-list");
    }
  });
};

module.exports = {
  getPC,
  postPC,
  deletePC,
  getPCList,
  paymentDonePC,
  selectPC,
  getEditPC,
  postEditPC,
};
