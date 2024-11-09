//Question: Perform a lookup to join the employees collection with a departments collection on the departmentId field, and include the department name in the result.

//Question: Perform a lookup to join the orders collection with the customers, products, and shippers collections, and calculate the total revenue and number of orders shipped by each shipper.

[
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerInfo",
    },
  },
  {
    $unwind: "$customerInfo",
  },
  {
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "productInfo",
    },
  },
  {
    $unwind: "$productInfo",
  },
  {
    $lookup: {
      from: "shippers",
      localField: "shipperId",
      foreignField: "_id",
      as: "shipperInfo",
    },
  },
  {
    $unwind: "$shipperInfo",
  },
  {
    $group: {
      _id: "$shipperInfo.name",
      totalRevenue: {
        $sum: {
          $multiply: ["$quantity", "$productInfo.price"],
        },
      },
      totalOrders: {
        $sum: 1,
      },
    },
  },
  {
    $project: {
      _id: 0,
      shipperName: "$_id",
      totalRevenue: 1,
      totalOrders: 1,
    },
  },
];

// totalRevenue
// 200
// totalOrders
// 1
// shipperName
// "Shipper 1"
// totalRevenue
// 150
// totalOrders
// 1
// shipperName
// "Shipper 2"

//Question: Use $lookup to join the employees collection with the salaries collection, and calculate the total payroll for each department.
[
  {
    $lookup: {
      from: "salaries",
      localField: "_id",
      foreignField: "employeeId",
      as: "salaryInfo",
    },
  },
  {
    $unwind: "$salaryInfo",
  },
  {
    $group: {
      _id: "$departmentId",
      totalPayroll: {
        $sum: "$salaryInfo.amount",
      },
    },
  },
  {
    $lookup: {
      from: "departments",
      localField: "_id",
      foreignField: "_id",
      as: "departmentInfo",
    },
  },
  {
    $unwind: "$departmentInfo",
  },
  {
    $project: {
      _id: 0,
      totalPayroll: 1,
      departmentName: "$departmentInfo.name",
    },
  },
];

// totalPayroll
// 5000
// departmentName
// "Engineering"
// departmentName
// "Human Resources"
// totalPayroll
// 6000

//Question: Join the employees collection with both the projects and departments collections, and list all employees working on projects in the "Engineering" department.

[
  {
    $lookup: {
      from: "projects",
      localField: "projectId",
      foreignField: "_id",
      as: "projectInfo",
    },
  },
  {
    $unwind: "$projectInfo",
  },
  {
    $lookup: {
      from: "departments",
      localField: "departmentId",
      foreignField: "_id",
      as: "departmentInfo",
    },
  },
  {
    $unwind: "$departmentInfo",
  },

  {
    $match: {
      "departmentInfo.name": "Engineering",
    },
  },
  {
    $project: {
      departmentName: "$departmentInfo.name",
      projectName: "$projectInfo.title",
      _id: 0,
      name: 1,
    },
  },
];

// {
//   "name": "John Doe",
//   "departmentName": "Engineering",
//   "projectName": "Project Alpha"
// }

//Question: Join the employees collection with the departments, projects, and salaries collections. For each employee, calculate the total salary, the number of projects they are working on, and the name of their department. Include only employees who are working on at least 2 projects and have a total salary greater than $8000.
