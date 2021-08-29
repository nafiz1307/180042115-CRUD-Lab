const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
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
  var val = Math.floor(1000 + Math.random() * 9000);
  console.log(val);

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
          confirmationCode : val,
        });
        const msg = {
          to: m_email0, // Change to your recipient
          from: "joystmp+ulgc9@gmail.com", // Change to your verified sender
          subject: "Programming Contest Registration",
          text: `Your team has successfully registered to Programming Contest your confirmation code is ${val} Store the code for futher use` ,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
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
  let all_team = [];
  let error = "";
  ProgrammingContest.find()
    .then((data) => {
      all_team = data;
      res.render("programming-contest/list.ejs", {
        error: req.flash("error"),
        teams: all_team,
      });
    })
    .catch(() => {
      error = "Failed to fetch data!";
      res.render("programming-contest/list.ejs", {
        error: req.flash("error", error),
        teams: all_team,
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
  let Team = [];
  let error = "";

  console.log(id);

  ProgrammingContest.findOne({ _id: id })
    .then((data) => {
      Team = data;

      res.render("programming-contest/edit.ejs", {
        team: Team,
        error: req.flash("error"),
      });
    })
    .catch(() => {
      error = "An Unexpected Error occured while fetching data.";

      res.render("programming-contest/edit.ejs", {
        username: username,
        Team: Team,
        error: req.flash("error", error),
      });
    });
};

const postEditPC = (req, res) =>{
  const id = req.params.id;
  let error = ''

  console.log(id);

  ProgrammingContest.findOne({ _id: id }).then( (team) => {
      if (team) {
          const { 
              teamName,
              institution,
      
              coachName,
              coachContact,
              coachEmail,
              coachTshirt,
      
              m_name0,
              m_contact0,
              m_email0,
              m_tshirt0,
      
              m_name1,
              m_contact1,
              m_email1,
              m_tshirt1,
      
              m_name2,
              m_contact2,
              m_email2,
              m_tshirt2,
      
          } = req.body;

          team.teamName = teamName;
          team.institution = institution;

          team.coachName = coachName;
          team.coachContact = coachContact;
          team.coachEmail = coachEmail;
          team.coachTshirt = coachTshirt;

          team.m_name0 = m_name0;
          team.m_contact0 = m_contact0;
          team.m_email0 = m_email0;
          team.m_tshirt0 = m_tshirt0;

          team.m_name1 = m_name1;
          team.m_contact1 = m_contact1;
          team.m_email1 = m_email1;
          team.m_tshirt1 = m_tshirt1;

          team.m_name2 = m_name2;
          team.m_contact2 = m_contact2;
          team.m_email2 = m_email2;
          team.m_tshirt2 = m_tshirt2;

          team.save().then(()=>{
              error = "Team Data was edited successfully.";
              req.flash('error', error);
  
              console.log(error);
              res.redirect('/ProgrammingContest/list');
          }).catch(()=>{
              error = "Unknown Error occured and Data was not Edited."
              req.flash('error', error);
  
              console.log(error);
              res.redirect('/ProgrammingContest/list');
          });
      }
      else {
          error = "Unknown Error occured and Data was not Edited."
          req.flash('error', error);
  
          console.log(error);
          res.redirect('/ProgrammingContest/list');
      }
  })
}


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
