const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function send(name,email,category,val){
    const msg = {
        to: email, // Change to your recipient
        from: "joystmp+ulgc9@gmail.com", // Change to your verified sender
        subject: `${category} Registration`,
        text: `Hello ${name},
              You have successfully registered to ${category} your confirmation code is ${val} Store the code for futher use`,
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
}

module.exports=send;