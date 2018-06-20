var connection = require("./connection.js");
var express = require("express");
var router = express.Router();

// gets all data from burger table
router.get("/all", function(req, res) {   
  connection.query("SELECT * FROM burgers", function(err, results) {
      res.send(results);        
  });
});

// adds one burger to table
router.post("/add/:name", function(req, res) {
  var name = req.params.name;
  console.log(name);
  
  connection.query("INSERT INTO burgers (burger_name, devoured) VALUES (?, ?)", [name, false], 
  function(err, results) {
      res.send(results);
  });
});

// change devoured to true
router.put("/eat/:id", function(req, res) {
  var id = req.params.id;
  console.log(id);
  connection.query("UPDATE burgers SET devoured = true WHERE ?", {id: id}, 
  function(err, results) {
      //console.log(results);
      
      res.send(results);
  });
});

// change devoured to true
router.delete("/delete/:id", function(req, res) {
  var id = req.params.id;
  console.log(id);
  connection.query("DELETE FROM burgers WHERE ?", {id: id}, 
  function(err, results) {
      //console.log(results);
      
      res.send(results);
  });
});

module.exports = router;