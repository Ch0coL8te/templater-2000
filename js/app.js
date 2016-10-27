$(function() {
    $('.main-form').submit(function() {
        $('[data-target]').each(function () {
            var $this = $(this);
            var $target = $('[data-id="' + $this.data('target') + '"]');
            $target.text($this.val());
        });
        return false;
    });
});
