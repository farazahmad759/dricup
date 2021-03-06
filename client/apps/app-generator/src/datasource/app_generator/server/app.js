var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var filesRouter = require("./../db/routes/files");
var packagesRouter = require("./../db/routes/packages");
var templatesRouter = require("./../db/routes/templates");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "../client/apps")));
app.use(express.static(path.join(__dirname, "../client/home")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/home", "index.html"));
});
app.get("/static-html", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/apps/static-html", "index.html")
  );
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../client/apps/app-1/build")));

  // Handle React routing, return all requests to React app
  app.get("/app-1", function (req, res) {
    res.sendFile(
      path.join(__dirname, "../client/apps/app-1/build", "index.html")
    );
  });
} else {
  app.use("/app-1", indexRouter);
}
app.use("/users", usersRouter);
app.use("/api/files", filesRouter);
app.use("/api/packages", packagesRouter);
app.use("/api/templates", templatesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
