import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateUserUpdate = [
  body('email')
    .trim()
    .optional()
    .isEmail()
    .withMessage('Must be a valid email address')
    .isLength({ min: 3, max: 64 })
    .withMessage('Email must be between 3 and 64 characters long'),
  body('first_name')
    .trim()
    .optional()
    .isLength({ max: 64 })
    .withMessage('Firstname must be fewer or equal to 64 characters long'),
  body('last_name')
    .trim()
    .optional()
    .isLength({ max: 64 })
    .withMessage('Lastname must be fewer or equal to 64 characters long'),
  body('phone_number')
    .trim()
    .optional()
    .isMobilePhone('any')
    .withMessage('Invalid phone number'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];

export const validateResetPassword = [
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];
