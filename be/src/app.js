import express from 'express';
import authroute from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import purchaseRoutes from "./routes/purchaseRoutes.js";
import transroute from "./routes/transroute.js";
import dashboardRoutes from "./routes/dashboardroutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import expenditureRoutes from  "./routes/Expenditure.route.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use(cors({
  origin: "http://localhost:5173", // allow your frontend
  credentials: true               // allow cookies/headers
}));

app.use(express.json());

app.use('/auth', authroute);
app.use("/register/purchases", purchaseRoutes);
app.use("/transfers", transroute);
app.use("/dashboard", dashboardRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/expenditures", expenditureRoutes);



export default app;
