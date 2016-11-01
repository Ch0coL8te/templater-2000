const companies = require('./storage/companies.json');
const {ipcRenderer} = require('electron');

$(function() {
    let $companySelect = $('.companySelect');  // "saving" a DOM element

    let addCompany = (key, value) => {         // Creating options for 'select' element
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
        let companyKey = $companySelect.val();  // Searching selected item value (as a key) in "database"
        if (companyKey === 'new') {             // If key is 'new'
            companyKey = Date.now();            // then set it to unique 'Date' value (numbers)
            companies[companyKey] = {};         
        }
        let company = companies[companyKey];

        $('[data-target]').each(function () {            // For each input with 'data-target'
            let $this = $(this);                         // we are sending a value in span with the same 'data-id' value
            let id = $this.data('target');
            let $target = $('[data-id="' + id + '"]');   
            let val = $this.val();
            $target.text(val);
            company[id] = val;
        });
        
        let finalDocument = $('.document');
        finalDocument.show(2000); // Document appear when btn is clicked
        
        
        ipcRenderer.send('storage:update', companies);  // Sending 'sotage:update' event to Main Process
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
