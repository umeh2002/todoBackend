import express, { Request, Response } from "express";
import authModel from "../Model/authModel";
import bcrypt from "bcrypt";

export const createUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { userName, password, email,confirmPassword } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    if(password !== confirmPassword){
     return res.status(400).json({error:"Confirm password must be password"})
    }
   
    const user = await authModel.create({
      userName,
      password: hash,
      confirmPassword: hash,
      email,
      avatar:userName?.charAt(0),
    });

    
    return res.status(201).json({
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "cannot create user",
      data: error.message,
    });
  }
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const sign = await authModel.findOne({ email });
    const hash = await bcrypt.compare(password, sign?.password!);
    if (sign) {
      if (hash) {
        return res.status(201).json({
          message: `welcome back ${sign.userName}`,
          data:sign
        });
      } else {
        return res.status(404).json({
          message: "password is invalid",
        });
      }
    } else {
      return res.status(404).json({
        message: "user is not logged in",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "cannot sign in user",
      data: error.message,
    });
  }
};

export const readAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allUsers = await authModel.find();
    return res.status(200).json({
      message: "can view all users",
      data: allUsers,
    });
  } catch (error) {
    return res.status(404).json({
      message: "user not found",
      data: error.message,
    });
  }
};

export const readOneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const oneUser = await authModel.findById(id);
    return res.status(200).json({
      message: "can see a user",
      data: oneUser,
    });
  } catch (error) {
    return res.status(404).json({
      message: "cannot view one user",
      data: error.message,
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { userName, avatar } = req.body;
    const user = await authModel.findByIdAndUpdate(
      id,
      {
        userName,
        avatar,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "sucessfully updated user",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error updating user",
      data: error.message,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const user = await authModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "user deleted successfully",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "cannot delete user",
    });
  }
};
