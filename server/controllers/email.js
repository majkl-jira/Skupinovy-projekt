const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'michaljira24@gmail.com', 
    pass: 'wrek gmim xaal kqlc'   
  }
});

exports.sendContactEmail = async (req, res) => {
  const { email, subject, message } = req.body;
  

  if (!email || !subject || !message) {
    return res.status(400).json({ message: 'Chybí email, předmět nebo zpráva' });
  }

  const mailOptions = {
    from: email,                       
    to: 'michaljira24@gmail.com',     
    subject: `Kontaktní formulář: ${subject}`, 
    text: `Od: ${email}\n\nZpráva: ${message}` 
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email byl úspěšně odeslán' });
  } catch (error) {
    console.error('Chyba při odesílání emailu:', error);
    res.status(500).json({ message: 'Email se nepodařilo odeslat' });
  }
};