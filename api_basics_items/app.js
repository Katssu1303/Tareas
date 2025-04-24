"use strict";

import express from "express";
import fs from 'fs'

const port = 7600;

const app = express()

app.use(express.json())

app.use(express.static('./public'))