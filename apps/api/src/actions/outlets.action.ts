import { MAXIMUM_RADIUS, OPENCAGE_API } from '@/config';
import { Prisma, Role } from '@prisma/client';
import axios, { isAxiosError } from 'axios';
import { getDistance, getTreshold } from '@/utils/distance.util';

import ApiError from '@/utils/error.util';
import prisma from '@/libs/prisma';

export default class OutletsAction {
  index = async (
    page: number,
    limit: number,
    id: string | undefined,
    value: string | undefined,
    key: string | undefined,
    desc: string | undefined
  ) => {
    try {
      let filter;
      let order;

      if (id && value) {
        filter = {
          [id as keyof Prisma.OutletSelect]: { contains: value as string, mode: 'insensitive' },
        };
      }

      if (key && desc) {
        order = [
          {
            [key as keyof Prisma.OutletSelect]: desc === 'true' ? 'desc' : 'asc',
          },
        ];
      }

      const query = {
        where: filter,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: order,
      };

      const [outlets, count] = await prisma.$transaction([prisma.outlet.findMany(query), prisma.outlet.count(query)]);

      return [outlets, count];
    } catch (error) {
      throw error;
    }
  };

  show = async (outlet_id: string) => {
    try {
      const outlet = await prisma.outlet.findUnique({
        where: { outlet_id },
        include: {
          Employee: {
            include: {
              User: {
                select: {
                  user_id: true,
                  email: true,
                  fullname: true,
                  role: true,
                },
              },
            },
          },
        },
      });

      if (!outlet) throw new ApiError(404, 'Outlet not found');

      return outlet;
    } catch (error) {
      throw error;
    }
  };

  create = async (
    name: string,
    description: string,
    address: string,
    latitude: number,
    longitude: number,
    employees: {
      user_id: string;
      email: string;
      fullname: string;
      role: Role;
    }[]
  ) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          OR: employees.map((employee) => ({
            user_id: employee.user_id,
            role: 'Employee',
          })),
        },
      });

      if (users.length !== employees.length) throw new ApiError(400, 'Some employees not found');

      const url = new URL('https://api.opencagedata.com/geocode/v1/json');
      url.searchParams.set('q', latitude + '+' + longitude);
      url.searchParams.set('key', OPENCAGE_API);
      url.searchParams.set('language', 'id');
      url.searchParams.set('countrycode', 'id');
      const output = url.toString();

      const { data } = await axios.get(output);
      const { formatted, components } = data.results.at(0);

      const [outlet, _] = await Promise.all([
        prisma.outlet.create({
          data: {
            name,
            description,
            address,
            latitude,
            longitude,
            formatted,
            city: components.city,
            road: components.road,
            region: components.state,
            suburb: components.suburb,
            zipcode: components.postcode,
            city_district: components.city_district,
            Employee: {
              createMany: {
                data: employees.map((employee) => ({
                  user_id: employee.user_id,
                })),
              },
            },
          },
        }),

        prisma.$transaction([
          ...employees.map((employee) => {
            return prisma.user.update({
              where: { user_id: employee.user_id },
              data: { role: employee.role },
            });
          }),
        ]),
      ]);

      return outlet;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new ApiError(
          (error.response && error.response.status) || 500,
          (error.response && error.response.data) || 'Something went wrong'
        );
      }
      throw error;
    }
  };

  update = async (
    outlet_id: string,
    name: string,
    description: string,
    address: string,
    latitude: number,
    longitude: number
  ) => {
    try {
      const outlet = await prisma.outlet.findUnique({
        where: { outlet_id },
      });

      if (!outlet) throw new ApiError(404, 'Outlet not found');

      if (Number(outlet.latitude) === latitude && Number(outlet.longitude) === longitude) {
        await prisma.outlet.update({
          where: { outlet_id },
          data: {
            name,
            description,
            address,
          },
        });
      } else {
        const url = new URL('https://api.opencagedata.com/geocode/v1/json');
        url.searchParams.set('q', latitude + '+' + longitude);
        url.searchParams.set('key', OPENCAGE_API);
        url.searchParams.set('language', 'id');
        url.searchParams.set('countrycode', 'id');
        const output = url.toString();

        const { data } = await axios.get(output);
        const { formatted, components } = data.results.at(0);

        await prisma.outlet.update({
          where: { outlet_id },
          data: {
            name,
            description,
            address,
            latitude,
            longitude,
            formatted,
            city: components.city,
            road: components.road,
            region: components.state,
            suburb: components.suburb,
            zipcode: components.postcode,
            city_district: components.city_district,
          },
        });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        throw new ApiError(
          (error.response && error.response.status) || 500,
          (error.response && error.response.data) || 'Something went wrong'
        );
      }
      if (error instanceof ApiError) throw error;
    }
  };

  nearest = async (customer_address_id: string) => {
    try {
      const customer_address = await prisma.customerAdress.findUnique({
        where: {
          customer_address_id,
        },
        select: {
          latitude: true,
          longitude: true,
        },
      });

      if (!customer_address) throw new ApiError(404, 'Customer address not found');

      const { latStart, latEnd, lonStart, lonEnd } = getTreshold(
        Number(customer_address.latitude),
        Number(customer_address.longitude),
        MAXIMUM_RADIUS
      );

      console.log(customer_address.latitude, customer_address.longitude);
      console.log(latStart, latEnd, lonStart, lonEnd);

      const outlets = await prisma.outlet.findMany({
        where: {
          AND: [
            {
              latitude: {
                gte: latStart,
                lte: latEnd,
              },
            },
            {
              longitude: {
                gte: lonStart,
                lte: lonEnd,
              },
            },
          ],
        },
        orderBy: {
          created_at: 'asc',
        },
      });

      if (!outlets) throw new ApiError(404, 'No outlet found nearby');

      return outlets.map((outlet) => ({
        outlet,
        distance: getDistance(
          Number(customer_address.latitude),
          Number(customer_address.longitude),
          Number(outlet.latitude),
          Number(outlet.longitude)
        ),
      }));
    } catch (error) {
      throw error;
    }
  };
}
