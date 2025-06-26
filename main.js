import { debounce, deepClone, formatCurrency } from './first.js';
import { ShoppingCart } from './class2.js';

/**
 * Main application class that demonstrates the usage of utility functions
 * and the ShoppingCart class
 */
class ShoppingApp {
    constructor() {
        this.cart = new ShoppingCart();
        this.products = this.initializeProducts();
        this.currentCurrency = 'USD';
        this.currentLocale = 'en-US';
        
        this.initializeApp();
    }

    /**
     * Initialize sample products
     * @returns {Array} - Array of product objects
     */
    initializeProducts() {
        return [
            {
                id: 1,
                name: 'Laptop',
                price: 999.99,
                description: 'High-performance laptop with latest specs',
                category: 'Electronics',
                stock: 10
            },
            {
                id: 2,
                name: 'Wireless Mouse',
                price: 29.99,
                description: 'Ergonomic wireless mouse with precision tracking',
                category: 'Electronics',
                stock: 25
            },
            {
                id: 3,
                name: 'Mechanical Keyboard',
                price: 149.99,
                description: 'Premium mechanical keyboard with RGB lighting',
                category: 'Electronics',
                stock: 15
            },
            {
                id: 4,
                name: 'Monitor',
                price: 299.99,
                description: '27-inch 4K monitor with HDR support',
                category: 'Electronics',
                stock: 8
            },
            {
                id: 5,
                name: 'Coffee Mug',
                price: 12.99,
                description: 'Ceramic coffee mug with funny design',
                category: 'Home',
                stock: 50
            }
        ];
    }

    /**
     * Initialize the application
     */
    initializeApp() {
        console.log('🚀 Shopping App Initialized!');
        console.log('Available products:', this.products.length);
        
        // Set up currency formatting
        this.cart.setCurrency(this.currentCurrency, this.currentLocale);
        
        // Demonstrate utility functions
        this.demonstrateUtilityFunctions();
        
        // Add some sample items to cart
        this.addSampleItems();
        
        // Demonstrate cart functionality
        this.demonstrateCartFeatures();
    }

    /**
     * Demonstrate the utility functions from first.js
     */
    demonstrateUtilityFunctions() {
        console.log('\n📦 Demonstrating Utility Functions:');
        
        // Demonstrate debounce
        console.log('\n1. Debounce Function:');
        const debouncedLog = debounce((message) => {
            console.log(`   Debounced message: ${message}`);
        }, 1000);
        
        console.log('   Calling debounced function 3 times quickly...');
        debouncedLog('First call');
        debouncedLog('Second call');
        debouncedLog('Third call');
        console.log('   (Only the last call will execute after 1 second)');
        
        // Demonstrate deepClone
        console.log('\n2. Deep Clone Function:');
        const originalObject = {
            name: 'John Doe',
            preferences: {
                theme: 'dark',
                notifications: true,
                categories: ['electronics', 'books']
            },
            lastLogin: new Date()
        };
        
        const clonedObject = deepClone(originalObject);
        clonedObject.preferences.theme = 'light';
        clonedObject.preferences.categories.push('clothing');
        
        console.log('   Original object:', originalObject);
        console.log('   Cloned object (modified):', clonedObject);
        console.log('   Original unchanged:', originalObject.preferences.theme === 'dark');
        
        // Demonstrate formatCurrency
        console.log('\n3. Format Currency Function:');
        const amounts = [1234.56, 99.99, 0.50, 1000000];
        const currencies = ['USD', 'EUR', 'JPY', 'GBP'];
        
        amounts.forEach((amount, index) => {
            const currency = currencies[index];
            const formatted = formatCurrency(amount, currency);
            console.log(`   ${amount} ${currency}: ${formatted}`);
        });
    }

    /**
     * Add sample items to the cart
     */
    addSampleItems() {
        console.log('\n🛒 Adding Sample Items to Cart:');
        
        // Add laptop
        const laptop = this.products.find(p => p.name === 'Laptop');
        this.cart.addItem({ ...laptop, quantity: 1 });
        console.log(`   Added: ${laptop.name} - ${formatCurrency(laptop.price)}`);
        
        // Add mouse
        const mouse = this.products.find(p => p.name === 'Wireless Mouse');
        this.cart.addItem({ ...mouse, quantity: 2 });
        console.log(`   Added: ${mouse.name} x2 - ${formatCurrency(mouse.price * 2)}`);
        
        // Add keyboard
        const keyboard = this.products.find(p => p.name === 'Mechanical Keyboard');
        this.cart.addItem({ ...keyboard, quantity: 1 });
        console.log(`   Added: ${keyboard.name} - ${formatCurrency(keyboard.price)}`);
    }

    /**
     * Demonstrate various cart features
     */
    demonstrateCartFeatures() {
        console.log('\n🛍️ Demonstrating Cart Features:');
        
        // Show initial cart state
        console.log('\n1. Initial Cart State:');
        const summary = this.cart.getCartSummary();
        console.log(`   Items in cart: ${summary.itemCount}`);
        console.log(`   Total items: ${summary.totalItems}`);
        console.log(`   Total price: ${summary.formattedTotal}`);
        
        // Demonstrate search functionality
        console.log('\n2. Search Functionality (with debouncing):');
        console.log('   Searching for "laptop"...');
        this.cart.searchItems('laptop');
        
        console.log('   Searching for "mouse"...');
        this.cart.searchItems('mouse');
        
        // Demonstrate quantity update
        console.log('\n3. Updating Item Quantity:');
        const firstItem = this.cart.items[0];
        if (firstItem) {
            console.log(`   Updating quantity of ${firstItem.name} from ${firstItem.quantity} to 3`);
            this.cart.updateQuantity(firstItem.id, 3);
        }
        
        // Demonstrate currency change
        console.log('\n4. Changing Currency:');
        console.log(`   Current total: ${this.cart.getFormattedTotal()}`);
        
        this.cart.setCurrency('EUR', 'de-DE');
        console.log(`   Total in EUR: ${this.cart.getFormattedTotal()}`);
        
        this.cart.setCurrency('USD', 'en-US'); // Reset to USD
        console.log(`   Back to USD: ${this.cart.getFormattedTotal()}`);
        
        // Demonstrate item removal
        console.log('\n5. Removing an Item:');
        if (this.cart.items.length > 0) {
            const itemToRemove = this.cart.items[1]; // Remove second item
            console.log(`   Removing: ${itemToRemove.name}`);
            this.cart.removeItem(itemToRemove.id);
        }
    }


    /**
     * Get cart instance for external use
     * @returns {ShoppingCart} - The cart instance
     */
    getCart() {
        return this.cart;
    }

    /**
     * Get products for external use
     * @returns {Array} - Array of products
     */
    getProducts() {
        return deepClone(this.products);
    }
}

// Initialize the application when the module is loaded
const app = new ShoppingApp();

// Export the app instance and classes for external use
export { app, ShoppingApp };

// Example of how to use the app from another module:
/*
import { app } from './main.js';

// Get the cart instance
const cart = app.getCart();

// Add a new item
cart.addItem({
    name: 'New Product',
    price: 49.99,
    description: 'A new product',
    quantity: 1
});

// Get formatted total
console.log(cart.getFormattedTotal());
*/
