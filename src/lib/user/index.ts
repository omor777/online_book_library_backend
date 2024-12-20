import User, { IUser } from "../../model/user.model";

const createUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  const user = new User({
    username,
    email,
    password,
  });
  await user.save();

  return { ...user.toObject(), id: user.id };
};

const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user ? user : false;
};

const userExist = async (email: string) => {
  const user = await findUserByEmail(email);
  return user ? true : false;
};

const userServices = {
  userExist,
  createUser,
  findUserByEmail,
};

export default userServices;
