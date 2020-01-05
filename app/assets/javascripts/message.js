$(function(){ 
    function buildHTML(message){
    if (message.image) {
      var html =
        `<div class="user-message__name">
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
        `<div class="user-message__name">
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
});