(function ($) {
  "use strict";

  // Dropdown on mouse hover (solo desktop)
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this).trigger("click").blur();
          });
      } else {
        $(".navbar .dropdown").off("mouseover").off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Date and time picker
  if ($("#date").length) {
    $("#date").datetimepicker({ format: "L" });
  }
  if ($("#time").length) {
    $("#time").datetimepicker({ format: "LT" });
  }

  // ✅ HERO / HEADER carousel (si existe)
  // Ajusta estas clases si tu slider usa otro nombre:
  // Ejemplos comunes: .header-carousel, .main-carousel, .hero-carousel
  const $hero = $(".header-carousel, .main-carousel, .hero-carousel");
  if ($hero.length) {
    $hero.owlCarousel({
      items: 1,
      autoplay: true,
      smartSpeed: 1200,
      autoplayTimeout: 5000,
      loop: true,
      dots: true,
      nav: true,
      navText: [
        '<span class="btn btn-primary btn-sm px-3 py-2"><i class="fa fa-angle-left"></i></span>',
        '<span class="btn btn-primary btn-sm px-3 py-2"><i class="fa fa-angle-right"></i></span>',
      ],
      responsive: {
        0: { items: 1 },
        576: { items: 1 },
        768: { items: 1 },
        992: { items: 1 },
      },
    });
  }

  // Testimonials carousel (tu config original, solo ajusté 576 para que tenga sentido)
  $(".testimonial-carousel").owlCarousel({
    center: true,
    autoplay: true,
    smartSpeed: 2000,
    dots: true,
    loop: true,
    responsive: {
      0: { items: 1 },
      576: { items: 1 },
      768: { items: 2 },
      992: { items: 3 },
    },
  });
})(jQuery);