import fs from "fs";
import {resolve, dirname} from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const forgotPasswordMailContent={
    subject:"Password Reset",
    html:fs.readFileSync(resolve(__dirname,'../' ,'view', 'forgot-password-template.html'), 'utf-8'),
    from:"",
    to:"" 
}

export const UserRegistrationMailContent={
    subject:"Welcome to NextGen Estate",
    html:fs.readFileSync(resolve(__dirname,'../' ,'view', 'user-registration-template.html'), 'utf-8'),
    from:"",
    to:"" 
}

console.log(forgotPasswordMailContent);

