import Service from "../models/service-model.js";

const serviceController = async (req, res) => {
  try {
    const services = await Service.find();
    if (!services) {
      return res
        .status(400)
        .json({ message: "operation failed : ", services });
    } else {
      res.status(200).json({
        message: "operation successfull",
        services,
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "getting service operation failed", error });
  }
};

export default serviceController;
