const companies = require('./storage/companies.json');
const {ipcRenderer} = require('electron');

$(function() {
    let $companySelect = $('.companySelect');

    let addCompany = (key, value) => {
        let $option = $('<option>')
            .val(key)
            .text(value.companyShortName);

        $companySelect.append($option);
    };

    let updateCompanies = () => {
        $companySelect.empty();
        addCompany('new', {companyShortName: 'Новая компания'});
        $.each(companies, addCompany);
    };

    $('.main-form').submit(function() {
        let companyKey = $companySelect.val();
        if (companyKey === 'new') {
            companyKey = Date.now();
            companies[companyKey] = {};
        }
        let company = companies[companyKey];

        $('[data-target]').each(function () {
            let $this = $(this);
            let id = $this.data('target');
            let $target = $('[data-id="' + id + '"]');
            let val = $this.val();
            $target.text(val);
            company[id] = val;
        });

        $('.document').toggleClass('hidden');
        ipcRenderer.send('storage:update', companies);
        updateCompanies();

        return false;
    });

    $companySelect.change(function () {
        let $this = $(this);
        let company = companies[$this.val()];
        if (company == null) {
            $('[data-target]').each(function () {
                $(this).val('');
            });
        } else {
            $.each(company, function (key, value) {
                $('[data-target="' + key + '"]').val(value);
            });
        }
    });

    updateCompanies();
});
