document.addEventListener("DOMContentLoaded", () => {
    const tourSelect = document.getElementById("tourSelect");
    const travellersInput = document.getElementById("travellers");
    const priceDisplay = document.getElementById("priceDisplay");
    const bookingForm = document.getElementById("bookingForm");
    const confirmationMessage = document.getElementById("confirmationMessage");

    function updatePrice() {
        if (!tourSelect || !travellersInput || !priceDisplay) return;

        const selectedOption = tourSelect.options[tourSelect.selectedIndex];
        const basePrice = parseFloat(selectedOption.value);
        let count = parseInt(travellersInput.value) || 1;

        if (count < 1) count = 1;
        if (count > 12) count = 12;

        let subtotal = basePrice * count;
        let discountText = "";

        if (count >= 5) {
            subtotal = subtotal * 0.9; // 10% discount for groups of 5+
            discountText = " (includes 10% group discount!)";
        }

        priceDisplay.innerHTML = `Total: $${count} &times; $${basePrice} USD = $${subtotal.toFixed(0)} USD${discountText}`;
    }

    if (tourSelect && travellersInput) {
        tourSelect.addEventListener("change", updatePrice);
        travellersInput.addEventListener("input", updatePrice);
        updatePrice();
    }

    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const fullName = document.getElementById("fullName");
            const email = document.getElementById("email");

            let isValid = true;

            // Validate Name
            if (!fullName.value.trim()) {
                fullName.classList.add("error");
                isValid = false;
            } else {
                fullName.classList.remove("error");
            }

            // Validate Email (@ check)
            if (!email.value.trim() || !email.value.includes("@")) {
                email.classList.add("error");
                isValid = false;
            } else {
                email.classList.remove("error");
            }

            if (!isValid) {
                confirmationMessage.classList.add("hidden");
                return;
            }

            // Calculate total for confirmation
            const selectedOption = tourSelect.options[tourSelect.selectedIndex];
            const tourName = selectedOption.getAttribute("data-name");
            const count = parseInt(travellersInput.value);
            const basePrice = parseFloat(selectedOption.value);
            let subtotal = basePrice * count;
            if (count >= 5) subtotal *= 0.9;

            confirmationMessage.innerHTML = `
                <strong>Booking Confirmed Successfully!</strong><br>
                Thank you, <strong>${fullName.value.trim()}</strong>!<br>
                Tour: <strong>${tourName}</strong> (${count} travellers).<br>
                Total Price: <strong>$${subtotal.toFixed(0)} USD</strong>.<br>
                We have sent a confirmation email to <strong>${email.value.trim()}</strong>.
            `;
            confirmationMessage.classList.remove("hidden");
            bookingForm.reset();
            updatePrice();
        });
    }
});