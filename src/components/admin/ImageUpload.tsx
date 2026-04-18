import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

export function ImageUpload({ value, onChange, folder = 'events' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Invalid file', description: 'Please upload an image file (PNG, JPG, GIF)', variant: 'destructive' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Maximum file size is 5MB', variant: 'destructive' });
      return;
    }

    setUploading(true);

    const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error } = await supabase.storage
      .from('game-images')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (error) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('game-images')
      .getPublicUrl(fileName);

    onChange(urlData.publicUrl);
    setUploading(false);
    toast({ title: 'Image uploaded' });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className="space-y-2">
      <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">
        Event Image
      </label>

      {value ? (
        <div className="relative group">
          <div className="w-full h-36 overflow-hidden rounded-sm border border-border bg-muted">
            <img
              src={value}
              alt="Event image"
              className="w-full h-full object-cover pixel-art"
              crossOrigin="anonymous"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      ) : (
        <div
          className={`
            w-full h-36 border-2 border-dashed rounded-sm flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors
            ${dragOver ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50 bg-muted/30'}
          `}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? (
            <>
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
              <span className="font-retro text-sm text-muted-foreground">Uploading...</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-6 h-6 text-muted-foreground" />
              <span className="font-retro text-sm text-muted-foreground">
                Drop image here or click to upload
              </span>
              <span className="font-retro text-xs text-muted-foreground/60">
                PNG, JPG, GIF up to 5MB
              </span>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex items-center gap-2">
        <span className="font-retro text-xs text-muted-foreground">or paste URL:</span>
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          className="font-retro text-sm bg-muted border-border text-foreground h-7"
          placeholder="https://..."
        />
        {!value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 font-pixel text-[7px] text-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-3 h-3" />
          </Button>
        )}
      </div>
    </div>
  );
}
