const express = require("express");
const router = express.Router();
const Employee = require("../model/employees");

//Rendering Employee
router.get("/", (req, res) => {
  Employee.find({})
    .then((employees) => {
      res.render("index", { employees: employees });
    })
    .catch((err) => {
      req.flash('error_message','ERROR:' +err)
      res.redirect('/');
    });
});

//Router to Add Employee
router.get("/employee/add-employee", (req, res) => {
  res.render("add-employee");
});

//Router to Search Form
router.get("/employee/search", (req, res) => {
  res.render("search",{ employee: "" });
});


//Get current Employee
router.get("/employee", (req, res) => {
  const searchQuery = { name: req.query.name };

  Employee.findOne(searchQuery)
    .then((employee) => {
      res.render("search", { employee: employee });
    })
    .catch((err) => {
      req.flash('error_message','ERROR:' +err)
      res.redirect('/');
    });
});

//Router to Update Form
router.get("/update/:id", (req, res) => {
  const searchQuery = { _id: req.params.id };
  Employee.findOne(searchQuery)
    .then((employee) => {
      res.render("update-employee", { employee: employee });
    })
    .catch((err) => {
    req.flash('error_message','ERROR:' +err)
    res.redirect('/');
    });
});

//Post Employee
router.post("/employee/add-employee", (req, res) => {
  const newEmployee = {
    name: req.body.name,
    designation: req.body.designation,
    salary: req.body.salary,
  };
  Employee.create(newEmployee)
    .then((employee) => {
      req.flash('success_message','Employee data added to database successfully.')
      res.redirect("/");
    })
    .catch((err) => {
      req.flash('error_message','ERROR:' +err)
      res.redirect('/');
    });
});

//Post Update Employee

router.put("/update/:id", (req, res) => {
  const searchQuery = { _id: req.params.id };

  Employee.updateOne(searchQuery, {
    $set: {
      name: req.body.name,
      designation: req.body.designation,
      salary: req.body.salary,
    },
  })
    .then((employee) => {
      req.flash('success_message','Employee data updated successfully')
      res.redirect("/");
    })
    .catch((err) => {
      req.flash('error_message','ERROR:' +err)
      res.redirect('/');
    });
});

//Delete  Employee
router.delete('/delete/:id',(req,res)=>{
  const id= {_id:req.params.id}
  Employee.findByIdAndDelete(id)
  .then(employee=>{
    req.flash('success_message','Employee deleted succesfully.')
    res.redirect('/');
  })
  .catch(err=>{
    req.flash('error_message','ERROR:' +err)
    res.redirect('/');
  })
})

module.exports = router;
