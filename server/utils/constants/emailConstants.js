const fs=require('fs');
const path=require('path');

const forgotPasswordMailContent={
    subject:"Password Reset",
    html:fs.readFileSync(path.resolve(__dirname,'../' ,'view', 'forgot-password-template.html'), 'utf-8'),
    from:"",
    to:"" 
}

const userRegistrationMailContent={
    subject:"Welcome to NextGen Estate",
    html:fs.readFileSync(path.resolve(__dirname,'../' ,'view', 'user-registration-template.html'), 'utf-8'),
    from:"",
    to:"" 
}

const propertyRegistrationMailContent={
    subject:"Welcome to NextGen Estate",
    html:fs.readFileSync(path.resolve(__dirname,'../' ,'view', 'property-registration-template.html'), 'utf-8'),
    from:"",
    to:"" 
}

module.exports={forgotPasswordMailContent,userRegistrationMailContent,propertyRegistrationMailContent}
