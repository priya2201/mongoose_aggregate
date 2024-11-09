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
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const employeeReport = new EmployeeReport({
  employeeCodes: ["E0005", "E0006"],
  employeeHeadCode: "HEAD123",
  // other fields as needed
});

employeeReport
  .save()
  .then(() => {
    const employee = new Employee({
      name: "John Doe",
      reportingDetails: employeeReport._id,
      // other fields as needed
    });

    return employee.save();
  })
  .then(() => {
    console.log("Data inserted successfully");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error inserting data:", err);
    mongoose.connection.close();
  });
