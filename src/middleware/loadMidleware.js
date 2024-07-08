import express from "express";
import cors from "cors";

export const load = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));
  app.use(cors());
};