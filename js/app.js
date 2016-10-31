const companies = require('./storage/companies.json'); 

$(function() {
    $('.main-form').submit(function() {
        $('[data-target]').each(function () {
            var $this = $(this);
            var $target = $('[data-id="' + $this.data('target') + '"]');
            $target.html($this.val());
        });
        $('.document').toggleClass('hidden');
        return false;
    });
    
    // Companies selector
    let $companySelect = $('.companySelect');
    $.each(companies, function (key, value) {
        let $option = $('<option>')
        .val(key)
        .text(value.companyShortName);

        $companySelect.append($option);
    });
    
    $companySelect.change(function () {
        let $this = $(this);
        let company = companies[$this.val()];
        if (company != null) {
            $.each(company, function (key, value) {
                $('[data-target="' + key + '"]').val(value);
            });
        }
    });
});
