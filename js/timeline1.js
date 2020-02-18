(function() {
  $(window).on("load resize", function() {
    if ($(this).width() < 767) {
      return $(".timeline > li").css("margin-top", "");
    } else {
      return $(".timeline > li").css("margin-top", $(".timeline > li").height());
    }
  });

}.call(this));

