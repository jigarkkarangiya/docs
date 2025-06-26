---
sidebar_position: 4
title: Advanced Features
description: Advanced features, custom development, and API usage for the Order Item Image module
---

# Advanced Features

This guide covers advanced features, custom development, and API usage for the **Order Item Image Module**.

## 🔧 Custom Development

### Creating Custom Image Processors

You can create custom image processors to handle specific image processing requirements:

```php
<?php
namespace YourCompany\OrderItemImage\Model;

use Jigar\OrderItemImage\Model\ImageProcessorInterface;
use Magento\Framework\Image\AdapterFactory;

class CustomImageProcessor implements ImageProcessorInterface
{
    private $imageAdapterFactory;
    
    public function __construct(AdapterFactory $imageAdapterFactory)
    {
        $this->imageAdapterFactory = $imageAdapterFactory;
    }
    
    public function processImage($imagePath, $size, $quality = 80)
    {
        $imageAdapter = $this->imageAdapterFactory->create();
        $imageAdapter->open($imagePath);
        
        // Custom processing logic
        $imageAdapter->resize($size, $size);
        $imageAdapter->quality($quality);
        
        // Apply custom filters
        $this->applyCustomFilters($imageAdapter);
        
        return $imageAdapter;
    }
    
    private function applyCustomFilters($imageAdapter)
    {
        // Add your custom image filters here
        // Example: brightness, contrast, saturation adjustments
    }
}
```

### Custom Email Templates

Create custom email templates with enhanced image display:

```html
<!-- app/code/YourCompany/OrderItemImage/view/frontend/email/order_items_with_images.html -->
<table class="order-items">
    <thead>
        <tr>
            <th class="product-image">Image</th>
            <th class="product-details">Product Details</th>
            <th class="product-price">Price</th>
            <th class="product-qty">Qty</th>
            <th class="product-total">Total</th>
        </tr>
    </thead>
    <tbody>
        {{block class="Jigar\OrderItemImage\Block\Email\OrderItems" 
               order_id="{{var order.id}}" 
               template="YourCompany_OrderItemImage::email/order_item_row.phtml"}}
    </tbody>
</table>
```

### Custom Order Item Row Template

```html
<!-- app/code/YourCompany/OrderItemImage/view/frontend/email/order_item_row.phtml -->
<tr>
    <td class="product-image">
        {{block class="Jigar\OrderItemImage\Block\Email\ProductImage" 
               product_id="{{var item.product_id}}" 
               size="medium"
               template="YourCompany_OrderItemImage::email/product_image.phtml"}}
    </td>
    <td class="product-details">
        <strong>{{var item.name}}</strong>
        {{if item.options}}
        <div class="product-options">
            {{var item.options}}
        </div>
        {{/if}}
    </td>
    <td class="product-price">{{var item.price}}</td>
    <td class="product-qty">{{var item.qty}}</td>
    <td class="product-total">{{var item.total}}</td>
</tr>
```

## 🚀 API Reference

### Block Classes

#### ProductImage Block
```php
<?php
namespace Jigar\OrderItemImage\Block;

use Magento\Framework\View\Element\Template;

class ProductImage extends Template
{
    public function getImageUrl($productId, $size = 'medium')
    {
        // Returns the processed image URL
    }
    
    public function getImageAlt($productId)
    {
        // Returns the image alt text
    }
    
    public function getImageTitle($productId)
    {
        // Returns the image title
    }
}
```

#### OrderItems Block
```php
<?php
namespace Jigar\OrderItemImage\Block\Email;

use Magento\Framework\View\Element\Template;

class OrderItems extends Template
{
    public function getOrderItems($orderId)
    {
        // Returns order items with image data
    }
    
    public function getItemImage($item)
    {
        // Returns processed image for specific item
    }
}
```

### Model Classes

#### ImageProcessor Model
```php
<?php
namespace Jigar\OrderItemImage\Model;

class ImageProcessor
{
    public function processProductImage($productId, $size, $context = 'email')
    {
        // Process and return image URL
    }
    
    public function getImagePath($productId)
    {
        // Get original image path
    }
    
    public function resizeImage($imagePath, $width, $height)
    {
        // Resize image to specified dimensions
    }
}
```

## 🎨 Custom Styling

### CSS Customization

Create custom CSS for different contexts:

```css
/* app/code/YourCompany/OrderItemImage/view/frontend/web/css/order-item-images.css */

/* Email Styles */
.order-item-image {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    background: #fff;
}

.order-item-image img {
    max-width: 100%;
    height: auto;
    display: block;
}

/* Admin Grid Styles */
.admin-order-grid .product-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 3px;
}

/* PDF Styles */
.pdf-product-image {
    max-width: 150px;
    max-height: 150px;
    border: 1px solid #000;
}
```

### Responsive Design

```css
/* Responsive image sizing */
@media (max-width: 768px) {
    .order-item-image {
        width: 100%;
        max-width: 200px;
    }
    
    .admin-order-grid .product-image {
        width: 40px;
        height: 40px;
    }
}

@media (max-width: 480px) {
    .order-item-image {
        max-width: 150px;
    }
    
    .admin-order-grid .product-image {
        width: 30px;
        height: 30px;
    }
}
```

## 🔌 Plugin Development

### Custom Image URL Plugin

```php
<?php
namespace YourCompany\OrderItemImage\Plugin;

use Jigar\OrderItemImage\Model\ImageProcessor;

class CustomImageUrlPlugin
{
    public function afterGetImageUrl(ImageProcessor $subject, $result, $productId, $size)
    {
        // Custom logic to modify image URL
        if ($this->shouldUseCustomUrl($productId)) {
            return $this->getCustomImageUrl($productId, $size);
        }
        
        return $result;
    }
    
    private function shouldUseCustomUrl($productId)
    {
        // Your custom logic
        return false;
    }
    
    private function getCustomImageUrl($productId, $size)
    {
        // Return custom image URL
        return 'https://your-cdn.com/images/' . $productId . '_' . $size . '.jpg';
    }
}
```

### Order Item Observer

```php
<?php
namespace YourCompany\OrderItemImage\Observer;

use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Event\Observer;

class OrderItemImageObserver implements ObserverInterface
{
    public function execute(Observer $observer)
    {
        $order = $observer->getEvent()->getOrder();
        
        // Custom logic when order is placed
        $this->processOrderImages($order);
    }
    
    private function processOrderImages($order)
    {
        foreach ($order->getAllItems() as $item) {
            // Process each order item image
            $this->generateOrderItemImage($item);
        }
    }
    
    private function generateOrderItemImage($item)
    {
        // Custom image generation logic
    }
}
```

## 📊 Performance Optimization

### Image Caching Strategy

```php
<?php
namespace YourCompany\OrderItemImage\Model;

use Magento\Framework\App\Cache\TypeListInterface;

class ImageCacheManager
{
    private $cacheTypeList;
    
    public function __construct(CacheTypeListInterface $cacheTypeList)
    {
        $this->cacheTypeList = $cacheTypeList;
    }
    
    public function warmCache($productIds)
    {
        foreach ($productIds as $productId) {
            $this->preloadImage($productId);
        }
    }
    
    public function clearCache($productIds = [])
    {
        if (empty($productIds)) {
            $this->cacheTypeList->cleanType('jigar_order_item_image');
        } else {
            foreach ($productIds as $productId) {
                $this->clearProductImageCache($productId);
            }
        }
    }
}
```

### Lazy Loading Implementation

```javascript
// app/code/YourCompany/OrderItemImage/view/frontend/web/js/lazy-loading.js
define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';
    
    return function (config) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            observer.observe(img);
        });
    };
});
```

## 🔒 Security Features

### Image URL Validation

```php
<?php
namespace Jigar\OrderItemImage\Model;

class ImageUrlValidator
{
    public function validateImageUrl($url)
    {
        // Validate image URL format
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return false;
        }
        
        // Check for allowed domains
        $allowedDomains = $this->getAllowedDomains();
        $parsedUrl = parse_url($url);
        
        if (!in_array($parsedUrl['host'], $allowedDomains)) {
            return false;
        }
        
        // Check file extension
        $extension = pathinfo($parsedUrl['path'], PATHINFO_EXTENSION);
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        
        return in_array(strtolower($extension), $allowedExtensions);
    }
    
    private function getAllowedDomains()
    {
        return [
            'your-domain.com',
            'cdn.your-domain.com',
            'media.your-domain.com'
        ];
    }
}
```

## 📈 Analytics Integration

### Image Load Tracking

```javascript
// app/code/YourCompany/OrderItemImage/view/frontend/web/js/analytics.js
define([
    'jquery'
], function ($) {
    'use strict';
    
    return function (config) {
        $(document).on('load', 'img.order-item-image', function () {
            const productId = $(this).data('product-id');
            const context = $(this).data('context');
            
            // Track image load
            if (typeof gtag !== 'undefined') {
                gtag('event', 'image_load', {
                    'product_id': productId,
                    'context': context,
                    'image_url': $(this).attr('src')
                });
            }
        });
    };
});
```

## 🧪 Testing

### Unit Tests

```php
<?php
namespace YourCompany\OrderItemImage\Test\Unit\Model;

use PHPUnit\Framework\TestCase;
use Jigar\OrderItemImage\Model\ImageProcessor;

class ImageProcessorTest extends TestCase
{
    private $imageProcessor;
    
    protected function setUp(): void
    {
        $this->imageProcessor = new ImageProcessor();
    }
    
    public function testProcessProductImage()
    {
        $productId = 123;
        $size = 'medium';
        
        $result = $this->imageProcessor->processProductImage($productId, $size);
        
        $this->assertIsString($result);
        $this->assertNotEmpty($result);
    }
    
    public function testInvalidProductId()
    {
        $this->expectException(\InvalidArgumentException::class);
        
        $this->imageProcessor->processProductImage(0, 'medium');
    }
}
```

### Integration Tests

```php
<?php
namespace YourCompany\OrderItemImage\Test\Integration;

use Magento\TestFramework\Helper\Bootstrap;
use Jigar\OrderItemImage\Block\Email\ProductImage;

class ProductImageBlockTest extends \Magento\TestFramework\TestCase\AbstractController
{
    public function testProductImageBlock()
    {
        $objectManager = Bootstrap::getObjectManager();
        $block = $objectManager->create(ProductImage::class);
        
        $block->setProductId(1);
        $block->setSize('medium');
        
        $html = $block->toHtml();
        
        $this->assertStringContainsString('img', $html);
        $this->assertStringContainsString('src', $html);
    }
}
```

## 📚 Best Practices

### Code Organization
- Keep custom processors in separate modules
- Use dependency injection for all dependencies
- Follow Magento 2 coding standards
- Implement proper error handling

### Performance Guidelines
- Cache processed images appropriately
- Use lazy loading for better performance
- Optimize image sizes for different contexts
- Implement proper cleanup for temporary files

### Security Considerations
- Validate all image URLs
- Sanitize file paths
- Implement proper access controls
- Use secure image delivery methods

---

**Next Steps**: [View the API reference](./api-reference.md) or [learn about troubleshooting](./troubleshooting.md). 