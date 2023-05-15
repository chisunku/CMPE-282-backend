var express = require("express"),
  mongoose = require("mongoose"),
  autoIncrement = require("mongoose-auto-increment"),
  Joi = require("joi"),
  app = express();
jwt = require("jsonwebtoken");
require('dotenv').config({ path: './process.env' });

console.log("env vars : ",process.env);

let mongoURI = process.env.DATABASEURL;
console.log("env vars mongodb : ",process.env.DATABASEURL);
let jwtKey = process.env.JWTKEY;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});


mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect(mongoURI)
  .then(() => console.log("db connection successful"))
  .catch(err => console.log(err));

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);
autoIncrement.initialize(conn);


app.use(express.json());

var employeeSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  MiddleName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Gender: { type: String, required: true },
  DOB: { type: Date, required: true },
  DateOfJoining: { type: Date, required: true },
  Deleted: { type: Boolean },
  Photo: { type: String },
  ContactNo: { type: String, required: true },
  EmployeeCode: { type: String, required: true },
  Account: { type: Number, required: true },
  role: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  department: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
  salary: [{ type: mongoose.Schema.Types.ObjectId, ref: "Salary" }],
  education: [{ type: mongoose.Schema.Types.ObjectId, ref: "Education" }],
  familyInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: "FamilyInfo" }],
  workExperience: [
    { type: mongoose.Schema.Types.ObjectId, ref: "WorkExperience" }
  ],
  leaveApplication: [
    { type: mongoose.Schema.Types.ObjectId, ref: "LeaveApplication" }
  ],
  BloodGroup: { type: String },
  EmergencyContactNo: { type: String },
  Hobbies: { type: String },
  PANcardNo: { type: String },
  PermanetAddress: { type: String },
  PresentAddress: { type: String }
});
employeeSchema.plugin(autoIncrement.plugin, {
  model: "Employee",
  field: "EmployeeID"
});

var Employee = mongoose.model("Employee", employeeSchema);

const EmployeeValidation = Joi.object().keys({
  RoleID: Joi.optional(),
  DepartmentID: Joi.optional(),
  SalaryID: Joi.optional(),
  FirstName: Joi.string()
    .max(200)
    .required(),
  MiddleName: Joi.string()
    .max(200)
    .required(),
  LastName: Joi.string()
    .max(200)
    .required(),
  Email: Joi.string()
    .max(200)
    .required(),
  Password: Joi.string()
    .max(100)
    .required(),
  Gender: Joi.string()
    .max(100)
    .required(),
  DOB: Joi.date().required(),
  DateOfJoining: Joi.date().required(),
  Deleted: Joi.optional(),
  Photo: Joi.optional(),
  ContactNo: Joi.string()
    .max(20)
    .required(),
  EmployeeCode: Joi.string()
    .max(100)
    .required(),
  Account: Joi.number()
    .max(3)
    .required()
});

const EmployeeValidationUpdate = Joi.object().keys({
  RoleID: Joi.optional(),
  PositionID: Joi.optional(),
  DepartmentID: Joi.optional(),
  SalaryID: Joi.optional(),
  FirstName: Joi.string()
    .max(200)
    .required(),
  MiddleName: Joi.string()
    .max(200)
    .required(),
  LastName: Joi.string()
    .max(200)
    .required(),
  Email: Joi.string()
    .max(200)
    .required(),
  Gender: Joi.string()
    .max(100)
    .required(),
  DOB: Joi.date().required(),
  DateOfJoining: Joi.date().required(),
  Deleted: Joi.optional(),
  Photo: Joi.optional(),
  ContactNo: Joi.string()
    .max(20)
    .required(),
  EmployeeCode: Joi.string()
    .max(100)
    .required(),
  Account: Joi.number()
    .max(3)
    .required()
});

const EmployeePersonalInfoValidation = Joi.object().keys({
  BloodGroup: Joi.string()
    .max(10)
    .required(),
  DOB: Joi.date().required(),
  ContactNo: Joi.string()
    .max(20)
    .required(),
  Email: Joi.string()
    .max(200)
    .required(),
  EmergencyContactNo: Joi.string()
    .max(20)
    .required(),
  Gender: Joi.string()
    .max(100)
    .required(),
  Hobbies: Joi.string()
    .max(1000)
    .required(),
  PANcardNo: Joi.string()
    .max(50)
    .required(),
  PermanetAddress: Joi.string()
    .max(200)
    .required(),
  PresentAddress: Joi.string()
    .max(200)
    .required()
});

var salarySchema = new mongoose.Schema({
  BasicSalary: { type: String, required: true },
  BankName: { type: String, required: true },
  AccountNo: { type: String, required: true },
  AccountHolderName: { type: String, required: true },
  IFSCcode: { type: String, required: true },
  TaxDeduction: { type: String, required: true }
});
salarySchema.plugin(autoIncrement.plugin, {
  model: "Salary",
  field: "SalaryID"
});

var Salary = mongoose.model("Salary", salarySchema);

const SalaryValidation = Joi.object().keys({
  BasicSalary: Joi.string()
    .max(20)
    .required(),
  BankName: Joi.string()
    .max(200)
    .required(),
  AccountNo: Joi.string()
    .max(200)
    .required(),
  AccountHolderName: Joi.string()
    .max(200)
    .required(),
  IFSCcode: Joi.string()
    .max(200)
    .required(),
  TaxDeduction: Joi.string()
    .max(100)
    .required()
});


var educationSchema = new mongoose.Schema({
  SchoolUniversity: { type: String, required: true },
  Degree: { type: String, required: true },
  Grade: { type: String, required: true },
  PassingOfYear: { type: String, required: true }
});
educationSchema.plugin(autoIncrement.plugin, {
  model: "Education",
  field: "EducationID"
});

var Education = mongoose.model("Education", educationSchema);

const EducationValidation = Joi.object().keys({
  SchoolUniversity: Joi.string()
    .max(200)
    .required(),
  Degree: Joi.string()
    .max(200)
    .required(),
  Grade: Joi.string()
    .max(50)
    .required(),
  PassingOfYear: Joi.string()
    .max(10)
    .required()
});


var familyInfoSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Relationship: { type: String, required: true },
  DOB: { type: Date, required: true },
  Occupation: { type: String, required: true }
});
familyInfoSchema.plugin(autoIncrement.plugin, {
  model: "FamilyInfo",
  field: "FamilyInfoID"
});

var FamilyInfo = mongoose.model("FamilyInfo", familyInfoSchema);

const FamilyInfoValidation = Joi.object().keys({
  Name: Joi.string()
    .max(200)
    .required(),
  Relationship: Joi.string()
    .max(200)
    .required(),
  DOB: Joi.date().required(),
  Occupation: Joi.string()
    .max(100)
    .required()
});

var workExperienceSchema = new mongoose.Schema({
  CompanyName: { type: String, required: true },
  Designation: { type: String, required: true },
  FromDate: { type: Date, required: true },
  ToDate: { type: Date, required: true }
});
workExperienceSchema.plugin(autoIncrement.plugin, {
  model: "WorkExperience",
  field: "WorkExperienceID"
});

var WorkExperience = mongoose.model("WorkExperience", workExperienceSchema);

const WorkExperienceValidation = Joi.object().keys({
  CompanyName: Joi.string()
    .max(200)
    .required(),
  Designation: Joi.string()
    .max(200)
    .required(),
  FromDate: Joi.date().required(),
  ToDate: Joi.date().required()
});

var leaveApplicationSchema = new mongoose.Schema({
  Leavetype: { type: String, required: true },
  FromDate: { type: Date, required: true },
  ToDate: { type: Date, required: true },
  Reasonforleave: { type: String, required: true },
  Status: { type: String, required: true },
  employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }]
});
leaveApplicationSchema.plugin(autoIncrement.plugin, {
  model: "LeaveApplication",
  field: "LeaveApplicationID"
});

var LeaveApplication = mongoose.model(
  "LeaveApplication",
  leaveApplicationSchema
);

const LeaveApplicationValidation = Joi.object().keys({
  Leavetype: Joi.string()
    .max(100)
    .required(),

  FromDate: Joi.date().required(),
  ToDate: Joi.date().required(),
  Reasonforleave: Joi.string()
    .max(100)
    .required(),
  Status: Joi.number()
    .max(1)
    .required()
});
const LeaveApplicationHRValidation = Joi.object().keys({
  Status: Joi.number()
    .max(3)
    .required()
});


var roleSchema = new mongoose.Schema({
  RoleName: { type: String, required: true },
  company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
});
roleSchema.plugin(autoIncrement.plugin, {
  model: "Role",
  field: "RoleID"
});
var Role = mongoose.model("Role", roleSchema);

const RoleValidation = Joi.object().keys({
  RoleName: Joi.string()
    .max(200)
    .required(),
  CompanyID: Joi.required()
});

var departmentSchema = new mongoose.Schema({
  DepartmentName: { type: String, required: true },
  company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
});
departmentSchema.plugin(autoIncrement.plugin, {
  model: "Department",
  field: "DepartmentID"
});

var Department = mongoose.model("Department", departmentSchema);

const DepartmentValidation = Joi.object().keys({
  DepartmentName: Joi.string()
    .max(200)
    .required(),
  CompanyID: Joi.required()
});

//////ANALYTICS/////
app.get('/analytics/employee-gender-count', async (req, res) => {

Employee.aggregate([
          { $group: { _id: "$Gender", count: { $sum: 1 } } },
          { $project: { gender: "$_id", count: 1, _id: 0 } }
        ], function(err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
    res.status(200).json(result);
  }
});

});

app.get("/", (req, res) => {
  res.send("Healthy");
});

app.get("/api", (req, res) => {
  res.send("Healthy");
});

app.get("/api/role", verifyAdminHR, (req, res) => {
  Role.find()
    .exec(function (err, role) {
      res.send(role);
    });
});

app.post("/api/role", verifyAdminHR, (req, res) => {
  Joi.validate(req.body, RoleValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newRole;

      newRole = {
        RoleName: req.body.RoleName,
        company: req.body.CompanyID
      };

      Role.create(newRole, function (err, role) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          res.send(role);
          console.log("new Role Saved");
        }
      });
      console.log(req.body);
    }
  });
});

app.put("/api/role/:id", verifyAdminHR, (req, res) => {
  Joi.validate(req.body, RoleValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let updateRole;

      updateRole = {
        RoleName: req.body.RoleName,
        company: req.body.CompanyID
      };

      Role.findByIdAndUpdate(req.params.id, updateRole, function (err, role) {
        if (err) {
          res.send("error");
        } else {
          res.send(updateRole);
        }
      });
    }
    console.log(req.body);
  });
});

app.delete("/api/role/:id", verifyAdminHR, (req, res) => {
  Employee.find({ role: req.params.id }, function (err, r) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (r.length == 0) {
        Role.findByIdAndRemove({ _id: req.params.id }, function (err, role) {
          if (!err) {
            console.log(" Role deleted");
            res.send(role);
          } else {
            console.log("error");
            res.send("err");
          }
        });
        console.log("delete");
        console.log(req.params.id);
      } else {
        res
          .status(403)
          .send(
            "This role is associated with Employee so you can not delete this"
          );
      }
    }
  });
});

//Department
app.get("/api/department", verifyAdminHR, (req, res) => {
  Department.find()
    .populate("company")
    .exec(function (err, employees) {
      res.send(employees);
    });
});
app.post("/api/department", verifyAdminHR, (req, res) => {
  Joi.validate(req.body, DepartmentValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newDepartment;

      newDepartment = {
        DepartmentName: req.body.DepartmentName,
        company: req.body.CompanyID
      };

      Department.create(newDepartment, function (err, department) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          res.send(department);
          console.log("new Role Saved");
        }
      });
    }
    console.log(req.body);
  });
});
app.put("/api/department/:id", verifyAdminHR, (req, res) => {
  Joi.validate(req.body, DepartmentValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let updateDepartment;

      updateDepartment = {
        DepartmentName: req.body.DepartmentName,
        company: req.body.CompanyID
      };

      Department.findByIdAndUpdate(req.params.id, updateDepartment, function (
        err,
        department
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(updateDepartment);
        }
      });
    }
    console.log(req.body);
  });
});

app.delete("/api/department/:id", verifyAdminHR, (req, res) => {
  Employee.find({ department: req.params.id }, function (err, d) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (d.length == 0) {
        Department.findByIdAndRemove({ _id: req.params.id }, function (
          err,
          department
        ) {
          if (!err) {
            console.log("department deleted");
            res.send(department);
            // });
            console.log("new Department Saved");
          } else {
            console.log("error");
            res.send("err");
          }
        });
        console.log("delete");
        console.log(req.params.id);
      } else {
        res
          .status(403)
          .send(
            "This department is associated with Employee so you can not delete this"
          );
      }
    }
  });
});

app.get('/api/employeeSalaryDepartment',verifyHR, (req, res) => {
  Employee.find()
    .populate('salary') // Populate the 'salary' field with the corresponding salary document
    .then(employees => {
      res.json(employees);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.get('/department-salary', verifyHR, async (req, res) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: 'salaries',
          localField: 'salary',
          foreignField: '_id',
          as: 'salary',
        },
      },
      { $unwind: '$salary' },
      {
        $group: {
          _id: '$department',
          avgSalary: { $avg: '$salary.amount' },
        },
      },
    ];
    const results = await Employee.aggregate(pipeline);
    for (let i = 0; i < results.length; i++) {
      const department = await Department.findById(results[i]._id);
      results[i].department = department.name;
    }

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get("/api/employee", verifyHR, (req, res) => {
  Employee.find()
    .populate({
      path: "role position department"
    })
    .select("-salary -education -familyInfo -workExperience -Password")
    .exec(function (err, employee) {
      res.send(employee);
    });
});

app.post("/api/employee", verifyHR, (req, res) => {
console.log(req);
  Joi.validate(req.body, EmployeeValidation, (err, result) => {
    if (err) {
      res.status(400).send(err.details[0].message);
    } else {
      let newEmployee;
      console.log("in employee add api", req.body.Email);
      newEmployee = {
        Email: req.body.Email,
        Password: req.body.Password,
        role: req.body.RoleID,
        Account: req.body.Account,
        Gender: req.body.Gender,
        FirstName: req.body.FirstName,
        MiddleName: req.body.MiddleName,
        LastName: req.body.LastName,
        DOB: req.body.DOB,
        ContactNo: req.body.ContactNo,
        EmployeeCode: req.body.EmployeeCode,
        department: req.body.DepartmentID,
        DateOfJoining: req.body.DateOfJoining
      };

      Employee.create(newEmployee, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          res.send(employee);

          console.log("new employee Saved");
        }
      });
      console.log(req.body);
    }
  });
});

app.put("/api/employee/:id", verifyHR, (req, res) => {
  Joi.validate(req.body, EmployeeValidationUpdate, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newEmployee;
      newEmployee = {
        Email: req.body.Email,
        Account: req.body.Account,
        role: req.body.RoleID,
        Gender: req.body.Gender,
        FirstName: req.body.FirstName,
        MiddleName: req.body.MiddleName,
        LastName: req.body.LastName,
        DOB: req.body.DOB,
        ContactNo: req.body.ContactNo,
        EmployeeCode: req.body.EmployeeCode,
        department: req.body.DepartmentID,
        position: req.body.PositionID,
        DateOfJoining: req.body.DateOfJoining
      };
      Employee.findByIdAndUpdate(req.params.id, newEmployee, function (
        err,
        employee
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(newEmployee);
        }
      });
    }
    console.log(req.body);
  });
});

app.delete("/api/employee/:id", verifyHR, (req, res) => {
   Employee.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
     if (!err) {
       console.log(" state deleted");
       res.send(employee);
     } else {
       console.log(err);
       res.send("error");
     }
   });
  console.log("delete");
  console.log(req.params.id);
});


app.get("/api/salary", verifyHR, (req, res) => {
  Employee.find()
    .populate({
      path: "salary"
    })
    .select("FirstName LastName MiddleName")
    .exec(function (err, company) {
      let filteredCompany = company.filter(data => data["salary"].length == 1);
      res.send(filteredCompany);
    });
});

app.post("/api/salary/:id", verifyHR, (req, res) => {
  Joi.validate(req.body, SalaryValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          if (employee.salary.length == 0) {
            let newSalary;

            newSalary = {
              BasicSalary: req.body.BasicSalary,
              BankName: req.body.BankName,
              AccountNo: req.body.AccountNo,
              AccountHolderName: req.body.AccountHolderName,
              IFSCcode: req.body.IFSCcode,
              TaxDeduction: req.body.TaxDeduction
            };

            Salary.create(newSalary, function (err, salary) {
              if (err) {
                console.log(err);
                res.send("error");
              } else {
                employee.salary.push(salary);
                employee.save(function (err, data) {
                  if (err) {
                    console.log(err);
                    res.send("err");
                  } else {
                    console.log("salary added to emp : ",data);
                    res.send(salary);
                  }
                });
                console.log("new salary Saved");
              }
            });
            console.log(req.body);
          } else {
            res
              .status(403)
              .send("Salary Information about this employee already exits");
          }
        }
      });
    }
  });
});

app.put("/api/salary/:id", verifyHR, (req, res) => {
  Joi.validate(req.body, SalaryValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newSalary;

      newSalary = {
        BasicSalary: req.body.BasicSalary,
        BankName: req.body.BankName,
        AccountNo: req.body.AccountNo,
        AccountHolderName: req.body.AccountHolderName,
        IFSCcode: req.body.IFSCcode,
        TaxDeduction: req.body.TaxDeduction
      };

      Salary.findByIdAndUpdate(req.params.id, newSalary, function (err, salary) {
        if (err) {
          res.send("error");
        } else {
          res.send(newSalary);
        }
      });
    }
    console.log(req.body);
  });
});

app.delete("/api/salary/:id", verifyHR, (req, res) => {
  Employee.findById({ _id: req.params.id }, function (err, employee) {
    if (err) {
      res.send("error");
      console.log(err);
    } else {
      Salary.findByIdAndRemove({ _id: employee.salary[0] }, function (
        err,
        salary
      ) {
        if (!err) {
          console.log("salary deleted");
          Employee.update(
            { _id: req.params.id },
            { $pull: { salary: employee.salary[0] } },
            function (err, numberAffected) {
              console.log(numberAffected);
              res.send(salary);
            }
          );
        } else {
          console.log(err);
          res.send("error");
        }
      });
      console.log(req.params.id);
    }
  });
});


app.get("/api/personal-info/:id", verifyHREmployee, (req, res) => {
  console.log("personal-info", req.params.id);
  Employee.findById(req.params.id)
    .populate({
      path: "role position department"
    })
    .select("-salary -education -familyInfo -workExperience")
    .exec(function (err, employee) {
      res.send(employee);
    });
});

app.put("/api/personal-info/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, EmployeePersonalInfoValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newEmployee;

      newEmployee = {
        BloodGroup: req.body.BloodGroup,
        ContactNo: req.body.ContactNo,
        DOB: req.body.DOB,
        Email: req.body.Email,
        EmergencyContactNo: req.body.EmergencyContactNo,
        Gender: req.body.Gender,
        Hobbies: req.body.Hobbies,
        PANcardNo: req.body.PANcardNo,
        PermanetAddress: req.body.PermanetAddress,
        PresentAddress: req.body.PresentAddress
      };
      Employee.findByIdAndUpdate(
        req.params.id,
        {
          $set: newEmployee
        },
        function (err, numberAffected) {
          console.log(numberAffected);
          res.send(newEmployee);
        }
      );
    }

    console.log("put");
    console.log(req.body);
  });
});

app.get("/api/education/:id", verifyHREmployee, (req, res) => {
  console.log(req.params.id);
  Employee.findById(req.params.id)
    .populate({
      path: "education"
    })
    .select("FirstName LastName MiddleName")
    .exec(function (err, employee) {
      res.send(employee);
    });
});

app.post("/api/education/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, EducationValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          let newEducation;

          newEducation = {
            SchoolUniversity: req.body.SchoolUniversity,
            Degree: req.body.Degree,
            Grade: req.body.Grade,
            PassingOfYear: req.body.PassingOfYear
          };

          Education.create(newEducation, function (err, education) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              employee.education.push(education);
              employee.save(function (err, data) {
                if (err) {
                  console.log(err);
                  res.send("err");
                } else {
                  console.log(data);
                  res.send(education);
                }
              });
              console.log("new Education Saved");
            }
          });
          console.log(req.body);
        }
      });
    }
  });
});

app.put("/api/education/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, EducationValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newEducation;

      newEducation = {
        SchoolUniversity: req.body.SchoolUniversity,
        Degree: req.body.Degree,
        Grade: req.body.Grade,
        PassingOfYear: req.body.PassingOfYear
      };

      Education.findByIdAndUpdate(req.params.id, newEducation, function (
        err,
        education
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(newEducation);
        }
      });
    }
    console.log(req.body);
  });
});

app.delete("/api/education/:id/:id2", verifyEmployee, (req, res) => {
  Employee.findById({ _id: req.params.id }, function (err, employee) {
    if (err) {
      res.send("error");
      console.log(err);
    } else {
      Education.findByIdAndRemove({ _id: req.params.id2 }, function (
        err,
        education
      ) {
        if (!err) {
          console.log("education deleted");
          Employee.update(
            { _id: req.params.id },
            { $pull: { education: req.params.id2 } },
            function (err, numberAffected) {
              console.log(numberAffected);
              res.send(education);
            }
          );
        } else {
          console.log(err);
          res.send("error");
        }
      });
      console.log(req.params.id);
    }
  });
});


app.get("/api/family-info/:id", verifyHREmployee, (req, res) => {
  console.log(req.params.id);
  Employee.findById(req.params.id)
    .populate({
      path: "familyInfo"
    })
    .select("FirstName LastName MiddleName")
    .exec(function (err, employee) {
      res.send(employee);
    });
});

app.post("/api/family-info/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, FamilyInfoValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          let newFamilyInfo;

          newFamilyInfo = {
            Name: req.body.Name,
            Relationship: req.body.Relationship,
            DOB: req.body.DOB,
            Occupation: req.body.Occupation
          };

          FamilyInfo.create(newFamilyInfo, function (err, familyInfo) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              employee.familyInfo.push(familyInfo);
              employee.save(function (err, data) {
                if (err) {
                  console.log(err);
                  res.send("err");
                } else {
                  console.log(data);
                  res.send(familyInfo);
                }
              });
              console.log("new familyInfo Saved");
            }
          });
          console.log(req.body);
        }
      });
    }
  });
});

app.put("/api/family-info/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, FamilyInfoValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newFamilyInfo;

      newFamilyInfo = {
        Name: req.body.Name,
        Relationship: req.body.Relationship,
        DOB: req.body.DOB,
        Occupation: req.body.Occupation
      };

      FamilyInfo.findByIdAndUpdate(req.params.id, newFamilyInfo, function (
        err,
        familyInfo
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(newFamilyInfo);
        }
      });
    }
    console.log(req.body);
  });
});

app.delete("/api/family-info/:id/:id2", verifyEmployee, (req, res) => {
  Employee.findById({ _id: req.params.id }, function (err, employee) {
    if (err) {
      res.send("error");
      console.log(err);
    } else {
      FamilyInfo.findByIdAndRemove({ _id: req.params.id2 }, function (
        err,
        familyInfo
      ) {
        if (!err) {
          console.log("FamilyInfo deleted");
          Employee.update(
            { _id: req.params.id },
            { $pull: { familyInfo: req.params.id2 } },
            function (err, numberAffected) {
              console.log(numberAffected);
              res.send(familyInfo);
            }
          );
        } else {
          console.log(err);
          res.send("error");
        }
      });
      console.log(req.params.id);
    }
  });
});


app.get("/api/work-experience/:id", verifyHREmployee, (req, res) => {
  console.log(req.params.id);
  Employee.findById(req.params.id)
    .populate({
      path: "workExperience"
    })
    .select("FirstName LastName MiddleName")
    .exec(function (err, employee) {
      res.send(employee);
    });
});

app.post("/api/work-experience/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, WorkExperienceValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          let newWorkExperience;

          newWorkExperience = {
            CompanyName: req.body.CompanyName,
            Designation: req.body.Designation,
            FromDate: req.body.FromDate,
            ToDate: req.body.ToDate
          };

          WorkExperience.create(newWorkExperience, function (
            err,
            workExperience
          ) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              employee.workExperience.push(workExperience);
              employee.save(function (err, data) {
                if (err) {
                  console.log(err);
                  res.send("err");
                } else {
                  console.log(data);
                  res.send(workExperience);
                }
              });
            }
          });
          console.log(req.body);
        }
      });
    }
  });
});

app.put("/api/work-experience/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, WorkExperienceValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newWorkExperience;

      newWorkExperience = {
        CompanyName: req.body.CompanyName,
        Designation: req.body.Designation,
        FromDate: req.body.FromDate,
        ToDate: req.body.ToDate
      };

      WorkExperience.findByIdAndUpdate(
        req.params.id,
        newWorkExperience,
        function (err, workExperience) {
          if (err) {
            res.send("error");
          } else {
            res.send(newWorkExperience);
          }
        }
      );
    }
    console.log(req.body);
  });
});

app.delete("/api/Work-experience/:id/:id2", verifyEmployee, (req, res) => {
  Employee.findById({ _id: req.params.id }, function (err, employee) {
    if (err) {
      res.send("error");
      console.log(err);
    } else {
      WorkExperience.findByIdAndRemove({ _id: req.params.id2 }, function (
        err,
        workExperience
      ) {
        if (!err) {
          console.log("WorkExperience deleted");
          Employee.update(
            { _id: req.params.id },
            { $pull: { workExperience: req.params.id2 } },
            function (err, numberAffected) {
              console.log(numberAffected);
              res.send(workExperience);
            }
          );
        } else {
          console.log(err);
          res.send("error");
        }
      });
      console.log(req.params.id);
    }
  });
});

app.get("/api/leave-application-emp/:id", verifyEmployee, (req, res) => {
  console.log(req.params.id);
  Employee.findById(req.params.id)
    .populate({
      path: "leaveApplication"
    })
    .select("FirstName LastName MiddleName")
    .exec(function (err, employee) {
      if (err) {
        console.log(err);
        res.send("error");
      } else {
        res.send(employee);
      }
    });
});

app.post("/api/leave-application-emp/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, LeaveApplicationValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          let newLeaveApplication;
          newLeaveApplication = {
            Leavetype: req.body.Leavetype,
            FromDate: req.body.FromDate,
            ToDate: req.body.ToDate,
            Reasonforleave: req.body.Reasonforleave,
            Status: req.body.Status,
            employee: req.params.id
          };

          LeaveApplication.create(newLeaveApplication, function (
            err,
            leaveApplication
          ) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              employee.leaveApplication.push(leaveApplication);
              employee.save(function (err, data) {
                if (err) {
                  console.log(err);
                  res.send("err");
                } else {
                  console.log(data);
                  res.send(leaveApplication);
                }
              });
            }
          });
          console.log(req.body);
        }
      });
    }
  });
});

app.put("/api/leave-application-emp/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, LeaveApplicationValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newLeaveApplication;

      newLeaveApplication = {
        Leavetype: req.body.Leavetype,
        FromDate: req.body.FromDate,
        ToDate: req.body.ToDate,
        Reasonforleave: req.body.Reasonforleave,
        Status: req.body.Status,
        employee: req.params.id
      };

      LeaveApplication.findByIdAndUpdate(
        req.params.id,
        newLeaveApplication,
        function (err, leaveApplication) {
          if (err) {
            res.send("error");
          } else {
            res.send(newLeaveApplication);
          }
        }
      );
    }
    console.log(req.body);
  });
});

app.delete(
  "/api/leave-application-emp/:id/:id2",
  verifyEmployee,
  (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {
      if (err) {
        res.send("error");
        console.log(err);
      } else {
        LeaveApplication.findByIdAndRemove({ _id: req.params.id2 }, function (
          err,
          leaveApplication
        ) {
          if (!err) {
            Employee.update(
              { _id: req.params.id },
              { $pull: { leaveApplication: req.params.id2 } },
              function (err, numberAffected) {
                console.log(numberAffected);
                res.send(leaveApplication);
              }
            );
          } else {
            console.log(err);
            res.send("error");
          }
        });
        console.log(req.params.id);
      }
    });
  }
);

app.get("/api/leave-application-hr", verifyHR, (req, res) => {
  LeaveApplication.find()
    .populate({
      path: "employee"
    })
    .exec(function (err, leaveApplication) {
      if (err) {
        console.log(err);
        res.send("error");
      } else {
        res.send(leaveApplication);
      }
    });
});

app.put("/api/leave-application-hr/:id", verifyHR, (req, res) => {
  Joi.validate(req.body, LeaveApplicationHRValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newLeaveApplication;

      newLeaveApplication = {
        Status: req.body.Status
      };
      LeaveApplication.findByIdAndUpdate(
        req.params.id,
        {
          $set: newLeaveApplication
        },
        function (err, numberAffected) {
          console.log(numberAffected);
          res.send(newLeaveApplication);
        }
      );
    }
  });
});

app.delete("/api/leave-application-hr/:id/:id2", verifyHR, (req, res) => {
  Employee.findById({ _id: req.params.id }, function (err, employee) {
    if (err) {
      res.send("error");
      console.log(err);
    } else {
      LeaveApplication.findByIdAndRemove({ _id: req.params.id2 }, function (
        err,
        leaveApplication
      ) {
        if (!err) {
          Employee.update(
            { _id: req.params.id },
            { $pull: { leaveApplication: req.params.id2 } },
            function (err, numberAffected) {
              console.log(numberAffected);
              res.send(leaveApplication);
            }
          );
        } else {
          console.log(err);
          res.send("error");
        }
      });
      console.log(req.params.id);
    }
  });
});


app.post("/api/login", (req, res) => {
  Joi.validate(
    req.body,
    Joi.object().keys({
      email: Joi.string()
        .max(200)
        .required(),
      password: Joi.string()
        .max(100)
        .required()
    }),
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err.details[0].message);
      } else {
        Employee.findOne(
          { Email: req.body.email },
          "Password _id Account FirstName LastName",
          function (err, document) {
            if (err || document == null) {
              res.send("false");
            } else {
              if (document.Password == req.body.password) {
                emp = {
                  _id: document._id,
                  Account: document.Account,
                  FirstName: document.FirstName,
                  LastName: document.LastName
                };
                var token = jwt.sign(emp, jwtKey);
                res.send(token);
              } else {
                res.sendStatus(400);
              }
            }
          }
        );
      }
    }
  );
});


function verifyAdminHR(req, res, next) {
  console.log(req.headers["authorization"]);
  const Header = req.headers["authorization"];
  if (typeof Header !== "undefined") {
    jwt.verify(Header, jwtKey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log(authData);
        if (authData.Account == 1 || authData.Account == 2) {
          next();
        } else {
          res.sendStatus(403);
        }
      }
    });
  } else {
    res.sendStatus(403);
  }
}
function verifyHR(req, res, next) {
  const Header = req.headers["authorization"];
  if (typeof Header !== "undefined") {
    jwt.verify(Header, jwtKey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log(authData);
        if (authData.Account == 2) {
          next();
        } else {
          res.sendStatus(403);
        }
      }
    });
  } else {
    res.sendStatus(403);
  }
}
function verifyHREmployee(req, res, next) {
  const Header = req.headers["authorization"];
  if (typeof Header !== "undefined") {
    jwt.verify(Header, jwtKey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log(authData);
        if (authData.Account == 2) {
          next();
        } else if (authData.Account == 3) {
          if (authData._id == req.params.id) {
            next();
          }
          else {
            res.sendStatus(403);
          }
        } else {
          res.sendStatus(403);
        }
      }
    });
  } else {
    res.sendStatus(403);
  }
}
function verifyEmployee(req, res, next) {
  console.log(req.headers["authorization"]);
  const Header = req.headers["authorization"];
  if (typeof Header !== "undefined") {
    jwt.verify(Header, jwtKey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        if (authData._id == req.params.id) {
          console.log(authData);
          if (authData.Account == 3) {
            next();
          } else {
            res.sendStatus(403);
          }
        } else {
          res.sendStatus(403);
        }
      }
    });
  } else {
    res.sendStatus(403);
  }
}

var port = process.env.PORT;
if (port & process.env.IP) {
  app.listen(port, process.env.IP, () => {
    console.log("started");
  });
} else
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));