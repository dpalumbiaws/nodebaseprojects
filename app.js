import express from "express";
import connectDB from "./data/dbConfig.js";
import dotenv from "dotenv";
import "colors";
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import countryRoutes from "./routes/countryRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import path from 'path'
//qq prueba si no sisisi
dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use("/api/users/", userRoutes);
app.use("/api/transactions/", transactionRoutes);
app.use("/api/countries/", countryRoutes);
app.use("/api/wallet/", walletRoutes);

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
    console.log('dirname', __dirname)
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`.green);
});
