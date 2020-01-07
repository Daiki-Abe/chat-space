$(function(){ 
    function buildHTML(message){
    if (message.image) {
      var html =
        `<div class="message" data-message-id= ${message.id} >
          <div class="user-message__name">
            <div class="user-message__name__talker">
              ${message.user_name}
            </div>
            <div class="user-message__name__day-time">
              ${message.created_at}
            </div>
          </div>
          <div class="user-message__message">
            ${message.body}
            <img class="lower-message__image" src= ${message.image} >
          </div>`
      return html;
    } else {
      var html = 
        `<div class="message" data-message-id= ${message.id} >
          <div class="user-message__name">
            <div class="user-message__name__talker">
              ${message.user_name}
            </div>
            <div class="user-message__name__day-time">
              ${message.created_at}
            </div>
          </div>
          <div class="user-message__message">
            ${message.body}
          </div>`
      return html;
    };
  }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $(".main-chat__user-message").append(html);
    $('.main-chat__user-message').animate({ scrollTop: $('.main-chat__user-message')[0].scrollHeight});
    $("form")[0].reset();
    $(".form__submit").prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });
})

  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages);
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__user-message').append(insertHTML);
        $('.main-chat__user-message').animate({ scrollTop: $('.main-chat__user-message')[0].scrollHeight});
      }
    })
    .fail(function() {
      console.log('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});