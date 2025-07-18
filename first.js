/**
 * Utility functions that can be used across different classes
 */

/**
 * Debounce function - delays the execution of a function until after a specified delay
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} - The debounced function
 */
export function debounce(func, delay) {
    let timeoutId;
    
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/**
 * Deep clone an object or array
 * @param {any} obj - The object or array to clone
 * @returns {any} - A deep copy of the input
 */
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    
    if (obj instanceof Array) {
        return obj.map(item => deepClone(item));
    }
    
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
    
    return obj;
}

/**
 * Format a number as currency
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code (default: 'USD')
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} - The formatted currency string
 */
export function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency
        }).format(amount);
    } catch (error) {
        // Fallback formatting if Intl is not supported
        return `${currency} ${amount.toFixed(2)}`;
    }
}

// Example usage:
// import { debounce, deepClone, formatCurrency } from './first.js';
//
// // Debounce example
// const debouncedSearch = debounce((query) => {
//     console.log('Searching for:', query);
// }, 300);
//
// // Deep clone example
// const original = { name: 'John', hobbies: ['reading', 'gaming'] };
// const cloned = deepClone(original);
//
// // Format currency example
// const price = formatCurrency(1234.56); // "$1,234.56"
// const euroPrice = formatCurrency(1234.56, 'EUR', 'de-DE'); // "1.234,56 €"
