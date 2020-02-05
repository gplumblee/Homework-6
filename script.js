$("button").on("click", function() {
    let city = $("#search-value").val();
    $(".history").append(`<li>${city}</li>`);
})
