import * as bcrypt from "bcrypt";

//bcrypt akan menerima 2 parameter, yitu candidate password dan hashed password
export const comparePassword = async (candidatePassword: string, hashedPassword: string) => {
    return await bcrypt.compare(candidatePassword, hashedPassword);
};
//Disini butuh 1 parameter, yaitu password
export const hashPassword = async (password: string) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};
