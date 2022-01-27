const axios = require("axios");
const cheerio = require("cheerio");
const url = `https://www.iworkplc.com/contact`;

const getPhoneNumbers = async () => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const phoneNumbers = new Set();

    $("div._1Q9if > p > span").each((_idx, el) => {
      const text = $(el).text();
      const regex = /^\+\d/; // just checks for if it's start using + sign and if it's followed by a number
      if (regex.test(text)) {
        phoneNumbers.add(text);
      }
    });

    return [...phoneNumbers];
  } catch (error) {
    throw error;
  }
};

getPhoneNumbers().then((phoneNumbers) => {
  const regex = /^\+251/;
  let mobileNumber, officeNumber;

  if (regex.test(phoneNumbers[0])) {
    officeNumber = parseInt(phoneNumbers[0].slice(-4));
    mobileNumber = parseInt(phoneNumbers[1].slice(-4));
  } else {
    officeNumber = parseInt(phoneNumbers[1].slice(-4));
    mobileNumber = parseInt(phoneNumbers[0].slice(-4));
  }

  let result = officeNumber / mobileNumber;
  console.log(result);
});
