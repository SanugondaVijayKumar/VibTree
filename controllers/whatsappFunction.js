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

const sendWhatsAppMessage = async (toPhoneNumber, messageBody) => {
  try {
    if (!isValidPhoneNumber(toPhoneNumber)) {
      throw new Error("Invalid phone number.");
    }

    const message = await client.messages.create({
      body: messageBody,
      from: `whatsapp:${process.env.FROM_WHATSAPP}`,
      to: `whatsapp:${process.env.TO_WHATSAPP}`,
    });

    return message.sid;
  } catch (error) {
    throw error;
  }
};

const whatsappFunction = async (req, res) => {
  let toPhoneNumber = req.body.to;
  if (!toPhoneNumber) {
    toPhoneNumber = "+917036862350";
  }
  let messageBody = req.body.message;
  if (!messageBody) {
    messageBody = "This is a whatsapp message from Vijay";
  }

  try {
    const messageSid = await sendWhatsAppMessage(toPhoneNumber, messageBody);
    res
      .status(200)
      .json({ message: "WhatsApp message sent successfully!", messageSid });
  } catch (error) {
    if (error.message === "Invalid phone number.") {
      res.status(400).json({ error: "Invalid phone number." });
    } else {
      console.error(error);
      res.status(500).json({ error: "Failed to send WhatsApp message." });
    }
  }
};

module.exports = whatsappFunction;
