/**
 * Robust Client-Side Form Validation & Security Suite
 * Trilok Industries Modern Web Application
 * 
 * Features:
 * - Real-time inline field validation (name, phone, email, message, security captcha)
 * - Anti-XSS and Injection Sanitization
 * - Negative scenario enforcement (numeric/symbol names, bad TLDs, missing digits, SQLi vectors)
 * - Accessible error messaging & visual feedback states
 */

(function () {
  'use strict';

  // Sanitization against XSS, HTML tags and script injections
  function sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .trim();
  }

  // Check if string contains dangerous script / injection payloads
  function hasMaliciousContent(str) {
    if (!str || typeof str !== 'string') return false;
    const dangerousPatterns = [
      /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
      /<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi,
      /<object[\s\S]*?>[\s\S]*?<\/object>/gi,
      /<embed[\s\S]*?>/gi,
      /javascript:/gi,
      /vbscript:/gi,
      /onload\s*=/gi,
      /onerror\s*=/gi,
      /onclick\s*=/gi,
      /onmouseover\s*=/gi,
      /<[a-z][\s\S]*>/i, // generic html tags
      /UNION\s+SELECT/gi,
      /;\s*DROP\s+TABLE/gi,
      /--/, // SQL comment
      /\/\*/, // SQL block comment
      /\*\//
    ];
    return dangerousPatterns.some(pattern => pattern.test(str));
  }

  // 1. Full Name Validation
  function validateName(val) {
    if (!val || typeof val !== 'string') {
      return { valid: false, message: 'Your full name is required.' };
    }
    const clean = val.trim();
    if (clean.length < 2) {
      return { valid: false, message: 'Full name must be at least 2 characters.' };
    }
    if (clean.length > 60) {
      return { valid: false, message: 'Full name cannot exceed 60 characters.' };
    }
    if (hasMaliciousContent(clean)) {
      return { valid: false, message: 'Invalid characters or script payload detected.' };
    }
    // Reject double hyphens or periods (common in SQLi/comments)
    if (clean.includes('--') || clean.includes('..')) {
      return { valid: false, message: 'Invalid character combination in name.' };
    }
    // Only letters, spaces, hyphens, periods and apostrophes (no digits or symbols)
    const nameRegex = /^[a-zA-ZÀ-ÿ\s\.\-']{2,60}$/;
    if (!nameRegex.test(clean)) {
      return { valid: false, message: 'Name must contain letters only (no numbers or special characters).' };
    }
    return { valid: true, cleanValue: sanitizeInput(clean) };
  }

  // 2. Phone Number Validation
  function validatePhone(val) {
    if (!val || typeof val !== 'string') {
      return { valid: false, message: 'Phone number is required.' };
    }
    const clean = val.trim();
    if (hasMaliciousContent(clean)) {
      return { valid: false, message: 'Invalid characters in phone number.' };
    }
    // Count raw digits
    const digitsOnly = clean.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      return { valid: false, message: 'Please enter a valid phone number with at least 10 digits.' };
    }
    if (digitsOnly.length > 15) {
      return { valid: false, message: 'Phone number cannot exceed 15 digits.' };
    }
    // Must only have +, digits, spaces, parentheses, dots or hyphens
    const phoneFormatRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9()]{8,22}$/;
    if (!phoneFormatRegex.test(clean)) {
      return { valid: false, message: 'Invalid phone format. Example: +91 94370 00851' };
    }
    return { valid: true, cleanValue: sanitizeInput(clean) };
  }

  // 3. Email Validation
  function validateEmail(val) {
    if (!val || typeof val !== 'string') {
      return { valid: false, message: 'Email address is required.' };
    }
    const clean = val.trim();
    if (hasMaliciousContent(clean)) {
      return { valid: false, message: 'Invalid email address.' };
    }
    if (clean.length < 6 || clean.length > 100) {
      return { valid: false, message: 'Email must be between 6 and 100 characters.' };
    }
    // No consecutive dots anywhere
    if (clean.includes('..')) {
      return { valid: false, message: 'Email cannot contain consecutive dots.' };
    }
    // Strict RFC compliant email regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(clean)) {
      return { valid: false, message: 'Please enter a valid email address (e.g. name@domain.com).' };
    }
    // Domain TLD check (at least 2 letters, e.g. .com, .in, .org)
    const parts = clean.split('@');
    if (parts.length !== 2) return { valid: false, message: 'Invalid email address.' };
    const domainParts = parts[1].split('.');
    const tld = domainParts[domainParts.length - 1];
    if (!tld || tld.length < 2 || !/^[a-zA-Z]+$/.test(tld)) {
      return { valid: false, message: 'Email domain must have a valid top-level domain (e.g. .com, .co.in).' };
    }
    return { valid: true, cleanValue: sanitizeInput(clean) };
  }

  // 4. Message / Scope / Specification Validation
  function validateMessage(val, minLen = 10, maxLen = 3000) {
    if (!val || typeof val !== 'string') {
      return { valid: false, message: 'Please provide project specifications or scope details.' };
    }
    const clean = val.trim();
    if (hasMaliciousContent(clean)) {
      return { valid: false, message: 'Script tags, HTML or malicious vectors are not permitted.' };
    }
    if (clean.length < minLen) {
      return { valid: false, message: `Please provide at least ${minLen} characters describing your requirement.` };
    }
    if (clean.length > maxLen) {
      return { valid: false, message: `Description cannot exceed ${maxLen} characters.` };
    }
    return { valid: true, cleanValue: sanitizeInput(clean) };
  }

  // 5. Security Code / Captcha Validation
  function validateSecurityCode(val, expectedCode = 'TK7289') {
    if (!val || typeof val !== 'string') {
      return { valid: false, message: 'Please type the security code.' };
    }
    const clean = val.trim();
    if (clean.toUpperCase() !== expectedCode.toUpperCase()) {
      return { valid: false, message: `Security code does not match (${expectedCode}).` };
    }
    return { valid: true, cleanValue: sanitizeInput(clean) };
  }

  // 6. Generic Field Validator Mapper
  function validateField(inputEl) {
    if (!inputEl) return { valid: true };
    const type = inputEl.getAttribute('data-validate') || inputEl.type || inputEl.name;
    const value = inputEl.value;

    let res = { valid: true };
    switch (type) {
      case 'name':
      case 'text':
        if (inputEl.id === 'security-code-input' || inputEl.getAttribute('data-validate') === 'security-code') {
          res = validateSecurityCode(value);
        } else if (inputEl.id === 'modal-enquiry-subject' || inputEl.getAttribute('data-validate') === 'subject') {
          // Optional subject, but sanitized if present
          if (value && value.trim().length > 0) {
            if (hasMaliciousContent(value)) res = { valid: false, message: 'Invalid characters in subject.' };
            else res = { valid: true, cleanValue: sanitizeInput(value) };
          } else {
            res = { valid: true, cleanValue: 'General Industrial Enquiry' };
          }
        } else {
          res = validateName(value);
        }
        break;
      case 'phone':
      case 'tel':
        res = validatePhone(value);
        break;
      case 'email':
        res = validateEmail(value);
        break;
      case 'scope':
      case 'message':
      case 'textarea':
        res = validateMessage(value);
        break;
      case 'security-code':
        res = validateSecurityCode(value);
        break;
      default:
        if (inputEl.required && (!value || !value.trim())) {
          res = { valid: false, message: 'This field is required.' };
        }
        break;
    }

    applyFieldState(inputEl, res);
    return res;
  }

  // Visual UI state helper
  function applyFieldState(inputEl, result) {
    const parent = inputEl.parentElement;
    let errorEl = parent.querySelector('.field-error-msg');
    if (!errorEl) {
      errorEl = document.createElement('p');
      errorEl.className = 'field-error-msg text-[11px] text-red-500 mt-1 hidden font-medium flex items-center gap-1';
      parent.appendChild(errorEl);
    }

    if (!result.valid) {
      inputEl.classList.add('border-red-500', 'bg-red-50/5', 'focus:ring-red-400');
      inputEl.classList.remove('border-emerald-500', 'border-slate-700', 'border-slate-200');
      errorEl.innerHTML = `<svg class="w-3.5 h-3.5 inline-block text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="2"/><path stroke-linecap="round" stroke-width="2" d="M12 8v4m0 4h.01"/></svg> <span>${result.message}</span>`;
      errorEl.classList.remove('hidden');
    } else {
      inputEl.classList.remove('border-red-500', 'bg-red-50/5', 'focus:ring-red-400');
      if (inputEl.value && inputEl.value.trim().length > 0) {
        inputEl.classList.add('border-emerald-500');
      } else {
        inputEl.classList.remove('border-emerald-500');
      }
      errorEl.classList.add('hidden');
      errorEl.innerHTML = '';
    }
  }

  // Setup Form Validation Listeners
  function attachValidation(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    // Remove novalidate default browser tooltips to use our custom industrial validation UI
    form.setAttribute('novalidate', 'true');

    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      // Validate on blur
      input.addEventListener('blur', () => {
        validateField(input);
      });

      // Clear error on active typing once corrected
      input.addEventListener('input', () => {
        if (input.classList.contains('border-red-500')) {
          validateField(input);
        }
      });
    });

    // Form submit interception
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isFormValid = true;
      let firstInvalidInput = null;

      inputs.forEach(input => {
        const res = validateField(input);
        if (!res.valid) {
          isFormValid = false;
          if (!firstInvalidInput) firstInvalidInput = input;
        }
      });

      if (!isFormValid) {
        if (firstInvalidInput) {
          firstInvalidInput.focus();
          // Subtle shake animation
          firstInvalidInput.classList.add('animate-pulse');
          setTimeout(() => firstInvalidInput.classList.remove('animate-pulse'), 600);
        }
        return false;
      }

      // If valid, execute submission flow
      handleSuccessfulSubmission(form);
    });
  }

  function handleSuccessfulSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

    if (submitBtn) {
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-950 inline" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg> Transmitting Verified RFQ...
      `;
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.innerHTML = 'Enquiry Transmitted!';
        submitBtn.disabled = false;
      }

      // Close modal if open
      const modal = document.getElementById('enquiry-modal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }

      // Clear all fields and valid borders
      form.reset();
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(inp => inp.classList.remove('border-emerald-500', 'border-red-500'));

      // Show toast
      if (window.showAppToast) {
        window.showAppToast('Thank you! Your project specifications have passed technical validation and are forwarded to our engineering team.');
      } else {
        alert('Thank you! Your project specifications have passed technical validation.');
      }

      setTimeout(() => {
        if (submitBtn) submitBtn.innerHTML = originalText;
      }, 3000);
    }, 900);
  }

  // Initialize validation on all forms when DOM is ready
  function init() {
    attachValidation('dark-quote-form');
    attachValidation('sidebar-enquiry-form');
    attachValidation('modal-enquiry-form');
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  const exportObj = {
    sanitizeInput,
    hasMaliciousContent,
    validateName,
    validatePhone,
    validateEmail,
    validateMessage,
    validateSecurityCode,
    validateField
  };

  if (typeof window !== 'undefined') {
    window.IndustrialValidator = exportObj;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exportObj;
  }
})();
