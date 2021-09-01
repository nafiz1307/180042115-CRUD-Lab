const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function send(name,email,category,val,code32){
    const msg = {
        to: email, // Change to your recipient
        from: "joystmp+ulgc9@gmail.com", // Change to your verified sender
        subject: `${category} Registration`,
        text: `Hello ${name},
              You have successfully registered to ${category} your confirmation code is ${val}. Your key is ${code32}.
               Store the codes for futher use`,
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