$(function () {
  $("#expand-nav").click(function () {
    $(".expandable").toggleClass("shown");
  });

  $(window).scroll(function () {
    var nav = $("nav.floating");
    var top = $("a.top");
    if ($(window).scrollTop() > 84) {
      nav.addClass("pinned");
      top.addClass("pinned");
    } else {
      nav.removeClass("pinned");
      top.removeClass("pinned");
    }
  });

  $(window).resize(refreshAsides);

  // Since we may not have the height correct for the images, adjust the asides
  // too when an image is loaded.
  $("img").on("load", function () {
    refreshAsides();
  });

  // On the off chance the browser supports the new font loader API, use it.
  if (document.fontloader) {
    document.fontloader.notifyWhenFontsReady(function () {
      refreshAsides();
    });
  }

  // Lame. Just do another refresh after a second when the font is *probably*
  // loaded to hack around the fact that the metrics changed a bit.
  window.setTimeout(refreshAsides, 200);

  refreshAsides();
});

function refreshAsides() {
  $("aside").each(function () {
    var aside = $(this);

    // If the asides are inline, clear their position.
    if ($(document).width() <= 48 * 20) {
      aside.css('top', 'auto');
      return;
    }

    // Find the span the aside should be anchored next to.
    var name = aside.attr("name");
    if (name == null) {
      window.console.log("No name for aside:");
      window.console.log(aside.context);
      return;
    }

    var span = $("span[name='" + name + "']");
    if (span == null) {
      window.console.log("Could not find span for '" + name + "'");
      return;
    }

    // Vertically position the aside next to the span it annotates.
    var pos = span.position();
    if (pos == null) {
      window.console.log("Could not find position for '" + name + "'");
      console.log(span);
      return;
    }

    if (aside.hasClass("bottom")) {
      aside.offset({ top: pos.top + 23 - aside.height() });
    } else {
      aside.offset({ top: pos.top - 6 });
    }
  });
}