import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ProductImageUploadProps {
  productId: string;
  currentImageUrl?: string | null;
  onImageUpdated: (imageUrl: string) => void;
}

export const ProductImageUpload = ({ productId, currentImageUrl, onImageUpdated }: ProductImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Vă rugăm să selectați o imagine');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Imaginea este prea mare. Mărimea maximă este 5MB');
      return;
    }

    setUploading(true);

    try {
      // Create unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${productId}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      // Update product with new image URL
      const { error: updateError } = await supabase
        .from('products')
        .update({ image_url: publicUrl })
        .eq('id', productId);

      if (updateError) throw updateError;

      setPreviewUrl(publicUrl);
      onImageUpdated(publicUrl);
      toast.success('Imagine încărcată cu succes!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Eroare la încărcarea imaginii');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!currentImageUrl) return;

    try {
      // Extract file path from URL
      const urlParts = currentImageUrl.split('/product-images/');
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        
        // Delete from storage
        const { error: deleteError } = await supabase.storage
          .from('product-images')
          .remove([filePath]);

        if (deleteError) throw deleteError;
      }

      // Update product to remove image URL
      const { error: updateError } = await supabase
        .from('products')
        .update({ image_url: null })
        .eq('id', productId);

      if (updateError) throw updateError;

      setPreviewUrl(null);
      onImageUpdated('');
      toast.success('Imagine ștearsă cu succes!');
    } catch (error) {
      console.error('Error removing image:', error);
      toast.error('Eroare la ștergerea imaginii');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="max-w-xs"
        />
        {uploading && (
          <span className="text-sm text-muted-foreground">Se încarcă...</span>
        )}
      </div>

      {previewUrl ? (
        <div className="relative w-32 h-32 border rounded-lg overflow-hidden group">
          <img
            src={previewUrl}
            alt="Product preview"
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            title="Șterge imagine"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/20">
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};
