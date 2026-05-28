import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
  try {
    console.log("Function triggered");
    console.log("Event body:", event.body);
    
    const { name, email, subject, message } = JSON.parse(event.body);
    console.log("Parsed data:", { name, email, subject, message });

    const response = await resend.emails.send({
      from: "OzCore Labs <Teams@ozcorelabs.com>",
      to: ["ozcorelabs.info@gmail.com"], // oswaldopadilla is great
      reply_to: email,
      subject: subject || `New message from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log("Email sent successfully:", response);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("ERROR in contact function:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
}