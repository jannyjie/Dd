
var correctCards = 0;
$( init );

function init() {

  // Hide the success message
  $('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );

  // Reset the game
  correctCards = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );

 // 創建一堆洗過的牌
  var numbers = [ 1, 2, 3 ];
  numbers.sort( function() { return Math.random() - .5 } );

  for ( var i=0; i<3; i++ ) {
    $('<div>' + numbers[i] + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }

// 創建卡槽
  var words = [ 'one' ];
  for ( var i=1; i<=1; i++ ) {
    $('<div>' + words[i-1] + '</div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }

}

function handleCardDrop( event, ui ) {
  var slotNumber = $(this).data( 'number' );
  var cardNumber = ui.draggable.data( 'number' );

  // 如果卡片被放入正確的插槽，
   // 改變卡片顏色，直接定位
   // 在插槽的頂部，並防止它被拖動
   // 再次

  if ( slotNumber == cardNumber ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correctCards++;
    // alert( '恭喜你' );
    swal(
      'Success',
      'You clicked the <b style="color:green;">Success</b> button!',
      'success'
    )
  } else{
    // alert( '123' );
    swal(
      'Error!',
      'You clicked the <b style="color:red;">error</b> button!',
      'error'
    )
  }
 // 如果所有卡片都已正確放置，則顯示一條消息
   // 並重置卡片以進行另一次嘗試

  if ( correctCards == 10 ) {
    $('#successMessage').show();
    $('#successMessage').animate( {
      left: '380px',
      top: '200px',
      width: '400px',
      height: '100px',
      opacity: 1
    } );
  }

}
