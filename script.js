document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');

            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            } else {
                icon.classList.remove('ri-menu-line');
                icon.classList.add('ri-close-line');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.querySelector('i').classList.remove('ri-close-line');
                    mobileMenuButton.querySelector('i').classList.add('ri-menu-line');
                }
            }
        });
    });

    // Elements for simulated results update
    const caloricTargetDisplay = document.getElementById('caloric-target');
    const proteinTargetDisplay = document.getElementById('protein-target');
    const carbsTargetDisplay = document.getElementById('carbs-target');
    const fatsTargetDisplay = document.getElementById('fats-target');
    const workoutFrequencyDisplay = document.getElementById('workout-frequency');
    const workoutDurationDisplay = document.getElementById('workout-duration');

    const breakfastImage = document.getElementById('breakfast-image');
    const lunchImage = document.getElementById('lunch-image');
    const dinnerImage = document.getElementById('dinner-image');
    const breakfastName = document.getElementById('breakfast-name');
    const lunchName = document.getElementById('lunch-name');
    const dinnerName = document.getElementById('dinner-name');
    const breakfastMacros = document.getElementById('breakfast-macros');
    const lunchMacros = document.getElementById('lunch-macros');
    const dinnerMacros = document.getElementById('dinner-macros');
    const breakfastDescription = document.getElementById('breakfast-description');
    const lunchDescription = document.getElementById('lunch-description');
    const dinnerDescription = document.getElementById('dinner-description');

    const exercisePlanContainer = document.getElementById('exercise-plan-container');

    // --- Simulated AI Data (Hardcoded) ---
    const simulatedPlans = {
        'weight-loss_male': {
            calories_kcal: 1800,
            macros: { protein_g: 150, carbs_g: 180, fats_g: 50 },
            workout_plan: {
                frequency_days_week: 6,
                duration_minutes_session: '60-75',
                daily_routines: [
                    {'day': 'Day 1: Full Body HIIT', 'exercises': ['Jumping Jacks (30s)', 'Burpees (10 reps)', 'Mountain Climbers (30s)', 'Repeat 3-4 rounds']},
                    {'day': 'Day 2: Cardio & Core', 'exercises': ['30 min Jogging', 'Plank (3 sets x 60s)', 'Russian Twists (3 sets x 20 reps)']},
                    {'day': 'Day 3: Strength Training (Upper)', 'exercises': ['Push-ups (3 sets to failure)', 'Dumbbell Rows (3 sets x 12 reps)', 'Overhead Press (3 sets x 10 reps)']},
                    {'day': 'Day 4: Active Recovery', 'exercises': ['Yoga / Stretching (30 min)']},
                    {'day': 'Day 5: Full Body Circuit', 'exercises': ['Bodyweight Squats (3 sets x 15 reps)', 'Lunges (3 sets x 10/leg)', 'Glute Bridges (3 sets x 15 reps)']},
                    {'day': 'Day 6: Rest Day', 'exercises': ['Complete rest or light stretching']}
                ]
            },
            meal_plan: [
                { name: 'Scrambled Eggs with Spinach', kcal: 350, protein_g: 30, carbs_g: 10, fats_g: 20, description: 'Whole grain toast topped with mashed avocado, two poached eggs, cherry tomatoes, and a sprinkle of chili flakes.', image: 'https://images.unsplash.com/photo-1579584425334-c23f2f534b8c?auto=format&fit=crop&q=80&w=400&h=400' },
                { name: 'Grilled Chicken Salad', kcal: 450, protein_g: 40, carbs_g: 25, fats_g: 20, description: 'Mixed greens with grilled chicken breast, cucumber, cherry tomatoes, and a light vinaigrette.', image: 'https://images.unsplash.com/photo-1616788806552-a56d9a4f6b1e?auto=format&fit=crop&q=80&w=400&h=400' },
                { name: 'Baked Cod with Steamed Asparagus', kcal: 500, protein_g: 35, carbs_g: 30, fats_g: 28, description: 'Baked cod fillet served with steamed asparagus and a small portion of quinoa.', image: 'https://images.unsplash.com/photo-1605387431711-3721c5f3e9b0?auto=format&fit=crop&q=80&w=400&h=400' }
            ]
        },
        'muscle-gain_female': {
            calories_kcal: 2500,
            macros: { protein_g: 140, carbs_g: 300, fats_g: 80 },
            workout_plan: {
                frequency_days_week: 4,
                duration_minutes_session: '60-90',
                daily_routines: [
                    {'day': 'Day 1: Lower Body Strength', 'exercises': ['Barbell Squats (4 sets x 6-8 reps)', 'Romanian Deadlifts (3 sets x 8-10 reps)', 'Leg Press (3 sets x 10-12 reps)']},
                    {'day': 'Day 2: Upper Body Strength', 'exercises': ['Dumbbell Bench Press (3 sets x 8-10 reps)', 'Seated Rows (3 sets x 8-10 reps)', 'Overhead Dumbbell Press (3 sets x 8-10 reps)']},
                    {'day': 'Day 3: Rest/Active Recovery', 'exercises': ['Light stretching or yoga']},
                    {'day': 'Day 4: Full Body & Core', 'exercises': ['Goblet Squats (3 sets x 10-12 reps)', 'Push-ups (3 sets to failure)', 'Farmer\'s Walk (3 sets, 50m distance)']}
                ]
            },
            meal_plan: [
                { name: 'Oatmeal with Berries & Protein', kcal: 500, protein_g: 30, carbs_g: 60, fats_g: 18, description: 'Rolled oats cooked with water/almond milk, topped with mixed berries, a scoop of protein powder, and a handful of nuts.', image: 'https://images.unsplash.com/photo-1579294271101-70e252873a48?auto=format&fit=crop&q=80&w=400&h=400' },
                { name: 'Beef and Vegetable Stir-fry', kcal: 700, protein_g: 50, carbs_g: 80, fats_g: 25, description: 'Lean beef strips stir-fried with broccoli, bell peppers, carrots, and brown rice, seasoned with soy sauce.', image: 'https://images.unsplash.com/photo-1505253716302-d59187344933?auto=format&fit=crop&q=80&w=400&h=400' },
                { name: 'Chicken and Sweet Potato Bowl', kcal: 650, protein_g: 45, carbs_g: 70, fats_g: 20, description: 'Baked chicken thigh with roasted sweet potatoes, green beans, and a sprinkle of cheese.', image: 'https://images.unsplash.com/photo-1550974808-11f8457d389a?auto=format&fit=crop&q=80&w=400&h=400' }
            ]
        },
        'default': { // Fallback plan
            calories_kcal: 2000,
            macros: { protein_g: 100, carbs_g: 220, fats_g: 60 },
            workout_plan: {
                frequency_days_week: 4,
                duration_minutes_session: '45-60',
                daily_routines: [
                    {'day': 'Day 1: Full Body Circuit', 'exercises': ['Jumping Jacks (30s)', 'Bodyweight Squats (3 sets x 15 reps)', 'Plank (3 sets x 30s)']},
                    {'day': 'Day 2: Cardio', 'exercises': ['30 minutes of jogging or brisk walking']},
                    {'day': 'Day 3: Strength & Core', 'exercises': ['Lunges (3 sets x 10 reps per leg)', 'Push-ups (3 sets to failure)', 'Crunches (3 sets x 20 reps)']},
                    {'day': 'Day 4: Active Recovery', 'exercises': ['Light yoga or stretching (20-30 mins)']}
                ]
            },
            meal_plan: [
                { name: 'Yogurt Parfait with Granola', kcal: 380, protein_g: 18, carbs_g: 50, fats_g: 12, description: 'Greek yogurt layered with granola, mixed berries, and a drizzle of honey.', image: 'https://images.unsplash.com/photo-1504754528070-e6876c6c975a?auto=format&fit=crop&q=80&w=400&h=400' },
                { name: 'Lentil Soup with Whole-Wheat Bread', kcal: 480, protein_g: 25, carbs_g: 60, fats_g: 15, description: 'Hearty lentil soup with vegetables, served with a slice of whole-wheat bread.', image: 'https://images.unsplash.com/photo-1627993077301-447b2c01994e?auto=format&fit=crop&q=80&w=400&h=400' },
                { name: 'Chicken & Veggie Skewers', kcal: 550, protein_g: 40, carbs_g: 35, fats_g: 25, description: 'Grilled chicken and vegetable skewers (bell peppers, onions, zucchini) with a side of brown rice.', image: 'https://images.unsplash.com/photo-1632778393855-16c49129e92a?auto=format&fit=crop&q=80&w=400&h=400' }
            ]
        }
    };

    // Function to update the results section with the plan data
    function updateResults(plan) {
        if (!plan) return;

        // Ensure these match the keys in your `simulatedPlans` object
        caloricTargetDisplay.textContent = plan.calories_kcal || 'N/A';
        proteinTargetDisplay.textContent = plan.macros ? plan.macros.protein_g + 'g' : 'N/A';
        carbsTargetDisplay.textContent = plan.macros ? plan.macros.carbs_g + 'g' : 'N/A';
        fatsTargetDisplay.textContent = plan.macros ? plan.macros.fats_g + 'g' : 'N/A';
        workoutFrequencyDisplay.textContent = plan.workout_plan ? plan.workout_plan.frequency_days_week : 'N/A';
        workoutDurationDisplay.textContent = plan.workout_plan ? plan.workout_plan.duration_minutes_session : 'N/A';

        const meals = plan.meal_plan || [];
        if (meals[0]) { // Breakfast
            breakfastImage.src = meals[0].image || 'https://via.placeholder.com/192x192/f0f0f0/ccc?text=Breakfast+Image';
            breakfastName.textContent = meals[0].name || 'N/A';
            breakfastMacros.textContent = `${meals[0].kcal || 0} kcal | P: ${meals[0].protein_g || 0}g C: ${meals[0].carbs_g || 0}g F: ${meals[0].fats_g || 0}g`;
            breakfastDescription.textContent = meals[0].description || 'N/A';
        } else { // Handle if meal[0] is missing
            breakfastImage.src = 'https://via.placeholder.com/192x192/f0f0f0/ccc?text=Breakfast+Image';
            breakfastName.textContent = 'No Breakfast Plan';
            breakfastMacros.textContent = '0 kcal | P: 0g C: 0g F: 0g';
            breakfastDescription.textContent = 'Please adjust preferences or check back later.';
        }
        if (meals[1]) { // Lunch
            lunchImage.src = meals[1].image || 'https://via.placeholder.com/192x192/e0e0e0/bbb?text=Lunch+Image';
            lunchName.textContent = meals[1].name || 'N/A';
            lunchMacros.textContent = `${meals[1].kcal || 0} kcal | P: ${meals[1].protein_g || 0}g C: ${meals[1].carbs_g || 0}g F: ${meals[1].fats_g || 0}g`;
            lunchDescription.textContent = meals[1].description || 'N/A';
        } else { // Handle if meal[1] is missing
            lunchImage.src = 'https://via.placeholder.com/192x192/e0e0e0/bbb?text=Lunch+Image';
            lunchName.textContent = 'No Lunch Plan';
            lunchMacros.textContent = '0 kcal | P: 0g C: 0g F: 0g';
            lunchDescription.textContent = 'Please adjust preferences or check back later.';
        }
        if (meals[2]) { // Dinner
            dinnerImage.src = meals[2].image || 'https://via.placeholder.com/192x192/d0d0d0/aaa?text=Dinner+Image';
            dinnerName.textContent = meals[2].name || 'N/A';
            dinnerMacros.textContent = `${meals[2].kcal || 0} kcal | P: ${meals[2].protein_g || 0}g C: ${meals[2].carbs_g || 0}g F: ${meals[2].fats_g || 0}g`;
            dinnerDescription.textContent = meals[2].description || 'N/A';
        } else { // Handle if meal[2] is missing
            dinnerImage.src = 'https://via.placeholder.com/192x192/d0d0d0/aaa?text=Dinner+Image';
            dinnerName.textContent = 'No Dinner Plan';
            dinnerMacros.textContent = '0 kcal | P: 0g C: 0g F: 0g';
            dinnerDescription.textContent = 'Please adjust preferences or check back later.';
        }


        exercisePlanContainer.innerHTML = '';
        const exerciseDays = plan.workout_plan ? plan.workout_plan.daily_routines : [];
        if (exerciseDays.length === 0) {
            exercisePlanContainer.innerHTML = '<p class="text-gray-600">No exercise plan generated for these inputs.</p>';
        } else {
            exerciseDays.forEach(dayPlan => {
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('exercise-day', 'mb-4');
                dayDiv.innerHTML = `<h4 class="text-xl font-semibold text-secondary mb-2">${dayPlan.day}</h4><ul></ul>`;
                const ul = dayDiv.querySelector('ul');
                dayPlan.exercises.forEach(exercise => {
                    const li = document.createElement('li');
                    li.classList.add('text-gray-700', 'flex', 'items-center', 'mb-1');
                    li.innerHTML = `<i class="ri-dumbbell-line mr-2"></i><span>${exercise}</span>`;
                    ul.appendChild(li);
                });
                exercisePlanContainer.appendChild(dayDiv);
            });
        }
    }

    // --- Frontend Logic for AI Plan Generation ---
    const heroDietForm = document.getElementById('hero-diet-form');
    const mainDietForm = document.getElementById('diet-form');
    const aiProcessingSection = document.getElementById('ai-processing');
    const resultsSection = document.getElementById('results');

    function handleDietFormSubmission(event) {
        event.preventDefault();

        let userData = {}; // Object to store all user inputs

        // Determine which form was submitted and get values
        if (event.target.id === 'hero-diet-form') {
            userData = {
                age: document.getElementById('hero-age').value,
                gender: document.getElementById('hero-gender').value,
                activityLevel: document.getElementById('hero-activity').value,
                height: document.getElementById('hero-height').value,
                weight: document.getElementById('hero-weight').value,
                goal: document.getElementById('hero-goal').value,
                // These are not in the quick form, so set defaults
                fullName: 'Guest User',
                email: 'guest@example.com',
                dietaryPreferences: [],
                allergies: ''
            };
        } else { // main diet form
            userData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                age: document.getElementById('age').value,
                gender: document.getElementById('gender').value,
                activityLevel: document.getElementById('activityLevel').value,
                height: document.getElementById('height').value,
                weight: document.getElementById('weight').value,
                goal: document.getElementById('goal').value,
                dietaryPreferences: Array.from(document.querySelectorAll('.preference-checkbox:checked')).map(cb => cb.value),
                allergies: document.getElementById('allergies').value
            };
        }

        // Basic validation (add more if needed)
        if (!userData.age || !userData.gender || !userData.height || !userData.weight || !userData.goal) {
            alert('Please fill in all required fields (Age, Gender, Height, Weight, Primary Goal) to generate a plan.');
            return;
        }

        // --- SIMULATED AI LOGIC (Frontend Only) ---
        // Select a plan based on goal and gender, fallback to 'default'
        let selectedPlanKey = 'default';
        if (userData.goal === 'weight-loss' && userData.gender === 'male') {
            selectedPlanKey = 'weight-loss_male';
        } else if (userData.goal === 'muscle-gain' && userData.gender === 'female') {
            selectedPlanKey = 'muscle-gain_female';
        }
        // More complex logic could be added here to filter meals/exercises based on preferences/allergies
        // For this example, we just pick a predefined plan.

        const generatedPlan = simulatedPlans[selectedPlanKey] || simulatedPlans['default'];

        // --- Store User Profile Data in Local Storage (Frontend Only "Database") ---
        // Use the email as a simple unique identifier for the profile if provided, else use guest.
        const userIdentifier = userData.email && userData.email !== 'guest@example.com' ? userData.email : 'guest_user';
        localStorage.setItem(`userProfile_${userIdentifier}`, JSON.stringify(userData));
        localStorage.setItem('lastLoggedInUserIdentifier', userIdentifier); // Remember who was last logged in

        // Show AI processing section
        if (heroDietForm && heroDietForm.closest('.bg-white')) {
            heroDietForm.closest('.bg-white').classList.add('hidden');
        } else if (mainDietForm && mainDietForm.closest('.diet-form-container')) {
            mainDietForm.closest('.diet-form-container').classList.add('hidden');
        }
        aiProcessingSection.classList.remove('hidden');

        // Simulate AI processing time
        setTimeout(function() {
            aiProcessingSection.classList.add('hidden');
            resultsSection.classList.remove('hidden');
            updateResults(generatedPlan); // Update the results section with the simulated data

            // Scroll to results
            window.scrollTo({
                top: resultsSection.offsetTop - 80,
                behavior: 'smooth'
            });

            // After generating a plan, if it's the main form, pre-fill it for future convenience
            if (event.target.id === 'diet-form') {
                prefillDietForm(); // Pre-fill the main form after plan generation
            }

        }, 3000); // 3 seconds simulation time
    }

    // Attach event listeners to both forms
    const heroDietFormElement = document.getElementById('hero-diet-form');
    const mainDietFormElement = document.getElementById('diet-form');

    if (heroDietFormElement) {
        heroDietFormElement.addEventListener('submit', handleDietFormSubmission);
    }
    if (mainDietFormElement) {
        mainDietFormElement.addEventListener('submit', handleDietFormSubmission);
    }

    // --- Auth Modal (Frontend Only Simulation) ---
    const authModal = document.getElementById('auth-modal');
    const loginButton = document.getElementById('login-button');
    const mobileLoginButton = document.getElementById('mobile-login-button');
    const closeModalButton = document.getElementById('close-modal');
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form'); // This is the div, not the form element
    const signupForm = document.getElementById('signup-form'); // This is the div, not the form element

    // Get the actual form elements within the modal
    const loginFormElement = loginForm.querySelector('form');
    const signupFormElement = signupForm.querySelector('form');

    // Open modal function
    function openAuthModal() {
        if (authModal) {
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close modal function
    function closeAuthModal() {
        if (authModal) {
            authModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Switch between login and signup tabs
    function showLoginForm() {
        if (loginTab && signupTab && loginForm && signupForm) {
            loginTab.classList.add('text-primary', 'border-primary');
            loginTab.classList.remove('text-gray-500');
            signupTab.classList.add('text-gray-500');
            signupTab.classList.remove('text-primary', 'border-primary');
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
        }
    }

    function showSignupForm() {
        if (loginTab && signupTab && loginForm && signupForm) {
            signupTab.classList.add('text-primary', 'border-primary');
            signupTab.classList.remove('text-gray-500');
            loginTab.classList.add('text-gray-500');
            loginTab.classList.remove('text-primary', 'border-primary');
            signupForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        }
    }

    // --- Handle Signup Form Submission (Frontend Only) ---
    if (signupFormElement) {
        signupFormElement.addEventListener('submit', function(event) {
            event.preventDefault();
            const fullName = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value; // In a real app, this would be hashed
            const confirmPassword = document.getElementById('signup-confirm-password').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            if (!email || !password) {
                alert('Email and password are required!');
                return;
            }
            // Basic email format validation
            if (!/\S+@\S+\.\S+/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Check if email is already "registered" in localStorage
            if (localStorage.getItem(`userAccount_${email}`)) {
                alert('An account with this email already exists. Please login or use a different email.');
                return;
            }

            // Simulate saving user to localStorage (NOT secure for real passwords!)
            const userAccount = {
                fullName: fullName,
                email: email,
                password: password // Storing plain text password for simulation only
            };

            localStorage.setItem(`userAccount_${email}`, JSON.stringify(userAccount));
            alert('Account created successfully! You can now log in.');
            showLoginForm(); // Switch to login tab
            signupFormElement.reset(); // Clear form
        });
    }

    // --- Handle Login Form Submission (Frontend Only) ---
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // Simulate checking credentials from localStorage
            const storedUser = localStorage.getItem(`userAccount_${email}`);
            if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user.password === password) { // Simple plaintext check for simulation
                    alert('Login successful!');
                    closeAuthModal();
                    localStorage.setItem('loggedInUserEmail', email); // Mark user as logged in
                    localStorage.setItem('loggedInUserName', user.fullName || email.split('@')[0]);
                    localStorage.setItem('lastLoggedInUserIdentifier', email); // Also mark as the last user who logged in
                    updateLoginState(); // Update UI
                    prefillDietForm(); // Pre-fill forms if profile exists
                } else {
                    alert('Invalid password.');
                }
            } else {
                alert('User not found. Please sign up first.');
            }
        });
    }

    // --- Update UI for Logged-in State ---
    function updateLoginState() {
        const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
        const loggedInUserName = localStorage.getItem('loggedInUserName');
        const loginButton = document.getElementById('login-button');
        const mobileLoginButton = document.getElementById('mobile-login-button');
        
        // Find or create the logout link/button
        let logoutLinkDesktop = document.getElementById('logout-link-desktop');
        if (!logoutLinkDesktop && loginButton && loginButton.parentNode) {
            logoutLinkDesktop = document.createElement('a');
            logoutLinkDesktop.id = 'logout-link-desktop';
            logoutLinkDesktop.href = '#';
            logoutLinkDesktop.className = 'text-gray-800 hover:text-red-500 transition-colors ml-4 whitespace-nowrap cursor-pointer hidden md:block'; // Hidden on mobile
            logoutLinkDesktop.textContent = 'Logout';
            logoutLinkDesktop.addEventListener('click', logout);
            loginButton.parentNode.insertBefore(logoutLinkDesktop, loginButton.nextSibling); 
        }

        let logoutLinkMobile = document.getElementById('logout-link-mobile');
        if (!logoutLinkMobile && mobileMenu) { // Check if mobile menu is present
             logoutLinkMobile = document.createElement('a');
             logoutLinkMobile.id = 'logout-link-mobile';
             logoutLinkMobile.href = '#';
             logoutLinkMobile.className = 'text-gray-800 hover:text-red-500 transition-colors py-2 px-4 md:hidden'; // Only shown on mobile
             logoutLinkMobile.textContent = 'Logout';
             logoutLinkMobile.addEventListener('click', logout);
             // Find the element where mobile login button is and insert after it
             const mobileLoginBtnParent = mobileLoginButton.parentNode;
             if(mobileLoginBtnParent) {
                 mobileLoginBtnParent.insertBefore(logoutLinkMobile, mobileLoginButton.nextSibling);
             }
        }


        if (loggedInUserEmail) { // If a user is "logged in"
            const userNameDisplay = loggedInUserName ? loggedInUserName.split(' ')[0] : loggedInUserEmail.split('@')[0];
            
            // Update Login/Signup button to Welcome text
            if (loginButton) {
                loginButton.textContent = `Welcome, ${userNameDisplay}`;
                loginButton.style.cursor = 'default'; 
                loginButton.removeEventListener('click', openAuthModal); 
            }
            if (mobileLoginButton) {
                mobileLoginButton.textContent = `Welcome, ${userNameDisplay}`;
                mobileLoginButton.style.cursor = 'default';
                mobileLoginButton.removeEventListener('click', openAuthModal);
            }

            // Show Logout links
            if (logoutLinkDesktop) logoutLinkDesktop.classList.remove('hidden');
            if (logoutLinkMobile) logoutLinkMobile.classList.remove('hidden');

        } else { // If no user is "logged in"
            // Reset Login/Signup button text and re-attach event listeners
            if (loginButton) {
                loginButton.textContent = 'Login / Sign Up';
                loginButton.style.cursor = 'pointer';
                loginButton.addEventListener('click', openAuthModal); 
            }
            if (mobileLoginButton) {
                mobileLoginButton.textContent = 'Login / Sign Up';
                mobileLoginButton.style.cursor = 'pointer';
                mobileLoginButton.addEventListener('click', openAuthModal);
            }

            // Hide Logout links
            if (logoutLinkDesktop) logoutLinkDesktop.classList.add('hidden');
            if (logoutLinkMobile) logoutLinkMobile.classList.add('hidden');
        }
    }

    // --- Logout Function ---
    function logout() {
        localStorage.removeItem('loggedInUserEmail');
        localStorage.removeItem('loggedInUserName');
        localStorage.removeItem('lastLoggedInUserIdentifier'); // Clear the last user identifier

        alert('You have been logged out.');
        updateLoginState(); // Update UI to show "Login / Sign Up"
        
        // Clear form fields for a clean state after logout
        const mainDietForm = document.getElementById('diet-form');
        const heroDietForm = document.getElementById('hero-diet-form');
        if (mainDietForm) mainDietForm.reset(); // Resets the main diet form
        if (heroDietForm) heroDietForm.reset(); // Resets the hero diet form

        resultsSection.classList.add('hidden'); // Hide the plan results section
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll back to the top of the page
    }


    // --- Pre-fill Diet Form with Stored Profile Data ---
    // This function will be called on page load and after login
    function prefillDietForm() {
        const lastLoggedInUserIdentifier = localStorage.getItem('lastLoggedInUserIdentifier'); // Get the email of the last logged-in user
        const mainDietForm = document.getElementById('diet-form'); // The main diet planner form

        if (lastLoggedInUserIdentifier && mainDietForm) { // If there's a user identifier and the form exists
            const storedProfile = localStorage.getItem(`userProfile_${lastLoggedInUserIdentifier}`); // Get the profile data
            if (storedProfile) {
                const profileData = JSON.parse(storedProfile); // Parse the JSON string back to an object

                // Fill main diet form fields
                document.getElementById('fullName').value = profileData.fullName || '';
                document.getElementById('email').value = profileData.email || '';
                document.getElementById('age').value = profileData.age || '';
                document.getElementById('gender').value = profileData.gender || '';
                document.getElementById('activityLevel').value = profileData.activityLevel || '';
                document.getElementById('height').value = profileData.height || '';
                document.getElementById('weight').value = profileData.weight || '';
                document.getElementById('goal').value = profileData.goal || '';
                document.getElementById('allergies').value = profileData.allergies || '';

                // Fill dietary preferences checkboxes
                const checkboxes = document.querySelectorAll('.preference-checkbox');
                checkboxes.forEach(checkbox => {
                    // Check if the preference from the profile data is in the checkbox's value
                    if (profileData.dietaryPreferences && profileData.dietaryPreferences.includes(checkbox.value)) {
                        checkbox.checked = true; // Check the box
                    } else {
                        checkbox.checked = false; // Uncheck the box
                    }
                });
                console.log("Diet form pre-filled with stored profile data.");
            } else {
                console.log("No stored profile data found for last logged-in user.");
                // Optionally clear form fields if no data
                mainDietForm.reset();
            }
        } else {
            console.log("Not logged in or main diet form not found for pre-fill.");
        }
    }


    // --- Initial setup on page load ---
    updateLoginState(); // Check if user is already "logged in" from a previous session
    prefillDietForm(); // Attempt to pre-fill the form with saved profile data

    // --- Event listeners for Auth Modal ---
    // These listeners are outside updateLoginState so they are only added once
    if (loginButton) loginButton.addEventListener('click', openAuthModal);
    if (mobileLoginButton) mobileLoginButton.addEventListener('click', openAuthModal);
    if (closeModalButton) closeModalButton.addEventListener('click', closeAuthModal);
    if (loginTab) loginTab.addEventListener('click', showLoginForm);
    if (signupTab) signupTab.addEventListener('click', showSignupForm);


    const heroCTAButton = document.getElementById('hero-cta-button');
    const ctaTrialButton = document.getElementById('cta-trial-button');
    const planButtons = document.querySelectorAll('.plan-button');
    const upgradeBtnResults = document.getElementById('upgrade-btn-results');

    if (heroCTAButton) {
        heroCTAButton.addEventListener('click', function(e) {
            e.preventDefault();
            openAuthModal();
            showSignupForm();
        });
    }

    if (ctaTrialButton) {
        ctaTrialButton.addEventListener('click', function(e) {
            e.preventDefault();
            openAuthModal();
            showSignupForm();
        });
    }

    planButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openAuthModal();
            showSignupForm();
        });
    });

    if (authModal) {
        authModal.addEventListener('click', function(event) {
            if (event.target === authModal) {
                closeAuthModal();
            }
        });
    }

    // --- REMOVE THE OLD ALL FORMS EVENT LISTENER ---
    // The previous general form submit prevention was causing issues with the auth forms.
    // Ensure you remove or comment out any block that looks like:
    // const allForms = document.querySelectorAll('form');
    // forms.forEach(form => { form.addEventListener('submit', ... )});
    // This is crucial because your specific form handlers (for login, signup, diet forms)
    // now handle their own preventDefault().

    // Testimonial Slider (Existing functionality)
    const testimonialContainer = document.getElementById('testimonial-container');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonialIndex = 0;

    if (testimonialContainer && dots.length > 0) {
        const updateSlider = () => {
            const slideWidth = testimonialContainer.querySelector('.testimonial-slide').offsetWidth + (2 * 16); // slide width + padding
            testimonialContainer.scrollTo({
                left: currentTestimonialIndex * slideWidth,
                behavior: 'smooth'
            });
            updateDots();
        };

        const updateDots = () => {
            dots.forEach((dot, index) => {
                if (index === currentTestimonialIndex) {
                    dot.classList.add('bg-primary');
                    dot.classList.remove('bg-gray-300');
                } else {
                    dot.classList.remove('bg-primary');
                    dot.classList.add('bg-gray-300');
                }
            });
        };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonialIndex = index;
                updateSlider();
            });
        });

        setInterval(() => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % dots.length;
            updateSlider();
        }, 5000);

        testimonialContainer.addEventListener('scroll', () => {
            const scrollPosition = testimonialContainer.scrollLeft;
            const slideWidth = testimonialContainer.querySelector('.testimonial-slide').offsetWidth + (2 * 16);
            const newIndex = Math.round(scrollPosition / slideWidth);

            if (newIndex !== currentTestimonialIndex) {
                currentTestimonialIndex = newIndex;
                updateDots();
            }
        });

        updateDots();
    }

    if (upgradeBtnResults) {
        upgradeBtnResults.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: document.getElementById('pricing').offsetTop - 80,
                behavior: 'smooth'
            });
        });
    }
});