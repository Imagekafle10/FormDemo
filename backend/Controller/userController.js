import {
  deleteUserById,
  getAllUser,
  getFullOuterUserWithSkill,
  getLeftUserWithSkill,
  getRightUserWithSkill,
  getSkillResumeUser,
  getUserByID,
  getUserResume,
  getUserResumeByID,
  updatedUserById,
} from "../Model/userModel.js";

export const getMeController = async (req, res, next) => {
  try {
    const id = req.user.user_id;
    const users = await getUserByID(id);
    if (!users) {
      next("No User Found");
    }

    const userResume = await getUserResumeByID(id);
    if (!userResume) {
      next("No Resume Found");
    }

    res.status(201).json({
      sucess: true,
      users,
      userResume,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const getUserController = async (req, res, next) => {
  try {
    const users = await getAllUser();
    if (!users) {
      next("No User Found");
    }

    const userResume = await getUserResume();
    if (!userResume) {
      next("No Resume Found");
    }

    res.status(201).json({
      sucess: true,
      users,
      userResume,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updatedUser = await updatedUserById(id, data);

    if (!updatedUser) {
      return next("User not Updated");
    }

    res.status(200).json({
      success: true,
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedUser = await deleteUserById(id);

    if (!deletedUser) {
      return next("Deleted unSucessfull");
    }

    res.status(200).json({
      success: true,
      message: "Deleted Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

//Inner Join
export const getInnereJoinController = async (req, res, next) => {
  try {
    const getAll = await getSkillResumeUser();
    res.status(200).json({
      success: true,
      getAll,
    });
  } catch (error) {
    next(error);
  }
};

//Left join users amd Skill
export const getLeftJoinController = async (req, res, next) => {
  try {
    const leftJoinUserandSkill = await getLeftUserWithSkill();

    res.status(201).json({
      success: true,
      leftJoinUserandSkill,
    });
  } catch (error) {
    next(error);
  }
};

//Right join users amd Skill
export const getRightJoinController = async (req, res, next) => {
  try {
    const rightJoinUserandSkill = await getRightUserWithSkill();

    res.status(201).json({
      success: true,
      rightJoinUserandSkill,
    });
  } catch (error) {
    next(error);
  }
};

//Right join users amd Skill
export const getFullOuterJoinController = async (req, res, next) => {
  try {
    const rightJoinUserandSkill = await getFullOuterUserWithSkill();

    res.status(201).json({
      success: true,
      rightJoinUserandSkill,
    });
  } catch (error) {
    next(error);
  }
};
