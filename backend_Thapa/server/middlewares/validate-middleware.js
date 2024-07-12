const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    // next();
  } catch (err) {
    const error = {
      status: 422,
      message: "Fill the input properly ",
      extraDetails: err.issues[0].message,
    };
    // console.log("The Error: ", next(error));

    res.status(400).json({ msg: err.issues[0].message });
    // next(); // call this instead of response if using express error handler
  }
};

export default validate;
