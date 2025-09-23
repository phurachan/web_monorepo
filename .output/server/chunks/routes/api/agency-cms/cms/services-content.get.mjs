import { d as defineEventHandler } from '../../../../nitro/nitro.mjs';
import { c as ContentService } from '../../../../_/db-helpers.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'mongodb';

const servicesContent_get = defineEventHandler(async (event) => {
  try {
    const content = await ContentService.getServicesContent();
    const defaultContent = {
      heroTitle: "Digital Marketing Services",
      heroSubtitle: "Transform your business with comprehensive digital marketing solutions that drive growth, increase visibility, and maximize your ROI.",
      heroImage: null
    };
    return content ? {
      ...content,
      id: content._id.toString()
    } : defaultContent;
  } catch (error) {
    console.error("Error fetching services content:", error);
    return {
      heroTitle: "Digital Marketing Services",
      heroSubtitle: "Transform your business with comprehensive digital marketing solutions that drive growth, increase visibility, and maximize your ROI.",
      heroImage: null
    };
  }
});

export { servicesContent_get as default };
//# sourceMappingURL=services-content.get.mjs.map
