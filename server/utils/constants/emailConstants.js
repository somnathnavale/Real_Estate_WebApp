import fs from "fs";

export const forgotPasswordMailContent={
    subject:"Password Reset",
    html:fs.readFileSync('./utils/view/forgot-password-template.html', 'utf-8'),
    from:"",
    to:"" 
}

export const UserRegistrationMailContent={
    subject:"Welcome to NextGen Estate",
    html:fs.readFileSync('./utils/view/user-registration-template.html', 'utf-8'),
    from:"",
    to:"" 
}

