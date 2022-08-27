import express from 'express';
import {
  createProfileController,
  deleteProfileController,
  getProfile,
  logIn,
  signIn,
  updateProfileController
} from '../controller';

const router = express.Router();

router.post('/signin', signIn);

router.get('/login', logIn);

router.get('/profile', getProfile);

router.post('/create', createProfileController);

router.patch('/update', updateProfileController);

router.delete('/delete', deleteProfileController);

export default router;
