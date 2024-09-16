import ApiError from '@/utils/error.util';
import prisma from '@/libs/prisma';

export default class LaundryItemAction {
  index = async () => {
    try {
      const items = await prisma.laundryItem.findMany();

      return items;
    } catch (error) {
      throw error;
    }
  };

  show = async (laundry_item_id: string) => {
    try {
      const item = await prisma.laundryItem.findUnique({
        where: { laundry_item_id },
      });

      if (!item) throw new ApiError(404, 'Laundry Item not found');

      return item;
    } catch (error) {
      throw error;
    }
  };

  create = async (name: string, icon_url: string | undefined) => {
    try {
      const item = await prisma.laundryItem.create({
        data: {
          name,
          icon_url: icon_url!,
        },
      });

      return item;
    } catch (error) {
      throw error;
    }
  };

  update = async (laundry_item_id: string, name: string, icon_url: string | undefined) => {
    try {
      const item = await prisma.laundryItem.update({
        where: { laundry_item_id },
        data: { name, icon_url },
      });

      return item;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (laundry_item_id: string) => {
    try {
      const item = await prisma.laundryItem.delete({
        where: { laundry_item_id },
      });

      return item;
    } catch (error) {
      throw error;
    }
  };
}
