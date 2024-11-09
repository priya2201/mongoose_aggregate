const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the EmployeeReport schema
const employeeReportSchema = new Schema({
  employeeCodes: [String],
  employeeHeadCode: String,
});

// Define the Employee schema
const employeeSchema = new Schema({
  name: String,
  reportingDetails: { type: Schema.Types.ObjectId, ref: "EmployeeReport" },
});

// Create the models
const Employee = mongoose.model("Employee", employeeSchema);
const EmployeeReport = mongoose.model("EmployeeReport", employeeReportSchema);

module.exports = { Employee, EmployeeReport };
