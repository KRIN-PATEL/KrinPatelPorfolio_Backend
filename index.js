// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Contact API is running");
// });

// app.post("/send", async (req, res) => {
//   try {
//     const { name, email, phone, message } = req.body;

//     if (!name || !email || !message) {
//       return res.status(400).json({ success: false, message: "Missing fields" });
//     }

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.SMTP_EMAIL,
//         pass: process.env.SMTP_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: `"${name}" <${email}>`,
//       to: process.env.SMTP_EMAIL,
//       subject: "New Contact Form Submission",
//       html: `
//         <div style="max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;font-family:sans-serif;background:#fff">
//           <div style="padding:20px;text-align:center;">
//             <img src="https://res.cloudinary.com/krinpatel/image/upload/v1747060364/KP_l0qo7f.png" alt="Logo" style="height:90px;margin-bottom:10px;" />
//             <h2 style="color:#222;margin:0;">New Contact Form Submission</h2>
//           </div>

//           <div style="padding:30px">
//             <p><strong>Name:</strong> ${name}</p>
//             <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
//             <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
//             <p><strong>Message:</strong></p>
//             <div style="border:1px solid #ccc;padding:15px;border-radius:5px;background:#f9f9f9;">
//               ${message}
//             </div>
//           </div>

//           <hr style="border:none;border-top:1px solid #e0e0e0;margin:20px 0"/>

//           <div style="text-align:center;padding:15px;font-size:14px;color:#777;">
//             You received this message via the contact form on your <strong>Portfolio</strong> website.<br />
            
//           </div>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     return res.status(200).json({ success: true, message: "Email sent successfully" });
//   } catch (err) {
//     console.error("Error sending email:", err);
//     return res.status(500).json({ success: false, message: "Email sending failed" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Allow only your deployed frontend
app.use(cors({
  origin: "https://krinpatelporfolio-frontend.onrender.com",
}));

app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("Contact API is running");
});

app.post("/send", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.SMTP_EMAIL,
      subject: "New Contact Form Submission",
      html: `
        <div style="max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;font-family:sans-serif;background:#fff">
          <div style="padding:20px;text-align:center;">
            <img src="https://res.cloudinary.com/krinpatel/image/upload/v1747060364/KP_l0qo7f.png" alt="Logo" style="height:90px;margin-bottom:10px;" />
            <h2 style="color:#222;margin:0;">New Contact Form Submission</h2>
          </div>
          <div style="padding:30px">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Message:</strong></p>
            <div style="border:1px solid #ccc;padding:15px;border-radius:5px;background:#f9f9f9;">
              ${message}
            </div>
          </div>
          <hr style="border:none;border-top:1px solid #e0e0e0;margin:20px 0"/>
          <div style="text-align:center;padding:15px;font-size:14px;color:#777;">
            You received this message via the contact form on your <strong>Portfolio</strong> website.
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({ success: false, message: "Email sending failed" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
