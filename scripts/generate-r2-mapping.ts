// scripts/generate-r2-mapping.ts
// Complete working version that reads from R2 bucket

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

// Load environment variables manually if needed
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

interface FrontMatter {
  galleryFolder?: string;
  [key: string]: unknown;
}

interface R2FolderMapping {
  [folderPath: string]: string[];
}

/**
 * Normalize gallery folder paths to be consistent
 */
function normalizeGalleryPath(inputPath: string): string {
  let normalized = inputPath.replace(/^\/+/, '').replace(/\/+$/, '').replace(/^images\//, '');
  
  if (!normalized.startsWith('tours/gallery/')) {
    if (normalized.startsWith('gallery/')) {
      normalized = 'tours/' + normalized;
    } else if (!normalized.startsWith('tours/')) {
      normalized = 'tours/gallery/' + normalized;
    }
  }
  
  return normalized;
}

/**
 * Initialize R2 client
 */
function createR2Client(): S3Client | null {
  const config = {
    endpoint: process.env.R2_ENDPOINT,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    bucketName: process.env.R2_BUCKET_NAME,
    region: process.env.R2_REGION || 'auto'
  };

  // console.log('🔧 Environment check:');
  // console.log('   R2_ENDPOINT:', config.endpoint ? '✓ Set' : '❌ Missing');
  // console.log('   R2_ACCESS_KEY_ID:', config.accessKeyId ? '✓ Set' : '❌ Missing');  
  // console.log('   R2_SECRET_ACCESS_KEY:', config.secretAccessKey ? '✓ Set' : '❌ Missing');
  // console.log('   R2_BUCKET_NAME:', config.bucketName ? '✓ Set' : '❌ Missing');

  if (!config.endpoint || !config.accessKeyId || !config.secretAccessKey || !config.bucketName) {
    console.warn('\n⚠️  R2 credentials not fully configured. Add to .env.local:');
    console.warn('   R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com');
    console.warn('   R2_ACCESS_KEY_ID=your-access-key');
    console.warn('   R2_SECRET_ACCESS_KEY=your-secret-key');
    console.warn('   R2_BUCKET_NAME=your-bucket-name');
    console.warn('\n📝 Make sure .env.local is in your project root and has no quotes around values');
    return null;
  }

  // console.log('✅ All R2 credentials found, connecting to bucket:', config.bucketName);

  try {
    return new S3Client({
      endpoint: config.endpoint,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      region: config.region,
    });
  } catch (error) {
    console.error('❌ Failed to create R2 client:', error);
    return null;
  }
}

/**
 * Get actual images from R2 bucket
 */
async function getR2Images(client: S3Client, folderPath: string): Promise<string[]> {
  try {
    const prefix = folderPath.endsWith('/') ? folderPath : folderPath + '/';
    
    // console.log('   🔍 Listing objects with prefix:', prefix);
    
    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME!,
      Prefix: prefix,
    });
    
    const response = await client.send(command);
    
    if (!response.Contents) {
      // console.log('   ❌ No contents returned from R2');
      return [];
    }
    
    // console.log('   📦 Raw objects found:', response.Contents.length);
    
    const imageFiles = response.Contents
      .map(obj => obj.Key || '')
      .filter(key => {
        const fileName = key.split('/').pop() || '';
        const isImage = /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(fileName);
        const isInFolder = key.startsWith(prefix) && key !== prefix;
        const notFolder = !key.endsWith('/');
        
        // console.log('     📄', key, '→', { fileName, isImage, isInFolder, notFolder });
        
        return isImage && isInFolder && notFolder;
      })
      .map(key => {
        // IMPORTANT: Return only the filename, not the full path
        const filename = key.split('/').pop() || '';
        // console.log('     ✂️  Extracting filename:', key, '→', filename);
        return filename;
      })
      .filter(name => name.length > 0)
      .sort();
    
    // console.log('   📷 Final filtered images:', imageFiles);
    return imageFiles;
    
  } catch (error) {
    console.error(`❌ Error reading R2 folder ${folderPath}:`, error);
    return [];
  }
}

/**
 * Generate fallback images
 */
function getFallbackImages(folderName: string): string[] {
  const base = ["01-main.jpg", "02-landscape.jpg", "03-group.jpg", "04-activity.jpg"];
  
  if (folderName.includes('culture')) base.push("cultural-dance.jpg", "monastery.jpg");
  else if (folderName.includes('cycle')) base.push("cycling-action.jpg", "mountain-bike.jpg");
  else if (folderName.includes('trek')) base.push("trekking-trail.jpg", "summit.jpg");
  else if (folderName.includes('family')) base.push("family-fun.jpg", "children.jpg");
  else if (folderName.includes('motorcycle')) base.push("motorcycle-ride.jpg", "mountain-road.jpg");
  else if (folderName.includes('wildlife')) base.push("wildlife-spotting.jpg", "safari.jpg");
  
  return base;
}

/**
 * Scan MDX files for gallery folders
 */
function scanMDXFiles(contentDir: string): string[] {
  const folders = new Set<string>();
  
  function scan(dir: string) {
    for (const item of fs.readdirSync(dir)) {
      const itemPath = path.join(dir, item);
      
      if (fs.statSync(itemPath).isDirectory()) {
        scan(itemPath);
      } else if (item.endsWith('.mdx') || item.endsWith('.md')) {
        try {
          const content = fs.readFileSync(itemPath, 'utf8');
          const { data } = matter(content) as { data: FrontMatter };
          
          if (data.galleryFolder) {
            const normalized = normalizeGalleryPath(data.galleryFolder);
            folders.add(normalized);
            // console.log('📁', data.galleryFolder, '→', normalized);
          }
        } catch (error) {
          console.warn('⚠️  Parse error:', itemPath, error);
        }
      }
    }
  }
  
  scan(contentDir);
  return Array.from(folders).sort();
}

/**
 * Main function
 */
async function main(): Promise<void> {
  try {
    // console.log('🚀 Generating R2 mapping...\n');
    
    const contentDir = path.join(process.cwd(), 'content');
    const outputPath = path.join(process.cwd(), 'lib', 'r2-folder-mapping.ts');
    
    // Scan for gallery folders
    // console.log('📖 Scanning MDX files...');
    const folders = scanMDXFiles(contentDir);
    
    if (folders.length === 0) {
      // console.log('❌ No gallery folders found');
      return;
    }
    
    // console.log(`\n📊 Found ${folders.length} gallery folders`);
    
    // Create R2 client
    const r2Client = createR2Client();
    const mapping: R2FolderMapping = {};
    let r2Count = 0;
    let fallbackCount = 0;
    
    if (r2Client) {
      // console.log('\n🌐 Reading from R2 bucket...');
      
      // Test just the first folder to see if R2 connection works
      const testFolder = folders[0];
      // console.log('\n🧪 Testing R2 connection with folder:', testFolder);
      const testImages = await getR2Images(r2Client, testFolder);
      
      if (testImages.length > 0) {
        // console.log('✅ R2 connection working! Found', testImages.length, 'test images');
        
        // Process all folders
        for (const folder of folders) {
          // console.log('\n🔍', folder);
          const images = await getR2Images(r2Client, folder);
          
          if (images.length > 0) {
            mapping[folder] = images;
            r2Count += images.length;
            // console.log('   ✅', images.length, 'images found');
          } else {
            const fallback = getFallbackImages(folder);
            mapping[folder] = fallback;
            fallbackCount += fallback.length;
            // console.log('   🔄 Using', fallback.length, 'fallback images');
          }
        }
      } else {
        // console.log('❌ R2 connection failed or no images in test folder');
        // console.log('🔄 Using fallback images for all folders...');
        
        for (const folder of folders) {
          const fallback = getFallbackImages(folder);
          mapping[folder] = fallback;
          fallbackCount += fallback.length;
        }
      }
    } else {
      // console.log('\n🔄 Using fallback images...');
      for (const folder of folders) {
        const fallback = getFallbackImages(folder);
        mapping[folder] = fallback;
        fallbackCount += fallback.length;
      }
    }
    
    // Generate output file
    const totalImages = r2Count + fallbackCount;
    const content = `// Auto-generated R2 folder mapping
// Generated: ${new Date().toISOString()}
// Folders: ${folders.length} | Images: ${totalImages} | R2: ${r2Count} | Fallback: ${fallbackCount}

export const R2_FOLDER_MAPPING: Record<string, string[]> = ${JSON.stringify(mapping, null, 2)};

export function getR2FolderImages(folderPath: string): string[] {
  const images = R2_FOLDER_MAPPING[folderPath];
  if (!images) {
    console.warn('❌ No images for:', folderPath);
    return [];
  }
  return images;
}

export function getAvailableFolders(): string[] {
  return Object.keys(R2_FOLDER_MAPPING);
}

export function getTotalImageCount(): number {
  return Object.values(R2_FOLDER_MAPPING).reduce((total, images) => total + images.length, 0);
}

export default R2_FOLDER_MAPPING;
`;

    // Write file
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, content);
    
    // console.log('\n✅ Mapping generated successfully!');
    // console.log('📁 Output:', outputPath);
    // console.log('📊 Folders:', folders.length);
    // console.log('🖼️  Total images:', totalImages);
    // if (r2Client) {
    //   console.log('📷 R2 images:', r2Count);
    //   console.log('🔄 Fallback images:', fallbackCount);
    // }
    
    // Show sample mappings
    // console.log('\n📂 Sample mappings:');
    // Object.entries(mapping).slice(0, 3).forEach(([folder, images]) => {
    //   console.log(`   ${folder}: ${images[0]}${images.length > 1 ? `, ${images[1]}...` : ''} (${images.length} total)`);
    // });
    
    // console.log('\n💡 Next steps:');
    // console.log('1. Test with: npm run dev');
    // if (r2Client && r2Count > 0) {
    //   console.log('2. You can now delete public/images folder');
    // } else {
    //   console.log('2. Check R2 credentials and bucket contents');
    // }
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export default main;