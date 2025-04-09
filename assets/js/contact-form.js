document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const loadingDiv = form.querySelector('.loading');
    const errorDiv = form.querySelector('.error-message');
    const successDiv = form.querySelector('.sent-message');
    const submitButton = form.querySelector('button[type="submit"]');

    // Input validation functions
    const validators = {
        name: (value) => {
            if (value.trim().length < 2) throw new Error('Name must be at least 2 characters long');
            if (value.trim().length > 50) throw new Error('Name must be less than 50 characters');
            return true;
        },
        email: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) throw new Error('Please enter a valid email address');
            return true;
        },
        subject: (value) => {
            if (value.trim().length < 3) throw new Error('Subject must be at least 3 characters long');
            if (value.trim().length > 100) throw new Error('Subject must be less than 100 characters');
            return true;
        },
        message: (value) => {
            if (value.trim().length < 10) throw new Error('Message must be at least 10 characters long');
            if (value.trim().length > 1000) throw new Error('Message must be less than 1000 characters');
            return true;
        }
    };

    // Function to validate form fields
    const validateForm = (formData) => {
        for (const [key, value] of formData.entries()) {
            if (validators[key]) {
                validators[key](value);
            }
        }
        return true;
    };

    // Function to show/hide form status
    const updateFormStatus = (type, message = '') => {
        loadingDiv.style.display = 'none';
        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';
        submitButton.disabled = false;

        if (type === 'loading') {
            loadingDiv.style.display = 'block';
            submitButton.disabled = true;
        } else if (type === 'error') {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        } else if (type === 'success') {
            successDiv.style.display = 'block';
        }
    };

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Reset form status
        updateFormStatus('loading');
        
        // Collect form data
        const formData = new FormData(this);
        
        try {
            // Validate form data
            validateForm(formData);
            
            // Send to Formspree - Replace YOUR_FORM_ID with your actual Formspree form ID
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            const responseData = await response.json();
            
            if (!response.ok) {
                throw new Error(responseData.error || 'Form submission failed. Please try again.');
            }
            
            // Show success message
            updateFormStatus('success');
            // Reset form
            form.reset();
            
        } catch (error) {
            console.error('Submission error:', error);
            updateFormStatus('error', error.message || 'Failed to submit form. Please try again later.');
        }
    });

    // Real-time validation on input
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', function() {
            try {
                if (validators[this.name]) {
                    validators[this.name](this.value);
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                }
            } catch (error) {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    });
});