function openUserDiv(indicator) {
    if(indicator === "newUser") {       
        $('.nav-tabs a[href="#panel-945372"]').tab('show');
    } else if(indicator === "returningUser") {
        $('.nav-tabs a[href="#panel-214671"]').tab('show');
    }
}

function submitForm() {
    $("#animateProgress").show();
    $(".progress-bar").animate({
        width: "100%"
    }, 5000, function() {$("#formId").submit();});  
}