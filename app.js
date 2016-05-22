$(document).ready(function(){
  var quotes = data.quotes();
  var quoteHolder = '';
  var authorHolder = '';
  var cardHolder = '';

  function setUp(){
    var ranBefore = false;
    if(!ranBefore){
      nextCard($('.quote1'));
      nextCard($('.quote2'));
      nextCard($('.quote3'));
      ranBefore = true;
    }
  }
  setUp();
  $('.btn').on("click", function(event){
    event.stopPropagation();
  });

  $(document).on("click", function(){
    //200-230
    var rand = Math.floor((Math.random() * 75));
    var randTwo = Math.floor((Math.random() * 75));
    var randThree = Math.floor((Math.random() * 75));
    var color = 'rgb('+ (140 + rand) + ','+ (140 + randTwo) + ','+ (140 + randThree) +')';
    var color_two = 'rgb('+ (200 + rand) + ','+ (200 + randTwo) + ','+ (200 + randThree) +')';
    $('body').css("background-color", color);
    $('.quote').css("color", color);
  });

  function nextCard(cardHolder){
    var number = Math.floor(Math.random() * quotes.length);
    cardHolder.html("");
    cardHolder.append("<code>" + quotes[number].quote + "</code>");
    cardHolder.append("<textarea wrap='off' cols='60' rows='16'></textarea>");
    cardHolder.append("<button class='next'>Next</button>");
  };

  $('.quote').on("click", ".next" ,function() {
    var tor = $(this).closest('.quote');
    console.log(tor);
    switchNote();
  });

  var switchNote = function(){
    $('.quote').each(function() {
        if ($(this).offset().left < 0) {
            $(this).css("left", "200%");
            cardHolder = $(this);
            console.log(cardHolder);
            nextCard(cardHolder);
        } else if ($(this).offset().left > $('#container').width()) {
            if($(document).width() <= 767){
              $(this).animate({
                left: '10%',
              }, 500 );
            } else {
              $(this).animate({
                left: '50%',
              }, 500 );
            }
        } else {
            $(this).animate({
                left: '-200%',
            }, 500 );
        }
    });
  }
});

// Code from kasdega stackoverflow
// http://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea

$(document).delegate('textarea', 'keydown', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode == 9 || keyCode == 219 || keyCode == 222) {
    e.preventDefault();
    var add = keyCode == 219 ? "{}" : keyCode == 222 ? "''" : '\t';
    var start = $(this).get(0).selectionStart;
    var end = $(this).get(0).selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    $(this).val($(this).val().substring(0, start)
                + add
                + $(this).val().substring(end));

    // put caret at right position again
    $(this).get(0).selectionStart =
    $(this).get(0).selectionEnd = start + 1;
  }
});


