const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");

//Use backticks `` when you want to insert a special parameter in a text

//Gets All Members
router.get("/", (req, res) => res.json(members));

//Get Single Member
router.get("/:id", (req, res) => {
  //Check if the member id exists
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

//Create Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }
  //members.save(newMember) if you have a database
  members.push(newMember);
  //res.json(members);
  res.redirect('/'); //redirects back to page after added member
});

// Update Member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        //if the name was sent on the request, if true then update the new name, if false keep old one.
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Delete Member
router.delete("/:id", (req, res) => {
  //Check if the member id exists
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Member Deleted",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
