const express = require("express");
require("dotenv").config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require("twilio")(accountSid, authToken);

const isValidPhoneNumber = (phoneNumber) => {
  if (phoneNumber && phoneNumber.length > 0) {
    return true;
  }
  return false;
};

const smsFunction = (req, res, next) => {
  let toPhoneNumber = req.body.to;
  if (!toPhoneNumber) {
    toPhoneNumber = "+917036862350";
  }

  if (!isValidPhoneNumber(toPhoneNumber)) {
    return res.status(400).json({ error: "Invalid phone number." });
  }

  client.messages
    .create({
      body: "Hello, This is Vijay Kumar",
      from: `${process.env.FROM_PHONE_NUMBER}`,
      to: `${process.env.TO_PHONE_NUMBER}`,
    })
    .then((message) => {
      console.log(message.sid);
      res.status(200).json({ message: "SMS sent successfully!" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to send SMS" });
    });
};

module.exports = smsFunction;
