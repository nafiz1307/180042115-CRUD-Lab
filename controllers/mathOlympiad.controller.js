const MathOlympiad = require("../models/MathOlympiad.model");

const getMO = (req, res) => {
  res.render("math-olympiad/register.ejs",{error:req.flash("error")});
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
    registrationFee == 250;
  } else if (category == "College") {
    registrationFee == 45;
  } else {
    registrationFee == 500;
  }

  const total = registrationFee;
  const paid = 0;
  const selected = false;

  let error = "";
  MathOlympiad.findOne({ name: name, contact: contact }).then((participant) => {
    if (participant) {
      error = "Participant with this name and contact number already exists!";
      console.log(error);
      req.flash('error',error);
      res.redirect("register");
    } else {
      const participant = new MathOlympiad({
        name,
        category,
        contact,
        email,
        institution,
        paid,
        total,
        selected,
        tshirt,
      });
      participant
        .save()
        .then(() => {
          error = "Partcipant has been registered succesfully!";
          console.log(error);
          req.flash('error',error);
          res.redirect("register");
        })
        .catch(() => {
          error = "Unexpected error has occured!";
          console.log(error);
          req.flash('error',error);
          res.redirect("register");
        });
    }
  });
};

const deleteMO = (req, res) => {
  const id = req.params.id;
  console.log(id);
  res.render("math-olympiad/list.ejs");
};
const getMOList = (req, res) => {
    let all_partcipant =[];
    let error="";
    MathOlympiad.find().then((data)=>{
        all_partcipant=data;
        res.render("math-olympiad/list.ejs",{
            error : req.flash('error'),
            participants : all_partcipant,
        });
    }).catch(()=>{
        error = 'Failed to fetch data!'
        res.render("math-olympiad/list.ejs",{
            error : req.flash('error',error),
            participants : all_partcipant,
        });
    })
  res.render("math-olympiad/list.ejs");
};

module.exports = { getMO, postMO, deleteMO, getMOList };
