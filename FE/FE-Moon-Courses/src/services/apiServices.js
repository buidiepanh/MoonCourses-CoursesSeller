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

export const registerFunction = async (name, mail, pass) => {
  try {
    const result = await axios.post("/authen/register", {
      username: name,
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

export const paymentFunction = async (price) => {
  try {
    const result = await axios.post("/payment/create-payment", {
      amount: price,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const paymentCallback = async (url) => {
  try {
    const result = await axios.get(`/payment/vnpay-return${url}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsByCourseId = async (id) => {
  try {
    const result = await axios.get(`/comments?courseId=${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
