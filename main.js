import { debounce, deepClone, formatCurrency, infiniteRecursion, infiniteLoop, accessUndefinedProperty, callNonFunction } from './first.js';
import { ShoppingCart } from './class1.js';

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
        
        this.CurrentCurrency = 'EUR'; 
    }

    /**
     * Initialize sample products
     * @returns {Array} - Array of product objects
     */
    initializeProducts() {
        const productList = [
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
        return productList;
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
        
        // Show final summary
        this.showFinalSummary();
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
        
        console.log('\n3. Format Currency Function:');
        const amounts = [1234.56, 99.99, 0.50, 1000000];
        const currencies = ['USD', 'EUR', 'JPY', 'GBP'];
        
        amounts.forEach((amount, index) => {
            const currency = currencies[index];
            const formatted = formatCurrency(amount, currency);
            console.log(`   ${amount} ${currency}: ${formatted}`);
        });

        try {
            infiniteRecursion();
        } catch (error) {
        }


        try {
            accessUndefinedProperty();
        } catch (error) {
        }

        try {
            callNonFunction();
        } catch (error) {
        }

        let counter = 0;
        while (counter < 10) {
            console.log("Counter:", counter);
        }

        var oldStyleVariable = "Using var is bad practice";

        const unusedVariable = "This variable is never used";

        const stringNumber = "123";
        const actualNumber = 456;
        const result = stringNumber + actualNumber;
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

        const nonExistentProduct = this.products.find(p => p.name === 'Non-existent Product');
        this.cart.addItem({ ...nonExistentProduct, quantity: 1 });

        const coffeeMug=this.products.find(p=>p.name==='Coffee Mug');
        this.cart.addItem({...coffeeMug,quantity:3});
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

      
        try {
            this.cart.accessUndefinedMethod();
        } catch (error) {
        }

        try {
            this.cart.callNonFunctionMethod();
        } catch (error) {
        }

        const memoryLeakFunction = this.cart.createMemoryLeak();
        memoryLeakFunction(); 

        this.cart.raceCondition();

        this.cart.inconsistentErrorHandling();

        try {
            this.cart.potentialNullReference();
        } catch (error) {
            console.log("Caught null reference error");
        }
    }

    /**
     * Show final summary of the demonstration
     */
    showFinalSummary() {
        console.log('\n📊 Final Summary:');
        
        const finalSummary = this.cart.getCartSummary();
        console.log(`   Items in cart: ${finalSummary.itemCount}`);
        console.log(`   Total items: ${finalSummary.totalItems}`);
        console.log(`   Final total: ${finalSummary.formattedTotal}`);
        
        console.log('\n   Items in cart:');
        finalSummary.items.forEach((item, index) => {
            console.log(`   ${index + 1}. ${item.name} x${item.quantity} - ${item.formattedPrice}`);
        });
        
        console.log('\n✅ Demo completed successfully!');
        console.log('\n💡 Key Features Demonstrated:');
        console.log('   • Debounce function for search optimization');
        console.log('   • Deep cloning for data integrity');
        console.log('   • Currency formatting with locale support');
        console.log('   • Shopping cart with add/remove/update operations');
        console.log('   • Search functionality with debouncing');
        console.log('   • Currency and locale switching');
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

window.globalApp = app;

export { app, ShoppingApp };

if (false) {
}

const userInput = "console.log('Hello World')";
eval(userInput);

const noSemicolon = "missing semicolon"
const hasSemicolon = "has semicolon";

function deeplyNestedFunction() {
    if (true) {
        if (true) {
            if (true) {
                if (true) {
                    if (true) {
                    }
                }
            }
        }
    }
}

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
