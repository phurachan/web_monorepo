import { d as defineEventHandler, c as createError } from '../../../../nitro/nitro.mjs';
import { e as ServiceService } from '../../../../_/db-helpers.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'mongodb';

const services_get = defineEventHandler(async (event) => {
  try {
    const services = await ServiceService.getAllServices();
    return services.map((service) => {
      console.log("Processing service:", service.title, "features type:", typeof service.features, "value:", service.features);
      try {
        const parsedFeatures = JSON.parse(service.features || "[]");
        console.log("Parsed features:", parsedFeatures);
        return {
          ...service,
          id: service._id.toString(),
          features: parsedFeatures
        };
      } catch (error) {
        console.error("Failed to parse features for service:", service._id.toString(), error);
        return {
          ...service,
          id: service._id.toString(),
          features: []
        };
      }
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch services"
    });
  }
});

export { services_get as default };
//# sourceMappingURL=services.get.mjs.map
