const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    return next();
  } catch (err) {



    const status = 422;
    const message = "Fill the input properly";
    const extraDetails = err.issues.map((curElem) => curElem.message);
    // const extraDetails = err.errors[0].message;

    const error = {
      status,
      message,
      extraDetails,
    };

    next(error);


    // console.log()
    // let x = err.message;
    // console.log(x)
    // res.status(500).json({ x })
  }
};

module.exports = validate;

