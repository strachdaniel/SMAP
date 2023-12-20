import express, { Application } from 'express';
import cors from 'cors';
import readersRoutes from './routes/readersRoutes';
import borrowsRoutes from './routes/borrowsRoutes';
import booksRoutes from './routes/booksRoutes';
import categoriesRoutes from './routes/categoriesRoutes';
import pairedCategoriesRoutes from './routes/pairedCategoriesRoutes';
import subcategoriesRoutes from './routes/subcategoriesRoutes';
import { isAuth } from './middleware/validateToken';
// import usersRoutes from "./routes/usersRoutes";

const app: Application = express();

app.use(
  cors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(isAuth);

app.use('/api/library/readers', readersRoutes);
app.use('/api/library/borrows', borrowsRoutes);
app.use('/api/library/books', booksRoutes);
app.use('/api/library/categories', categoriesRoutes);
app.use('/api/library/subcategories', subcategoriesRoutes);
// app.use("/api/library/users", usersRoutes);
app.use('/api/library/pairedCategories', pairedCategoriesRoutes);

const PORT = 3002;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error, promise: Promise<any>) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
