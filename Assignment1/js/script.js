$(document).ready(function() {
    $("#detailsForm").submit(function(event) {
        event.preventDefault()

        let isValid = true
        const name = $("#name").val().trim()
        const address = $("#address").val().trim()
        const dob = $("#dob").val()
        const age = $("#age").val()
        const gender = $("input[name='gender']:checked").val()
        const termsChecked = $("#terms").is(":checked")

        if (name === "") {
            $("#nameError").text("Please enter a name")
            isValid = false
        }
        if (address === "") {
            $("#addressError").text("Please enter a address")
            isValid = false
        }
        if (!dob) {
            $("#dobError").text("Please select a date")
            isValid = false
        }
        if (age === "") {
            $("#ageError").text("Age is not valid")
            isValid = false
        }
        if (!gender) {
            $("#genderError").text("Please select a gender")
            isValid = false
        }
        if (!termsChecked) {
            $("#agreementError").text("You must agree to the terms and conditions")
            isValid = false
        }
        if (isValid) {
            $("#detailsForm").submit()
        }
    });
});
