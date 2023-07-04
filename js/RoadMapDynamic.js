$(document).ready(() => {
    $(".container").draggable({
    });
  function urlName(){

    let  url = window.location.pathname;
    var regex = /\/(\w+)\.html$/;
    var match = url.match(regex);
    var cleanedUrl = match[1];
    return cleanedUrl;
  }

  $("#toggleFullScreen").click(function() {
    toggleFullScreen();
});

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        // Request full screen
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
    } else {
        // Exit full screen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}

  function zoomable(){
    $('.container').on('mousewheel', function(event) {
        event.preventDefault();
        const zoomSpeed = 0.05; // Adjust the zoom speed as needed
        const minZoom = 0.75; // Minimum zoom level
        const maxZoom = 1.5; // Maximum zoom level
    
        const delta = event.originalEvent.wheelDelta;
        let zoom = parseFloat($(this).css('transform').split(' ')[3]) || 1;
    
        zoom += delta > 0 ? zoomSpeed : -zoomSpeed;
        zoom = Math.min(Math.max(minZoom, zoom), maxZoom);
    
        $(this).css('transform', `scale(${zoom})`);
    });
  }
var data;
    
// $(".container")
//         .on('mousewheel', function(e){
//             _wheel(e);
//         })

// function _wheel(e){
//     // e.preventDefault()
//     if(e.type !== 'mousewheel'){
//         return false;
//     }



   
//  let options = {
//   'minZoom' : 0.85,
// 	'maxZoom' : 4,
//   'scrollZoom' : 0.15
//  }

// 	//prevent scroll
// 	e.preventDefault();

// 	//calculate mouse origin relative to this.element
// 	var originX = e.pageX - $(event.target).offset().left;
// 	var originY = e.pageY - $(event.target).offset().top;

// 	//calculate zoom multiplier
// 	var wheelDelta = e.wheelDelta ? e.wheelDelta : e.originalEvent.wheelDelta;
// 	var zoom = this._currentzoom + ((wheelDelta < 0 ? -1 : 1) * options.scrollZoom);
    // zoom(zoom, originX, originY);
// }

    function closePop(){
      $(".popUp").remove();
      $(".hotspot").removeClass("active");
    }
   
    function popUp(item,offset,rect){

       if($(".popUp")){
        $(".popUp").remove()
       }
        var newDiv = $('<div class="popUp">');
        // Add some content to the new <div>
        newDiv.append(`<span class="close">X</span>
        <span id='ref'>${item.reference}</span>
        <img src=${item.image} alt=${item.name}>
        <span id="itemId">Id: ${item.id}</span>
        <span id="itemName">Name: ${item.name}</span>
        <span id="itemPrice">price: ₹${item.price}</span>
        <button>add to cart</button>`);
          // console.log($(event.target).offSet());
          let height = rect.height;
          let width = rect.width;
          let top=offset.top
          let left = offset.left
          if(left>550){
            left = left - left/3;
          }
          if(top>650 && left<550){
            left=left-width
            top= (top+height) - (top/4);
          }
        newDiv.css({
          'padding': '10px',
          'border': '1px solid black',
          // 'width':'20px',
          'top':top+height+'px',
          'left':left+width+'px'
        });

        // Append the new <div> to the body element
        $('body').append(newDiv);

        $(".close").click(closePop)
 

    }
    function hotSpot(){
        $(".hotspots").click((event) => {
            $(".hotspot").removeClass("active");
            let targetDiv = event.target
        var ref = targetDiv.getAttribute("reference");
            $(targetDiv).addClass("active")
        
         var item = data.find((i) => i.reference === ref);
        var offset = $(event.target).offset();
        var rect = (event.target).getBoundingClientRect();
        popUp(item,offset,rect)
  
      });
    }
try {


$.ajax({
  url: `./assets/${urlName()}.json`,
  type: "GET",
  success: (response) => {
    data = response.data;
    if (data !== undefined) {
      // Continue with the logic here
     hotSpot();
     zoomable();
    }
  },
  error: (error) => {
    console.error("Error loading JSON:", error);
  }
});
} catch (error) {
console.error("An error occurred:", error);
}
});