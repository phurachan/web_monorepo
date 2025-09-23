#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Environment variable mappings for each layer
const ENV_MAPPINGS = {
  'agency': {
    'MONGO_URI': 'AGENCY_MONGO_URI',
    'JWT_SECRET': 'AGENCY_JWT_SECRET'
  },
  'local-spot': {
    'MONGO_URI': 'LOCAL_SPOT_MONGO_URI',
    'JWT_SECRET': 'LOCAL_SPOT_JWT_SECRET',
    'JWT_EXPIRES_IN': 'LOCAL_SPOT_JWT_EXPIRES_IN'
  }
};

function replaceEnvVariables(content, layerType) {
  if (!ENV_MAPPINGS[layerType]) {
    return content;
  }

  let updatedContent = content;
  const mappings = ENV_MAPPINGS[layerType];

  for (const [oldVar, newVar] of Object.entries(mappings)) {
    // Replace process.env.OLD_VAR with process.env.NEW_VAR
    const regex1 = new RegExp(`process\\.env\\.${oldVar}`, 'g');
    updatedContent = updatedContent.replace(regex1, `process.env.${newVar}`);

    // Replace env.OLD_VAR with env.NEW_VAR (for runtimeConfig)
    const regex2 = new RegExp(`env\\.${oldVar}`, 'g');
    updatedContent = updatedContent.replace(regex2, `env.${newVar}`);

    // Replace 'OLD_VAR' with 'NEW_VAR' in env access patterns
    const regex3 = new RegExp(`['"]${oldVar}['"]`, 'g');
    updatedContent = updatedContent.replace(regex3, `'${newVar}'`);
  }

  return updatedContent;
}

function copyDirectorySync(src, dest, layerType = null) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectorySync(srcPath, destPath, layerType);
    } else {
      // Special handling for main.css to merge instead of overwrite
      if (entry.name === 'main.css' && fs.existsSync(destPath)) {
        const existingContent = fs.readFileSync(destPath, 'utf8');
        const newContent = fs.readFileSync(srcPath, 'utf8');

        // Create merged CSS with comments indicating source
        const mergedContent = [
          '/* Merged CSS from layers */',
          '',
          '/* From digital-agency layer */',
          existingContent.includes('--primary-color') ? existingContent : '',
          '',
          '/* From local-spot layer */',
          !newContent.includes('--primary-color') ? newContent : '',
        ].join('\n');

        fs.writeFileSync(destPath, mergedContent, 'utf8');
        console.log(`Merged: ${srcPath} -> ${destPath}`);
        continue;
      }

      // Check if it's a binary file (images, etc.)
      const isBinaryFile = /\.(png|jpg|jpeg|gif|webp|svg|ico|pdf|zip|tar|gz|mp4|mp3|woff|woff2|ttf|eot)$/i.test(entry.name);

      if (isBinaryFile) {
        // Copy binary files without encoding
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied (binary): ${srcPath} -> ${destPath}`);
      } else {
        // Read text file content
        let content = fs.readFileSync(srcPath, 'utf8');

        // Replace environment variables if it's a TypeScript/JavaScript file
        if (layerType && (entry.name.endsWith('.ts') || entry.name.endsWith('.js'))) {
          content = replaceEnvVariables(content, layerType);
        }

        // Write updated content
        fs.writeFileSync(destPath, content, 'utf8');
        console.log(`Copied (text): ${srcPath} -> ${destPath}`);
      }
    }
  }
}

function main() {
  const digitalAgencyServer = '../digital-agency/server';
  const digitalAgencyLib = '../digital-agency/lib';
  const digitalAgencyAssets = '../digital-agency/assets';
  const digitalAgencyPublic = '../digital-agency/public';
  const localSpotServer = '../local-spot/server';
  const localSpotAssets = '../local-spot/assets';
  const localSpotPublic = '../local-spot/public';
  const targetServer = './server';
  const targetLib = './lib';
  const targetAssets = './assets';
  const targetPublic = './public';

  console.log('Copying files from layers...');
  console.log('Note: Skipping composables and components (Nuxt auto-imports from layers)');

  // Copy from digital-agency with env variable replacement
  if (fs.existsSync(digitalAgencyServer)) {
    console.log('Copying from digital-agency server...');
    copyDirectorySync(digitalAgencyServer, targetServer, 'agency');
  }

  // Copy lib files from digital-agency with env variable replacement
  if (fs.existsSync(digitalAgencyLib)) {
    console.log('Copying from digital-agency lib...');
    copyDirectorySync(digitalAgencyLib, targetLib, 'agency');
  }

  // Copy assets from digital-agency
  if (fs.existsSync(digitalAgencyAssets)) {
    console.log('Copying from digital-agency assets...');
    copyDirectorySync(digitalAgencyAssets, targetAssets, 'agency');
  }

  // Copy public files from digital-agency
  if (fs.existsSync(digitalAgencyPublic)) {
    console.log('Copying from digital-agency public...');
    copyDirectorySync(digitalAgencyPublic, targetPublic, 'agency');
  }

  // Copy from local-spot with env variable replacement
  if (fs.existsSync(localSpotServer)) {
    console.log('Copying from local-spot server...');
    copyDirectorySync(localSpotServer, targetServer, 'local-spot');
  }

  // Copy assets from local-spot (will overwrite if conflicts)
  if (fs.existsSync(localSpotAssets)) {
    console.log('Copying from local-spot assets...');
    copyDirectorySync(localSpotAssets, targetAssets, 'local-spot');
  }

  // Copy public files from local-spot (will overwrite if conflicts)
  if (fs.existsSync(localSpotPublic)) {
    console.log('Copying from local-spot public...');
    copyDirectorySync(localSpotPublic, targetPublic, 'local-spot');
  }

  console.log('All files copied successfully!');
  console.log('\nSkipped copying: composables, components (auto-imported by Nuxt layers)');
  console.log('\nEnvironment variable replacements applied:');
  console.log('Digital Agency: MONGO_URI -> AGENCY_MONGO_URI, JWT_SECRET -> AGENCY_JWT_SECRET');
  console.log('Local Spot: MONGO_URI -> LOCAL_SPOT_MONGO_URI, JWT_SECRET -> LOCAL_SPOT_JWT_SECRET, JWT_EXPIRES_IN -> LOCAL_SPOT_JWT_EXPIRES_IN');
}

main();