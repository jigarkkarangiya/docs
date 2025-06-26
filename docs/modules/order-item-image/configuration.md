---
sidebar_position: 3
title: Configuration Guide
description: Complete configuration options and settings for the Order Item Image module
---

# Configuration Guide

This guide covers all configuration options available for the **Order Item Image Module** in your Magento 2 admin panel.

## 🎛️ Accessing Configuration

### Step 1: Navigate to Configuration
1. Log in to your Magento 2 admin panel
2. Go to **Stores** → **Configuration**
3. Scroll down to **Jigar Extensions** section
4. Click on **Order Item Image**

### Step 2: Configuration Scope
- **Default Config**: Applies to all websites/stores
- **Website**: Applies to specific website
- **Store View**: Applies to specific store view

## ⚙️ General Settings

### Enable Module
**Path**: `Stores > Configuration > Jigar Extensions > Order Item Image > General Settings`

| Setting | Value | Description |
|---------|-------|-------------|
| **Enable Module** | Yes/No | Enable or disable the entire module functionality |
| **Debug Mode** | Yes/No | Enable debug logging for troubleshooting |

### Image Settings
**Path**: `Stores > Configuration > Jigar Extensions > Order Item Image > Image Settings`

| Setting | Value | Description |
|---------|-------|-------------|
| **Default Image Size** | Small (100px) / Medium (200px) / Large (300px) | Default size for product images |
| **Image Quality** | 60% / 70% / 80% / 90% / 100% | JPEG quality for generated images |
| **Image Format** | JPEG / PNG / WebP | Output format for images |
| **Fallback Image** | Custom path | Default image when product image is missing |

### Example Configuration
```php
// Example configuration values
'image_size' => 'medium',
'image_quality' => 80,
'image_format' => 'jpeg',
'fallback_image' => 'catalog/product/placeholder/default.jpg'
```

## 📧 Email Configuration

### Order Confirmation Emails
**Path**: `Stores > Configuration > Jigar Extensions > Order Item Image > Email Settings`

| Setting | Value | Description |
|---------|-------|-------------|
| **Enable for Order Emails** | Yes/No | Show product images in order confirmation emails |
| **Email Image Size** | Small / Medium / Large | Specific size for email images |
| **Email Image Position** | Before Product Name / After Product Name | Position of image in email template |
| **Include Product SKU** | Yes/No | Show product SKU alongside image |

### Email Template Customization
```html
<!-- Example email template modification -->
<tr>
    <td class="product-image">
        {{block class="Jigar\OrderItemImage\Block\Email\ProductImage" 
               product_id="{{var item.product_id}}" 
               size="medium"}}
    </td>
    <td class="product-name">{{var item.name}}</td>
</tr>
```

## 📄 Document Configuration

### Invoice PDFs
**Path**: `Stores > Configuration > Jigar Extensions > Order Item Image > Document Settings`

| Setting | Value | Description |
|---------|-------|-------------|
| **Enable for Invoices** | Yes/No | Include product images in invoice PDFs |
| **Invoice Image Size** | Small / Medium / Large | Size for invoice images |
| **Invoice Image Position** | Left / Right / Above / Below | Position relative to product details |
| **Include Product Options** | Yes/No | Show product options with image |

### Packing Slips
| Setting | Value | Description |
|---------|-------|-------------|
| **Enable for Packing Slips** | Yes/No | Include product images in packing slips |
| **Packing Slip Image Size** | Small / Medium / Large | Size for packing slip images |
| **Show Product Dimensions** | Yes/No | Include product dimensions with image |

### Credit Memos
| Setting | Value | Description |
|---------|-------|-------------|
| **Enable for Credit Memos** | Yes/No | Include product images in credit memos |
| **Credit Memo Image Size** | Small / Medium / Large | Size for credit memo images |

## 🛒 Admin Interface Configuration

### Order Grid
**Path**: `Stores > Configuration > Jigar Extensions > Order Item Image > Admin Settings`

| Setting | Value | Description |
|---------|-------|-------------|
| **Enable in Order Grid** | Yes/No | Show product thumbnails in order grid |
| **Grid Image Size** | Small (50px) / Medium (75px) / Large (100px) | Size for grid thumbnails |
| **Show Product Count** | Yes/No | Display number of products in order |
| **Enable Sorting by Product** | Yes/No | Allow sorting orders by product |

### Order Detail Pages
| Setting | Value | Description |
|---------|-------|-------------|
| **Enable in Order Details** | Yes/No | Show product images in order detail view |
| **Detail Image Size** | Small / Medium / Large | Size for detail page images |
| **Show Product Gallery** | Yes/No | Display multiple product images |
| **Enable Image Zoom** | Yes/No | Allow image zoom on hover |

## 🎨 Advanced Settings

### Performance Optimization
**Path**: `Stores > Configuration > Jigar Extensions > Order Item Image > Advanced Settings`

| Setting | Value | Description |
|---------|-------|-------------|
| **Enable Image Caching** | Yes/No | Cache generated images for better performance |
| **Cache Lifetime** | 1 hour / 6 hours / 1 day / 1 week | How long to cache images |
| **Lazy Loading** | Yes/No | Load images only when needed |
| **Image Compression** | Yes/No | Compress images to reduce file size |

### Custom Image Processing
| Setting | Value | Description |
|---------|-------|-------------|
| **Custom Image Processor** | Class name | Custom image processing class |
| **Watermark** | Yes/No | Add watermark to images |
| **Watermark Image** | File path | Path to watermark image |
| **Watermark Position** | Top-Left / Top-Right / Bottom-Left / Bottom-Right / Center | Watermark position |

### Example Advanced Configuration
```php
// Advanced configuration example
'image_processing' => [
    'cache_enabled' => true,
    'cache_lifetime' => 86400, // 24 hours
    'compression' => true,
    'watermark' => [
        'enabled' => true,
        'image' => 'media/watermark/logo.png',
        'position' => 'bottom-right'
    ]
]
```

## 🔧 Customization Options

### Custom Image Sizes
You can define custom image sizes in your theme's `view.xml`:

```xml
<!-- app/design/frontend/YourTheme/default/etc/view.xml -->
<vars module="Jigar_OrderItemImage">
    <var name="custom_image_sizes">
        <var name="email_small">100</var>
        <var name="email_medium">200</var>
        <var name="email_large">300</var>
        <var name="pdf_small">150</var>
        <var name="pdf_medium">250</var>
        <var name="pdf_large">350</var>
    </var>
</vars>
```

### Custom Templates
Create custom templates for different contexts:

```php
// Custom email template block
class YourCompany\OrderItemImage\Block\Email\CustomProductImage extends \Jigar\OrderItemImage\Block\Email\ProductImage
{
    public function getCustomImageUrl($productId)
    {
        // Custom image URL logic
        return $this->getMediaUrl() . 'custom/' . $productId . '.jpg';
    }
}
```

## 📊 Configuration Examples

### E-commerce Store Configuration
```yaml
General Settings:
  Enable Module: Yes
  Debug Mode: No

Image Settings:
  Default Image Size: Medium
  Image Quality: 80%
  Image Format: JPEG
  Fallback Image: catalog/product/placeholder/default.jpg

Email Settings:
  Enable for Order Emails: Yes
  Email Image Size: Medium
  Email Image Position: Before Product Name
  Include Product SKU: Yes

Document Settings:
  Enable for Invoices: Yes
  Invoice Image Size: Small
  Enable for Packing Slips: Yes
  Packing Slip Image Size: Small
  Enable for Credit Memos: Yes

Admin Settings:
  Enable in Order Grid: Yes
  Grid Image Size: Small
  Enable in Order Details: Yes
  Detail Image Size: Medium
```

### High-Performance Configuration
```yaml
Advanced Settings:
  Enable Image Caching: Yes
  Cache Lifetime: 1 week
  Lazy Loading: Yes
  Image Compression: Yes
  Custom Image Processor: YourCompany\OrderItemImage\Model\ImageProcessor
```

## 🚨 Troubleshooting Configuration

### Common Configuration Issues

#### Issue 1: Images Not Showing in Emails
**Problem**: Product images not appearing in order emails

**Solution**:
1. Check "Enable for Order Emails" setting
2. Verify email template includes image block
3. Clear email template cache
4. Test with a new order

#### Issue 2: PDF Generation Errors
**Problem**: Errors when generating PDFs with images

**Solution**:
1. Check "Enable for Invoices" setting
2. Verify image paths are accessible
3. Check file permissions
4. Increase memory limit for PDF generation

#### Issue 3: Performance Issues
**Problem**: Slow loading due to image processing

**Solution**:
1. Enable image caching
2. Reduce image quality
3. Use smaller image sizes
4. Enable lazy loading

## ✅ Configuration Checklist

- [ ] Module enabled in general settings
- [ ] Image size and quality configured
- [ ] Email settings configured
- [ ] Document settings configured
- [ ] Admin interface settings configured
- [ ] Performance settings optimized
- [ ] Custom templates created (if needed)
- [ ] Configuration tested with sample orders

---

**Next Steps**: [Learn about advanced features](./advanced-features.md) or [view the API documentation](./api-reference.md). 