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

const makeCall = async (toPhoneNumber) => {
  try {
    if (!isValidPhoneNumber(toPhoneNumber)) {
      throw new Error("Invalid phone number.");
    }

    const call = await client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml",
      to: `${process.env.TO_PHONE_NUMBER}`,
      from: `${process.env.FROM_PHONE_NUMBER}`,
    });

    return call.sid;
  } catch (error) {
    throw error;
  }
};

const callFunction = async (req, res) => {
  let toPhoneNumber = req.body.to;
  if (!toPhoneNumber) {
    toPhoneNumber = "+917036862350";
  }

  try {
    const callSid = await makeCall(toPhoneNumber);
    res.status(200).json({ message: "Call initiated successfully!", callSid });
  } catch (error) {
    if (error.message === "Invalid phone number.") {
      res.status(400).json({ error: "Invalid phone number." });
    } else {
      console.error(error);
      res.status(500).json({ error: "Failed to initiate call." });
    }
  }
};

module.exports = callFunction;
