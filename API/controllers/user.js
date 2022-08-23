import { User } from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const usersList = await User.find({});
    return res.json({
      message: "users retrieved successfully",
      data: usersList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const addUser = async (req, res) => {
  const { firstName, lastName, email, sex, age } = req.body;
  try {
    const newUser = await new User({
      firstName,
      lastName,
      email,
      sex,
      age,
    });
    await newUser.validate();
    await newUser.save();
    return res.json({ message: "user saved successfully", user: newUser });
  } catch (err) {
    return res.json({ message: "something went wrong", detailedMessage: err });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, sex, age } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        firstName,
        lastName,
        email,
        sex,
        age,
      },
      { runValidators: true, new: true }
    );
    return res.json({ message: "updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "something went wrong", detailedMessage: error });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findOneAndDelete({ _id: id });
    return res.status(200).json({ message: "user removed successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", detailedMessage: error });
  }
};
