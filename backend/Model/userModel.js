import { response } from "express";
import { getConn } from "../Database/connectDB.js";

export async function InsertInUsers({
  firstname,
  lastname,
  email,
  password,
  gender,
  status,
  description,
  resumepath,
}) {
  const conn = await getConn();

  const [result] = await conn.execute(
    "Insert into users(firstname, lastname, email, password, gender, status, description ) values (?,?,?,?,?,?,?)",
    [firstname, lastname, email, password, gender, status, description]
  );

  if (result.affectedRows > 0) {
    const [rows] = await conn.execute("SELECT * FROM users WHERE user_id = ?", [
      result.insertId,
    ]);
    return rows[0];
  } else {
    return null;
  }
}

export async function InsertInSkills(uid, skill) {
  const conn = await getConn();
  const [result] = await conn.execute(
    "INSERT INTO skills (user_id, skill_name) VALUES (?,?)",
    [uid, skill]
  );

  if (result.affectedRows > 0) {
    const [rows] = await conn.execute(
      "SELECT * FROM skills WHERE skill_id = ?",
      [result.insertId]
    );
    return rows[0];
  } else {
    return null;
  }
}

export async function InsertInResume(uid, resume) {
  const conn = await getConn();
  const [result] = await conn.execute(
    "INSERT INTO resumes (user_id, resume_file) VALUES (?,?)",
    [uid, resume]
  );

  if (result.affectedRows > 0) {
    const [rows] = await conn.execute(
      "SELECT * FROM resumes WHERE resume_id = ?",
      [result.insertId]
    );
    return rows[0];
  } else {
    return null;
  }
}

export async function getUserByID(id) {
  try {
    const conn = await getConn();

    const [result] = await conn.execute(
      `SELECT * FROM users WHERE user_id = ?`,
      [id]
    );

    // check if any user found
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserResumeByID(user_id) {
  const conn = await getConn();
  const id = user_id || req.user.user_id;
  const [result] = await conn.execute(
    "Select *from resumes where user_id = ?",
    [id]
  );

  return result.length > 0 ? result : null;
}

export async function getAllUser() {
  const conn = await getConn();
  const [rows] = await conn.execute("Select *from users");

  return rows.length > 0 ? rows : null;
}

export async function getUserResume() {
  const conn = await getConn();
  const [result] = await conn.execute("Select *from resumes");

  return result.length > 0 ? result : null;
}

export async function getUserByUsername(username) {
  try {
    const conn = await getConn();

    const [result] = await conn.execute(
      `SELECT * FROM users WHERE firstname = ?`,
      [username]
    );

    // check if any user found
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.log(error);
  }
}

export async function updatedUserById(id, data) {
  const conn = await getConn();

  const fields = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(",");
  const values = Object.values(data);

  const [result] = await conn.execute(
    `Update users Set ${fields} where user_id = ?`,
    [...values, id]
  );

  if (result.affectedRows === 0) {
    null;
  }

  const [response] = await conn.execute(
    "Select *from users where user_id = ?",
    [id]
  );

  return response.length > 0 ? response[0] : null;
}

export async function deleteUserById(id) {
  const conn = await getConn();

  const [result] = await conn.execute(`Delete From users where user_id = ?`, [
    id,
  ]);

  return response.affectedRows > 0 ? true : null;
}

export async function getSkillResumeUser() {
  const conn = await getConn();

  const [result] = await conn.execute(
    `Select  users.firstname, users.lastname, users.gender, skills.skill_name, resumes.resume_file
       From users
       Inner join skills on users.user_id = skills.user_id
       Inner join resumes on users.user_id = resumes.user_id  `
  );

  return result.length > 0 ? result : null;
}

export async function getLeftUserWithSkill() {
  const conn = await getConn();
  const [result] = await conn.execute(
    `Select users.firstname, users.email , skills.skill_name
    from users
    left join skills on users.user_id = skills.user_id
    `
  );
  return result.length > 0 ? result : null;
}

export async function getRightUserWithSkill() {
  const conn = await getConn();
  const [result] = await conn.execute(
    `Select users.firstname, users.email , skills.skill_name
    from users
    right join skills on users.user_id = skills.user_id
    `
  );
  return result.length > 0 ? result : null;
}

export async function getFullOuterUserWithSkill() {
  const conn = await getConn();
  const [result] = await conn.execute(
    `SELECT users.firstname, users.email, skills.skill_name, resumes.resume_file
FROM users
Left JOIN skills ON users.user_id = skills.user_id
Right JOIN resumes ON users.user_id = resumes.user_id

union 

SELECT users.firstname, users.email, skills.skill_name, resumes.resume_file
FROM users
Right JOIN skills ON users.user_id = skills.user_id
Right JOIN resumes ON users.user_id = resumes.user_id 
`
  );
  return result.length > 0 ? result : null;
}
