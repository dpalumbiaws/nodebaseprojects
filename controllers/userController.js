import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";
import colors from "colors";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { phonenumber } = req.body;
  const user = await User.findOne({ phonenumber });
  if (user) {
    res.json({
      _id: user._id,
      phonenumber: user.phonenumber,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Contraseña o Email Inválido");
  }
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find({}).lean().exec();
  if (user) {
    res.status(200).json({ data: user });
  } else {
    res.status(400);
    throw new Error("Ocurrió un Problema Al solicitar los Datos del Servidor");
  }
});

// @desc  Register a  New User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  // is admin parameter must not be allowed in production this is just for easy user creation process
  const { phonenumber } = req.body;
  const userExist = await User.findOne({ phonenumber }).lean().exec();
  if (userExist) {
    res.status(400);
    throw new Error("El Usuario que Intenta Crear Ya Existe");
  }
  const user = await User.create({ phonenumber });
  if (user) {
    res.status(201).json({
      _id: user._id,
      phonenumber: user.phonenumber,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("check required parameters request");
  }
});

// @desc     Get user  by ID
// @route    Get api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .lean()
    .exec();
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

// @desc     DELETE user profile
// @route    DELETE api/users/profile
// @access Private/Admin
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.status(200).json({ message: "Usuario Eliminado" });
  } else {
    res.status(400);
    throw new Error("El Usuario que Intenta Eliminar No Existe");
  }
});

// @desc     UPDATE user  by ID
// @route    UPDATE api/users/:id
// @access Private/Admin
const updeateUserById = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id).select("-password");
  if (user) {
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.status(200).json({ updatedUser });
  } else {
    throw new Error("there was a problem updating user", e);
    res.status(400)
  }
});

// @desc      Get user profile
// @route    GET api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("there is no user with that id");
  }
});

// @desc     Update user profile
// @route    PUT api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.phoneCountry = req.body.phoneCountry || user.phoneCountry;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(400);
    throw new Error("there is no user to update");
  }
});

const userController = {
  getUsers,
  registerUser,
  getUserById,
  deleteUserById,
  updeateUserById,
  authUser,
  getUserProfile,
  updateUserProfile,
};

export default userController;
