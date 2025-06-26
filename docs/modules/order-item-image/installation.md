---
sidebar_position: 2
title: Installation Guide
description: Step-by-step installation instructions for the Order Item Image module
---

# Installation Guide

This guide will walk you through the complete installation process for the **Order Item Image Module** in your Magento 2 store.

## 📋 Prerequisites

Before installing the module, ensure your system meets these requirements:

### System Requirements
- **Magento 2.4.x** (2.4.0 or higher)
- **PHP 8.1+** (recommended) or PHP 7.4+
- **Composer 2.x**
- **File system write permissions**
- **Memory limit**: 2GB or higher
- **Execution time**: 300 seconds or higher

### Pre-Installation Checklist
- [ ] Backup your Magento 2 installation
- [ ] Backup your database
- [ ] Ensure you have SSH access to your server
- [ ] Verify Composer is properly configured
- [ ] Check available disk space (at least 500MB free)

## 🔧 Installation Methods

### Method 1: Composer Installation (Recommended)

#### Step 1: Connect to Your Server
```bash
ssh your-server-ip
cd /path/to/your/magento/installation
```

#### Step 2: Install via Composer
```bash
composer require jigar/module-orderitemimage
```

#### Step 3: Run Magento Setup Commands
```bash
# Enable the module
php bin/magento module:enable Jigar_OrderItemImage

# Run database updates
php bin/magento setup:upgrade

# Compile dependency injection
php bin/magento setup:di:compile

# Deploy static content
php bin/magento setup:static-content:deploy -f

# Clear all caches
php bin/magento cache:flush

# Reindex all data
php bin/magento indexer:reindex
```

#### Step 4: Verify Installation
```bash
# Check if module is enabled
php bin/magento module:status Jigar_OrderItemImage

# List all enabled modules
php bin/magento module:status
```

### Method 2: Manual Installation

#### Step 1: Download Module Files
Download the module files from the repository or package.

#### Step 2: Upload Files
Upload the module files to your Magento installation:
```bash
# Create module directory
mkdir -p app/code/Jigar/OrderItemImage

# Upload files to the directory
# (Use your preferred method: FTP, SCP, etc.)
```

#### Step 3: Run Setup Commands
```bash
# Enable the module
php bin/magento module:enable Jigar_OrderItemImage

# Run database updates
php bin/magento setup:upgrade

# Compile dependency injection
php bin/magento setup:di:compile

# Deploy static content
php bin/magento setup:static-content:deploy -f

# Clear all caches
php bin/magento cache:flush

# Reindex all data
php bin/magento indexer:reindex
```

## ⚙️ Post-Installation Configuration

### Step 1: Access Admin Panel
1. Log in to your Magento 2 admin panel
2. Navigate to **Stores** → **Configuration**

### Step 2: Configure Module Settings
1. Go to **Jigar Extensions** → **Order Item Image**
2. Configure the following settings:
   - **Enable Module**: Yes/No
   - **Image Size**: Small/Medium/Large
   - **Enable for Emails**: Yes/No
   - **Enable for Invoices**: Yes/No
   - **Enable for Packing Slips**: Yes/No

### Step 3: Save Configuration
1. Click **Save Config**
2. Clear cache if prompted

## 🧪 Testing the Installation

### Test 1: Create a Test Order
1. Create a test customer account
2. Add products to cart
3. Complete checkout process
4. Check order confirmation email for product images

### Test 2: Generate Invoice
1. Go to **Sales** → **Orders**
2. Find your test order
3. Create invoice
4. Download PDF and verify product images

### Test 3: Admin Order View
1. Go to **Sales** → **Orders**
2. Open order details
3. Verify product images are displayed

## 🚨 Troubleshooting

### Common Issues and Solutions

#### Issue 1: Module Not Found
**Error**: `Could not find a matching version of package jigar/module-orderitemimage`

**Solution**:
```bash
# Clear Composer cache
composer clear-cache

# Update Composer repositories
composer update

# Try installation again
composer require jigar/module-orderitemimage
```

#### Issue 2: Permission Denied
**Error**: `Permission denied` during installation

**Solution**:
```bash
# Set proper file permissions
chmod -R 755 app/code/Jigar/
chown -R www-data:www-data app/code/Jigar/

# Set proper directory permissions
find app/code/Jigar/ -type d -exec chmod 755 {} \;
find app/code/Jigar/ -type f -exec chmod 644 {} \;
```

#### Issue 3: Compilation Errors
**Error**: `Compilation failed` during setup:di:compile

**Solution**:
```bash
# Remove generated files
rm -rf generated/*
rm -rf var/cache/*
rm -rf var/page_cache/*

# Recompile
php bin/magento setup:di:compile
php bin/magento cache:flush
```

#### Issue 4: Images Not Displaying
**Error**: Product images not showing in emails/documents

**Solution**:
1. Check module configuration in admin
2. Verify image paths are correct
3. Clear all caches
4. Check file permissions on media directory

### Performance Optimization

#### For High-Traffic Stores
```bash
# Enable production mode
php bin/magento deploy:mode:set production

# Optimize for production
php bin/magento setup:static-content:deploy -f
php bin/magento cache:enable
```

#### For Development
```bash
# Enable developer mode
php bin/magento deploy:mode:set developer

# Disable cache for development
php bin/magento cache:disable
```

## 📞 Getting Help

If you encounter any issues during installation:

1. **Check the logs**: `var/log/system.log` and `var/log/exception.log`
2. **Verify requirements**: Ensure all prerequisites are met
3. **Contact support**: Reach out to our support team
4. **Community forum**: Check for similar issues and solutions

## ✅ Installation Checklist

- [ ] Module installed via Composer or manual method
- [ ] Database updated successfully
- [ ] Static content deployed
- [ ] Caches cleared
- [ ] Module enabled and configured
- [ ] Test order created and verified
- [ ] Invoice generated with images
- [ ] Admin interface working correctly

---

**Next Steps**: [Configure the module](./configuration.md) or [learn about advanced features](./advanced-features.md). 