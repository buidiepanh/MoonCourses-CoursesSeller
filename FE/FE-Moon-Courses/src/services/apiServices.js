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

export const getAllUsers = async () => {
  try {
    const result = await axios.get("/users");
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

export const updateCommentLikes = async (commentId, alreadyLiked) => {
  try {
    const result = await axios.put(`/comments/${commentId}`, {
      liked: alreadyLiked,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const postComment = async (courseId, content) => {
  try {
    const result = await axios.post("/comments", {
      content: content,
      course: courseId,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

//=========== TEACHER API =======================
export const postNewCourse = async (
  name,
  pic,
  des,
  rate,
  price,
  cate,
  author
) => {
  try {
    const result = await axios.post("/courses", {
      title: name,
      image: pic,
      description: des,
      rating: rate,
      price: price,
      category: cate,
      author: author,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCourse = async (
  courseId,
  name,
  pic,
  des,
  rate,
  price,
  cate
) => {
  try {
    const result = await axios.put(`/courses/${courseId}`, {
      title: name,
      image: pic,
      description: des,
      rating: rate,
      price: price,
      category: cate,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCourse = async (id) => {
  try {
    const result = await axios.delete(`/courses/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
