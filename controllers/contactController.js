const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const asyncHandler = require('express-async-handler');
// const Contact = require('../models/contactmodel');
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contacts = await prisma.contact.findMany({
      where: { user_id: req.user.id },
    });
  
    res.status(200).json(contacts);
});
  

//@desc Create new contacts
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body: ", req.body);
    const { name, email, phone } = req.body;
  
    if (!name || !email || !phone) {
      res.status(400).json({ error: "Invalid" });
      return;
    }
  
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });
  
    res.status(201).json(contact);
});
  


//@desc Get contacts
//@route GET /api/contacts/:id
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contact = await prisma.contact.findUnique({
      where: { id: req.params.id },
    });
  
    if (!contact) {
      res.status(404).json({ error: "Contact not found" });
      return;
    }
  
    res.status(200).json(contact);
});
  

//@desc Update contacts
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await prisma.contact.findUnique({
      where: { id: req.params.id },
    });
  
    if (!contact) {
      res.status(404).json({ error: "Contact not found" });
      return;
    }
  
    if (contact.user_id !== req.user.id) {
      res.status(403).json({ error: "You are not authorized to update this contact" });
      return;
    }
  
    const updatedContact = await prisma.contact.update({
      where: { id: req.params.id },
      data: req.body,
    });
  
    res.status(200).json(updatedContact);
});
  


//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await prisma.contact.findUnique({
      where: { id: req.params.id },
    });
  
    if (!contact) {
      res.status(404).json({ error: "Contact not found" });
      return;
    }
  
    if (contact.user_id !== req.user.id) {
      res.status(403).json({ error: "You are not authorized to delete this contact" });
      return;
    }
  
    await prisma.contact.delete({
      where: { id: req.params.id },
    });
  
    res.status(201).json(contact);
});
  

module.exports = {getContact, createContact, getContacts, updateContact, deleteContact}
