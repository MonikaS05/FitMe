// project/server/config/emailService.js

import nodemailer from 'nodemailer';

// FIX: Change function signature to accept a single destructured object 
// containing the keys sent from orderController.js.
export const sendOrderNotification = async ({
    recipientEmail, // <-- This is the key holding the tailor's email address
    recipientName,
    recipientRole,
    customerName,
    garmentType,
    orderId
}) => {
    
    // Define the correct URL for the dashboard based on the recipient's role
    // We can also add a placeholder for the customer dashboard if needed for a different email type.
    const TAILOR_DASHBOARD_URL = process.env.TAILOR_DASHBOARD_URL || 'http://localhost:5173/tailor/dashboard';
    const CUSTOMER_DASHBOARD_URL = process.env.CUSTOMER_DASHBOARD_URL || 'http://localhost:5173/dashboard';

    const dashboardLink = recipientRole === 'tailor' 
        ? TAILOR_DASHBOARD_URL 
        : CUSTOMER_DASHBOARD_URL;
    
    // 1. Create a "transporter"
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // 2. Define Mail Options
    const mailOptions = {
        from: `"FitMe App" <${process.env.EMAIL_USER}>`, 
        // FIX: Use the destructured key for the recipient address
        to: recipientEmail, 
        subject: `New Stitching Request Received: Order #${orderId}`, 
        
        // Plain text body
        text: `Hi ${recipientName},
You have received a new stitching request (Order ID: ${orderId}) from ${customerName} for a ${garmentType}.
Please log in to your FitMe dashboard to view the details and accept the order.

Order Link: ${dashboardLink}

Thank you,
The FitMe Team`,
        
        // HTML body
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                <h2 style="color: #059669;">New Order Alert!</h2>
                <p>Hi <strong>${recipientName}</strong>,</p>
                <p>You have received a new stitching request (<strong>Order ID: ${orderId}</strong>) from <strong>${customerName}</strong> for a <strong>${garmentType}</strong>.</p>
                <p>Please click the button below to view the full order details and accept the request:</p>
                
                <a href="${dashboardLink}" style="background-color: #059669; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 15px; font-weight: bold;">
                    Go to Tailor Dashboard
                </a>
                
                <br>
                <p style="margin-top: 25px;">Thank you,<br>The FitMe Team</p>
                <p style="font-size: 0.8em; color: #999;">If the button doesn't work, copy and paste this link: ${dashboardLink}</p>
            </div>
        `,
    };

    // 3. Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Order notification email sent to: ${recipientEmail}`);
    } catch (error) {
        console.error(`Error sending email to ${recipientName}:`, error);
        // Log the error but don't re-throw to avoid failing the order transaction
    }
};