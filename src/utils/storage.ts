import { supabase } from '@/integrations/supabase/client';

export type BucketName = 'images' | 'documents';

/**
 * Uploads a file to a Supabase Storage bucket
 * @param file The file to upload
 * @param bucket The bucket name
 * @param folder Optional folder path within the bucket
 * @returns The public URL of the uploaded file
 */
export async function uploadFile(
  file: File,
  bucket: BucketName = 'images',
  folder: string = ''
): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  const { error: uploadError, data } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrl;
}

/**
 * Deletes a file from Supabase Storage
 * @param url The public URL of the file to delete
 * @param bucket The bucket name
 */
export async function deleteFileByUrl(url: string, bucket: BucketName = 'images'): Promise<void> {
  try {
    // Extract file path from URL
    // Public URL format: https://[project-id].supabase.co/storage/v1/object/public/[bucket]/[path]
    const urlParts = url.split(`/storage/v1/object/public/${bucket}/`);
    if (urlParts.length !== 2) return;
    
    const filePath = urlParts[1];
    const { error } = await supabase.storage.from(bucket).remove([filePath]);
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}
