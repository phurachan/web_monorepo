import { d as defineEventHandler, c as createError, r as readBody } from '../../../../nitro/nitro.mjs';
import { h as hashPassword } from '../../../../_/auth.mjs';
import { U as UserService, H as HomeContentHelper, S as ServiceHelper, A as AboutContentHelper, C as ContactContentHelper, b as SiteSettingsHelper } from '../../../../_/db-helpers.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'bcryptjs';
import 'jsonwebtoken';
import 'mongodb';

const setup_post = defineEventHandler(async (event) => {
  try {
    const existingAdmin = await UserService.userExists();
    if (existingAdmin) {
      throw createError({
        statusCode: 400,
        statusMessage: "Admin user already exists"
      });
    }
    const { email, password, name } = await readBody(event);
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email and password are required"
      });
    }
    const hashedPassword = await hashPassword(password);
    const admin = await UserService.createUser({
      email,
      password: hashedPassword,
      name: name || "Admin",
      role: "ADMIN"
    });
    await createDefaultContent();
    return {
      success: true,
      admin: {
        id: admin._id.toString(),
        email: admin.email,
        name: admin.name,
        role: admin.role
      },
      message: "Admin user created successfully"
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create admin user"
    });
  }
});
async function createDefaultContent() {
  await HomeContentHelper.create({
    heroTitle: JSON.stringify({
      "en": "Elevate Your Digital Presence",
      "th": "\u0E22\u0E01\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E21\u0E35\u0E15\u0E31\u0E27\u0E15\u0E19\u0E43\u0E19\u0E42\u0E25\u0E01\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25"
    }),
    heroSubtitle: JSON.stringify({
      "en": "We craft innovative digital marketing solutions that drive growth, boost engagement, and transform your business for the digital age.",
      "th": "\u0E40\u0E23\u0E32\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E42\u0E0B\u0E25\u0E39\u0E0A\u0E31\u0E48\u0E19\u0E01\u0E32\u0E23\u0E15\u0E25\u0E32\u0E14\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25\u0E17\u0E35\u0E48\u0E19\u0E27\u0E31\u0E15\u0E01\u0E23\u0E23\u0E21\u0E43\u0E2B\u0E21\u0E48 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15 \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E01\u0E32\u0E23\u0E21\u0E35\u0E2A\u0E48\u0E27\u0E19\u0E23\u0E48\u0E27\u0E21 \u0E41\u0E25\u0E30\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13\u0E2A\u0E39\u0E48\u0E22\u0E38\u0E04\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25"
    }),
    ctaText: JSON.stringify({
      "en": "Ready to Get Started?",
      "th": "\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E17\u0E35\u0E48\u0E08\u0E30\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19\u0E41\u0E25\u0E49\u0E27\u0E2B\u0E23\u0E37\u0E2D\u0E22\u0E31\u0E07?"
    }),
    ctaButtonText: JSON.stringify({
      "en": "Start Your Journey",
      "th": "\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19\u0E01\u0E32\u0E23\u0E40\u0E14\u0E34\u0E19\u0E17\u0E32\u0E07\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13"
    }),
    aboutTitle: JSON.stringify({
      "en": "Why Choose Us?",
      "th": "\u0E17\u0E33\u0E44\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E23\u0E32?"
    }),
    aboutDescription: JSON.stringify({
      "en": "With over a decade of experience in digital marketing, we've helped hundreds of businesses transform their online presence and achieve remarkable growth.",
      "th": "\u0E14\u0E49\u0E27\u0E22\u0E1B\u0E23\u0E30\u0E2A\u0E1A\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E01\u0E27\u0E48\u0E32\u0E17\u0E28\u0E27\u0E23\u0E23\u0E29\u0E43\u0E19\u0E01\u0E32\u0E23\u0E15\u0E25\u0E32\u0E14\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25 \u0E40\u0E23\u0E32\u0E44\u0E14\u0E49\u0E0A\u0E48\u0E27\u0E22\u0E43\u0E2B\u0E49\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08\u0E2B\u0E25\u0E32\u0E22\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E2B\u0E48\u0E07\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E01\u0E32\u0E23\u0E21\u0E35\u0E15\u0E31\u0E27\u0E15\u0E19\u0E2D\u0E2D\u0E19\u0E44\u0E25\u0E19\u0E4C\u0E41\u0E25\u0E30\u0E1A\u0E23\u0E23\u0E25\u0E38\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E17\u0E35\u0E48\u0E19\u0E48\u0E32\u0E17\u0E36\u0E48\u0E07"
    })
  });
  const defaultServices = [
    {
      title: JSON.stringify({
        "en": "SEO Optimization",
        "th": "\u0E01\u0E32\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E SEO"
      }),
      description: JSON.stringify({
        "en": "Boost your search rankings and organic traffic with our proven SEO strategies.",
        "th": "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E0A\u0E21\u0E41\u0E1A\u0E1A\u0E2D\u0E2D\u0E23\u0E4C\u0E41\u0E01\u0E19\u0E34\u0E01\u0E14\u0E49\u0E27\u0E22\u0E01\u0E25\u0E22\u0E38\u0E17\u0E18\u0E4C SEO \u0E17\u0E35\u0E48\u0E1E\u0E34\u0E2A\u0E39\u0E08\u0E19\u0E4C\u0E41\u0E25\u0E49\u0E27"
      }),
      icon: "search",
      features: JSON.stringify([
        { "en": "Keyword Research", "th": "\u0E01\u0E32\u0E23\u0E27\u0E34\u0E08\u0E31\u0E22\u0E04\u0E33\u0E2B\u0E25\u0E31\u0E01" },
        { "en": "On-Page SEO", "th": "\u0E01\u0E32\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E43\u0E19\u0E2B\u0E19\u0E49\u0E32" },
        { "en": "Link Building", "th": "\u0E01\u0E32\u0E23\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E25\u0E34\u0E07\u0E01\u0E4C" }
      ]),
      order: 1
    },
    {
      title: JSON.stringify({
        "en": "Social Media Marketing",
        "th": "\u0E01\u0E32\u0E23\u0E15\u0E25\u0E32\u0E14\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E31\u0E07\u0E04\u0E21"
      }),
      description: JSON.stringify({
        "en": "Engage your audience across all social platforms with compelling content.",
        "th": "\u0E14\u0E36\u0E07\u0E14\u0E39\u0E14\u0E1C\u0E39\u0E49\u0E0A\u0E21\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13\u0E43\u0E19\u0E17\u0E38\u0E01\u0E41\u0E1E\u0E25\u0E15\u0E1F\u0E2D\u0E23\u0E4C\u0E21\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E31\u0E07\u0E04\u0E21\u0E14\u0E49\u0E27\u0E22\u0E40\u0E19\u0E37\u0E49\u0E2D\u0E2B\u0E32\u0E17\u0E35\u0E48\u0E19\u0E48\u0E32\u0E2A\u0E19\u0E43\u0E08"
      }),
      icon: "social",
      features: JSON.stringify([
        { "en": "Content Strategy", "th": "\u0E01\u0E25\u0E22\u0E38\u0E17\u0E18\u0E4C\u0E40\u0E19\u0E37\u0E49\u0E2D\u0E2B\u0E32" },
        { "en": "Community Management", "th": "\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E0A\u0E38\u0E21\u0E0A\u0E19" },
        { "en": "Paid Social", "th": "\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E31\u0E07\u0E04\u0E21\u0E41\u0E1A\u0E1A\u0E08\u0E48\u0E32\u0E22" }
      ]),
      order: 2
    },
    {
      title: JSON.stringify({
        "en": "Web Development",
        "th": "\u0E01\u0E32\u0E23\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E40\u0E27\u0E47\u0E1A\u0E44\u0E0B\u0E15\u0E4C"
      }),
      description: JSON.stringify({
        "en": "Modern, responsive websites that convert visitors into customers.",
        "th": "\u0E40\u0E27\u0E47\u0E1A\u0E44\u0E0B\u0E15\u0E4C\u0E17\u0E35\u0E48\u0E17\u0E31\u0E19\u0E2A\u0E21\u0E31\u0E22\u0E41\u0E25\u0E30\u0E15\u0E2D\u0E1A\u0E2A\u0E19\u0E2D\u0E07\u0E17\u0E35\u0E48\u0E41\u0E1B\u0E25\u0E07\u0E1C\u0E39\u0E49\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21\u0E0A\u0E21\u0E43\u0E2B\u0E49\u0E40\u0E1B\u0E47\u0E19\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32"
      }),
      icon: "code",
      features: JSON.stringify([
        { "en": "Custom Design", "th": "\u0E01\u0E32\u0E23\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E41\u0E1A\u0E1A\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E40\u0E2D\u0E07" },
        { "en": "E-commerce", "th": "\u0E2D\u0E35\u0E04\u0E2D\u0E21\u0E40\u0E21\u0E34\u0E23\u0E4C\u0E0B" },
        { "en": "Mobile-First", "th": "\u0E21\u0E37\u0E2D\u0E16\u0E37\u0E2D\u0E40\u0E1B\u0E47\u0E19\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A\u0E41\u0E23\u0E01" }
      ]),
      order: 3
    }
  ];
  for (const service of defaultServices) {
    await ServiceHelper.create(service);
  }
  await AboutContentHelper.create({
    missionTitle: JSON.stringify({
      "en": "Our Mission",
      "th": "\u0E1E\u0E31\u0E19\u0E18\u0E01\u0E34\u0E08\u0E02\u0E2D\u0E07\u0E40\u0E23\u0E32"
    }),
    missionText: JSON.stringify({
      "en": "We believe every business deserves to succeed online. Our mission is to democratize digital marketing by providing world-class strategies.",
      "th": "\u0E40\u0E23\u0E32\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E27\u0E48\u0E32\u0E17\u0E38\u0E01\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08\u0E2A\u0E21\u0E04\u0E27\u0E23\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08\u0E2D\u0E2D\u0E19\u0E44\u0E25\u0E19\u0E4C \u0E1E\u0E31\u0E19\u0E18\u0E01\u0E34\u0E08\u0E02\u0E2D\u0E07\u0E40\u0E23\u0E32\u0E04\u0E37\u0E2D\u0E01\u0E32\u0E23\u0E17\u0E33\u0E43\u0E2B\u0E49\u0E01\u0E32\u0E23\u0E15\u0E25\u0E32\u0E14\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25\u0E40\u0E1B\u0E47\u0E19\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E18\u0E34\u0E1B\u0E44\u0E15\u0E22\u0E42\u0E14\u0E22\u0E43\u0E2B\u0E49\u0E01\u0E25\u0E22\u0E38\u0E17\u0E18\u0E4C\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E42\u0E25\u0E01"
    }),
    visionTitle: JSON.stringify({
      "en": "Our Vision",
      "th": "\u0E27\u0E34\u0E2A\u0E31\u0E22\u0E17\u0E31\u0E28\u0E19\u0E4C\u0E02\u0E2D\u0E07\u0E40\u0E23\u0E32"
    }),
    visionText: JSON.stringify({
      "en": "To become the leading digital marketing agency that transforms businesses through innovative technology and creative excellence.",
      "th": "\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E2D\u0E40\u0E08\u0E19\u0E0B\u0E35\u0E48\u0E01\u0E32\u0E23\u0E15\u0E25\u0E32\u0E14\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25\u0E0A\u0E31\u0E49\u0E19\u0E19\u0E33\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08\u0E1C\u0E48\u0E32\u0E19\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E19\u0E27\u0E31\u0E15\u0E01\u0E23\u0E23\u0E21\u0E41\u0E25\u0E30\u0E04\u0E27\u0E32\u0E21\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E25\u0E34\u0E28\u0E14\u0E49\u0E32\u0E19\u0E04\u0E27\u0E32\u0E21\u0E04\u0E34\u0E14\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2A\u0E23\u0E23\u0E04\u0E4C"
    }),
    valuesTitle: JSON.stringify({
      "en": "Our Values",
      "th": "\u0E04\u0E48\u0E32\u0E19\u0E34\u0E22\u0E21\u0E02\u0E2D\u0E07\u0E40\u0E23\u0E32"
    }),
    valuesText: JSON.stringify({
      "en": "Excellence, Transparency, Innovation - these core values guide everything we do.",
      "th": "\u0E04\u0E27\u0E32\u0E21\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E25\u0E34\u0E28 \u0E04\u0E27\u0E32\u0E21\u0E42\u0E1B\u0E23\u0E48\u0E07\u0E43\u0E2A \u0E19\u0E27\u0E31\u0E15\u0E01\u0E23\u0E23\u0E21 - \u0E04\u0E48\u0E32\u0E19\u0E34\u0E22\u0E21\u0E2B\u0E25\u0E31\u0E01\u0E40\u0E2B\u0E25\u0E48\u0E32\u0E19\u0E35\u0E49\u0E19\u0E33\u0E17\u0E32\u0E07\u0E17\u0E38\u0E01\u0E2A\u0E34\u0E48\u0E07\u0E17\u0E35\u0E48\u0E40\u0E23\u0E32\u0E17\u0E33"
    }),
    historyTitle: JSON.stringify({
      "en": "Our Journey",
      "th": "\u0E01\u0E32\u0E23\u0E40\u0E14\u0E34\u0E19\u0E17\u0E32\u0E07\u0E02\u0E2D\u0E07\u0E40\u0E23\u0E32"
    }),
    historyText: JSON.stringify({
      "en": "From startup to industry leader, we've been helping businesses grow since 2015.",
      "th": "\u0E08\u0E32\u0E01\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E17\u0E2D\u0E31\u0E1B\u0E2A\u0E39\u0E48\u0E1C\u0E39\u0E49\u0E19\u0E33\u0E2D\u0E38\u0E15\u0E2A\u0E32\u0E2B\u0E01\u0E23\u0E23\u0E21 \u0E40\u0E23\u0E32\u0E44\u0E14\u0E49\u0E0A\u0E48\u0E27\u0E22\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E21\u0E32\u0E15\u0E31\u0E49\u0E07\u0E41\u0E15\u0E48\u0E1B\u0E35 2015"
    })
  });
  await ContactContentHelper.create({
    title: JSON.stringify({
      "en": "Get In Touch",
      "th": "\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E40\u0E23\u0E32"
    }),
    subtitle: JSON.stringify({
      "en": "Ready to transform your digital presence? Let's discuss how we can help accelerate your business growth.",
      "th": "\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E17\u0E35\u0E48\u0E08\u0E30\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E01\u0E32\u0E23\u0E21\u0E35\u0E15\u0E31\u0E27\u0E15\u0E19\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13\u0E41\u0E25\u0E49\u0E27\u0E2B\u0E23\u0E37\u0E2D\u0E22\u0E31\u0E07? \u0E21\u0E32\u0E04\u0E38\u0E22\u0E01\u0E31\u0E19\u0E27\u0E48\u0E32\u0E40\u0E23\u0E32\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E0A\u0E48\u0E27\u0E22\u0E40\u0E23\u0E48\u0E07\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E02\u0E2D\u0E07\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08\u0E04\u0E38\u0E13\u0E44\u0E14\u0E49\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E44\u0E23"
    }),
    phone: "+1 (555) 123-4567",
    email: "hello@digitalflow.com",
    address: JSON.stringify({
      "en": "123 Innovation Drive, Tech Valley, CA 94105",
      "th": "123 \u0E16\u0E19\u0E19\u0E19\u0E27\u0E31\u0E15\u0E01\u0E23\u0E23\u0E21 \u0E40\u0E17\u0E04\u0E41\u0E27\u0E25\u0E25\u0E35\u0E48\u0E22\u0E4C \u0E41\u0E04\u0E25\u0E34\u0E1F\u0E2D\u0E23\u0E4C\u0E40\u0E19\u0E35\u0E22 94105"
    }),
    businessHours: JSON.stringify({
      "Monday - Friday": "9:00 AM - 6:00 PM",
      "Saturday": "10:00 AM - 4:00 PM",
      "Sunday": "Closed"
    })
  });
  await SiteSettingsHelper.create({
    siteName: "Digital Agency",
    siteTagline: "Elevating brands through innovative digital marketing solutions",
    primaryColor: "#6495ed",
    secondaryColor: "#9333ea",
    socialLinks: JSON.stringify({
      twitter: "#",
      linkedin: "#",
      facebook: "#"
    })
  });
}

export { setup_post as default };
//# sourceMappingURL=setup.post.mjs.map
