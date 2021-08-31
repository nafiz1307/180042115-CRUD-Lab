const sgMail = require("@sendgrid/mail");
const codeGenerate = require("../utils/code-generator")
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const MathOlympiad = require("../models/MathOlympiad.model");

const getMO = (req, res) => {
  res.render("math-olympiad/register.ejs", { error: req.flash("error") });
};

const postMO = (req, res) => {
  const { name, category, contact, email, institution, tshirt } = req.body;
  console.log(name);
  console.log(category);
  console.log(contact);
  console.log(email);
  console.log(institution);
  console.log(tshirt);
  let registrationFee = 0;
  if (category == "School") {
    registrationFee = 250;
  } else if (category == "College") {
    registrationFee = 400;
  } else {
    registrationFee = 500;
  }

  const total = registrationFee;
  const paid = 0;
  const selected = false;
  const val = codeGenerate();
  
  let error = "";
  MathOlympiad.findOne({ name: name, contact: contact }).then((participant) => {
    if (participant) {
      error = "Participant with this name and contact number already exists!";
      console.log(error);
      req.flash("error", error);
      res.redirect("/MathOlympiad/register");
    } else {
      const participant = new MathOlympiad({
        name: name,
        category: category,
        contact: contact,
        email: email,
        institution: institution,
        total: total,
        paid: paid,
        selected: selected,
        tshirt: tshirt,
        confirmationCode : val,
      });
      const msg = {
        to: email, // Change to your recipient
        from: "joystmp+ulgc9@gmail.com", // Change to your verified sender
        subject: "Math Olympiad Registration",
        text: `You have successfully registered to math olympiad your confirmation code is ${val} Store the code for futher use` ,
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
      participant
        .save()
        .then(() => {
          error = "Partcipant has been registered succesfully!";
          console.log(error);
          req.flash("error", error);
          res.redirect("/MathOlympiad/register");
        })
        .catch(() => {
          error = "Unexpected error has occured!";
          console.log(error);
          req.flash("error", error);
          res.redirect("/MathOlympiad/register");
        });
    }
  });
};

const deleteMO = (req, res) => {
  const id = req.params.id;
  let error = "";

  console.log(id);

  MathOlympiad.deleteOne({ _id: id }, (err) => {
    if (err) {
      error = "Failed to delete data.";
      req.flash("error", error);

      res.redirect("/MathOlympiad/list");
    } else {
      error = "Data Successfully deleted.";
      req.flash("error", error);

      res.redirect("/MathOlympiad/list");
    }
  });
};
const getMOList = (req, res) => {
  let all_partcipant = [];
  let error = "";
  MathOlympiad.find()
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

const paymentDoneMO = (req, res) => {
  const id = req.params.id;
  let error = "";

  console.log(id);

  MathOlympiad.findOne({ _id: id })
    .then((participant) => {
      participant.paid = participant.total;

      participant
        .save()
        .then(() => {
          error = "Payment Accepted Successfully.";
          req.flash("error", error);

          console.log(error);
          res.redirect("/MathOlympiad/list");
        })
        .catch(() => {
          error = "Unknown Error occured and Payment was denied.";
          req.flash("error", error);

          console.log(error);
          res.redirect("/MathOlympiad/list");
        });
    })
    .catch(() => {
      error = "Unknown Error occured and Participant was not found.";
      req.flash("error", error);

      console.log(error);
      res.redirect("/MathOlympiad/list");
    });
};

const selectMO = (req, res) => {
  const id = req.params.id;
  let error = "";

  console.log(id);

  MathOlympiad.findOne({ _id: id })
    .then((participant) => {
      participant.selected = true;

      participant
        .save()
        .then(() => {
          error = "Participant has been selected successfully!";
          req.flash("error", error);

          console.log(error);
          res.redirect("/MathOlympiad/list");
        })
        .catch(() => {
          error = "Error Occured Participant couldn't be selected";
          req.flash("error", error);

          console.log(error);
          res.redirect("/MathOlympiad/list");
        });
    })
    .catch(() => {
      error = "Unknown Error occured and Participant was not found.";
      req.flash("error", error);

      console.log(error);
      res.redirect("/MathOlympiad/list");
    });
};

const getEditMO = (req, res) => {
  const id = req.params.id;
  let Participant = [];
  let error = "";

  console.log(id);

  MathOlympiad.findOne({ _id: id })
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

const postEditMO = (req, res) => {
  const id = req.params.id;
  let error = "";

  console.log(id);

  MathOlympiad.findOne({ _id: id }).then((participant) => {
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
          res.redirect("/MathOlympiad/list");
        })
        .catch(() => {
          error = "Unknown Error occured and Data was not Edited.";
          req.flash("error", error);

          console.log(error);
          res.redirect("/MathOlympiad/list");
        });
    } else {
      error = "Unknown Error occured and Data was not Edited.";
      req.flash("error", error);

      console.log(error);
      res.redirect("/MathOlympiad/list");
    }
  });
};

module.exports = {
  getMO,
  postMO,
  deleteMO,
  getMOList,
  paymentDoneMO,
  selectMO,
  getEditMO,
  postEditMO,
};
