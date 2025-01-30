const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const connectDB = require("./config/DB_config");
const express = require("express");
const path = require("path")
const CarsRouter = require("./Router/cars.routes");
const AuthRouter = require("./Router/auth.routes")
const error_middleware = require("./Middlewares/error_middleware");
const fileUploadRouter = require("./Router/file.upload.routes");
const cookie_parser = require("cookie-parser")
const LogsRouter = require("./Router/logs.routes")
const RoleCheckerRouter = require("./Router/role.changer.routes")
const logger = require("./service/logger");
const app = express();
connectDB();
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
      try {
          const duration = Date.now() - start;
          const logData = ({
              method: req.method,
                url: req.url,
                status: res.statusCode,
                duration: `${duration}ms`,
                requestBody: req.body,
                responseHeaders: res.getHeaders(),
          });
          logger.info(JSON.stringify(logData, null, 4))
      } catch (error) {
          console.error('Log yozishda xatolik:', error);
      }
  });
  next();
});
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookie_parser())
app.use(AuthRouter);
app.use(LogsRouter)
app.use(CarsRouter);
app.use(RoleCheckerRouter)
app.use(fileUploadRouter);
app.use(error_middleware);
app.listen(PORT, () => {
  console.log("server is running on the port: " + PORT);
});
