import { d as defineEventHandler, c as createError } from '../../../../nitro/nitro.mjs';
import { f as TeamMemberService } from '../../../../_/db-helpers.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'mongodb';

const team_get = defineEventHandler(async (event) => {
  try {
    const teamMembers = await TeamMemberService.getActiveMembers();
    return teamMembers.map((member) => ({
      ...member,
      id: member._id.toString()
    }));
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch team members"
    });
  }
});

export { team_get as default };
//# sourceMappingURL=team.get.mjs.map
