const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const employeeSchema = new Schema({
  name: String,
  reportingDetails: { type: Schema.Types.ObjectId, ref: "EmployeeReport" },
});

const Employee = mongoose.model("Employee", employeeSchema);
// const searchEmployeeCode = "E0005";

// Employee.aggregate([
//   {
//     $lookup: {
//       from: "employeereports",
//       localField: "reportingDetails",
//       foreignField: "_id",
//       as: "reportingDetails",
//     },
//   },
//   {
//     $unwind: "$reportingDetails",
//   },
//   {
//     $match: {
//       "reportingDetails.employeeCodes": searchEmployeeCode,
//     },
//   },
//   {
//     $project: {
//       "reportingDetails.employeeHeadCode": 1,
//     },
//   },
// ])
//   .then((results) => {
//     console.log("Query results:", results);
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.error("Error performing query:", err);
//     mongoose.connection.close();
//   });

const searchEmployeeHeadCode = "HEAD123";

Employee.aggregate([
  {
    $lookup: {
      from: "employeereports",
      localField: "reportingDetails",
      foreignField: "_id",
      as: "reportDetails",
    },
  },
  {
    $unwind: "$reportDetails",
  },
  {
    $match: {
      "reportDetails.employeeHeadCode": searchEmployeeHeadCode,
    },
  },
  {
    $project: {
      _id: 0,
      name: 1,
      reportingDetails: 1,
      "reportDetails.employeeCodes": 1,
      "reportDetails.employeeHeadCode": 1,
    },
  },
])
  .then((results) => {
    console.log("Query results:", results);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error performing query:", err);
    mongoose.connection.close();
  });
