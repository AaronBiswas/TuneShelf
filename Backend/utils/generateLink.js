import jwt from "jsonwebtoken";

const generateLink = (id) => {
  try {
    const ShareToken = jwt.sign({ userId: id }, process.env.SHARED_SECRET, {
      expiresIn: "1h",
    });

    console.log("Token generated successfully", ShareToken);

    const generatedLink = `${process.env.VITE_API_URL}share/${ShareToken}`;

    return generatedLink;
  } catch (error) {
    console.log("Error generating token", error.message);
    throw new Error("Error generating token");
  }
};

export default generateLink;
