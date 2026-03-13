# Image Processing Skill

Process images for web development - resize, crop, optimize for resumes.

## Prerequisites

```bash
pip install Pillow
```

Or use alternatives:

| Alternative | Platform | Install |
|-------------|----------|---------|
| sips | macOS (built-in) | None |
| sharp | Node.js | npm install sharp |

## Common Operations

### Resize

Scale to specific dimensions maintaining aspect ratio:

```python
from PIL import Image

def resize_image(input_path, output_path, width=800):
    with Image.open(input_path) as img:
        img.thumbnail((width, width), Image.LANCZOS)
        img.save(output_path, optimize=True)
```

### Convert Format

Convert between PNG, JPG, WebP:

```python
def convert_format(input_path, output_path, format='WEBP', quality=85):
    with Image.open(input_path) as img:
        if img.mode in ('RGBA', 'P') and format in ('JPEG', 'JPG'):
            img = img.convert('RGB')
        kwargs = {'optimize': True}
        if format == 'WEBP':
            kwargs['quality'] = quality
        elif format in ('JPEG', 'JPG'):
            kwargs['quality'] = quality
        img.save(output_path, format=format, **kwargs)
```

### Profile Photo Processing (Resume)

```python
def process_profile_photo(input_path, output_path):
    """Process uploaded profile photo for resume"""
    with Image.open(input_path) as img:
        # Convert to RGB if needed
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize to standard profile size (maintain aspect)
        img.thumbnail((400, 400), Image.LANCZOS)
        
        # Crop to square if needed (center)
        if img.width != img.height:
            min_dim = min(img.width, img.height)
            left = (img.width - min_dim) // 2
            top = (img.height - min_dim) // 2
            img = img.crop((left, top, left + min_dim, top + min_dim))
        
        # Save as WebP for web (smaller file size)
        img.save(output_path, 'WEBP', quality=85, optimize=True)
```

### Trim Whitespace

```python
def trim_whitespace(input_path, output_path):
    """Remove white/transparent border from logos"""
    with Image.open(input_path) as img:
        if img.mode == 'RGBA':
            bg = Image.new('RGBA', img.size, (0, 0, 0, 0))
            diff = ImageChops.difference(img, bg)
            bbox = diff.getbbox()
            if bbox:
                img = img.crop(bbox)
        else:
            bg = Image.new('RGB', img.size, (255, 255, 255))
            diff = ImageChops.difference(img, bg)
            bbox = diff.getbbox()
            if bbox:
                img = img.crop(bbox)
        img.save(output_path)
```

### Generate OG Card (1200x630)

```python
def create_og_card(title, output_path):
    """Create Open Graph card for sharing"""
    img = Image.new('RGB', (1200, 630), color=(59, 130, 246))
    draw = ImageDraw.Draw(img)
    
    # Add title text (simplified - use PIL.ImageFont for proper fonts)
    draw.text((600, 315), title, fill=(255, 255, 255), anchor='mm')
    
    img.save(output_path, 'PNG')
```

## Output Format Guide

| Use case | Format | Why |
|----------|--------|-----|
| Profile photos | WebP | Small file size, good quality |
| Resume templates | PNG | Sharp text, transparency |
| Thumbnails | WebP | Fast loading |
| Fallback | JPG | Universal support |

## Resume-Specific Workflow

1. **User uploads photo** → Convert to RGB, resize to max 400px
2. **Crop to square** → Center crop for consistency
3. **Compress** → WebP at 85% quality
4. **Generate thumbnail** → 100px for preview

```python
def process_resume_photo(input_path, output_dir):
    """Complete profile photo pipeline"""
    name = Path(input_path).stem
    
    # Full size (400px)
    process_profile_photo(input_path, f"{output_dir}/{name}-400.webp")
    
    # Thumbnail (100px)
    with Image.open(input_path) as img:
        if img.mode != 'RGB':
            img = img.convert('RGB')
        img.thumbnail((100, 100), Image.LANCZOS)
        img.save(f"{output_dir}/{name}-100.webp", 'WEBP', quality=80)
```

## Batch Processing

```python
def batch_resize(input_dir, output_dir, width=800):
    """Resize all images in directory"""
    for path in Path(input_dir).glob('*'):
        if path.suffix.lower() in ('.jpg', '.jpeg', '.png', '.webp'):
            output_path = Path(output_dir) / f"{path.stem}{path.suffix}"
            resize_image(str(path), str(output_path), width)
```
