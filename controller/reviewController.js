const Review = require("./../model/ReviewModel");

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(200).json({
      msg: "successful",
      review: {
        review,
      },
    });
  } catch (error) {}
};
