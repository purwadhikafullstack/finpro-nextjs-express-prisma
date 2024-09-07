import { Request, Response, NextFunction } from 'express';
import userAddressAction from '@/actions/userAddress.action';
import { User } from '@/types/express';

export class UserAddressController {
  getAddressController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { user_id } = req.user as User;

      const address = await userAddressAction.findAddressById(user_id);

      res.status(200).json({
        message: 'Get user address success',
        data: address,
      });
    } catch (error) {
      next(error);
    }
  };

  // create address
  createAddressController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { user_id } = req.user as User;

      // Ambil data dari body request
      const { name, street_address, city, province, postal_code, is_primary } =
        req.body;

      // Validasi untuk mastiin semua field yang dibutuhin ada
      if (!name || !street_address || !city || !province || !postal_code) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const newAddress = await userAddressAction.createAddress(user_id, {
        name,
        street_address,
        city,
        province,
        postal_code,
        is_primary,
      });

      res.status(201).json({
        message: 'Address created successfully',
        data: newAddress,
      });
    } catch (error) {
      console.error('Error creating address:', error);
      next(error);
    }
  };

  updateAddressController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { user_id } = req.user as User;
      const { address_id } = req.params;

      const { name, street_address, city, province, postal_code, is_primary } =
        req.body;

      const updatedAddress = await userAddressAction.updateAddressById(
        user_id,
        Number(address_id),
        {
          name,
          street_address,
          city,
          province,
          postal_code,
          is_primary,
        },
      );

      res.status(200).json({
        message: 'Address updated successfully',
        data: updatedAddress,
      });
    } catch (error) {
      console.error('Error updating address:', error);
      next(error);
    }
  };

  deleteAddressController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { user_id } = req.user as User;
      const address_id = parseInt(req.params.address_id, 10);

      await userAddressAction.deleteAddressById(user_id, address_id);

      res.status(200).json({
        message: 'Address deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting address:', error);
      next(error);
    }
  };
}
