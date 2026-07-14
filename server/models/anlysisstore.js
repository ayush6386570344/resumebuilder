import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      default: null,
    },

    jobTitle: {
      type: String,
      default: "",
    },

    company: {
      type: String,
      default: "",
    },

    resumeText: {
      type: String,
      required: true,
    },

    jobDescriptionText: {
      type: String,
      required: true,
    },

    resumeMatchScore: {
      type: Number,
      required: true,
    },

    atsScore: {
      type: Number,
      required: true,
    },

    interviewReadiness: {
      type: Number,
      required: true,
    },

    analysis: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Analysis", analysisSchema);