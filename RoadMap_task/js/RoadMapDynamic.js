$(document).ready(() => {
    $(".container").draggable({
    });
  function urlName(){
    let windowGieght = window.screen.width;
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
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } 
       
    } else {
        // Exit full screen
        if (document.exitFullscreen) {
            document.exitFullscreen();
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
        <button id="addToCart">add to cart</button>`);
        if(!item.availability){
          newDiv.append(`<span id="notAvailable">item not available</span>`);
          $('#addToCart').attr("disabled", true);
        }
          let height = rect.height;
          let width = rect.width;
          let top=offset.top
          let left = offset.left
          if(left>550){
            left = left - left/3;
          }
          if(top>(window.screen.height/2)){
              if (left<(window.screen.width/2)){
               left=left+width
               top= (top+height) - (top/4);
             }
              if (left>(window.screen.width/2)){
               left=left-width
               top= (top+height) - (top/4);
             }
          }
        newDiv.css({
          'padding': '10px',
          'border': '1px solid black',
          'top':top+height+'px',
          'left':left+width+'px'
        });
        // Append the new <div> to the body element
        $('body').append(newDiv);
        $(".close").click(closePop)

    }
    function hotSpot(data){
      data.forEach(item => {
        $(".hotspots").append(`</div><div class="hotspot" type="hotspot" reference=${item.reference} style="left: ${item.left}%; top:${item.top}%;">`)
      });
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
     hotSpot(data);
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