const User = require("../model/userModel");

module.exports = {
  get_list: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.find({});
        if (user) {
          resolve({
            success: true,
            user,
          });
        }
      } catch (error) {
        reject({
          success: false,
          data: error.message,
        });
      }
    });
  },
  get_one: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ _id: userId });
        if (user) {
          resolve({
            success: true,
            user,
          });
        }
      } catch (error) {
        reject({
          success: false,
          data: error.message,
        });
      }
    });
  },
  get_user_by_username: (username) => {

    return new Promise(async (resolve, reject) => {
      try {
        // function diacriticSensitiveRegex(string) {
        //   return string.replace(/a/g, '[a,á,à,ä,â]')
        //      .replace(/e/g, '[e,é,ë,è]')
        //      .replace(/i/g, '[i,í,ï,ì]')
        //      .replace(/o/g, '[o,ó,ö,ò]')
        //      .replace(/u/g, '[u,ü,ú,ù]');
        // }

        // const text =  diacriticSensitiveRegex (username); 
        const user = await User.find({ username: { $regex: username } });
        if (user) {
          resolve({
            success: true,
            user,
          });
        }
      } catch (error) {
        reject({
          success: false,
          data: error.message,
        });
      }
    });
  },
  get_by_id: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ _id: userId });
        if (user) {
          resolve({
            success: true,
            user,
          });
        }
      } catch (error) {
        reject({
          success: false,
          data: error.message,
        });
      }
    });
  },
  update_image_cover: (userId, img) => {
    return new Promise(async (resolve, reject) => {
      try {
        const _user = await User.find({ _id: userId });
        if (_user) {
          const user = await User.findByIdAndUpdate(
            { _id: userId },
            {
              avatarCover: img,
            },
            { new: true }
          );
          resolve({
            code: 200,
            success: true,
            user,
            message: "update img success !",
          });
        }
      } catch (error) {
        reject({
          code: 200,
          success: false,
          post: error.message,
        });
      }
    });
  },
  update_avatar_user: (userId, img) => {
    return new Promise(async (resolve, reject) => {
      try {
        const _user = await User.find({ _id: userId });
        if (_user) {
          const user = await User.findByIdAndUpdate(
            { _id: userId },
            {
              avatar: img,
            },
            { new: true }
          );
          resolve({
            code: 200,
            success: true,
            user,
            message: "update img success !",
          });
        }
      } catch (error) {
        reject({
          code: 200,
          success: false,
          post: error.message,
        });
      }
    });
  },
  update_profile_user: (userId, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.find({ _id: userId });
        if (user) {
          await User.findByIdAndUpdate(
            { _id: userId },
            {
              profile: {
                story: "",
                school: data.school,
                livePlace: data.livePlace,
                homeTown: data.homeTown,
              },
            },
            { new: true }
          );
        }
        resolve({
          code: 200,
          success: true,
          message: "update user success !",
        });
      } catch (error) {
        reject({
          code: 200,
          success: false,
          post: error.message,
        });
      }
    });
  },
};
