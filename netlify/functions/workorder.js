import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
  try {
    console.log("Work order function triggered");
    console.log("Event body:", event.body);
    
    const { name, email, company, projectType, details } = JSON.parse(event.body);
    console.log("Parsed data:", { name, email, company, projectType, details });

    const projectTypeLabel = {
      intelligence: "Intelligence & Security Systems",
      climate: "Environmental & Climate Systems",
      platform: "Location-Based Platforms",
      simulation: "Intelligent Systems & Simulation",
      other: "Other Custom Solution"
    }[projectType] || projectType;

    const response = await resend.emails.send({
      from: "OzCore Labs <Teams@ozcorelabs.com>",
      to: ["ozcorelabs.info@gmail.com"],
      reply_to: email,
      subject: `New Work Order Request from ${name}`,
      html: `
        <h2>New Work Order Request</h2>
        <hr />
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company/Organization:</strong> ${company}</p>
        
        <h3>Project Details</h3>
        <p><strong>Project Type:</strong> ${projectTypeLabel}</p>
        <p><strong>Details & Objectives:</strong></p>
        <p>${details.replace(/\n/g, "<br />")}</p>
        
        <hr />
        <p><small>Submitted via ozcorelabs.com Work Order Form</small></p>
      `,
    });

    console.log("Email sent successfully:", response);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Work order submitted successfully" }),
    };
  } catch (error) {
    console.error("ERROR in workorder function:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
}
