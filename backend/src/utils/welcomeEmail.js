export const welcomeEmailTemplate = (fullName) => {
  return `
    <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
      <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px;">

        <h2 style="color:#4f46e5;">Welcome to ChatSphere 💬</h2>

        <p>Hi <b>${fullName}</b>,</p>

        <p>
          We're excited to have you on board. ChatSphere helps you connect and chat in real time.
        </p>

        <p>Start exploring now by clicking the button below:</p>

        <a href="${process.env.CHATSPHERE_URL}" target="_blank"
           style="
             display:inline-block;
             padding:12px 20px;
             background:#4f46e5;
             color:#fff;
             text-decoration:none;
             border-radius:6px;
             font-weight:bold;
             margin-top:10px;
           ">
          Go to ChatSphere 🚀
        </a>

        <p style="margin-top:20px; font-size:12px; color:gray;">
          If you didn’t sign up, you can ignore this email.
        </p>

        <p style="margin-top:30px;">
          Thanks,<br/>
          <b>ChatSphere Team</b>
        </p>

      </div>
    </div>
  `;
};
