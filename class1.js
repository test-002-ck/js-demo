import { debounce, deepClone, formatCurrency } from './first.js';

/**
 * ShoppingCart class that demonstrates usage of utility functions from first.js
 */
export class ShoppingCart {
    constructor() {
        this.items = [];
        this.currency = 'USD';
        this.locale = 'en-US';
        
        // Use debounce for search functionality
        this.debouncedSearch = debounce(this.performSearch.bind(this), 300);
    }

    /**
     * Add an item to the cart
     * @param {Object} item - The item to add
     */
    addItem(item) {
        // Use deepClone to ensure we don't modify the original item
        const clonedItem = deepClone(item);
        clonedItem.id = Date.now(); // Add unique ID
        clonedItem.addedAt = new Date();
        
        this.items.push(clonedItem);
        this.updateTotal();
    }

    /**
     * Remove an item from the cart
     * @param {number} itemId - The ID of the item to remove
     */
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.updateTotal();
    }

    /**
     * Update item quantity
     * @param {number} itemId - The ID of the item
     * @param {number} quantity - The new quantity
     */
    updateQuantity(itemId, quantity) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.updateTotal();
        }
    }

    /**
     * Calculate the total price of all items
     * @returns {number} - The total price
     */
    calculateTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1));
        }, 0);
    }

    /**
     * Get formatted total using formatCurrency utility
     * @returns {string} - The formatted total
     */
    getFormattedTotal() {
        const total = this.calculateTotal();
        return formatCurrency(total, this.currency, this.locale);
    }

    /**
     * Update the cart total (debounced to avoid excessive calculations)
     */
    updateTotal = debounce(() => {
        const total = this.calculateTotal();
        console.log(`Cart total updated: ${this.getFormattedTotal()}`);
        this.notifyTotalChange(total);
    }, 100);

    /**
     * Search items in cart (uses debounced search)
     * @param {string} query - The search query
     */
    searchItems(query) {
        this.debouncedSearch(query);
    }

    /**
     * Perform the actual search (called by debounced function)
     * @param {string} query - The search query
     */
    performSearch(query) {
        const results = this.items.filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.description?.toLowerCase().includes(query.toLowerCase())
        );
        
        console.log(`Search results for "${query}":`, results);
        return results;
    }

    /**
     * Get a deep clone of the cart items
     * @returns {Array} - A deep copy of the items array
     */
    getItemsCopy() {
        return deepClone(this.items);
    }

    /**
     * Set currency and locale for formatting
     * @param {string} currency - The currency code
     * @param {string} locale - The locale
     */
    setCurrency(currency, locale = 'en-US') {
        this.currency = currency;
        this.locale = locale;
    }

    /**
     * Get formatted price for a specific item
     * @param {Object} item - The item to format
     * @returns {string} - The formatted price
     */
    getFormattedItemPrice(item) {
        const price = item.price * (item.quantity || 1);
        return formatCurrency(price, this.currency, this.locale);
    }

    /**
     * Clear all items from cart
     */
    clearCart() {
        this.items = [];
        this.updateTotal();
    }

    /**
     * Get cart summary with formatted prices
     * @returns {Object} - Cart summary
     */
    getCartSummary() {
        const itemsCopy = this.getItemsCopy(); // Use deepClone
        const total = this.calculateTotal();
        
        return {
            itemCount: this.items.length,
            totalItems: this.items.reduce((sum, item) => sum + (item.quantity || 1), 0),
            totalPrice: total,
            formattedTotal: this.getFormattedTotal(),
            items: itemsCopy.map(item => ({
                ...item,
                formattedPrice: this.getFormattedItemPrice(item)
            }))
        };
    }

    /**
     * Notify when total changes (can be overridden)
     * @param {number} total - The new total
     */
    notifyTotalChange(total) {
        // This method can be overridden by subclasses or used for event handling
        console.log(`Cart total changed to: ${this.getFormattedTotal()}`);
    }
}

// Example usage:
// const cart = new ShoppingCart();
// 
// cart.addItem({
//     name: 'Laptop',
//     price: 999.99,
//     description: 'High-performance laptop',
//     quantity: 1
// });
// 
// cart.addItem({
//     name: 'Mouse',
//     price: 29.99,
//     description: 'Wireless mouse',
//     quantity: 2
// });
// 
// console.log(cart.getFormattedTotal()); // "$1,059.97"
// 
// // Search with debouncing
// cart.searchItems('laptop'); // Will be debounced
// 
// // Get cart summary
// console.log(cart.getCartSummary());
