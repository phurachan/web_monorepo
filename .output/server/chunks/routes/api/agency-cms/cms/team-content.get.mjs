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

const teamContent_get = defineEventHandler(async (event) => {
  try {
    const content = await ContentService.getTeamContent();
    const defaultContent = {
      heroTitle: "Meet Our People",
      heroSubtitle: "Get to know the talented individuals who drive our success and make exceptional results possible.",
      heroImage: null
    };
    return content ? {
      ...content,
      id: content._id.toString()
    } : defaultContent;
  } catch (error) {
    console.error("Error fetching team content:", error);
    return {
      heroTitle: "Meet Our People",
      heroSubtitle: "Get to know the talented individuals who drive our success and make exceptional results possible.",
      heroImage: null
    };
  }
});

export { teamContent_get as default };
//# sourceMappingURL=team-content.get.mjs.map
