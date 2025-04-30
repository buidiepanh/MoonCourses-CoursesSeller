import axios from "../ultil/axios.customize";

//=========== USER API ==============
export const getAllCategories = async () => {
  try {
    const result = await axios.get("/categories");
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginFunction = async (mail, pass) => {
  try {
    const result = await axios.post("/authen/login", {
      email: mail,
      password: pass,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAuthenticatedUser = async () => {
  try {
    const result = await axios.get("/users/authenticated-user");
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCourses = async () => {
  try {
    const result = await axios.get("/courses");
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
