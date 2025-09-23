import { d as defineEventHandler, c as createError } from '../../../../nitro/nitro.mjs';
import { F as FAQHelper } from '../../../../_/db-helpers.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'mongodb';

const faqs_get = defineEventHandler(async (event) => {
  try {
    const faqs = await FAQHelper.findMany(
      { isActive: true },
      { sort: { order: 1 } }
    );
    return faqs.map((faq) => ({
      ...faq,
      id: faq._id.toString()
    }));
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch FAQs"
    });
  }
});

export { faqs_get as default };
//# sourceMappingURL=faqs.get.mjs.map
