import express from 'express';
import { healthCall } from '../controllers/healthController.js';

export const router = express.Router();

router.get(['/health', '/ping'], healthCall);
