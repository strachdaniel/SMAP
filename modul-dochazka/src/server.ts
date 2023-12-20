import express from "express";
import { isAuth } from "./middleware/isAuth";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

import EmployeeRouter from "./routers/EmployeeRouter";
import WageStatementRouter from "./routers/WageStatementRouter";
import ContractRouter from "./routers/ContractRouter";
import EmploymentTypeRouter from "./routers/EmploymentTypeRouter";
import EmployeeCategoryRouter from "./routers/EmployeeCategoryRouter";
import AttendanceRouter from "./routers/AttendanceRouter";
import AttendanceSheetRouter from "./routers/AttendanceSheetRouter";
import DayRouter from "./routers/DayRouter";
import CriteriaRouter from "./routers/CriteriaRouter";
import DayliCriteriaRouter from "./routers/DayliCriteriaRouter";

app.use("/api/employee", isAuth, EmployeeRouter);
app.use("/api/wage-statement", isAuth, WageStatementRouter);
app.use("/api/contract", isAuth, ContractRouter);
app.use("/api/employment-type", isAuth, EmploymentTypeRouter);
app.use("/api/employee-category", isAuth, EmployeeCategoryRouter);
app.use("/api/attendance", isAuth, AttendanceRouter);
app.use("/api/attendance-sheet", isAuth, AttendanceSheetRouter);
app.use("/api/day", isAuth, DayRouter);
app.use("/api/criteria", isAuth, CriteriaRouter);
app.use("/api/dayli-criteria", isAuth, DayliCriteriaRouter);

const server = app.listen(3003, () =>
  console.log(`App is running on port 3003 or ${process.env.PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: any, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

export default app;
