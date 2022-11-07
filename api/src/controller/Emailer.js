const nodemailer = require("nodemailer")
async function EmeilerConfig  ( email, name) {

  try {
    //const {msj}=req.query
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'clouthes4crew@gmail.com', // generated ethereal user
        pass: 'ipoyzqrtrgjkjyfq', // generated ethereal password
      },
    });

    transporter.sendMail({
      from: '"Welcome ' + name + '" <clothes4crew@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Welcome " + name, // Subject line
      // text:  // plain text body
      html: 
      `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
          <style>
              p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
              h1{ font-size: 30px !important;}
              h2{ font-size: 25px !important;}
              h3{ font-size: 18px !important;}
              h4{ font-size: 16px !important;}
              p, a{font-size: 15px !important;}
      
              .claseBoton{
                  width: 30%;
                      background-color: #000000;
                      border: 2px solid #030303;
                      color: rgb(255, 255, 255); 
                      padding: 16px 32px;
                      text-align: center;
                      text-decoration: none;
                      font-weight: bold;
                      display: inline-block;
                      font-size: 16px;
                      margin: 4px 2px;
                      transition-duration: 0.4s;
                      cursor: pointer;
              }
              .claseBoton:hover{
                  background-color: #fffcfc;
                  color: #000000;
              }
              .imag{
                  width: 20px;
                  height: 20px;
              }
              .contA{
                  margin: 0px 5px 0 5px;
              }
              .afooter{
                  color: #ffffff !important; 
                  text-decoration: none;
                  font-size: 13px !important;
              }
          </style>
      </head>
      <body>
          <div style="width: 100%; background-color: #e3e3e3;">
              <div style="padding: 20px 10px 20px 10px;">
                  <!-- Imagen inicial -->
                  <div style="background-color: #000000; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                      <img src="https://res.cloudinary.com/dymfd1z8t/image/upload/v1667331443/nmrpuhp8dhdjxvjkpag4.jpg" alt="" style="width: 200px; height: 60px;">
                  </div>
                  <!-- Imagen inicial -->
      
                  <!-- Contenido principal -->
                  <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                      <h1>Gracias por registrarte en Clothes 4Crew</h1>
                      <p>The Clothes 4Crew team is very pleased with your
                           new registration. We invite you to visit
                           our digital platform and see all our offers..
                      </p>
      
                      <!-- Gracias -->
                      <p>Thanks for your time.</p>
                      <p style="margin-bottom: 50px;"><i>Sincerely:</i><br>Team of Clothes 4Crew</p>
      
                      <!-- Botón -->
                      <a class="claseBoton" href="https://clothes-4-crew.vercel.app/">Clothes 4Crew</a>
                  </div>
                  <!-- Contenido principal -->
      
                  <!-- Footer -->
                  <div style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
      
                      <h4>Support</h4>
                      <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                          Contact us by the following means:<br>
                          Mail: <a class="afooter" href="mailto:proyectos@pretwor.com">proyectos@pretwor.com</a><br>
                      </p>
                      <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                          © 2022 Clothes 4Crew, All rights reserved.
                      </p>
                  </div>
                  <!-- Footer -->
      
      
      
              </div>
          </div>
      </body>
      </html>`
    });
    return 'email enviado con exito'
  } catch (e) {
    console.error(e);
    return 'error email'
  }
}
module.exports = { EmeilerConfig }