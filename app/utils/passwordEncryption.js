const CryptoJS = require('crypto-js');
const { enc } = require('crypto-js');
const WordArray = CryptoJS.lib.WordArray;

const key = CryptoJS.enc.Hex.parse("47089c0b3fd0ba898cfd89cfa6b1de5a1bbd324cebd17a72f53c7df20cf8cf47"); // 128-bit key
let iv;

function encryptMessage(message) {
  iv = CryptoJS.lib.WordArray.random(16); // 128-bit IV

  const encrypted = CryptoJS.AES.encrypt(message, key, { iv: iv });
  const encryptedMessage = iv.concat(encrypted.ciphertext).toString(enc.Base64);
  
  return encryptedMessage;
}

export default encryptMessage;