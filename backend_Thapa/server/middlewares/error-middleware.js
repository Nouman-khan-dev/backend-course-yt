const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "server error";
  const extraDetails = err.extraDetails || "somthing went wrong";

  console.log("The Error in the middelware : ", err);

  return res.status(status).json({ message, extraDetails });
};

export default errorMiddleware;
