const mongoose = require("mongoose");

const STEPS = ["Design & Wax","Casting","Filing & Polishing","Stone Setting","Quality Check","Final Polish","Packaging"];

const diamondSelectionSchema = new mongoose.Schema({
  shapeId:   String,
  shapeName: String,
  sizeInMM:  String,
  weight:    Number,
  pcs:       { type: Number, default: 1 },
}, { _id: false });

const orderSchema = new mongoose.Schema(
  {
    // ── Auto-generated IDs ──────────────────────────────────────────────────
    bagId: { type: String, unique: true },  // e.g. "202601", "202602"

    // ── Customer ────────────────────────────────────────────────────────────
    customer:     { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    customerName: { type: String, trim: true },

    // ── Product ─────────────────────────────────────────────────────────────
    folder:     { type: String, required: true },
    item:       { type: String, required: true },
    itemNumber: { type: String, default: "" },
    itemWeight: { type: Number, default: 0 },
    itemImage:  { type: String, default: null },

    // ── Diamond shapes selected ──────────────────────────────────────────────
    diamondShapes: { type: [diamondSelectionSchema], default: [] },

    // ── Labour charge calculation ────────────────────────────────────────────
    labourCharge: { type: Number, default: 0 },   // per gram rate entered manually
    labourTotal:  { type: Number, default: 0 },   // itemWeight * labourCharge

    // ── Dates ───────────────────────────────────────────────────────────────
    orderDate:    { type: Date, default: Date.now },             // auto, not editable
    deliveryDate: { type: Date, default: null },                 // optional → auto = today+7

    // ── Other fields ─────────────────────────────────────────────────────────
    size:  { type: String, default: "" },
    notes: { type: String, default: "" },

    // ── Workflow ─────────────────────────────────────────────────────────────
    status:      { type: String, enum: ["In Progress", "Completed"], default: "In Progress" },
    currentStep: { type: Number, default: 0, min: 0, max: STEPS.length },
    gramHistory: { type: [Number], default: [] },
  },
  { timestamps: true }
);

orderSchema.set("toJSON",   { virtuals: true });
orderSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Order", orderSchema);
