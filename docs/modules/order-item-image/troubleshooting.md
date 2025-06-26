---
sidebar_position: 5
title: Troubleshooting Guide
description: Common issues, error solutions, and troubleshooting for the Order Item Image module
---

# Troubleshooting Guide

This guide helps you resolve common issues and errors that may occur with the **Order Item Image Module**.

## 🔍 Common Issues

### Issue 1: Images Not Displaying in Emails

#### Symptoms
- Product images are missing from order confirmation emails
- Email templates show broken image placeholders
- Images appear as red X or broken link icons

#### Possible Causes
1. Module not properly configured
2. Email template not updated
3. Image paths incorrect
4. File permissions issues
5. Cache not cleared

#### Solutions

**Step 1: Check Module Configuration**
```bash
# Verify module is enabled
php bin/magento module:status Jigar_OrderItemImage

# Check configuration
php bin/magento config:show jigar_orderitemimage/general/enabled
```

**Step 2: Verify Email Settings**
1. Go to **Admin Panel** → **Stores** → **Configuration**
2. Navigate to **Jigar Extensions** → **Order Item Image**
3. Check **Enable for Order Emails** is set to **Yes**
4. Verify **Email Image Size** is configured

**Step 3: Clear Caches**
```bash
# Clear all caches
php bin/magento cache:flush

# Clear specific caches
php bin/magento cache:clean block_html
php bin/magento cache:clean full_page
```

**Step 4: Check Email Templates**
1. Go to **Marketing** → **Email Templates**
2. Edit your order confirmation template
3. Ensure it includes the product image block:

```html
{{block class="Jigar\OrderItemImage\Block\Email\ProductImage" 
       product_id="{{var item.product_id}}" 
       size="medium"}}
```

**Step 5: Verify File Permissions**
```bash
# Set proper permissions
chmod -R 755 pub/media/
chown -R www-data:www-data pub/media/

# Check specific directories
ls -la pub/media/catalog/product/
```

### Issue 2: PDF Generation Errors

#### Symptoms
- Invoice PDFs fail to generate
- Error messages about image processing
- PDFs generated without images
- Memory limit exceeded errors

#### Solutions

**Step 1: Check PHP Memory Limit**
```bash
# Check current memory limit
php -i | grep memory_limit

# Increase memory limit in php.ini
memory_limit = 512M
```

**Step 2: Verify Image Processing**
```bash
# Check if GD or Imagick is available
php -m | grep -E "(gd|imagick)"

# Install missing extensions
sudo apt-get install php-gd php-imagick
```

**Step 3: Test PDF Generation**
```bash
# Test PDF generation manually
php bin/magento dev:tests:run unit --filter=Jigar_OrderItemImage
```

**Step 4: Check Log Files**
```bash
# Check system logs
tail -f var/log/system.log | grep -i "order.*image"

# Check exception logs
tail -f var/log/exception.log | grep -i "pdf"
```

### Issue 3: Performance Issues

#### Symptoms
- Slow page loading
- High server resource usage
- Timeout errors
- Images taking too long to load

#### Solutions

**Step 1: Enable Image Caching**
1. Go to **Admin Panel** → **Stores** → **Configuration**
2. Navigate to **Jigar Extensions** → **Order Item Image** → **Advanced Settings**
3. Set **Enable Image Caching** to **Yes**
4. Configure **Cache Lifetime**

**Step 2: Optimize Image Sizes**
```php
// In your configuration
'image_settings' => [
    'default_size' => 'small', // Use smaller images
    'quality' => 70, // Reduce quality slightly
    'format' => 'jpeg' // Use JPEG for better compression
]
```

**Step 3: Implement Lazy Loading**
```javascript
// Add lazy loading to your templates
<img data-src="{{var image_url}}" 
     class="lazy order-item-image" 
     alt="{{var product_name}}"
     loading="lazy">
```

**Step 4: Use CDN for Images**
```php
// Configure CDN in your setup
'image_delivery' => [
    'use_cdn' => true,
    'cdn_url' => 'https://your-cdn.com/images/'
]
```

### Issue 4: Admin Grid Issues

#### Symptoms
- Product images not showing in order grid
- Grid loading slowly
- JavaScript errors in admin panel
- Missing image columns

#### Solutions

**Step 1: Check Admin Configuration**
1. Go to **Admin Panel** → **Stores** → **Configuration**
2. Navigate to **Jigar Extensions** → **Order Item Image** → **Admin Settings**
3. Verify **Enable in Order Grid** is **Yes**

**Step 2: Clear Admin Cache**
```bash
# Clear admin-specific caches
php bin/magento cache:clean adminhtml
php bin/magento cache:clean block_html
```

**Step 3: Check JavaScript Console**
1. Open browser developer tools
2. Check for JavaScript errors
3. Verify all required JS files are loading

**Step 4: Verify Grid Configuration**
```xml
<!-- Check if grid columns are properly configured -->
<column name="product_image" class="Jigar\OrderItemImage\Ui\Component\Listing\Column\ProductImage">
    <argument name="data" xsi:type="array">
        <item name="config" xsi:type="array">
            <item name="label" xsi:type="string" translate="true">Product Image</item>
        </item>
    </argument>
</column>
```

## 🚨 Error Messages and Solutions

### Error: "Class 'Jigar\OrderItemImage\Model\ImageProcessor' not found"

**Solution**:
```bash
# Recompile dependency injection
php bin/magento setup:di:compile

# Clear generated files
rm -rf generated/*
php bin/magento setup:di:compile
```

### Error: "Image file not found"

**Solution**:
```bash
# Check if product images exist
ls -la pub/media/catalog/product/

# Regenerate product images
php bin/magento catalog:images:resize

# Check file permissions
chmod -R 755 pub/media/catalog/product/
```

### Error: "Memory limit exceeded"

**Solution**:
```bash
# Increase PHP memory limit
# Edit php.ini or .htaccess
memory_limit = 1G

# Or set via command line
php -d memory_limit=1G bin/magento setup:upgrade
```

### Error: "Permission denied"

**Solution**:
```bash
# Set proper file permissions
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;

# Set ownership
chown -R www-data:www-data .
```

## 🔧 Debug Mode

### Enable Debug Logging

**Step 1: Enable Debug Mode**
1. Go to **Admin Panel** → **Stores** → **Configuration**
2. Navigate to **Jigar Extensions** → **Order Item Image** → **General Settings**
3. Set **Debug Mode** to **Yes**

**Step 2: Check Debug Logs**
```bash
# Monitor debug logs
tail -f var/log/debug.log | grep -i "orderitemimage"

# Check specific module logs
tail -f var/log/jigar_orderitemimage.log
```

**Step 3: Debug Configuration**
```bash
# Check module configuration
php bin/magento config:show jigar_orderitemimage

# Check specific setting
php bin/magento config:show jigar_orderitemimage/general/enabled
```

## 📊 Performance Monitoring

### Monitor Image Processing

**Step 1: Check Image Cache**
```bash
# Check cache directory
ls -la var/cache/

# Check image cache specifically
ls -la var/cache/jigar_orderitemimage/
```

**Step 2: Monitor Server Resources**
```bash
# Check memory usage
free -h

# Check disk space
df -h

# Check CPU usage
top
```

**Step 3: Analyze Performance**
```bash
# Enable Magento profiler
# Add to index.php
Magento\Framework\Profiler::enable();

# Check profiler output
tail -f var/log/profiler.log
```

## 🛠️ Maintenance Commands

### Useful Commands for Troubleshooting

```bash
# Check module status
php bin/magento module:status Jigar_OrderItemImage

# Check module dependencies
php bin/magento module:status --enabled | grep Jigar

# Verify database schema
php bin/magento setup:db-schema:upgrade

# Check for missing dependencies
php bin/magento setup:di:compile --dry-run

# Clear all caches
php bin/magento cache:flush

# Reindex all data
php bin/magento indexer:reindex

# Check system requirements
php bin/magento setup:check
```

### Database Checks

```sql
-- Check if module tables exist
SHOW TABLES LIKE '%jigar%';

-- Check module configuration
SELECT * FROM core_config_data WHERE path LIKE 'jigar_orderitemimage%';

-- Check for orphaned data
SELECT * FROM core_config_data WHERE path LIKE 'jigar_orderitemimage%' AND value IS NULL;
```

## 📞 Getting Help

### Before Contacting Support

1. **Check this troubleshooting guide**
2. **Enable debug mode and check logs**
3. **Verify system requirements**
4. **Test with a fresh installation**
5. **Check for conflicting modules**

### Information to Provide

When contacting support, provide:

- **Magento version**: `php bin/magento --version`
- **PHP version**: `php --version`
- **Module version**: Check `composer.json`
- **Error logs**: Relevant log entries
- **Configuration**: Current module settings
- **Steps to reproduce**: Detailed reproduction steps

### Support Channels

- **Email Support**: support@jigarkarangiya.com
- **Documentation**: This documentation site
- **GitHub Issues**: For bug reports and feature requests
- **Community Forum**: For community discussions

## ✅ Troubleshooting Checklist

- [ ] Module is properly installed and enabled
- [ ] Configuration settings are correct
- [ ] All caches have been cleared
- [ ] File permissions are set correctly
- [ ] Database schema is up to date
- [ ] No conflicting modules are installed
- [ ] System requirements are met
- [ ] Debug logs have been checked
- [ ] Test order has been created
- [ ] All contexts (email, PDF, admin) have been tested

---

**Still having issues?** [Contact our support team](mailto:support@jigarkarangiya.com). 