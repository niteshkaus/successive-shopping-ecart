const bcrypt = require("bcrypt");
const crypto = require("crypto");

/**
 * Method to remove extra digit after decimal
 *
 * @param {*} value
 * @param {*} decimal
 */
const toDecimalFixed = (value, decimal = 2) => {
  let multiplier = Math.pow(10, decimal);
  return parseInt((value * multiplier).toString()) / multiplier;
};

/**
 * Method to retrieve login credentials from auth token
 *
 * @param {*} basic_auth
 */
const getCredentials = basic_auth => {
  try {
    const base64Credentials = basic_auth.split(" ")[1];
    // eslint-disable-next-line no-undef
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const credArray = credentials.split(":");
    return credArray;
  } catch (err) {
    return false;
  }
};

/**
 *
 * @param {*} str
 */
const isJson = str => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
};

/**
 *
 * @param {*} val
 * @param {*} hash
 */
const compareHash = (val, hash) => {
  // eslint-disable-next-line no-useless-catch
  try {
    hash = isJson(hash);
    if (Array.isArray(hash)) {
      hash = hash.pop();
    }
    return bcrypt.compareSync(val, hash);
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param {*} givenPassword
 * @param {*} savedPassword
 */
const isPasswordValid = (givenPassword, savedPassword) => {
  const isMatch = compareHash(givenPassword, savedPassword);
  return isMatch;
};

/**
 *
 * @param {*} user_id
 */
const generateAccessToken = user_id => {
  const token = `${crypto.randomBytes(32).toString("hex")}${user_id}`;
  return token;
};

/**
 *
 * @param {*} val
 */
const generateHash = val => {
  // eslint-disable-next-line no-useless-catch
  try {
    return bcrypt.hashSync(val, 10);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  toDecimalFixed,
  getCredentials,
  isPasswordValid,
  generateAccessToken,
  generateHash
};
