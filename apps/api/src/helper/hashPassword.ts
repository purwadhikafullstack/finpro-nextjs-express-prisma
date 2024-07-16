import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

export const comparePassword = async (passwordReq: string, passwordDb: string) => {
  try {
    const isMatch = await bcrypt.compare(passwordReq, passwordDb);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};
