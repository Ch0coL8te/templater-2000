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
});
