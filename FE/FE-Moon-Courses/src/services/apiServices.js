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
