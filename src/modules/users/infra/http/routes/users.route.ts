import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';
import uploadConfig from '@config/upload';

import ensureSession from '../middlewares/ensureSession';

const usersRouter = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureSession,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;