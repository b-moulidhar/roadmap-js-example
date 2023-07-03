var pt = pt || {};

pt.empty = function(obj){
  if(obj === undefined){
    return true;
  }
  else if(obj === null){
    return true;
  }
  else if(obj === false){
    return true;
  }
  else if(typeof obj == 'number'){
    if(obj === 0){
      return true;
    }
  }
  else if(typeof obj == 'string'){
    if(obj.length == 0){
      return true;
    }
    else if(obj == '0'){
      return true;
    }
  }
  else if(obj instanceof Array){
    if(obj.length == 0){
      return true;
    }
  }
  else if(obj instanceof Object){
    for(var key in obj){
      if(obj.hasOwnProperty(key)){
        return false;
      }
    }
    return true;
  }
  return false;
}

pt.qajax = (function(){
  var requests = [];

  //define function to run the next in queue
  var next = function(){
    requests.shift();
    if(requests.length > 0){
      $.ajax(requests[0]);
    }
  };

  return {
    'push' : function(request){
      //add next to complete
      if(request.complete){
        var callback = request.complete;
        request.complete = function(){
          callback();
          next();
        }
      }
      else{
        request.complete = next;
      }

      //push the request
      requests.push(request);

      //immediately execute if no other requests in the pipe
      if(requests.length == 1){
        $.ajax(requests[0]);
      }
    }
  };
}());

pt.session = function(key, val){
  var data = {};
  data[key] = val;
  $.ajax({
    'url' : '/session/',
    'type' : 'POST',
    'dataType' : 'json',
    'data' : data,
    'success' : function(response){
      location.reload(true);
    }
  });
};

/**
 * pt.address
 */
$.widget('pt.address', {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    var that = this;

    //delegate change on country code
    $(this.element).delegate('select[name*="country_code"]', 'change', function(e){
      that._update_states(e);
    });
  },

  /**
   * Init
   */
  '_init' : function(){
    //trigger change to show/hide states
    $('select[name*="country_code"]', this.element).change();
  },

  /**
   * Update States
   */
  '_update_states' : function(e){
    var form = $(e.target).closest('form');
    var country_code = $(e.target).val();

    //hide state-province options that do not match this country
    $('select[name*="state_province"]', form).each(function(){
      var state_select = this;

      //target the optgroup
      if(country_code == 'US'){
        //show all but canada
        $('optgroup', state_select).show();
        $('optgroup[label="Canada"]', state_select).hide();

        //if selected state is in Canada, select Alabama
        var optgroup = $('option:selected', state_select).closest('optgroup').attr('label');
        if(optgroup == 'Canada'){
          $(state_select).val('AL');
        }
      }
      else{
        //show only canada
        $('optgroup', state_select).hide();
        $('optgroup[label="Canada"]', state_select).show();

        //if selected is not in Canada, select Alberta
        var optgroup = $('option:selected', state_select).closest('optgroup').attr('label');
        if(optgroup != 'Canada'){
          $(state_select).val('AB');
        }
      }
    });
  }
});

/**
 * pt.carousel
 */
$.widget('pt.carousel', {
  /**
   * Options
   */
  'options' : {
    'distance' : 'auto',
    'duration' : 300
  },

  /**
   * Create
   */
  '_create' : function(){
    var that = this;
    this._list = $('ul:first', this.element);

    //add arrows
    var prevArrow = $('<div class="arrow prev"><span></span><span>&#xf104;</span></div>');
    var nextArrow = $('<div class="arrow next"><span></span><span>&#xf105;</span></div>');
    $(this.element).prepend(prevArrow);
    $(this.element).append(nextArrow);

    //bind click on arrow scroll
    $(prevArrow).on('click', function(e){
      that.scroll('left');
    });
    $(nextArrow).on('click', function(e){
      that.scroll('right');
    });

		//bind scroll on the element
		$('ul', this.element).on('scroll', function(e){
			//no scroll at all
			if(this.scrollWidth < $(this).width()){
				$(that.element).addClass('begin');
				$(that.element).addClass('end');
				return false;
			}

			//scroll at beginning
			if(this.scrollLeft == 0){
				$(that.element).addClass('begin');
			}
			else{
				$(that.element).removeClass('begin');
			}

			//scroll at end
			if($(this).width() + this.scrollLeft >= this.scrollWidth){
				$(that.element).addClass('end');
			}
			else{
				$(that.element).removeClass('end');
			}
		});
  },

  /**
   * Init
   */
  '_init' : function(){
		//trigger a scroll event to show/hide arrows
		var ul = $('ul', this.element);
		ul.get(0).dispatchEvent(new CustomEvent('scroll'));
  },

  /**
   * Scroll the carousel
   * @param string direction
   */
  'scroll' : function(direction){
		//get items and positions
		var items = $('li', this._list);
		var positions = $.map(items, function(n){
			return $(n).position().left;
		});

		//determine first item fully shown that isn't flush with the start
		var first_full = positions.reduce(function(accumulator, value, index){
			return ((value > 0) && (accumulator === null)) ? index : accumulator;
		}, null);

		//the number of items we want to scroll is a full viewport width's worth
		var viewport_width = $(this.element).width();
		var scroll_count = Math.floor($(this.element).width() / $(items[0]).width());

		//determine the index of the item we want to scroll to and constrain
		var new_index = (direction == 'left') ? (first_full - scroll_count) : (first_full + scroll_count);
		new_index = Math.max(new_index, 0);
		new_index = Math.min(new_index, items.length - 1);

		//scroll to the item
		items[new_index].scrollIntoView({'behavior' : 'smooth', 'block' : 'nearest', 'inline' : 'start'});
  }
});

/**
 * pt.cmenu
 * @triggers cmenu:show
 * @triggers cmenu:hide
 */
$.widget('pt.cmenu', {
  /**
   * Options
   */
  'options' : {
    'position' : null,
    'selector' : null
  },

  /**
   * Create
   */
  '_create' : function(){
    var that = this;

    //private instance variables
    this._open = false;

    //add menu to the body and apply position
    $('body').append(this.element);
    $(this.element).addClass('pt-cmenu');

    //prevent clicking
    $(this.options.selector).on('click', function(e){
      e.preventDefault();
    });

    //bind mousedown event on selector to show the menu
    $(this.options.selector).on('mousedown', function(e){
      e.preventDefault();
      if(!that._open){
        this.blur();
        that.show();
      }
    });

    //bind click event on document to hide the menu
    $(document).on('click', function(e){
//      var isSelector = $(that.options.selector).is(e.target) || ($(that.options.selector).has(e.target).length > 0);
      var isMenu = $(that.element).is(e.target) || ($(that.element).has(e.target).length > 0);
      if(that._open && !isMenu){
        that.hide();
      }
    });

    //bind escape key to hide the menu
    $(document).on('keydown', function(e){
      if(e.keyCode == 27){
        that.hide();
      }
    });
  },

  /**
   * Show the menu
   */
  'show' : function(){
    var that = this;

		//reposition the cmenu everytime we show to update if elements have moved
    if(this.options.position){
			$(this.element).show().position(this.options.position).hide();
    }

		//show the menu
    $(this.element).slideDown('fast', function(){
      that._open = true;
      var event = jQuery.Event('cmenu:show');
      $(that.element).trigger(event);
    });
  },

  /**
   * Hide the menu
   */
  'hide' : function(){
    var that = this;
    $(this.element).slideUp('fast', function(){
      that._open = false;
      var event = jQuery.Event('cmenu:hide');
      $(that.element).trigger(event);
    });
  },

  /**
   * Show/hide the menu
   */
  'toggle' : function(){
    if($(this.element).is(':visible')){
      this.hide();
    }
    else{
      this.show();
    }
  }
});

/**
 * pt.cselect
 * @extends pt.cmenu
 */
$.widget('pt.cselect', $.pt.cmenu, {
  /**
   * Options
   */
  'options' : {
    'searchable' : true, //whether or not to show the search box
    'placeholder' : 'Search',
    'classes' : null
  },

  /**
   * Create
   */
  '_create' : function(){
    var that = this;

    //override parent prototype
    this.options.selector = this.element;
    this.element = $('<div class="pt-cselect"><div class="search"><input /></div><div class="options"></div></div>');
    this.options.position = {
      'my' : 'left top',
      'at' : 'left bottom+10',
      'of' : this.options.selector
    };

    //add class if given
    if(this.options.classes){
      $(this.element).addClass(this.options.classes);
    }

    //set search and placeholder
    if(this.options.searchable){
      $(this.element).addClass('pt-cselect-searchable');
      $('>.search input', this.element).attr('placeholder', this.options.placeholder);
    }

    //bind keyup for searches
    $('>.search input', this.element).on('keyup', function(e){
      //filter through the options that contain the value
      var pattern = new RegExp($(this).val(), 'i');
      $('>.options p.option', that.element).each(function(){
        var val = $(this).text();
        if(pattern.test(val)){
          $(this).show();
        }
        else{
          $(this).hide();
        }
      });
    });

    //bind click on an option
    $('>.options', this.element).delegate('p.option', 'click', function(e){
      var value = $(this).attr('value');
      $(that.options.selector).val(value);
      $(that.options.selector).trigger('change');
      that.hide();
    });

    this.refresh();

    this._super();
  },

  /**
   * Reload the menu if the select elements have changed
   */
  'refresh' : function(){
    var that = this;

    //empty the options div
    var optionsDiv = $('>.options', this.element);
    $(optionsDiv).empty();

    //add optgroups and options
    var options = $(this.options.selector).children();
    $(options).each(function(){
      if($(this).prop('tagName') == 'OPTGROUP'){
        var optgroup = $('<div class="optgroup"><p class="label"></p></div>');
        $('p.label', optgroup).text($(this).attr('label'));
        $(optionsDiv).append(optgroup);
        $('option', this).each(function(){
          var option = $('<p class="option"></p>');
          $(option).text(this.text).attr('value', $(this).val());
          $(optgroup).append(option);
        });
      }
      else if($(this).prop('tagName') == 'OPTION'){
        if(($(this).attr('value') !== undefined) && ($(this).attr('value') != '')){
          var option = $('<p class="option"></p>');
          $(option).text(this.text).attr('value', $(this).val());
          $(optionsDiv).append(option);
        }
      }
    });
  },

  /**
   * Cmenu hide override to deinit the menu
   */
  'hide' : function(){
    //reinit the dropdown
    $('>.search input', this.element).val('').trigger('keyup');
    $('>.options', this.element).scrollTop(0);
    this._super();
  }
});

/**
 * pt.expand
 */
$.widget('pt.expand', {
  /**
   * Options
   */
  'options' : {
    'items' : '*', //what items can be expanded
    'title' : '>div:nth-child(1)', //the title element
    'content' : '>div:nth-child(2)', //the content element
    'single' : true, //only one item can be expanded at a time
    'speed' : 'fast'
  },

  /**
   * Create
   */
  '_create' : function(){
    var that = this;

    //delegate click on title element
    $(this.element).delegate(this.options.title, 'click', function(e){
      that.show(e);
    });
  },

  /**
   * Show the menu
   */
  'show' : function(e){
    var that = this;
    var form = $(e.target).closest(this.options.items);

    if(this.options.single){
      var content = $(this.options.content, form);
      $(this.options.items + ' ' + this.options.content + ':visible').not(content).slideUp(this.options.speed, function(){
        $(this).closest(that.options.items).removeClass('editing');
      });
      $(content).slideDown(this.options.speed, function(){
        $(this).closest(that.options.items).addClass('editing');
      });
    }
    else{
      $(this.options.content, form).slideToggle(this.options.speed, function(){
        if($(this).is(':visible')){
          $(this).closest(that.options.items).addClass('editing');
        }
        else{
          $(this).closest(that.options.items).removeClass('editing');
        }
      });
    }
  }
});

/**
 * pt.fadetip
 */
$.widget('pt.fadetip', {
  /**
   * Options
   */
  'options' : {
    'arrow' : 'bottom',
    'duration' : 1500,
    'offset' : 0,
    'distance' : '-1em',
    'contents' : null,
    'width' : 'auto',
  },

  /**
   * Create
   */
  '_create' : function(){
    var that = this;

    //create the fadetip instance
    this._fadetip = $('<div class="pt-fadetip"><div></div></div>');
    $(this._fadetip).addClass(this.options.arrow);
    $(this._fadetip).css({
      'width' : this.options.width,
      'text-align' : 'center',
      'position' : 'absolute'
    });

    //if mouseout for duration, bind mouseleave to remove fadetip
    if(this.options.duration == 'mouseout'){
      $(this.element).on('mouseleave', function(e){
        $(that._fadetip).detach();
      });

      //also make the fadetip detach on scroll
      $(window).on('scroll', function(e){
        if($(that._fadetip).is(':visible')){
          $(that._fadetip).detach();
        }
      });
    }
  },

  /**
   * Init
   */
  '_init' : function(){
    var that = this;

    //do nothing if no contents
    if(!this.options.contents){
      return false;
    }

    //if fading, clone the fadetip to allow multiples
    var fadetip = (typeof this.options.duration == 'number')
      ? $(this._fadetip).clone()
      : this._fadetip;

    //append the element to body
    $('body').append(fadetip);

    //set the text
    $('>div', fadetip).html(this.options.contents);

    //set position
    var at = 'center center';
    switch(this.options.arrow){
      case 'bottom' : at = 'center center-' + this.options.offset; break;
      case 'top' : at = 'center center+' + this.options.offset; break;
      case 'left' : at = 'center+' + this.options.offset + ' center'; break;
      case 'right' : at = 'center center-' + this.options.offset + ' center'; break;
      default : break;
    }
    $(fadetip).position({
      'my' : 'center bottom',
      'at' : at,
      'of' : this.element,
      'using' : function(obj, info){
        if($(this).hasClass('top')){
          if(info.vertical != 'top'){
            $(this).removeClass('top');
            $(this).addClass('bottom');
          }
        }
        else if($(this).hasClass('bottom')){
          if(info.vertical == 'top'){
            $(this).removeClass('bottom');
            $(this).addClass('top');
          }
        }
        else if($(this).hasClass('left')){
          if(info.horizontal != 'left'){
            $(this).removeClass('left');
            $(this).addClass('right');
          }
        }
        else if($(this).hasClass('right')){
          if(info.horizontal == 'left'){
            $(this).removeClass('right');
            $(this).addClass('left');
          }
        }
        $(this).css({
          left: obj.left + 'px',
          top: obj.top + 'px'
        });
      }
    });

    //if duration is a number, animate fading and remove when done
    if(typeof this.options.duration == 'number'){
      //animate the element and remove it when done
      $(fadetip).animate({
        'opacity' : 0,
        'margin-top' : this.options.distance,
      }, this.options.duration, function(e){
        $(this).detach();
      });
    }
  }
});

/**
 * pt.loader
 * @triggers loader:buttonclick
 */
$.widget('pt.loader', {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    var that = this;

    //private instance variables
    this._loader = $('<div class="pt-loader"><table><tr><td>'
      + '<p class="text"></p>'
      + '<div class="loading"><img src="/img/loading-ball.gif" /></div>'
      + '<div class="error"><button type="button" name="ok">OK</button></div>'
      + '<div class="confirm"><button type="button" name="yes">Continue</button><button type="button" name="cancel">Cancel</button></div>'
      + '</td></tr></table></div>');

    //bind error ok button click
    $('.error button[name="ok"]', this._loader).on('click', function(e){
      var event = jQuery.Event('loader:buttonclick', {'button' : 'ok'});
      $(that.element).trigger(event);
      that.hide();
    });

    //bind confirm yes button click
    $('.confirm button[name="yes"]', this._loader).on('click', function(e){
      var event = jQuery.Event('loader:buttonclick', {'button' : 'yes'});
      $(that.element).trigger(event);
      that.hide();
    });

    //bind confirm cancel button click
    $('.confirm button[name="cancel"]', this._loader).on('click', function(e){
      var event = jQuery.Event('loader:buttonclick', {'button' : 'cancel'});
      $(that.element).trigger(event);
      that.hide();
    });

    //append the content to the element and hide it by default if it's not a select
    if($(this.element).prop('tagName') != 'SELECT'){
      $(this.element).append(this._loader);
      $(this._loader).hide();
    }
  },

  /**
   * Init
   */
  '_init' : function(){
  },

  /**
   * Show the blocking content
   * @param string text
   */
  'loading' : function(text){
    if($(this.element).prop('tagName') == 'SELECT'){
      //select loading
      $(this.element).prop('disabled', true);
      return false;
    }

    $('.loading', this._loader).show();
    $('.error', this._loader).hide();
    $('.confirm', this._loader).hide();

    text = text || 'Loading...';
    $('p.text', this._loader).html(text);
    $(this._loader).fadeIn('fast');
  },

  /**
   * Show an error
   * @param fs.Error error
   */
  'error' : function(error){
    $('.loading', this._loader).hide();
    $('.error', this._loader).show();
    $('.confirm', this._loader).hide();

    $('p.text', this._loader).html(error.message);
    $(this._loader).fadeIn('fast');
  },

  /**
   * Show confirmation message
   * @param string text
   */
  'confirm' : function(text){
    $('.loading', this._loader).hide();
    $('.error', this._loader).hide();
    $('.confirm', this._loader).show();

    text = text || 'Are you sure?';
    $('p', this._loader).html(text);
    $(this._loader).fadeIn('fast');
  },

  /**
   * Hide the blocking content
   */
  'hide' : function(){
    if($(this.element).prop('tagName') == 'SELECT'){
      //select loading
      $(this.element).prop('disabled', false);
      return false;
    }

    $(this._loader).fadeOut('fast');
  }
});

/**
 * pt.password
 */
$.widget('pt.password', {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    var that = this;

    $('input[name="password"], input[name="repassword"]').on('keydown', function(e) {
      e = e || event;
      var path = e.originalEvent.path;
      var formName = '';

      $.each(path, function(k, v) {
        if ($(v).is('form')) {
          formName = $(v)[0].name;
        }
      });

      if (typeof (window.lastpress) === 'undefined') { 
        window.lastpress = e.timeStamp; 
      }

      if (typeof (window.capsLockEnabled) !== 'undefined') {
        if (e.keyCode == 20 && e.timeStamp > window.lastpress + 50) {
          window.capsLockEnabled = !window.capsLockEnabled;
          $('.caps-warning').toggle();
        }

        window.lastpress = e.timeStamp;
      }
    });

    // Show/Hide Password field
    $('.show-pass').on('click', function(e) {
      // var path = e.originalEvent.path;
      var formName = $(e.target).closest('form').attr('name');
      
      // $.each(path, function(k, v) {
      //   if ($(v).is('form')) {
      //     formName = $(v)[0].name;
      //   }
      // });

      var pwd = $('form[name="' + formName + '"] input[name="password"]');
      var repwd = $('form[name="' + formName + '"] input[name="repassword"]');
      
      if ($(pwd).attr('type') === 'password') {
        $(pwd).prop('type', 'text');
        $('form[name="' + formName + '"] .show-pass a').text('Hide Password');
        
        if (repwd.length) {
          $(repwd).prop('type', 'text');
        }
      } else {
        $(pwd).prop('type', 'password');
        $('form[name="' + formName + '"] .show-pass a').text('Show Password');

        if (repwd.length) {
          $(repwd).prop('type', 'password');
        }
      }
    });

    that.check_capslock_form($('form[name="login"]'));
    that.check_capslock_form($('form[name="register"]'));
    that.check_capslock_form($('form[name="password"]'));
    that.check_capslock_form($('form[name="reset"]'));

    //delegate change on country code
    $(this.element).delegate('select[name*="country_code"]', 'change', function(e){
      that._update_states(e);
    });
  },

  /**
   * Init
   */
  '_init' : function(){
    //trigger change to show/hide states
    $('select[name*="country_code"]', this.element).change();
  },

  /**
   * Update States
   */
  '_update_states' : function(e){
    var form = $(e.target).closest('form');
    var country_code = $(e.target).val();

    //hide state-province options that do not match this country
    $('select[name*="state_province"]', form).each(function(){
      var state_select = this;

      //target the optgroup
      if(country_code == 'US'){
        //show all but canada
        $('optgroup', state_select).show();
        $('optgroup[label="Canada"]', state_select).hide();

        //if selected state is in Canada, select Alabama
        var optgroup = $('option:selected', state_select).closest('optgroup').attr('label');
        if(optgroup == 'Canada'){
          $(state_select).val('AL');
        }
      }
      else{
        //show only canada
        $('optgroup', state_select).hide();
        $('optgroup[label="Canada"]', state_select).show();

        //if selected is not in Canada, select Alberta
        var optgroup = $('option:selected', state_select).closest('optgroup').attr('label');
        if(optgroup != 'Canada'){
          $(state_select).val('AB');
        }
      }
    });
  },

  'check_capslock' : function(e) { //check what key was pressed in the form
    var s = String.fromCharCode(e.keyCode);
    var path = e.originalEvent.path;
    var formName = '';

    $.each(path, function(k, v) {
      if ($(v).is('form')) {
        formName = $(v)[0].name;
      }
    });

    if (s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey) {
      window.capsLockEnabled = true;
      $('.caps-warning').show();
    } else {
      window.capsLockEnabled = false;
      $('.caps-warning').hide();
    }
  },

  'check_capslock_form' : function(where) {
    var that = this;
    if (!where) { 
      where = $(document); 
    }

    where.find('input,select').each(function () {
      if (this.type != "hidden") {
        $(this).keypress(that.check_capslock);
      }
    });
  }
});
/**
 * pt.quantities
 */
$.widget('pt.quantities', {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    var that = this;

    //don't do anything if the element isn't an input
    if($(this.element).prop('nodeName') != 'INPUT'){
      return false;
    }

    //private instance variables
    this._input = this.element;
    this._select = $('<select />').prop('name', $(this._input).prop('name')).prop('class', $(this._input).prop('class')).hide();
    // .prop('class', $(this._input.prop('class')))
    $(this._input).after(this._select);

    //add select options
    for(var i=1; i<=10; i++){
      var option = $('<option />').text(i < 10 ? i : '10+').val(i);
      $(this._select).append(option);
    }

    //bind change on select
    $(this._select).on('change', function(e){
      var val = $(this).val();
      that.set(val);

      //retrigger on the input element
      $(that._input).change();
    });

    //bind change on input
    $(this._input).on('change', function(e){
      var val = $(this).val();
      that.set(val);
    });
  },

  /**
   * Init
   */
  '_init' : function(){
    //set the value of the input
    var val = $(this._input).val();
    this.set(val);
    // console.log('quantities - ' + val);
  },

  /**
   * Get the value
   * @return int
   */
  'get' : function(){
    return $(this._input).val();
  },

  /**
   * Sets the value of this widget
   * @param int value
   */
  'set' : function(value){
    value = isNaN(parseInt(value)) ? 1 : parseInt(value);
    value = Math.max(1, Math.abs(value));

    //set values
    $(this._input).val(value);
    $(this._select).val(value);

    //show/hide elements depending on value
    if((value < 10) && $(this._select).is(':hidden')){
      $(this._input).hide();
      $(this._select).show();
    }
    else if((value >= 10) && $(this._input).is(':hidden')){
      $(this._input).show();
      $(this._select).hide();
    }
  }
});

/**
 * pt.pinchzoom
 */
$.widget('pt.pinchzoom', {
	/**
	 * Options
	 */
	'options' : {
		'minZoom' : 0.85,
		'maxZoom' : 4,
		'scrollZoom' : 0.15
	},

	/**
	 * Create
	 */
	'_create' : function(){
		var that = this;

		//private variables
		this._img = $('img:first', this.element);
		this._currentzoom = 1;
		this._pinching = false;
		this._osize = false;
		this._loaded = false;

		//bind zoom events
		$(this.element)
			.on('mousewheel', function(e){
				that._wheel(e);
			})
			.on('touchstart', function(e){
				that._pinch(e);
			})
			.on('touchmove', function(e){
				that._pinch(e);
			})
			.on('touchend', function(e){
				that._pinch(e);
			})
			.on('touchcancel', function(e){
				that._pinch(e);
			});

		//reset and fit the image whenever it loads
		//also manually trigger it because cached images trigger load before the bind statement
		$(this._img)
			.on('load', function(e){
				that._osize = {
					'height': that._img.height(),
					'width': that._img.width()
				}
				that.fit();
			})
			.trigger('load');
	},

	/**
	 * Init
	 */
	'_init' : function(){
	},

	/**
	 * Calculate pinch zoom
	 */
	'_pinch' : function(e){
		//we should either filter e.touches or bubble e.targetTouches
		//		var etouches = e.originalEvent.targetTouches; //touches on event target
		var etouches = e.originalEvent.touches; //touches on screen
		if(etouches.length <= 1){
			//reset pinching
			this._pinching = false;
			return false;
		}

		//gather touches because TouchList isn't iterable
		var touches = [];
		for(var i=0; i<etouches.length; i++){
			touches.push({'x' : etouches.item(i).pageX, 'y' : etouches.item(i).pageY});
		}

		//calculate touch origin as the center of mass relative to this.element
		var originX = touches.reduce(function(r, i){return i.x + (isNaN(r) ? 0 : r);}, null) / touches.length;
		var originY = touches.reduce(function(r, i){return i.y + (isNaN(r) ? 0 : r);}, null) / touches.length;
		originX -= $(this.element).offset().left;
		originY -= $(this.element).offset().top;

		//calculate zoom multiplier
		var maxX = Math.max.apply(null, touches.map(function(i){return i.x;})) - Math.min.apply(null, touches.map(function(i){return i.x;}));
		var maxY = Math.max.apply(null, touches.map(function(i){return i.y;})) - Math.min.apply(null, touches.map(function(i){return i.y;}));
		var magnitude = Math.sqrt(Math.pow(maxX, 2) + Math.pow(maxY, 2));
		if(this._pinching == false){
			this._pinching = {
				'zoom' : this._currentzoom, //starting zoom level
				'magnitude' : magnitude //starting magnitude
			};
		}
		var zoom = (magnitude / this._pinching.magnitude) * this._pinching.zoom;

		this.zoom(zoom, originX, originY);
	},

	/**
	 * Calculate mouse wheel zoom
	 */
	'_wheel' : function(e){
		//only support mousewheel
		if(e.type !== 'mousewheel'){
			return false;
		}

		//prevent scroll
		e.preventDefault();

		//calculate mouse origin relative to this.element
		var originX = e.pageX - $(this.element).offset().left;
		var originY = e.pageY - $(this.element).offset().top;

		//calculate zoom multiplier
		var wheelDelta = e.wheelDelta ? e.wheelDelta : e.originalEvent.wheelDelta;
		var zoom = this._currentzoom + ((wheelDelta < 0 ? -1 : 1) * this.options.scrollZoom);
		this.zoom(zoom, originX, originY);
	},

	/**
	 * Zoom
	 */
	'zoom' : function(zoom, originX, originY){
		//prevent zooming if not loaded or exceeds constraints
		if((this._osize === false) || (zoom >= this.options.maxZoom) || (zoom <= this.options.minZoom)){
			return false;
		}

		//click on +/- from CatalogIpl.js
		if (zoom instanceof MouseEvent) {
			//calculate mouse origin relative to this.element
			originX = 1;
			originY = 1;
			this._currentzoom = this._currentzoom + ((zoom.wheelDelta < 0 ? -1 : 1) * this.options.scrollZoom);
		} else {
			//set new zoom - from this._wheel
			this._currentzoom = zoom;
		}

		//size and position of element before zoom
		var before = {
			'height' : $(this.element).height(),
			'width' : $(this.element).width(),
			'originX' : originX,
			'originY' : originY,
			'left' : $(this.element).position().left,
			'top' : $(this.element).position().top
		};

		//size and position of element after zoom
		var after = {
			'height' : this._osize.height * this._currentzoom,
			'width' : this._osize.width * this._currentzoom,
		};

		after.originX = (originX / before.width) * after.width;
		after.originY = (originY / before.height) * after.height;
		after.left = before.left - after.originX + before.originX;
		after.top = before.top - after.originY + before.originY;

		//because of drew's borders that cause zoom drift
		after.left += 1;
		after.top += 1;

		//resize and set new position
		$(this.element)
			.css({
				'width' : this._osize.width * this._currentzoom,
				'height' : this._osize.height * this._currentzoom,
				'min-width' : this._osize.width * this._currentzoom,
				'min-height' : this._osize.height * this._currentzoom
			})
			.position({
				'my' : 'left+' + after.left + ' top+' + after.top,
				'at' : 'left top',
				'of' : $(this.element).parent(),
				'collision' : 'none none'
			});
	},

	/**
	 * Fit image to container
	 */
	'fit' : function(){
		//get diagram container dimensions
		var container = $(this.element).parent();

		//calculate how much to zoom (smaller dimension fills the viewport)
		var factor = ($(this.element).width() < $(this.element).height())
			? ($(container).width() / $(this.element).width())
			: ($(container).height() / $(this.element).height());

		if(this._isMobile()){
			//set mobile image dimension and position
			$(this.element)
				.position({
					'my' : 'left top',
					'at' : 'left top',
					'of' : container,
					'collision': "none"
				});
			} else {
				//set desktop image dimension and position
			$(this.element)
				.position({
					'my' : 'center center',
					'at' : 'center center',
					'of' : container,
					'collision': "none"
				});
			}
	},

	/**
   * Returns if the device is a mobile browser
   */
  '_isMobile' : function(){
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
  }

});

/**
 * pt.MenuEmail
 * @extends ui.dialog
 */
$.widget('pt.MenuEmail', $.ui.dialog, {
  /**
   * Options
   */
  'options' : {
    'title' : null,
    'mailid' : null,
    'autoOpen' : false,
    'modal' : true,
    'draggable' : false,
    'resizable' : false,
    'minWidth' : 300,
	'width' : "90%",
    'minHeight' : 350,
    'show' : {
      'effect' : 'fade',
      'duration' : 300
    },
    'hide' : {
      'effect' : 'fade',
      'duration' : 300
    }
  },

  /**
   * Create
   */
  '_create' : function(){
    var that = this;

    this._super();
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();

    //set the title
    $('p.title', this.element).html(this.options.title);

    //show the message
    $('iframe', this.element).hide();
    $('iframe[mailid="' + this.options.mailid + '"]', this.element).show();
  }
});

/**
 * pt.MenuEquipment
 * @extends pt.cmenu
 */
$.widget('pt.MenuEquipment', $.pt.cmenu, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    var that = this;

    //private instance variables
    this._cached = false;
    this._information = $('>.information', this.element);
    this._items = $('>.items', this.element);
    this._empty = $('>.empty', this._items);
    this._controls = $('>.controls', this.element);

    //create loader element on the menu
    $(this.element).loader();

    this._super();
  },

  /**
   * Update the summary
   */
  '_summarize' : function(){
    var that = this;
  },

  /**
   * Load the menu
   */
  '_reload' : function(){
    var that = this;

    //empty the equipment div
    $('.pt-item', this._items).remove();

    //get the equipment
//get equipment from default cart
    $(this.element).loader('loading');
    var d1 = $.get('/account/equipment/?_f=json');
    var d2 = $.get('/html/pt-product.html');
    $.when(d1, d2)
      .always(function(data){
        $(that._information).hide();
        $(that._items).hide();
        $(that._controls).hide();
        $(that.element).loader('hide');
      })
      .fail(function(data){
        //show informational if error
        $(that._information).show();
      })
      .done(function(r1, r2){
        var equipment = r1[0];
        var itemTemplate = $(r2[0]);
        that._cached = true;

        if(equipment.carts === null){
          //show informational if not logged in
          $(that._information).show();
          $(that._items).hide();
          $(that._controls).hide();
        }
        else{
          //hide informational and show equipment and controls
          $(that._information).hide();
          $(that._items).show();
          $(that._controls).show();

          if((equipment.items === null) || (equipment.items.length == 0)){
            $(that._empty).show();
          }
          else{
            $(that._empty).hide();

            //add items
            for(var i=0; i<equipment.items.length; i++){
              var element = $(itemTemplate).clone();
              $(element).attr('type', 'model');
              $('.identifier .title p:nth-child(1)', element).text(equipment[i].title);
              $(that._items).append(element);
            }
          }
        }
      });
  },

  /**
   * Open override
   */
  'show' : function(){
    if(!this._cached){
      this._reload();
    }
    this._super();
  }
});

/**
 * pt.MenuShopcart
 * @extends pt.cmenu
 */
$.widget('pt.MenuShopcart', $.pt.cmenu, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    var that = this;

    //private instance variables
    this._cached = false;
    this._summary = $('div#shop-cart-summary', this.element);
    this._items = $('div#shop-cart-items', this.element);
    this._empty = $('div#shop-cart-empty', this.element);
    this._error = $('div#shop-cart-error', this.element);
    this._controls = $('div#shop-cart-controls', this.element);
    this._item = $('div#shop-cart-items .item', this.element).detach();

    //create loader element on the menu
    $(this.element).loader();

    //bind quantity change
    $(this._items).delegate('.item .shop form[name="update"] input[name="quantity"]', 'change', function(e){
      that._update(e);
    });

    //bind item delete
    $(this._items).delegate('.item .shop form[name="remove"]', 'submit', function(e){
      e.preventDefault();
      that._remove(e);
    });

    $('i.fa-window-close').removeClass('d-none');

    $('i.fa-window-close').click(function(e) {
      // $('div#shop-cart-summary').hide();
      that.hide();
    });

    this._super();
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();
  },

  /**
   * Load the menu
   */
  '_reload' : function(){
    var that = this;

    //empty the items div
    $('.item', this._items).remove();

    //get the items
    $(this.element).loader('loading');
    pt.qajax.push({
      'url' : '/shop/',
      'type' : 'GET',
      'dataType' : 'json',
      'complete' : function(data){
        $(that.element).loader('hide');
      },
      'success' : function(data){
        that._cached = true;

        //don't do anything if shopping cart is empty
        if(data.shopcart.count == 0){
          $(that._summary).hide();
          $(that._controls).hide();

          $(that._empty).show();
          $(that._error).hide();
        return false;
        }

        //show elements
        $(that._summary).show();
        $(that._controls).show();
        $(that._empty).hide();
        $(that._error).hide();

        //add items and calculate subtotal
        var items = data.shopcart.items;
        for(var i=0; i<items.length; i++){
          that._add(items[i]);
        }

        //summarize
        that._summarize(data);
      },
      'error' : function(data){
        $(that._summary).hide();
        $(that._controls).hide();
        $(that._empty).hide();
        $(that._error).show();
        // $(that._items).text('Error loading shopping cart');
      }
    });
  },

  /**
   * Add an item to the menu
   */
  '_add' : function(item){
    var that = this;
    var product = item.product;

    //create element
    var element = $(this._item).clone();
    $(this._items).append(element);

    //determine part link
    var href = '/parts/' + product.url;

    //add thumbnail
    if(product.thumbnail && product.thumbnail.file){
      var src = '/img/assets/asset/' + product.thumbnail.file.checksum + '/' + product.thumbnail.file.size + '/thumb.png';
    }
    else{
      var brandurl = product.brand.toLowerCase().replace(/[^0-9a-z]+/g, '-').replace(/^-+|-+$/gm, '');
      var src = '/img/assets/brand/' + brandurl + '/thumb.png';
    }
    $('.thumb a', element).attr('href', href);
    $('.thumb img', element).attr('src', src);

    //set description
    $('.details p.description a.description', element).html(product.description).attr('href', href);

    //set title
    $('.details p.title a.part-number', element).html(product.title).attr('href', href);

    //set price
    $('.price p.each span.price', element).html(product.stock.price);
    if(product.stock.price != product.stock.regular){
      $('.price p.regular span.price', element).html(product.stock.regular);
    }
    else{
      $('.price p.regular', element).remove();
    }

    //set quantity
    $('.shop input[name="quantity"]', element).quantities().quantities('set', item.quantity);

    //set item id
    $('input[name="product"]', element).attr('value', item.product.id);
  },

  /**
   * Update quantity
   */
  '_update' : function(e){
    var that = this;
    var form = $(e.target).closest('form');
    var id = $('input[name="product"]', form).val();

    pt.qajax.push({
      'url' : '/shop/',
      'type' : $(form).attr('method') || 'GET',
      'dataType' : 'json',
      'data' : $(form).serializeArray(),
      'success' : function(data){
        that._summarize(data);
      }
    });
  },

  /**
   * Remove an item
   */
  '_remove' : function(e){
    var that = this;
    var form = e.target;
    var itemelem = $(form).closest('.item');

    pt.qajax.push({
      'url' : '/shop/',
      'type' : $(form).attr('method') || 'GET',
      'dataType' : 'json',
      'data' : $(form).serializeArray(),
      'success' : function(data){
        that._summarize(data);
        that._summarize_carts(data);
        $(itemelem).slideUp(function(){
          $(this).remove();
        });

        //no items, hide divs and show empty
        if(data.shopcart.count == 0){
          $(that._summary).slideUp();
          $(that._controls).slideUp();
          $(that._empty).slideDown();
        }

        //trigger update on body
        $('body').trigger(new jQuery.Event('shopcart:update', {'shopcart' : data}));
      }
    });
  },

  /**
   * Update the summary
   */
  '_summarize' : function(data){
    var that = this;
    var shopcart = data.shopcart;

    //update items
    $('>.item', this._items).each(function(){
      var id = $('input[name="product"]', this).val();
      for(var i=0; i<shopcart.items.length; i++){
        var item = shopcart.items[i];
        if(item.product.id == id){
          $('.price .subtotal .price', this).text(parseFloat(item.subtotal).toFixed(2));
          $('.price .subtotal .quantity', this).text(item.quantity);
          $('.price .each .price', this).text(parseFloat(item.product.stock.price).toFixed(2));
          break;
        }
      }
    });

    //update summary
    $('span#top-count').text(shopcart.count);
    $('span#top-subtotal').text(parseFloat(shopcart.subtotal).toFixed(2));

    that._summarize_carts(data);
  },

  /**
   * Update the shopping carts' quantities
   */
  '_summarize_carts' : function(data) {
    var that = this;
    var shopcart = data.shopcart;
    var incartIDs = [];

    for (var i = 0; i < shopcart.items.length; i++) {
      var item = shopcart.items[i];
      incartIDs.push(item.product.id);
    }

    //update items
    $('.quantity').each(function(a, b) {
      if ($(this).parents('.navbar').length) {
        return true;
      }
      
      var id = $(b).parents('form').children('input[name="product"]').val();

      for (var i = 0; i < shopcart.items.length; i++) {
        if (shopcart.items[i].product.id == id) {
          $(this).html(shopcart.items[i].quantity);
          break;
        } 
      }

      if ($.inArray(id, incartIDs) == -1) {
        $(this).html(0);
      }
    });

    //update summary
    $('span#top-count').text(shopcart.count);
    $('span#top-subtotal').text(parseFloat(shopcart.subtotal).toFixed(2));
  },

  /**
   * Public accessor to clear cache
   */
  'clear' : function(){
    this._cached = false;
  },

  /**
   * Open override
   */
  'show' : function(){
    if(!this._cached){
      this._reload();
    }
    this._super();
  }
});

/**
 * pt.MenuHamburger
 * @extends pt.cmenu
 */
$.widget('pt.MenuHamburger', $.pt.cmenu, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    var that = this;

    //private instance variables
//    this._burgermenu = $('div#nav-menu', this.element);

    this._super();
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();
  },
    /**
   * Show the menu
   */
     'show' : function(){
      var that = this;
      $(this.element).slideDown('fast', function(){ // needs to be made to slide left from off screen and show
        that._open = true;
        var event = jQuery.Event('cmenu:show');
        $(that.element).trigger(event);
      });
    },
  
    /**
     * Hide the menu
     */
    'hide' : function(){
      var that = this;
      $(this.element).slideUp('fast', function(){  // needs to slide right to off screen and hide
        that._open = false;
        var event = jQuery.Event('cmenu:hide');
        $(that.element).trigger(event);
      });
    },
  
    /**
     * Show/hide the menu
     */
    'toggle' : function(){
      if($(this.element).is(':visible')){
        this.hide();
      }
      else{
        this.show();
      }
    }
});

/**
 * pt.MenuSaveProduct
 * @extends pt.cmenu
 */
$.widget('pt.MenuSaveProduct', $.pt.cmenu, {
  /**
   * Options
   */
  'options' : {
    'type' : 'eq'
  },

  /**
   * Create
   */
  '_create' : function(){
    var that = this;

    //private instance variables
    this._cached = false;

    //create loader element on the menu
    $(this.element).loader();

    this._super();
  },

  /**
   * Load the menu
   */
  '_reload' : function(){
    var that = this;
/*
    //empty the equipment div
    var itemsDiv = $('ul', this.element);
    $(itemsDiv).empty();

    //get the type lists
    $(this.element).loader('loading');
    $.get('/account/' + (this.options.type == 'eq' ? 'equipment' : 'bins') + '/?_f=json')
      .always(function(data){
        $(that.element).loader('hide');
      })
      .fail(function(data){
        //show informational if error
//        $('>.information', that.element).show();
//        $('>.equipment', that.element).hide();
      })
      .done(function(data){
        that._cached = true;
        if(data.response.carts === null){
          //show informational if not logged in
//          $('>.information', that.element).show();
//          $('>.equipment', that.element).hide();
        }
        else{
          //hide informational and show equipment and controls
//          $('>.information', that.element).hide();
//          $('>.equipment', that.element).show();

          if(data.response.carts.length == 0){
            //hide the list
            $('.existing', that.element).hide();
          }
          else{
            //show the list
            $('.existing', that.element).show();

            //add each list
            for(var i=0; i<data.response.carts.length; i++){
              var cart = data.response.carts[i];
              var label = cart.name + ' (' + cart.count + ' items)';
              var li = $('<li></li>').text(label);
              $('.existing ul', that.element).append(li);
            }
          }
        }
      });
*/
  },

  /**
   * Open override
   */
  'show' : function(){
    if(!this._cached){
      this._reload();
    }
    this._super();
  }
});

/**
 * pt.MenuSearchSuggest
 * @extends pt.cmenu
 */
$.widget('pt.MenuSearchSuggest', {
	/**
	 * Options
	 */
	'options' : {
		'delay' : 200
	},

	/**
	 * Create
	 */
	'_create' : function(){
		var that = this;

		//private instance variables
		this._timeout = null;
		this._results = $('<ul class="pt-search-suggest-menu"><li>hi</li></ul>');

		//turn off browser autocomplete implementation
		$(this.element).attr('autocomplete', 'off');

		//create cmenu on result list
		const form = $(this.element).closest('form');
		$(form).append(this._results);
		$(this._results).cmenu({
			'position' : {
				'my' : 'left top',
				'at' : 'left bottom',
				'of' : form
			}
		});

		//bind input on element
		$(this.element).on('input', {widget: this}, this._onElementInput);

		//delegate click on result
        $(this._results).on('click', 'li', this._onResultClick);
	},

	/**
	 * Init
	 */
	'_init' : function(){
	},

	/**
	 * Element input listener
	 */
	'_onElementInput' : function(e){
		const widget = e.data.widget;
		const form = $(e.target).closest('form');

		//clear the previous timeout
		if (widget._timeout) {
			clearTimeout(widget._timeout);
		}

		//set the new timeout to search after delay
		widget._timeout = setTimeout(function(){
			const data = new FormData(form[0]);
			widget._suggest(data);
		}, widget.options.delay);
	},

    /**
     * Result click listener
     */
    '_onResultClick' : function(e){
        //navigate directly to the result
        let url = $(e.target).closest('li').attr('data-url');
        window.location.href = url;
    },

	/**
	 * Search
	 */
	'_suggest' : function(form){
		var that = this;

        //clear the suggestions if search term is empty
        if(form.get('term').trim() == ''){
            $(that._results).cmenu('hide');
            $(that._results).empty();
            return false;
        }

		//suggest
		pt.qajax.push({
			'url' : '/search/_suggest',
			'type' : 'GET',
			'dataType' : 'json',
			'data' : {'term' : form.get('term'), 'type' : form.get('type')},
			'success' : function(data){
				if(data.search.length == 0){
					$(that._results).cmenu('hide');
					return;
				}

				$(that._results).empty();
				for(const result of data.search){
					let suggestion = $('<li><p class="title"></p><p class="description"></p></li>');
					$(suggestion).attr('data-url', '/' + result.type + 's/' + result.url);
					$('p.title', suggestion).html(result.facets.marketing_brand[0] + ' ' + result.title);
					$('p.description', suggestion).html(result.description);
					$(that._results).append(suggestion);
				}

				$(that._results).cmenu('show');
			},
			'error' : function(data){
				$(that._results).cmenu('hide');
			}
		});
	}
});

/**
 * pt.MenuVariants
 * @extends ui.dialog
 */
$.widget('pt.MenuVariants', $.ui.dialog, {
  /**
   * Options
   */
  'options' : {
    'title' : null,
    'variants' : [],
    'autoOpen' : false,
    'modal' : true,
    'draggable' : false,
    'resizable' : false,
    'minWidth' : 550,
    'minHeight' : 350,
    'show' : {
      'effect' : 'fade',
      'duration' : 300
    },
    'hide' : {
      'effect' : 'fade',
      'duration' : 300
    }
  },

  /**
   * Create
   */
  '_create' : function(){
    var that = this;

    this._super();
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();

    $('p.title', this.element).html(this.options.title);
    $('ul', this.element).empty();
    for(var i=0; i<this.options.variants.length; i++){
      var variant = this.options.variants[i];
      var label = variant.label;
      var url = variant.url;
      var li = $('<li><a href="#"></a></li>');
      $('a', li).text(variant.label).attr('href', variant.url);
      $('ul', this.element).append(li);
    }
  }
});

/**
 * pt.MenuFAQ
 * @extends pt.fadetip
 */
$.widget('pt.MenuFAQ', $.pt.fadetip, {
  /**
   * Options
   */
  'options' : {
    'distance' : '0em',
    'duration' : 'mouseout',
    'offset' : 10,
    'width' : '30em'
  },

  /**
   * Create
   */
  '_create' : function(){
    var that = this;
    this._super();

    //get the contents
    var href = $(this.element).attr('href');
    var section = href.substr(href.indexOf('#') + 1);
    $.get('/html/Help/FAQ.html', function(html){
      var val = $('.topic.' + section, html);
      $('h2', val).remove();
      $('a', val).remove();
      that.options.contents = val;
      that._init();
    });
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();
  }
});

/**
 * pt.Controller
 */
$.widget('pt.Controller', {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    var that = this;
    //private instance variables
    this._equipment_menu = $('#menu-equipment:first', this.element);
    this._shopcart_div = $('.shopping-cart:first', this.element);
    this._shopcart_menu = $('#shop-cart-summary', this.element);
    this._burger_menu = $('#nav-menu', this.element);
    this._search_form = $('form[name="site-search"]:first', this.element);
    this._shopcart_queue = [];

    //create equipment menu
		if($.pt.MenuEquipment){
	    $(this._equipment_menu).MenuEquipment({'selector' : '#header a.my-equipment'});
		}

    //create search suggest on search forms
    if($.pt.MenuSearchSuggest){
      $('form[name="site-search"] input[type="text"]').MenuSearchSuggest();
    }

    //bind click on search form type select
    $('select[name="type"]', this._search_form).on('mousedown', function(e){
      e.preventDefault();
      var type = $(this).val();
      var options = $('option', this);
      for(var i=0; i<options.length; i++){
        if($(options[i]).attr('value') == type){
          type = $((i == options.length - 1) ? options[0] : options[i + 1]).attr('value');
          $(this).val(type);
          break;
        }
      }

      var form = $(this).closest('form');
      var input = $('input[name="term"]', form);
      var placeholder = $(input).attr(type + 'placeholder');
      $(input).attr('placeholder', placeholder);
    });

    //select search text on focus
    $('input[type="text"]', this._search_form).on('focus', function(e){
      $(this).select();
    });

    //show search forms in narrow layouts
    $('#search-bar').on('click',function(e) {
      if ($('nav#search').hasClass('d-block') || ($('nav#search').width()>0)) {
        $('nav#search').removeClass('d-block');
        $('nav#search').removeClass('d-sm-block'); // under user control
        $('nav#search').addClass('d-none');
      } else {
        $('nav#search').removeClass('d-none');
        $('nav#search').addClass('d-block');
      }
    });

    //bind keyup for searches (all brands/equipment page)
    $('.card-header div.search input').on('keyup', function(e){
      var list = $(this).parent().closest('div.card');
      list = $('ul li a',list);

      //filter through the options that contain the value
      var pattern = new RegExp($(this).val(), 'i');
      $(list).each(function(){
        var val = $(this).text();

        if (pattern.test(val)) {
          $(this).parent().closest('li').show();
        } else {
          $(this).parent().closest('li').hide();
        }
      });
    });

		//create hamburger menu
		// first hook the close on menu clicking
		if($.pt.MenuHamburger){
			$('a', this._burger_menu).on('click', function(e){
				$(this).closest('div').css({'display': 'none' });
			});
			$(this._burger_menu).MenuHamburger({'selector' : '#menu-bars'});
		}

    //create shopcart menu and listen for shopping cart updates
		if($.pt.MenuShopcart){
	    if (!$('div#body').hasClass('shop-checkout')){ // exclude menu on checkout
	      $(this._shopcart_menu).MenuShopcart({'selector' : '#header .shopping-cart a'});
	    }

	    $('body').on('shopcart:update', function(e){
	      $(that._shopcart_menu).MenuShopcart('clear');
	      $('p.quantity', that._shopcart_div).text(e.shopcart.shopcart.count);
	    });
		}

    //bind add-to-cart forms submit
    $('body').delegate('form.add-to-cart', 'submit', function(e){
      e.preventDefault();
      that._add_to_cart(e);
    });

    //bind click on show/hide
    $('span.section-show a', this._sections).on('click', function(e){
      e.preventDefault();
      that._togglecard(e);
    }).show();

    //delegate faq help icon mouseovers
    $(this.element)
      .delegate('a.faq-help', 'mouseenter', function(e){
        // Turn off FAQ while we figure out the popup problem:
        // $(this).MenuFAQ();
      })
      .delegate('a.faq-help', 'click', function(e){
//        e.preventDefault();
      });

    //explicitly render grecaptcha v2
	if(typeof grecaptcha != 'undefined'){
	    grecaptcha.ready(function(){
	      $('.g-recaptcha.v2').each(function(){
	        grecaptcha.render(this, {
	          'sitekey' : ptrecaptchasitekeys.v2
	        });
	      });
	    });
	}

    //load reviews
	if($.fn.reviews){
//	    $('.mini-rr.id-reseller-ratings-reviews').reviews({mini:true});
  	  $('.id-reseller-ratings-reviews.full-rr').reviews();
	}
  },

  /**
   * Init
   */
  '_init' : function(){
  },

  /**
   * Returns if the device is a mobile browser
   */
  '_isMobile' : function(){
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
  },

  /**
   * Display quantity of each part in cart
   */
  '_qupdate' : function(e){
    $('.shop form[name="add"]').each(function(a, b){
      var product = $(this).find('input[name="product"]').val();
      var quantity = $(this).find('.quantity').html();

      if (!quantity) {
        $(this).find('.icon').hide();
      } else {
        $(this).find('.icon').css('display', 'inline-block');
      }

      if (e) {
        $(e.shopcart.shopcart.items).each(function(i, j){
          if (j.product.id == product) {
            $(b).find('.quantity').html(j.quantity);
            $(b).find('.icon').css('display', 'inline-block');
          }
        });
      } 
    });
  },

  /**
   * Add item to cart
   */
  '_add_to_cart' : function(e){
    var that = this;
    var form = e.target;
    var id = $('input[name="id"]', form).val();
    var quantity = $('input[name="quantity"]', form).val() ? $('input[name="quantity"]', form).val() : 1;

    //disable form button
    $('button[type="submit"]', form).prop('disabled', true);

    //create add to cart request
    pt.qajax.push({
      'url' : '/shop/',
      'type' : $(form).attr('method') || 'GET',
      'dataType' : 'json',
      'data' : $(form).serializeArray(),
      'complete' : function(data){
        //reenable form button
        $('button[type="submit"]', form).prop('disabled', false);
      },
      'success' : function(data){
        //fadetip response
        // $(e.target).find('select[name="quantity"]').fadetip({  

        $(e.target).fadetip({  
          'arrow' : 'bottom',
          'duration' : 2000,
          'distance' : '-1em',
          'contents' : quantity + ' added to shopping cart',
          'width' : '15em'
        });

        //trigger shopcart:update
        $('body').trigger(new jQuery.Event('shopcart:update', {'shopcart' : data}));
      },
      'error' : function(data){
        //fadetip response
        $(e.target).fadetip({
          'arrow' : 'bottom',
          'duration' : 2000,
          'distance' : '-1em',
          'text' : 'Oops, something went wrong',
          'width' : '15em'
        });
      }
    });
  },

  /**
   * Render form errors
   */
  '_render_form_errors' : function(form, error, field){
    if(!field || (typeof field != 'object') || (field.constructor !== Array)){
      field = [];
    }
    
    if(typeof error == 'string'){
      //find the field
      var name = field.shift();
      while(field.length){
        var segment = field.shift();
        name += '[' + segment + ']';
      }

      var inputelem = $('*[name="' + name + '"]', form);
      if(inputelem.length == 1){
        var fieldelem = $(inputelem).parent();
        // var errorelem = $('<div class="pt-fadetip error left"><div></div></div>');
        var errorelem = $('<div class="text-danger ml-2 mt-1 w-100 font-weight-bold error-message"><div></div></div>');
      }
      else{
        var fieldelem = $('>.error:first', form);
        var errorelem = $('<div class="text-danger ml-2 mt-1 w-100 font-weight-bold error-message"><div></div></div>');
      }

      //remove previous error
      $('.pt-fadetip.error,.error-message', fieldelem).remove();
      //show the new error
      $('>div', errorelem).html(error);
     
      fieldelem.append(errorelem);
      // $(errorelem).hide().fadeIn();
    }
    else if(error !== null){
      //recursively render non-scalar errors
      for(var key in error){
        this._render_form_errors(form, error[key], field.concat([key]));
      }

      try {
        var errorfield = $('div.error-message:first')[0];
        $(errorfield).parents('div.field')[0].scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
      } catch (e) {
        window.scrollTo(0, 0);
      }
    }
  },

  /**
   * Show or hide a section
   * Modified for bootstrap
   */
  '_togglecard' : function(e){
    var section = $(e.target).closest('.card');
    var content = $('>.card-body', section);
    var link = $('.section-show a', section);
    $(content).slideToggle('fast', function(){
      var ahtml = $(link).html();
			var action = $(this).is(':visible') ? 'show' : 'hide';
      if(action == 'show'){
        ahtml = ahtml.replace(/Show/, 'Hide');
        ahtml = ahtml.replace(/fa-chevron-down/, 'fa-chevron-up');
      }
      else{
        ahtml = ahtml.replace(/Hide/, 'Show');
        ahtml = ahtml.replace(/fa-chevron-up/, 'fa-chevron-down');
      }
      $(link).html(ahtml);

			//dispatch an accordion event detailing if the card was shown or hidden
	    e.target.dispatchEvent(new CustomEvent('accordion', {'detail' : {'action' : action}}));
    });
  },

  /**
   * Update model/part card info when a variant select is changed
   */
  '_updateVariantSelection' : function (target) {
    var productId = $('option:selected', target).val();
    var baseElement = $(target).parents('div.pt-product, div.hotspot-detail div.parts > div').first();
    var shopElement = $(baseElement).children('div.price-avail-shop-data').first();
    var variantElement = $('div.variants:first', baseElement).find('div.pid-' + productId);
    var url = $('div.thumb a', variantElement).attr('href');
    var thumbnailSrc = $('div.thumb img', variantElement).attr('src');
    var thumbnailAlt = $('div.thumb img', variantElement).attr('alt');
    var title = $('h2.description a', variantElement).text();
    var description = $('div.short-description', variantElement).text();
    var modelTitle = $('div.details.model a', variantElement).text();
    var availability = $('div.shipping', variantElement).html();
    var pricingRegular = $('div.price div.product span.regular', variantElement).html();
    var pricingCurrent = $('div.price div.product span.price', variantElement).html();
    var addToCartForm = $('div.add-to-cart-form', variantElement).html();

    // Thumbnail
    $('div.thumb:first a', baseElement).attr('href', url);
    $('div.thumb:first img', baseElement).attr('src', thumbnailSrc).attr('title', title).attr('alt', thumbnailAlt);

    // Part Title
    $('div.details:first h2.description a', baseElement).attr('href', url).attr('title', title).text(title);
    $('div.details:first div.short-description', baseElement).text(description);
    $('div.shipping', shopElement).html(availability);
    $('span.regular', shopElement).html(pricingRegular);
    $('span.price', shopElement).html(pricingCurrent);
    $('div.add-to-cart-form', shopElement).html(addToCartForm);

    // Model Title
    $('div.details.model:first a',baseElement).attr('href', url).attr('title', modelTitle).text(modelTitle);


    // Show/Hide Prices if available/NA
    var availStr = $('div.shipping', variantElement).find('p.availability span').html();

    if (typeof(availStr) !== 'undefined' && '' != availStr ) {     
      $('p.regular', shopElement).addClass('pt-hidden');
      $('p.price', shopElement).addClass('pt-hidden');
    } else {
      $('p.regular', shopElement).removeClass('pt-hidden');
      $('p.price', shopElement).removeClass('pt-hidden');
    }

    if ($('div.price span.regular', shopElement).text().length > 1) { // valid price 
      $('div.price p.regular', shopElement).removeClass('pt-hidden');
    } else {
      $('div.price p.regular', shopElement).addClass('pt-hidden');
    }
  }
});

/**
 * pt.Home
 */
$.widget('pt.Home', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    this._super();
    var that = this;

    //private instance variables
    this._selectionElement = $('.selection', this.element);

    $('.id-reseller-ratings-reviews.full-rr').reviews();
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();
  }
});

/**
 * pt.AccountLogin
 */
$.widget('pt.AccountLogin', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    this._super();
    var that = this;

    $(this).password();

    //bind form submit
    $('#body form', this.element).on('submit', function(e){
      e.preventDefault();
      that._submit(e);
    });
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();
  },

  /**
   * Submit form
   */
  '_submit' : function(e){
    var that = this;
    var form = e.target;

    //clear errors
    $('.error-message', form).remove();

    //disable form submit button
    $('button[type="submit"]', form).prop('disabled', true);

    //ajax send contact
    $.ajax({
      'type' : $(form).attr('method') || 'GET',
      'dataType' : 'json',
      'data' : $(form).serializeArray(),
      'complete' : function(data){
        //reenable form submit button
        $('button[type="submit"]', form).prop('disabled', false);
      },
      'success' : function(data){
        if(data.errors){
          //clear errors
          $('.error-message', form).remove();
          
          that._render_form_errors(form, data.errors);
        }
        else{
          location.reload(true);
        }
      }
    });
  }
});

/**
 * pt.AccountForgotPass
 */
$.widget('pt.AccountForgotPass', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function() {
    this._super();
    var that = this;

    $(this).password();

    //bind form submit
    $('#body form', this.element).on('submit', function(e) {
      e.preventDefault();
      that._submit(e);
    });

    //bind click on success confirm
    $('#body form[name="send"]', this.element).delegate('.success a', 'click', function(e) {
      e.preventDefault();
      $(e.target).closest('.success').fadeOut('fast');
    });

    //bind keyup on email field to validate email address
    $('#body form[name="send"] input[name="email"]', this.element).on('keyup', function(e) {
        //check for valid email
        var email_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var email = $(e.target).val();
        var disable_submit = !email_regex.test(email);

        //set disabled
        var form = $(e.target).closest('form');
        var submit_button = $('button[type="submit"]', form);
        $(submit_button).prop('disabled', disable_submit);
    });
  },

  /**
   * Init
   */
  '_init' : function() {
    this._super();
  },

  /**
   * Submit form
   */
  '_submit' : function(e) {
    var that = this;
    var form = e.target;

    //clear errors
    $('.pt-fadetip.error', form).remove();

    //disable form submit button
    $('button[type="submit"]', form).prop('disabled', true);

    //ajax send contact
    $.ajax({
      'type' : $(form).attr('method') || 'GET',
      'dataType' : 'json',
      'data' : $(form).serializeArray(),
      'complete' : function(data) {
        //reenable form submit button
        $('button[type="submit"]', form).prop('disabled', false);
      },
      'success' : function(data) {
        if (data.errors) {
          //clear errors
          $('.error-message', form).remove();
          that._render_form_errors(form, data.errors);
        } else if (data.success) {
          $(form).parent().children('.success').fadeIn('fast');
          $(form).fadeOut('fast');
          $(form).parent().children('.success').removeClass('hidden');
        }
      }
    });
  }
});

/**
 * pt.AccountAccount
 */
$.widget('pt.AccountAccount', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    this._super();
    var that = this;
    
    $(this).password();
    
    //bind form submit
    $('.account .settings form', this.element).on('submit', function(e){
      e.preventDefault();
      that._submit(e);
    });
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();
  },

  /**
   * Submit form
   */
  '_submit' : function(e){
    var that = this;
    var form = e.target;

    //clear errors
    $('.pt-fadetip.error', form).remove();

    //disable form submit button
    $('button[type="submit"]', form).prop('disabled', true);

    //ajax send contact
    var data = $(form).serializeArray();
    $.ajax({
      'type' : $(form).attr('method') || 'GET',
      'dataType' : 'json',
      'data' : data,
      'complete' : function(data){
        //reenable form submit button
        $('button[type="submit"]', form).prop('disabled', false);
      },
      'success' : function(data){
        if(data == null) {
          location.reload();
        }
        else if(data.errors){
          that._render_form_errors(form, data.errors);
        }
        else{
          //clear errors
          $('.error-message', form).remove();
          
          // clear updated password it that was what was updated
          if ($('button[type="submit"]', form).attr("data-reference-id")=="update_password"){
            $('input[name="password"]', form).val("");
          }
          //fadetip response
          $('button', form).fadetip({
            'arrow' : 'bottom',
            'duration' : 3000,
            'distance' : '-1em',
            'contents' : '<span style="color:#7f7; margin: auto;">Updated</span>',
            'width' : 'auto'
          });
        }
      }
    });
  }
});

/**
 * pt.AccountAddresses
 * @requires pt.address
 */
$.widget('pt.AccountAddresses', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    this._super();
    var that = this;

    //replace noJS links with show/hide
    $('.address-card-header').find('.card-link').each(function() {
      $(this).attr('href', '#');
      $(this).parent().find('.section-show a').attr('href', '#');

      //bind show/hide link to the title/description
      $(this).on('click', function() {
        $(this).parent().find('.section-show a').click();
      });
    });

    //create address widgets
    $('.addresses', this.element).address();

    //bind new address click
    $('#create-new-address', this.element).on('click', function(e){
      e.preventDefault();
      var address = $('.address.new');
      var form = $('form', address);
      that._edit(form);
    });

    //delegate save
    $('.addresses', this.element).delegate('.address form button[value="save_address"]', 'click', function(e){
      e.preventDefault();
      var form = $(e.target).closest('form');
      that._save(form);
    });

    //delegate delete
    $('.addresses', this.element).delegate('.address form button[value="destroy_address"]', 'click', function(e){
      e.preventDefault();
      var form = $(e.target).closest('form');
      that._delete(form);
    });

    //delegate cancel
    $('.addresses', this.element).delegate('.address form a.cancel', 'click', function(e){
      e.preventDefault();
      var form = $(e.target).closest('form');
      that._cancel(form);
    });

    //delegate form submit
    $('.addresses', this.element).delegate('.address form', 'submit', function(e){
      e.preventDefault();
      var form = e.target;
      that._save(form);
    });

    //disable save by default and make changes enable
    $('.addresses button[value="save_address"]', this.element).prop('disabled', true);
    $('.addresses', this.element).delegate('.address :input', 'focus', function(e){
      var form = $(e.target).closest('form');
      $('button[value="save_address"]', form).prop('disabled', false);
    });
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();
  },

  /**
   * Edit address
   */
  '_edit' : function(form){
    var that = this;
    var address = $(form).closest('.address');

    $('.card-body', address).slideToggle(300, function(){
      $(address).children('.card').toggleClass('hidden');
      $(address).toggleClass('editing');
    });
  },

  /**
   * Save addresses
   */
  '_save' : function(form) {
    var that = this;

    //disable form submit button
    $('button[value="save_address"]', form).prop('disabled', true);

    //submit the form and reinit
    var id = $('input[name="id"]', form).val();
    var data = $(form).serializeArray();
    data.push({'name' : 'action', 'value' : 'save_address'});
    $.ajax({
      'cached' : false,
      'type' : $(form).attr('method') || 'GET',
      'dataType' : 'json',
      'data' : data,
      'error' : function() {
        //display error message and reload 
        $('.new-content').slideUp();
        $('.error').show();
        window.setTimeout(location.reload(true), 2000); 
      },
      'success' : function(returnData) {
        if (returnData.errors) {
          //reenable form submit
          $('button[value="save_address"]', form).prop('disabled', false);

          //clear errors
          $('.error-message', form).remove();
          
          that._render_form_errors(form, returnData.errors);
        } else {
          //clear errors
          $('.error-message', form).remove();

          if (id == '') {
            //clone an address form and copy new content to it
            that._edit(form);
            
            var addrIndex = returnData.addresses.length-1;
            var new_content = $('.hidden_template .card').clone();
            $('div.description', new_content).text(returnData.addresses[addrIndex].address.description);
            $('span.title', new_content).text(returnData.addresses[addrIndex].title);

            if ($('.addresses .address').length > 1) {
              $('.empty').addClass('hidden');
            }

            if ($('.address:first').hasClass('new')) {
              $('input[name="id"]', new_content).val(returnData.id);
            } else {
              $('span.title', new_content).text($('input[name="title"]', $('.new.address')).val());
              $('div.description', new_content).text($('input[name="description"]', $('.new.address')).val());
            }

            $('input', new_content).each(function() {
              if ('id' == $(this).attr('name')) {
                $(this).val(returnData.id);
              } else if ('address[number]' == $(this).attr('name')) {
                $(this).val(returnData.addresses[addrIndex].address.description);
                $(this).attr('disabled', 'disabled');
              } else {
                $(this).val($('input[name="' + $(this).attr('name') + '"', $('.new.address')).val());
                $('input[name="' + $(this).attr('name') + '"]', $('.new.address')).val('');
              }

              $(this).on('focus', function() {
                $('button[value="save_address"]', new_content).prop('disabled', false);
              });
            });

            $('select', new_content).each(function() {
              $(this).html($('select[name="' + $(this).attr('name') + '"]', form).html());
              $(this).val($('select[name="' + $(this).attr('name') + '"]', form).val());
            });
            new_content.insertBefore('.address:last');
            new_content.addClass('address');
          
            //bind click on show/hide
            $('span.section-show a', new_content).on('click', function(e){
              e.preventDefault();
              that._togglecard(e);
            }).show();
          
          } else {
            var new_content = $(form).closest('div.card').find('h2 a');
            $('span.title', new_content).text($('input[name="title"]', form).val());
          }

          //fadetip response
          $('button[value="save_address"]', form).fadetip({
            'arrow' : 'bottom',
            'duration' : 2000,
            'distance' : '-1em',
            'contents' : '<span style="color:#7f7;">Updated</span>',
            'width' : '15em'
          });

          //reset the new address form
          $('.new-content form').trigger('reset');
        }
      }
    });
  },

  /**
   * Delete address
   */
  '_delete' : function(form){
    var that = this;

    //disable form submit button
    $('button[type="submit"]', form).prop('disabled', true);

    //submit the form and reinit
    var id = $('input[name="id"]', form).val();
    $.ajax({
      'cached' : false,
      'type' : $(form).attr('method') || 'GET',
      'dataType' : 'json',
      'data' : {'id' : id, 'action' : 'destroy_address'},
      'complete' : function(jqXHR){
        //reenable form submit
        $('button[type="submit"]', form).prop('disabled', false);
      },
      'success' : function(data){
        if (data.errors) {
          that._render_form_errors(form, data.errors);
        } else {
          var address = $(form).closest('.address');
          $(address).slideUp('fast', function() {
            $(this).remove();
          });

          //if no addresses left, reload the page
          if ($('.addresses .address').length < 4) {
            $('.empty').removeClass('hidden'); 
          }
        }
      }
    });
  },

  /**
   * Revert changes
   */
  '_cancel' : function(form){
    var that = this;
    var address = $(form).closest('.address');
    var section = $(address).children('.card');

    //revert changes
    var id = $('input[name="id"]', address).val();
    if(!$('button[value="save_address"]', form).prop('disabled') && (id != '')){
      $.ajax({
        'cached' : false,
        'type' : 'GET',
        'complete' : function(jqXHR){
          var html = $(jqXHR.responseText);
          var revertform = $('.addresses .address input[name="id"][value="' + id + '"]', html).closest('form');
          $(':input', revertform).each(function(){
            var name = $(this).attr('name');
            var val = $(this).val();
            if(name != 'action'){
              $(':input[name="' + name + '"]', form).val(val);
            }
          });
        }
      });
      $('button[value="save_address"]', form).prop('disabled', true);
    }

    //slide close
    if ($(address).hasClass('editing')) {
      $('.card-body', address).slideToggle(300, function(){
        address.removeClass('editing');
        section.addClass('hidden');
      });
    } else {
      $(form).closest('.address').find('.section-show a').click();
    }
  }
});
/**
 * pt.AccountPayments
 */
$.widget('pt.AccountPayments', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    this._super();
    var that = this;

    //replace noJS link with show/hide
    $('.payment-card-header').find('.card-link').each(function() {
      $(this).attr('href', '#');
      $(this).parent().find('.section-show a').attr('href', '#');

      //bind show/hide link to the title/description
      $(this).on('click', function() {
        $(this).parent().find('.section-show a').click();
      });
    });

    //bind new payment click
    $('#create-new-payment', this.element).on('click', function(e){
      e.preventDefault();
      var payment = $('.payment.new');
      var form = $('form', payment);
      that._edit(form);
    });

    //delegate save
    $('.payments', this.element).delegate('.payment form button[value="save_payment"]', 'click', function(e){
      e.preventDefault();
      var form = $(e.target).closest('form');
      that._save(form);
    });

    //delegate delete
    $('.payments', this.element).delegate('.payment form button[value="destroy_payment"]', 'click', function(e){
      e.preventDefault();
      var form = $(e.target).closest('form');
      that._delete(form);
    });

    //delegate cancel
    $('.payments', this.element).delegate('.payment form a.cancel', 'click', function(e){
      e.preventDefault();
      var form = $(e.target).closest('form');
      that._cancel(form);
    });

    //delegate form submit
    $('.payments', this.element).delegate('.payment form', 'submit', function(e){
      e.preventDefault();
      var form = e.target;
      that._save(form);
    });

    //disable save by default and make changes enable
    $('.payments button[value="save_payment"]', this.element).prop('disabled', true);
    $('.payments', this.element).delegate('.payment :input', 'focus', function(e){
      var form = $(e.target).closest('form');
      $('button[value="save_payment"]', form).prop('disabled', false);
    });
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();
  },

  /**
   * Edit payment
   */
  '_edit' : function(form){
    var that = this;
    var payment = $(form).closest('.payment');
    var slide = $('.card-body', payment);

    if ($(payment).hasClass('new')) {
      slide = $('.new-payment-card');
    }

    slide.slideToggle(300, function(){
      $(payment).children('.card').toggleClass('hidden');
      $(payment).toggleClass('editing');
    });
  },

  /**
   * Save payments
   */
  '_save' : function(form) {
    var that = this;

    //disable form submit button
    $('button[value="save_payment"]', form).prop('disabled', true);

    //submit the form and reinit
    grecaptcha.ready(function(){
      grecaptcha.execute(ptrecaptchasitekeys.v3, {action: 'submit'}).then(function(token){
        var id = $('input[name="id"]', form).val();
        var data = $(form).serializeArray();
        data.push({'name' : 'action', 'value' : 'save_payment'});
        data.push({'name' : 'g-recaptcha-response', 'value' : token});
        $.ajax({
          'cached' : false,
          'type' : $(form).attr('method') || 'GET',
          'dataType' : 'json',
          'data' : data,
          'error' : function() {
            //display error message and reload 
            $('.new-content').slideUp();
            $('.error').show();
            window.setTimeout(location.reload(true), 2000);
          },
          'success' : function(returnData) {
            if (returnData.errors) {
              //reenable form submit
              $('button[value="save_payment"]', form).prop('disabled', false);

              //clear errors
              $('.error-message', form).remove();

              that._render_form_errors(form, returnData.errors);
            } else {
              //clear errors
              $('.error-message', form).remove();
              
              if (id == '') {
                //clone an payment form and copy new content to it
                that._edit(form);
                
                var pmtIndex = returnData.payments.length-1;
                var new_content = $('.hidden_template .card').clone();
                $('div.description', new_content).text(returnData.payments[pmtIndex].payment.description);
                $('span.title', new_content).text(returnData.payments[pmtIndex].title);

                if ($('.payment:first').hasClass('new')) {
                  $('input[name="id"]', new_content).val(returnData.id);
                  $('.empty').addClass('hidden');
                } else {
                  $('span.title', new_content).text($('input[name="title"]', $('.new.payment')).val());
                  $('div.description', new_content).text($('input[name="description"]', $('.new.payment')).val());
                }

                $('input', new_content).each(function() {
                  if ('id' == $(this).attr('name')) {
                    $(this).val(returnData.id);
                  } else if ('payment[number]' == $(this).attr('name')) {
                    $(this).val(returnData.payments[pmtIndex].payment.description);
                    $(this).attr('disabled', 'disabled');
                  } else {
                    $(this).val($('input[name="' + $(this).attr('name') + '"', $('.new.payment')).val());
                    $('input[name="' + $(this).attr('name') + '"]', $('.new.payment')).val('');
                  }

                  $(this).on('focus', function() {
                    $('button[value="save_payment"]', new_content).prop('disabled', false);
                  });
                });

                $('select', new_content).each(function() {
                  $(this).html($('select[name="' + $(this).attr('name') + '"]', form).html());
                  $(this).val($('select[name="' + $(this).attr('name') + '"]', form).val());
                });

                new_content.insertBefore('.payment:last');
                new_content.addClass('payment');
  
                //bind click on show/hide
                $('span.section-show a', new_content).on('click', function(e){
                  e.preventDefault();
                  that._togglecard(e);
                }).show();
              
              } else {
                var new_content = $(form).closest('div.card').find('h2 a');
                $('span.title', new_content).text($('input[name="title"]', form).val());
              }

              //fadetip response
              $('button[value="save_payment"]', form).fadetip({
                'arrow' : 'bottom',
                'duration' : 2000,
                'distance' : '-1em',
                'contents' : '<span style="color:#7f7;">Updated</span>',
                'width' : '15em'
              });

              //reset the new payment form
              $('.new-content form').trigger('reset');
              $('input[name="type"]', '.new-content form').val('creditcard');
            }
          }
        });
      });
    });
  },

  /**
   * Delete payment
   */
  '_delete' : function(form){
    var that = this;

    //disable form submit button
    $('button[type="submit"]', form).prop('disabled', true);

    //submit the form and reinit
    var id = $('input[name="id"]', form).val();
    $.ajax({
      'cached' : false,
      'type' : $(form).attr('method') || 'GET',
      'dataType' : 'json',
      'data' : {'id' : id, 'action' : 'destroy_payment'},
      'complete' : function(jqXHR){
        //reenable form submit
        $('button[type="submit"]', form).prop('disabled', false);
      },
      'success' : function(data){
        if(data.errors){
          that._render_form_errors(form, data.errors);
        }
        else{
          var payment = $(form).closest('.payment');
          $(payment).slideUp('fast', function(){
            $(this).remove();
          });

          //if no payments left, display empty div
          if ($('.payments .payment').length < 3) {
            $('.empty').removeClass('hidden'); 
          }
        }
      }
    });
  },

  /**
   * Revert changes
   */
  '_cancel' : function(form){
    var that = this;
    var payment = $(form).closest('.payment');
    var section = $(payment).children('.card');

    if (payment.hasClass('new')) {
      $(form).trigger('reset');
      $('#create-new-payment').click();
    } else {
      //revert changes
      var id = $('input[name="id"]', payment).val();
      if(!$('button[value="save_payment"]', form).prop('disabled') && (id != '')){
        $.ajax({
          'cached' : false,
          'type' : 'GET',
          'complete' : function(jqXHR){
            var html = $(jqXHR.responseText);
            var revertform = $('.payments .payment input[name="id"][value="' + id + '"]', html).closest('form');
            $(':input', revertform).each(function(){
              var name = $(this).attr('name');
              var val = $(this).val();
              if(name != 'action'){
                $(':input[name="' + name + '"]', form).val(val);
              }
            });
          }
        });
        $('button[value="save_payment"]', form).prop('disabled', true);
      }

      //slide close
      if ($(payment).hasClass('editing')) {
        $('.card-body', payment).slideToggle(300, function(){
          payment.removeClass('editing');
          section.addClass('hidden');
        });
      } else {
        $(form).closest('.payment').find('.section-show a').click();
      }
    }
  }
});

/**
 * pt.AccountOrders
 * @requires pt.loader
 */
$.widget('pt.AccountOrders', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    this._super();
    var that = this;

    //create loader on orders
    $('.orders', this.element).loader();

    //create loader on each order
    $('.orders .order', this.element).loader();

    //remove the form submit button
    $('form[name="filter"] button[type="submit"]', this.element).remove();

    //bind form input change
    $('form[name="filter"] :input', this.element).on('change', function(e){
      that._load_orders(e);
    });

    //delegate click on summary link
    $('.orders', this.element).delegate('.order .summary a', 'click', function(e){
      e.preventDefault();
      that._load_order(e);
    });
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();
  },

  /**
   * Load orders
   */
  '_load_orders' : function(e){
    var that = this;
    var form = $(e.target).closest('form');

    //update the url
    var params = $.param($(form).serializeArray());
    window.history.replaceState('', '', '?' + params);

    //show loading
    $('.orders', this.element).loader('loading', 'Loading...');

    $.ajax({
      'cached' : false,
      'type' : $(form).attr('method') || 'GET',
//      'dataType' : 'json',
      'data' : $(form).serializeArray(),
      'success' : function(data){
        //hide loading
        $('.orders', that.element).loader('hide');

        //update result count
        var count = $('form[name="filter"] .duration span.count', data).text();
        $('form[name="filter"] .duration span.count', that.element).text(count);

        //clear previous orders and append results
        $('.orders .order', that.element).remove();
        var results = $('.orders .order', data);
        if(results.length){
          $('.orders', that.element).append(results);
          $('.empty', that.element).hide();
        }
        else{
          $('.empty', that.element).show();
        }

        //create loader on each order
        $('.orders .order', that.element).loader();
      }
    });
  },

  /**
   * Edit order
   */
  '_load_order' : function(e){
    var that = this;
    var order = $(e.target).closest('.order');
    var number = $('span.number', order).text();
    //if showing and items list is empty, load it
    if(!$(order).hasClass('editing') && ($('.content .items >*', order).length == 0)){
      //show loading
      $(order).loader('loading', 'Loading...');
      $.ajax({
        'url' : '/account/orders/' + number,
        'type' : 'GET',
        'success' : function(data){
          //replace items
          var items = $('#order-item-list > .pt-product', data);
          $('.content >.items', order).html(items);

          //hide loader
          $(order).loader('hide');

          //edit
          $('>.content', order).slideToggle(300, function(){
            $(order).toggleClass('editing');
          });

          //change the controls
          $(order).find('.section-show a span').text('Hide ');
          $(order).find('.section-show a i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        }
      });
    }
    else{
      $('>.content', order).slideToggle(300, function(){
        $(order).toggleClass('editing');
      });

      //change the controls
      if ($(order).find('.section-show a i').hasClass('fa-chevron-up')) {
        $(order).find('.section-show a span').text('Show ');
        $(order).find('.section-show a i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
      } else {
        $(order).find('.section-show a span').text('Hide ');
        $(order).find('.section-show a i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
      }
    }
  }
});

/**
 * pt.AccountCarts
 */
$.widget('pt.AccountCarts', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    this._super();
    var that = this;

    //create expand widget
    $('.carts', this.element)
      .delegate('.cart .summary a', 'click', function(e){
        e.preventDefault();
      })
      .expand({
        'items' : '.cart',
        'title' : '.summary',
        'content' : '.content'
      });

    //bind new cart click
    $('.carts .new >a', this.element).on('click', function(e){
      e.preventDefault();
      var cart = $(e.target).closest('.cart');
      var form = $('form', cart);
      that._edit(form);
    });

    //delegate save
    $('.carts', this.element).delegate('.cart form button[value="save_cart"]', 'click', function(e){
      e.preventDefault();
      var form = $(e.target).closest('form');
      that._save(form);
    });

    //delegate delete
    $('.carts', this.element).delegate('.cart form button[value="destroy_cart"]', 'click', function(e){
      e.preventDefault();
      var form = $(e.target).closest('form');
      that._delete(form);
    });

    //delegate cancel
    $('.carts', this.element).delegate('.cart form a.cancel', 'click', function(e){
      e.preventDefault();
      var form = $(e.target).closest('form');
      that._cancel(form);
    });

    //delegate form submit
    $('.carts', this.element).delegate('.cart form', 'submit', function(e){
      e.preventDefault();
      var form = e.target;
      that._save(form);
    });

    //disable save by default and make changes enable
    $('.carts button[value="save_cart"]', this.element).prop('disabled', true);
    $('.carts', this.element).delegate(':input', 'focus', function(e){
      var form = $(e.target).closest('form');
      $('button[value="save_cart"]', form).prop('disabled', false);
    });
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();
  },

  /**
   * Edit cart
   */
  '_edit' : function(form){
    var that = this;
    var cart = $(form).closest('.cart');
    $('>.content', cart).slideToggle(300, function(){
      $(cart).toggleClass('editing');
    });
  },

  /**
   * Save cart
   */
  '_save' : function(form){
    var that = this;

    //clear errors
    $('.pt-fadetip.error', form).remove();

    //disable form submit button
    $('button[value="save_cart"]', form).prop('disabled', true);

    //submit the form and reinit
    var id = $('input[name="id"]', form).val();
    var data = $(form).serializeArray();
    data.push({'name' : 'action', 'value' : 'save_cart'});
    $.ajax({
      'cached' : false,
      'type' : $(form).attr('method') || 'GET',
      'dataType' : 'json',
      'data' : data,
      'success' : function(data){
        if(data.errors){
          //reenable form submit
          $('button[value="save_cart"]', form).prop('disabled', false);

          //clear errors
          $('.error-message', form).remove();

          that._render_form_errors(form, data.errors);
        }
        else{
          if(id == ''){
            //load any new carts and hide the new cart form
            location.reload(true);
          }
          else{
            //clear errors
            $('.error-message', form).remove();
            
            //update summary
            for(var i in data.carts){
              if(data.carts[i].id == data.id){
                var cart = $(form).closest('.cart');
                $('.summary p.title', cart).html(data.carts[i].title);
                $('.summary p.description', cart).html(data.carts[i].description);
                break;
              }
            }

            //fadetip response
            $('button[value="save_cart"]', form).fadetip({
              'arrow' : 'bottom',
              'duration' : 2000,
              'distance' : '-1em',
              'contents' : '<span style="color:#7f7;">Updated</span>',
              'width' : '15em'
            });
          }
        }
      }
    });
  },

  /**
   * Delete cart
   */
  '_delete' : function(form){
    var that = this;

    //disable form submit button
    $('button[type="submit"]', form).prop('disabled', true);

    //submit the form and reinit
    var id = $('input[name="id"]', form).val();
    $.ajax({
      'cached' : false,
      'type' : $(form).attr('method') || 'GET',
      'dataType' : 'json',
      'data' : {'id' : id, 'action' : 'destroy_cart'},
      'complete' : function(jqXHR){
        //reenable form submit
        $('button[type="submit"]', form).prop('disabled', false);
      },
      'success' : function(data){
        if(data.errors){
          that._render_form_errors(form, data.errors);
        }
        else{
          var cart = $(form).closest('.cart');
          $(cart).slideUp('fast', function(){
            $(this).remove();
          });

          //if no carts left, reload the page
          if($('.carts .cart').length == 0){
            location.reload(true);
          }
        }
      }
    });
  },

  /**
   * Revert changes
   */
  '_cancel' : function(form){
    var that = this;

    //revert changes
    var id = $('input[name="id"]', cart).val();
    if(!$('button[value="save_cart"]', form).prop('disabled') && (id != '')){
      $.ajax({
        'cached' : false,
        'type' : 'GET',
        'complete' : function(jqXHR){
          var html = $(jqXHR.responseText);
          var revertform = $('.carts .cart input[name="id"][value="' + id + '"]', html).closest('form');
          $(':input', revertform).each(function(){
            var name = $(this).attr('name');
            var val = $(this).val();
            if(name != 'action'){
              $(':input[name="' + name + '"]', form).val(val);
            }
          });
        }
      });
      $('button[value="save_cart"]', form).prop('disabled', true);
    }

    //slide close
    that._edit(form);
  }
});

+/**
 * pt.CatalogSearch
 */
$.widget('pt.CatalogSearch', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function() {
    this._super();
    var that = this;

    // Hide Long Form Display of Variant Elements and Show Dropdown Method Instead
    $('div.variants div.pt-product').css('display','none').removeClass('d-flex');
    $('div.variants select.variants-options').removeClass('start-display-none');

    //private instance variables
    this._count = $('#search-results-card >h1 >span.count', this.element);
    this._form = $('form[name="search"]', this.element);
    this._results = $('.results', this.element);
    this._pagination = $('.pagination', this.element);

    //throw away pagination
    $(this._pagination).empty();

    //create variants menu
    $('#menu-variants', this.element).MenuVariants();

    //create cselect widget on facets if not on mobile
		if(!this._isMobile()){
	    $('.facet select', this._form).each(function(){
	      var filtername = $(this).attr('name').match(/filter\[(.*?)\]/);
	      $(this).cselect({'classes' : filtername[1] + '-select'});
	    });
		}

    //create quantity widget on each result
    $('.pt-product .add-to-cart-form input[name="quantity"]', this._results).each(function(){
      $(this).quantities();
    });

    //bind facet select submit the form
    $(this._form).delegate('select', 'change', function(e){
      $(that._form).submit();
    });

    //bind text filter submit the form
    $('input[name="term"]', this._form).on('change', function(e){
      $(that._form).submit();
    });

    //bind shopcart:update on body
    $('body').on('shopcart:update', function(data){
      var id = $('input[name="product"]', that._form).val();
      var shopcart = data.shopcart.shopcart;
      for(var i=0; i<shopcart.items.length; i++){
        if(shopcart.items[i].product.id == id){
          $(that._incart).html(shopcart.items[i].quantity);
        }
      }
    });

    //hide the filters submit button
    $('button[type="submit"]', this._form).hide();

    //load more results when scroll reaches bottom of results
    window.scrollTo(0, 0);
    $(window).scroll(function(){
      that._loadmore();
    });

    $('span#filter-collapse').click(function(e) {
      var filter = $('#filters-col');
        $('span#filter-collapse',filter).hide();
        $('span#filter-expand',filter).show();
        $(filter).addClass('col-md-2').removeClass('col-md-4');
        $('div#filter-body').removeClass('d-flex').slideUp(150);
    });

    $('span#filter-expand').click(function(e) {
    var filter = $('#filters-col');
      $('span#filter-expand',filter).hide();
      $('span#filter-collapse',filter).show();
      $(filter).addClass('col-md-4').removeClass('col-md-2');
      $('div#filter-body').addClass('d-flex').slideDown(150);
    });

    $('select.variants-options', this._results).each(function(){
      that._updateVariantSelection(this);
    });

    // Update Listing Data or redirect on Select Change
    $('select.variants-options', this._results).change(function(e){
      if ($(e.target).closest('div.pt-product').hasClass('model') && 0 != $('select.variants-options').find(":selected").val()) {
        that._forwardVariantUrl(e.target);
      } else {
        that._updateVariantSelection(e.target);
      }
    });
  },

  '_forwardVariantUrl' : function (target) {
    var productId = $('option:selected', target).val();
    var targetElement = $(target).parents('div.variants').first().find('div.pid-' + productId);
    var url = $('div.thumb a',targetElement).attr('href');

    window.location = url;
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();

    var that = this;

    $(document).ready(function() {
      that._qupdate();
      $('html, body').animate({ scrollTop: 0 }, 2000);
      $('input[name="term"]', that._form).focus();
    });

    $('body').on('shopcart:update', function(e){
      that._qupdate(e);
    });

    //auto load more if page load does not saturate
    var windowheight = $(window).height();
    var lasttop = $('>.pt-product:last-child', this._results);
    if((lasttop.length > 0) && (windowheight > lasttop.offset().top)){
    	this._loadmore();
    }
  },

  /**
   * Display quantity of each part in cart
   */
  '_qupdate' : function(e){
    $('.results .shop form[name="add"]').each(function(a, b){
      var product = $(this).find('input[name="product"]').val();
      var quantity = $(this).find('.quantity').html();

      if (!quantity) {
        $(this).find('.icon').hide();
      } else {
        $(this).find('.icon').css('display', 'inline-block');
      }

      if (e) {
        $(e.shopcart.shopcart.items).each(function(i, j){
          if (j.product.id == product) {
            $(b).find('.quantity').html(j.quantity);
            $(b).find('.icon').css('display', 'inline-block');
          }
        });
      } 
    });
  },

  /**
   * Populate everything on load and change
   */
  '_selectvariant' : function(varForm) {
    var colorselect = $(varForm).find($('.colors')); 
    var selected = $(colorselect).children(':selected'); //.text());
    var selectedid = $(selected).val().split('|')[0];
    var selectedprice = $(selected).text().split(', ')[1];

    $(varForm).find($('input[name="product"]')).val(selectedid);
    $(varForm).parent().parent().children('.product').children('.price').children('.price').text(selectedprice);
    

    $(varForm).parent().parent().children('.product-thumbnail').children('div').each(function() {
      $(this).addClass('hidden');
    });

    $(varForm).find('.shipwrap .shipping, .product div.price, .product div.regular').each(function() {
      $(this).addClass('hidden');
    });

    $('.var_' + selectedid).removeClass('hidden');
    $('.var_' + selectedid).find('.carousel-item').addClass('active');

    //Variant Dropdown Updates

  },

  /**
   * Load more results
   */
  '_loadmore' : function(){
    var that = this;

    //don't do anything if currently loading
    if($('>.more', this._pagination).length){
      return false;
    }

    //don't do anything if no more results
    var count = parseInt($(this._count).html());
    var loaded = $('>.pt-product', this._results).length;
    if(loaded >= count){
      return false;
    }

    //check if bottom is within the window view
    var windowscroll = $(window).scrollTop();
    var windowheight = $(window).height();
    var paginationtop = $(this._pagination).offset().top;
    if(windowscroll > (paginationtop - windowheight)){
      //add loading element
      var more = $('<div class="more">Loading more results...</div>');
      $(this._pagination).append(more);

      //ajax get next set
      var page = parseInt($(this._pagination).attr('page'));
      $.ajax({
        'url' : window.location.href,
        'type' : 'GET',
        'data' : {
          'page' : page + 1
        },
        'complete' : function(jqXHR){
          //remove loading
          $('.more', that._pagination).remove();
        },
        'success' : function(data){
          //append results
          var results = $('.results > .pt-product', data);
          $('div.variants div.pt-product', results).css('display','none').removeClass('d-flex');
          $('div.variants select.variants-options', results).removeClass('start-display-none');

					//init variants
          $('select.variants-options',results)
						.each(function(){
	            that._updateVariantSelection(this);
	          })
						.on('change', function(e){
              if ($(e.target).closest('div.pt-product').hasClass('model')) {
                  that._forwardVariantUrl(e.target);
              } else {
                  that._updateVariantSelection(e.target);
              }
	          });

          if(results.length){
            $(that._results).append(results);
          }

          //create quantity widget on each result
          $('.shop input[name="quantity"]', results).each(function(){
            $(this).quantities();
          });

          //update page
          $(that._pagination).attr('page', page + 1);
        }
      });
    }
  }
});

/**
 * pt.CatalogBrands
 */
$.widget('pt.CatalogBrands', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    this._super();
    var that = this;

    //private instance variables
    this._brands = $('.brands', this.element);
    this._filter = $('.filter', this.element);

    //bind filter tab click
    $(this._filter).delegate('p', 'click', function(e){
      that._showBrands(e);
    });

    //show the filter
    $(this._filter).show();
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();
  },

  /**
   * Show search tab
   */
  '_showBrands' : function(e){
    var tab = e.target;
    var filter = $(e.target).attr('class');

    //select tab
    $('p', this._filter).removeClass('selected');
    $(e.target).addClass('selected');

    //show selected brands
    $('.brand', this._brands).each(function(){
      var show = (filter == 'all') || (filter == $(this).text().trim().substr(0, 1).toLowerCase());
      if(show != $(this).is(':visible')){
        $(this).toggle();
      }
    });

    //show empty div
    var empty = $('.brand:visible', this._brands).length == 0;
    if(empty != $('.empty', this._brands).is(':visible')){
      $('.empty', this._brands).toggle();
    }
  }
});

/**
 * pt.CatalogBrand
 */
$.widget('pt.CatalogBrand', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    this._super();
    var that = this;

    //private instance variables
    this._form = $('.start-here', this.element);

    //bind form tab click
    $('.tab', this._form).on('click', function(e){
      that._showSearchTab(e);
    });
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();
  },

  /**
   * Show search tab
   */
  '_showSearchTab' : function(e){
    var tab = e.target;
    if(!$(tab).hasClass('tab')){
      //lazy unbubbling
      tab = $(tab).closest('.tab');
    }
    if($(tab).hasClass('active')){
      //don't do anything if already active
      return false;
    }

    //set the active tab
    var tabs = $(tab).closest('.tabs');
    $('.tab', tabs).removeClass('active');
    $(tab).addClass('active');

    //show the form
    var form = $(tab).attr('form');
    $('.forms .form', this._form).hide();
    $('.forms .form.' + form, this._form).show();
  }
});

/**
 * pt.CatalogCategories
 */
$.widget('pt.CatalogCategories', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    this._super();
    var that = this;

    //private instance variables
    this._categories = $('.categories', this.element);
    this._filter = $('.filter', this.element);

    //bind filter tab click
    $(this._filter).delegate('p', 'click', function(e){
      that._showCategories(e);
    });

    //show the filter
    $(this._filter).show();
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();
  },

  /**
   * Show search tab
   */
  '_showCategories' : function(e){
    var tab = e.target;
    var filter = $(e.target).attr('class');

    //select tab
    $('p', this._filter).removeClass('selected');
    $(e.target).addClass('selected');

    //show selected categories
    $('.category', this._categories).each(function(){
      var show = (filter == 'all') || (filter == $(this).text().trim().substr(0, 1).toLowerCase());
      if(show != $(this).is(':visible')){
        $(this).toggle();
      }
    });

    //show empty div
    var empty = $('.category:visible', this._categories).length == 0;
    if(empty != $('.empty', this._categories).is(':visible')){
      $('.empty', this._categories).toggle();
    }
  }
});

/**
 * pt.CatalogCategory
 */
$.widget('pt.CatalogCategory', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    this._super();
    var that = this;

    //private instance variables
    this._form = $('.start-here', this.element);
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();
  }
});

/**
 * pt.CatalogModel
 */
$.widget('pt.CatalogModel', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    this._super();
    var that = this;

    // Bind Change on Variant Select
    this._variants = $('form[name="variants"]', this.element);
    $('button', this._variants).hide();
    $('select', this._variants).on('change', function(e){
      var form = $(this).closest('form');
      $(form).submit();
    });

    // Initiate Carousels
    $('.pt-carousel').each(function() {
			var carousel = this;
      $(this).carousel();
      $(this).addClass('px-4 py-1').removeClass('p-1');

			//if the carousel is in a show-hide section
			var parentcard = $(this).closest('.section.card');
			var sectionshow = $('span.section-show a', parentcard);
			if(sectionshow.length){
				//whenever a carousel is shown, force init to show the arrows
				$(sectionshow).on('accordion', function(e){
					if(e.detail.action == 'show'){
						$(carousel).carousel();
					}
				});
			}
    });
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();
    var that = this;

		//listen for quantity updates and trigger on load
    that._qupdate();
    $('body').on('shopcart:update', function(e){
      that._qupdate(e);
    });
  },

  /**
   * Display quantity of each part in cart
   */
  '_qupdate' : function(e) {
    $('.recommended .add-to-cart').each(function(a, b) {
      var product = $(this).find('input[name="product"]').val();
      var quantity = $(this).find('.in-cart').html();

      if (e) {
        $(e.shopcart.shopcart.items).each(function(i, j){
          if (j.product.id == product) {
            if ($(b).find('.in-cart.var_' + product).length){
              $(b).find('.in-cart.var_' + product).html(j.quantity);  
            } else {
              $(b).find('.in-cart').html(j.quantity);
            }
          }
        });
      } 
    });
  }
});

/**
 * pt.CatalogIpl
 * Warning: a lot of stupid in this widget
 */
$.widget('pt.CatalogIpl', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
    'zoom' : 100,
    'stepZoom' : 10,
    'maxZoom' : 300,
    'minZoom' : 10
  },

  /**
   * Create
   */
  '_create' : function(){
    this._super();
    var that = this;

    //private instance variables
    this._lists_menu = $('.pt-cmenu-saveitem', this.element);
    this._model = $('.model:first', this.element);
    this._ipl = $('.ipl:first', this.element);
    this._diagram = $('.diagram:first', this._ipl);
    this._image = $('.image:first', this._diagram);
    this._parts = $('#parts-list:first', this._ipl);
    this._detail = $('.hotspot-detail', this._ipl).detach();

    //bind click event on document to hide hotspot menu
    $(document).on('mouseup', function(e){
      var isMenu = $(that._detail).is(e.target) || ($(that._detail).has(e.target).length > 0);
      var isHotspot = $(e.target).hasClass('hotspot');
      var isCloseButton = $(e.target).hasClass('close-button');
      if(isHotspot){
        that._hotspot(e.target);
      }
      else if(!isMenu || isCloseButton){
        that._hotspot();
      }
    });

    //create quantity widget on each result
    $('#parts-list input[name="quantity"]', this._parts).each(function(){
      $(this).quantities();
    });

    //bind option change on details
    $('input[name="hotspot-option"]', this._detail).on('change', function(e){
      var index = parseInt($('input[name="hotspot-option"]:checked', that._detail).val());
      $('.parts >.part', that._detail).removeClass('d-flex').hide();
      $('.parts >.part:nth-child(' + (index + 1) + ')', that._detail).addClass('d-flex').show();
    });

    //update diagram view overflow
    $(this._diagram).css({
      'overflow' : 'hidden'
    });

    //make image pinchzoom and draggable
    $(this._image)
      .pinchzoom({
      })
      .draggable({
        'handle' : '#hotspots-element',
        'start' : function(e, ui){
          var width = $(e.target).width();
          $(e.target).css({
            'min-width' : width,
            'max-width' : width
          })
        },
        'drag' : function(e, ui){
          that._hotspot();
        },
        'stop' : function(e, ui){
        }
      });

    //desktop only inits
    if(!this._isMobile()){
      //show zoom buttons and bind click
      $('.zoom', this.element).show();
      $('.zoom button', this._diagram).on('click', function(e){
        //simulate a mousewheel instead
        var direction = ($(this).attr('name') == 'zoom-in') ? 'in' : 'out';
        var evt = new MouseEvent('mousewheel', {
          pageX: $(that._image).offset().left,
          pageY: $(that._image).offset().top,
          clientX: $(that._image).offset().left,
          clientY: $(that._image).offset().top,
          bubbles: true,
          cancelable: true,
          view: window
        });
        evt.wheelDelta = (direction == 'out') ? -1 : 1;
        $(that._image).pinchzoom('zoom', evt);
      });

      //bind full screen click and show the button
      $('a.full-screen', this._diagram)
        .on('click', function(e){
          //prevent navigation
          e.preventDefault();
          that._fullscreen();
        })
        .show();

      //bind fullscreenchange to document for detecting exit from full screen and reinit pinchzoom
      $(document)
        .on('fullscreenchange', function(e){
          $(that._diagram).toggleClass('full-screen');
          $(that._image).pinchzoom();
        })
        .on('msfullscreenchange', function(e){
          $(that._diagram).toggleClass('full-screen');
          $(that._image).pinchzoom();
        })
        .on('mozfullscreenchange', function(e){
          $(that._diagram).toggleClass('full-screen');
          $(that._image).pinchzoom();
        })
        .on('webkitfullscreenchange', function(e){
          $(that._diagram).toggleClass('full-screen');
          $(that._image).pinchzoom();
        });

      //delegate part matching hotspot mouseover
      $(this._parts)
        .delegate('.pt-product', 'mouseenter', function(e){
          var reference = $(this).attr('reference');
          var hotspot = $('.hotspot[reference="' + reference + '"]:first', that._diagram);
          that._hotspot(hotspot, 'hilight', $(this).attr('part-url'));
        })
        .delegate('.pt-product', 'mouseleave', function(e){
          that._hotspot();
        });
    }

    $('.price-avail-shop-data').each(function() {
      $(this).removeClass('hidden');
    })

    // Hide Long Form Display of Variant Elements and Show Dropdown Method Instead
    $('div.variants div.pt-product').css('display','none').removeClass('d-flex');
    $('div.variants select.variants-options').removeClass('start-display-none');

    //init variants
    $('select.variants-options', this._parts)
      .each(function(){
        that._updateVariantSelection(this);
      })
      .on('change', function(e){
        that._updateVariantSelection(e.target);
      });
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();
    var that = this;
    $(document).ready(function() {
      that._qupdate();
    });
    $('body').on('shopcart:update', function(e){
      that._qupdate(e);
    });
  },

  /**
   * Display quantity of each part in cart
   */
  '_qupdate' : function(e){
    $('.parts .shop form[name="add"]').each(function(a, b){
      var product = $(this).find('input[name="product"]').val();
      var quantity = $(this).find('.quantity').html();

      if (!quantity) {
        $(this).find('.icon').hide();
      } else {
        $(this).find('.icon').css('display', 'inline-block');
      }

      if (e) {
        $(e.shopcart.shopcart.items).each(function(i, j){
          if (j.product.id == product) {
            $(b).find('.quantity').html(j.quantity);
            $(b).find('.icon').css('display', 'inline-block');
          }
        });
      } 
    });
  },

  /**
   * Toggle full screen
   */
  '_fullscreen' : function(){
    var elem = this._diagram[0];

    //clear hotspot popup
    this._hotspot();

    //toggle full screen
    if($(elem).hasClass('full-screen')){
      //return from full screen
      if(document.exitFullscreen){
        document.exitFullscreen();
      }
      else if(document.msExitFullscreen){
        document.msExitFullscreen();
      }
      else if(document.mozCancelFullScreen){
        document.mozCancelFullScreen();
      }
      else if(document.webkitExitFullscreen){
        document.webkitExitFullscreen();
      }
      else{
        //full screen not supported
      }
    }
    else{
      if(elem.requestFullscreen){
        elem.requestFullscreen();
      }
      else if(elem.msRequestFullscreen){
        elem.msRequestFullscreen();
      }
      else if(elem.mozRequestFullScreen){
        elem.mozRequestFullScreen();
      }
      else if(elem.webkitRequestFullscreen){
        elem.webkitRequestFullscreen();
      }
      else{
        //full screen not supported
      }
    }
  },

  /**
   * Show hotspot info
   * @param mixed hotspot
   * @param string mode
   */
  '_hotspot' : function(hotspot, mode, sourcePartUrl){
    //clear other hotspots first
    var that = this;
    $(this._detail).detach();

    //no hotspot defined
    if(typeof hotspot === 'undefined' || hotspot == null || hotspot.length == 0) {
      return false;
    }

    //set hotspot display mode
    $(this._detail).attr('mode', mode ? mode : null);
    $('.parts', this._detail).empty();

    if(mode == 'hilight') {
      //find the target part
      var targetPart = targetPart = $(('.part[part-url="' + sourcePartUrl + '"]'));

      if(targetPart == null) {
        return false;
      }

      var part = targetPart.clone(true);
      $(part).removeClass('pt-product');
      $('.parts', that._detail).append(part);
    }
    else {
      //find the part(s) and target part
      var reference = $(hotspot).attr('reference');
      var parts = $('.part[reference="' + reference + '"]', this._parts);

      if(parts.length == 0){
        //do something if we can't find the part
        return false;
      }
      else{
        var optiontemplate = null;

        //hide options if only one part found
        if(parts.length == 1){
          //hide ul
          $('ul.options', this._detail).hide();
        }
        else {
          //empty options and parts
          optiontemplate = $('ul.options li:first', this._detail).detach();
          $('ul.options', this._detail).show().empty();
        }

        //add parts
        $(parts).each(function(index, value){
          //add the part
          var part = $(this).clone(true);

          $(part).removeClass('pt-product');
          if(index != 0) {
            $(part).hide();
            $(part).removeClass('d-flex');
          }

          var notes = $('p.notes', part);
          // $('p.notes', part).remove();
          $('.parts', that._detail).append(part);

          if(parts.length > 1){
            //add the option
            var option = $(optiontemplate).clone(true);
            var title = $('div.details div.short-description', this).first().text();

            $('input', option).val(index).prop('checked', index == 0);
            $('span.title', option).html(title).append(notes);
            $('ul.options', that._detail).append(option);
          }
        });

        //select the variant
        var selectedId = $('.price-avail-shop-data:first >.shop form input[name="product"]', this._detail).val();
        $('.price-avail-shop-data:first >.variants >select.variants-options', this._detail).val(selectedId);
      }
    }

    //position the detail
    $(this._diagram).append(this._detail);
    $(this._detail).show();

    var diagramWidth = $(this._diagram).width(),
        hotspotWidth = $(this._detail).width();

    $(this._detail).position({
      'my' : 'middle top',
      'at' : 'middle bottom',
      'of' : hotspot,
      'collision' : 'flip',
      'within' : this._diagram,
      'using' : function(obj, info){
        $(this).removeClass('top');
        $(this).removeClass('bottom');

        if (diagramWidth > 571) {
          // Restrict the Hotspot to within 10 px of either horizontal border
          var finalLeft = (obj.left < 10) ? 10 : ((obj.left > (diagramWidth - hotspotWidth - 10)) ? (diagramWidth - hotspotWidth - 10) : obj.left);

          $(this).css({
            left: finalLeft + 'px',
            top: obj.top + 'px'
          });
        }
        else {
          $(this).addClass('mt-2');
          $(this).addClass('mx-auto');
        }
      }
    });

    if(mode == 'hilight') {
//      $(this._detail).find('div.part').removeClass('mb-1 mb-md-2');
//      $(this._detail).find('div.part div.row').removeClass('col-lg-7');
      $(this._detail).find('div.pt-details').removeClass('col-sm-8');
      $(this._detail).find('div.part div.thumb').removeClass('col-4 col-sm-5 col-md-4 col-lg-3');
      $(this._detail).find('div.part div.thumb .position-absolute').addClass('d-block');
      $(this._detail).find('div.part div.thumb .position-absolute').removeClass('position-absolute');
      $(this._detail).find('div.part div.thumb').addClass('col-auto');
      $(this._detail).find('div.part div.thumb img').hide(); 
      $(this._detail).find('div.price-avail-shop-data').remove();
      $(this._detail).find('ul.options').hide();
      $(this._detail).find('div.variants').hide();
    }
    else {
      $(this._detail).find('div.part div.thumb').removeClass('col-sm-5');
      $(this._detail).find('div.close-button').removeClass('d-none');
      $(this._detail).find('form div.input-group div.d-md-flex').removeClass('d-md-flex');
      $(this._detail).find('div.pt-details').removeClass('col-sm-8 col-xl-12');
      $(this._detail).find('div.price-avail-shop-data').removeClass('col-sm-4 col-xl-12');
      $(this._detail).find('div.price-avail-shop-data > div').removeClass('col-sm-12 justify-content-sm-end');
      $(this._detail).find('div.price-avail-shop-data div.shipping').removeClass('justify-content-sm-end text-sm-right text-xl-left');
      $(this._detail).find('div.price-avail-shop-data div.shipping').addClass('text-left');
      $(this._detail).find('div.price-avail-shop-data div.shop').removeClass('col-sm-12');
    }
  }
});

/**
 * pt.CatalogPart
 */
$.widget('pt.CatalogPart', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    this._super();
    var that = this;

    //private instance variables
    this._form = $('form[name="shop"]', this.element);
    this._photos = $('.photos', this.element);
    this._incart = $('.price-avail-shop-data .in-cart span.in-cart', this.element);

    // Initiate Carousels
    $('.pt-carousel').each(function() {
      var carousel = this;
      $(carousel).carousel();
      $(carousel).addClass('px-4 py-1').removeClass('p-1');

      //if the carousel is in a show-hide section
      var parentcard = $(this).closest('.section.card');
      var sectionshow = $('span.section-show a', parentcard);
      if(sectionshow.length){
        //whenever a carousel is shown, force init to show the arrows
        $(sectionshow).on('accordion', function(e){
          if(e.detail.action == 'show'){
            $(carousel).carousel();
          }
        });
      }
    });

    // Hide All Non-JS Variant Listings and Show Drop Down Selections
    $('div.variants div.lookup-part-element').css('display','none');
    $('div.variants div.color-codes div.form-group').removeClass('d-none');

    // Update Listing Data on Select Change
    $('select.colors', this._results).change(function(e){
        window.location.href = '/parts/' + e.target.value;
    });

    //create quantity widget on each result
    $('input[name="quantity"]', this._form).each(function(){
      $(this).quantities();
    });

    //create quantity widget on each result
    $('.price-avail-shop-data .add-to-cart-form input[name="quantity"]').each(function(){
      $(this).quantities();
    });

    //Hide filter - will show if no JS
    $('div.filter-body').hide();

    //reset button
    $('.resetButton').click(function(e) {
      $('input[name="model_term"]').val('');
      $('form[name="search"').submit();
      $('resetButtonDiv').addClass('pt-hidden');
    });

    //listen on model filter input
    $('input[name="model_term"]').on('input', function(e) {
      if ('' != $(this).val()) {
        $('.resetButtonDiv').removeClass('pt-hidden');
      } else {
        $('.resetButtonDiv').addClass('pt-hidden');
      }
    });

    //filter results
    $('form[name="search"').on('submit', function(e) {
      e.preventDefault();
      that._loadWhereUsed($('input[name="model_term"]').val());
    });

  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();

    var that = this;

    $(document).ready(function() {
      that._qupdate();
      if (that._isMobile()) {
        $('div.long-description .section-show a').click();
      }

      if ($('.card.recommended ul li').length) {
        $('.card.recommended .section-show a').click();
      }
   });

    $('body').on('shopcart:update', function(e){
      that._qupdate(e);
    });
  },


  /**
   * Load Where Used results
   */
  '_loadWhereUsed' : function(model_term){
      $.ajax({
        'url' : window.location.href,
        'dataType': 'html',
        'data' : {
          'model_term' : model_term
        },
        'complete' : function(jqXHR){
        },
        'success' : function(data){
          //append results
          $('.results-col').html($(data).find('.results-col'));
          
          if ('' != $('input[name="model_term"]').val()) {
            $('.resetButtonDiv').removeClass('pt-hidden');
          } else {
            $('.resetButtonDiv').addClass('pt-hidden');
          }
        }
      });
    },
    

  /**
   * Display quantity of each part in cart
   */
  '_qupdate' : function(e){
    $('.add-to-cart').each(function(a, b){
      var product = $(this).find('input[name="product"]').val();
      var quantity = $(this).find('.in-cart').html();

      if (e) {
        $(e.shopcart.shopcart.items).each(function(i, j){
          if (j.product.id == product) {
            if ($(b).find('.in-cart.var_' + product).length){
              $(b).find('.in-cart.var_' + product).html(j.quantity);  
            } else {
              $(b).find('.in-cart').html(j.quantity);
            }
          }
        });
      }
    });
  }
});

/**
 * pt.HelpContactUs
 */
$.widget('pt.HelpContactUs', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    this._super();
    var that = this;

    //create address widget
    $('#body form[name="advantage"]', this.element).address();

    //bind form submit
    $('#body form', this.element).on('submit', function(e){
      e.preventDefault();
      that._submit(e);
    });

    //bind click on success confirm
    $('#body form', this.element).delegate('.success a', 'click', function(e){
      e.preventDefault();
      $(e.target).closest('.success').fadeOut('fast');
    });

    $(document).ready(function() {
      $('.id-reseller-ratings-reviews.full-rr').reviews();
    });
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();
  },

  /**
   * Submit form
   */
  '_submit' : function(e){
    var that = this;
    var form = e.target;

    //clear errors
    $('.error-message', form).remove();

    //disable form submit button
    $('button[type="submit"]', form).prop('disabled', true);

    //ajax send contact
    $.ajax({
      'type' : $(form).attr('method') || 'GET',
      'dataType' : 'json',
      'data' : $(form).serializeArray(),
      'complete' : function(data){
        //reenable form submit button
        $('button[type="submit"]', form).prop('disabled', false);
      },
      'success' : function(data){
        if(data.errors){
          //clear errors
          $('.error-message', form).remove();

          that._render_form_errors(form, data.errors);
        }
        else if(data.success){
          //clear errors
          $('.error-message', form).remove();
          
          var emailId = data.success.emailId;
          var successelem = $(form).parent().children('.success'); //$('.success:first', form);
          $('span.reference-number', successelem).html(data.success.emailId);
          $(form).fadeOut('fast');
          $(successelem).fadeIn('fast');
        }
      }
    })
    .always(function(){
      grecaptcha.reset();
    });
  }
});

/**
 * pt.ShopShopcart
 */
$.widget('pt.ShopShopcart', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    this._super();
    var that = this;

    //private instance variables
    this._items = $('#body .items:first', this.element);
    this._summary = $('#body .summary:first', this.element);

    //create quantity widget on each item
    $('input[name="quantity"]', this._items).quantities();

    //delegate change on item quantity and remove update buttons
    $(this._items).delegate('form[name="update"]', 'submit', function(e){
			e.preventDefault();
      that._update(e);
		});
    $(this._items).delegate('form[name="update"] input[name="quantity"]', 'change', function(e){
			$(this).closest('form').submit();
    });
    $('form[name="update"] button', this._items).remove();

    //delegate remove button click
    $(this._items).delegate('form[name="remove"]', 'submit', function(e){
      e.preventDefault();
      that._remove(e);
    });

    //hide update update buttons
    $('.shop form button[value="update_item"]', this._items).hide();
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();
  },

  /**
   * Update quantity
   */
  '_update' : function(e){
    var that = this;
    var form = e.target;
		if($(form).prop('data-submitting')){
			return false;
		}
		$(form).prop('data-submitting', true);
    $.ajax({
      'url' : '/shop/',
      'type' : $(form).attr('method') || 'GET',
      'dataType' : 'json',
      'data' : $(form).serializeArray(),
			'complete' : function(data){
				$(form).prop('data-submitting', false);
			},
      'success' : function(data){
        that._summarize(data);
      }
    });
  },

  /**
   * Remove item
   */
  '_remove' : function(e){
    var that = this;
    var form = e.target;
    var itemelem = $(form).closest('.item');
		if($(form).prop('data-submitting')){
			return false;
		}
		$(form).prop('data-submitting', true);
    $.ajax({
      'url' : '/shop/',
      'type' : 'POST',
      'dataType' : 'json',
      'data' : $(form).serializeArray(),
			'complete' : function(data){
				$(form).prop('data-submitting', false);
			},
      'success' : function(data){
        if(data.shopcart.count == 0){
          //no items, refresh the page
          location.reload();
          return true;
        }
        $(itemelem).slideUp(function(){
          $(this).remove();
          that._summarize(data);
        });
      }
    });
  },

  /**
   * Summarize
   */
  '_summarize' : function(data){
    var that = this;
    var shopcart = data.shopcart;

    //update items
    $('>.item', this._items).each(function(){
      var id = $('input[name="product"]', this).val();
      for(var i=0; i<shopcart.items.length; i++){
        var item = shopcart.items[i];
        if(item.product.id == id){
          $('.price .subtotal .price', this).text(parseFloat(item.product.stock.price * item.quantity).toFixed(2));
          $('.price .subtotal .quantity', this).text(item.quantity);
          $('.price .each .price span', this).text(parseFloat(item.product.stock.price).toFixed(2));
          break;
        }
      }
    });

    //update summary
    $('span.count', that._summary).text(shopcart.count);
    $('span.subtotal', that._summary).text(parseFloat(shopcart.subtotal).toFixed(2));
  },

  /**
   * Clear the cart
   */
  'clear' : function(){
    $.ajax({
      'url' : '/shop/',
      'type' : 'DELETE',
      'dataType' : 'json',
      'success' : function(data){
        //no items, refresh the page
        location.reload();
      }
    });
  }
});

// Temp Data Share For Local CSR Browser Extension
var csrDataShare = {
    // Populated With Raw Response Data If Payment Method Registration Fails In Checkout Process
    rawPaymentError: {},
    // Populated With Address Validation Scores For Assisting Customer's Correct Their Address
    shippingAddressScores: {
      city_municipality: 0,
      clean: 0,
      postal_code: 0,
      state_province: 0,
      street: 0,
    },
    // Generalized Storage For Errors To Surface To CSR Browser Extension
    debugErrors: [],
    quality: {
      turn: 1
    }
  },
  partialShipFlag = null;

/**
 * pt.ShopCheckout
 * @requires pt.address
 */
$.widget('pt.ShopCheckout', $.pt.Controller, {
  
  '_create': function () {
    this._super();
    var that = this;

    // Start Loading The Checkout State And Hide The No JavaScript Frame
    initiateLoadingScreen('Loading Checkout');
    $(this).password();
    this._checkoutStateController();
    
    // Shipping Service Radio Selection Helper - Enables elements representing an input radio element to trigger the selection of that input for ease of use...
    $('div.phase.service', this.element).delegate('div.service-option', 'click', function (e) {
      $(e.target).closest('div.service-option').find('input').prop('checked', 'true');
    });

    // Dismiss NLA Part Notice
    $(this.element).delegate('button.dismiss-nla-button','click', function (e) {
      $('div#nla-part-notice-card').hide();
    });

    // Change Payment Button - Allows for user to see input interface for payments after it has already been set.
    $('div.phase.payment', this.element).delegate('form.change-payment-method', 'submit', function (e) {
      e.preventDefault();

      // Show & Hide Appropriate Content
      $('div#phase-payment div.phase-section').css('display', 'inline-block');
      $('div#phase-payment div.phase-section.change').css('display', 'none');
    });

    // Setup Show/Hide Actions On Phase Cards
    $('div.hide-card-action').on('click', function (e) {
      $(this).hide();
      var phaseCard = $(this).closest('div.phase.phase-card');
      phaseCard.find('div.show-card-action').show();
      phaseCard.find('div.card-body').hide();
    });

    // Single or Double Shipping Prices When Choosing Partial Ship Option
    $('input[name="partial-complete-ship"]').on('change', function (e) {
      if ($(this).val() == "complete-ship") {
        // Set current values to half
        $('div.service-option-price-value').each(function(index) {
          $(this).text(($(this).text() / 2).toFixed(2));
        });
      } 
      else {
        // Set current values to double
        $('div.service-option-price-value').each(function(index) {
          $(this).text(($(this).text() * 2).toFixed(2));
        });
      }
    });

    $('div.show-card-action').on('click', function (e) {
      $(this).hide();
      var phaseCard = $(this).closest('div.phase.phase-card');
      phaseCard.find('div.hide-card-action').show();
      phaseCard.find('div.card-body').show();
    });

    // SHIPPING ADDRESS -> TRY NEW ADDRESS - Allows the user to open up the shipping address UI and attempt another address.
    $('div.phase.address', this.element).delegate('form[name="try-another-address"]', 'submit', function (e) {
      e.preventDefault();

      // Show & Hide Appropriate Content
      $('div#saved-address-shipping').show();
      $('div#manual-entry').show();
      $('div#address-change').hide();
    });

    // LOGIN PHASE -> AUTHENTICATE - Attempts to login for the user's provided data
    $('div.phase.login', this.element).delegate('form[name="login"]', 'submit', function (e) {
      e.preventDefault();
      var form = $('form[name="login"]'),
        phase = $(form).closest('.phase'),
        email = form.find('input[name="email"]').val(),
        password = form.find('input[name="password"]').val(),
        errors = {},
        missingData = false;

      // Clear Errors
      $('.error-message', phase).remove();

      // Ensure Required Data Is Present
      if (((typeof email !== 'string') && !(email instanceof String)) || (email.length == 0)) {
        errors.email = 'Required';
        missingData = true;
      }
      if (((typeof password !== 'string') && !(password instanceof String)) || (password.length == 0)) {
        errors.password = 'Required';
        missingData = true;
      }

      // Required Data Wasn't Present, Save The Processing On The Call
      if (missingData === true) {
        parseResponseErrors(form, errors, null);
      }
      // Required Data Present, Proceed With Call
      else {
        // Disable Form Submit Button
        $('button', phase).prop('disabled', true);
        initiateLoadingScreen('Authenticating');

        // AJAX Send Login Request
        $.ajax({
          'url': '/account/',
          'type': 'POST',
          'dataType': 'json',
          'data': {
            'action': 'login',
            'referer': 'checkout',
            'email': email,
            'password': password
          },
          'complete': function (data) {
            var response = Object.create(data),
              resPayload = response.responseJSON;

            // Request 'Successful', Continue Processing
            if (response.status == 200) {

              // Expected Payload Present, Complete Login With Reload To Properly Bring In The 'Account' Element In The Header
              if (isNotNullUndefinedOrEmpty(resPayload) && isNotNullUndefinedOrEmpty(resPayload.success) && isNullUndefinedOrEmpty(resPayload.success.login)) {
                location.reload();
              }
              // Render Errors In Response To The Proper Form
              else {
                if (isNotNullUndefinedOrEmpty(resPayload) && isNotNullUndefinedOrEmpty(resPayload.errors)) {
                  parseResponseErrors(form, resPayload.errors, null);
                } 
                else {
                  csrDataShare.debugErrors.push({
                    subject: 'Unexpected API ERROR While Attempting To Authenticate ( f24ffcdf-caa8-42c7-8f62-f581e7ebabb4 )',
                    responsePayload: resPayload,
                    sourceError: resPayload.errors
                  });
                  // Render Errors In Response To The Proper Form
                  parseResponseErrors(form, 'We are sorry, something went wrong. If you are logged in to your account, your Shopping Cart has been saved. Please come back later to complete the Checkout. If you do not have an account, please create one and your Shopping Cart will be saved for checkout later too. Thank you for your patience and again we apologize for this inconvenience. <br/><br/> Error ID ( 8f62 )');
                }
                // Enable Form Submit Button
                $('button', phase).prop('disabled', false);
                removeLoadingScreen();
              }
            }
            else {
              csrDataShare.debugErrors.push({
                subject: 'Unexpected API ERROR While Attempting To Authenticate ( 5787b0ff-8977-453c-9abd-4c6962f80624 )',
                responsePayload: resPayload
              });
              // Render Errors In Response To The Proper Form
              parseResponseErrors(form, 'We are sorry, something went wrong. If you are logged in to your account, your Shopping Cart has been saved. Please come back later to complete the Checkout. If you do not have an account, please create one and your Shopping Cart will be saved for checkout later too. Thank you for your patience and again we apologize for this inconvenience. <br/><br/> Error ID ( 9abd )');
              // Enable Form Submit Button
              $('button', phase).prop('disabled', false);
              removeLoadingScreen();
            }
          }
        });
      }
    });

    /** Shipping Address Phase -> Allow Authenticated User To Enter New Address
     * Displays manual address form that defaults to hidden for authenticated users.
     */
    $('div.add-shipping-address-button', this.element).delegate('button', 'click', function (e) {
      e.preventDefault();
      $('div.add-shipping-address-button').hide();
      $('form.main.shipping-address-form').show();
    });
    
    /** LOGIN PHASE -> CONTINUE AS GUEST ************************************************************************************************************************************************* //
     * Allow anonymous users to continue as guests
     */
    $('div.phase.login', this.element).delegate('form[name="guest"]', 'submit', function (e) {
      e.preventDefault();
      $('div#phase-login').hide();
      $('div#phase-ship-address').show();
      $('div#suggested-address-section').hide();
      $('div#phase-ship-address div.show-card-action').hide();
      $(window).scrollTop($('div#phase-ship-address').position().top);
    });

    /** ADDRESS PHASE -> MANUAL OR VAULTED ADDRESS ************************************************************************************************************************************************* //
     * Controls the submission of the shipping address and handling the validation of the customer's address.
     */
    $('div.phase.address', this.element).delegate('form[class*=shipping-address-form]', 'submit', function (e) {
      e.preventDefault();

      var submittedForm = $(e.target),
        phase = $(submittedForm).closest('.phase');

      // Disable Submit Buttons And Engage 'Loading' Element
      $('button', phase).prop('disabled', true);
      initiateLoadingScreen('Validating Address');
      $('.error-message', phase).remove();

      var manualForm = 'form.input.main.shipping-address-form[name=manual]',
        country = $('input[name="state_province"]', submittedForm).val() || $('select[name="state_province"]', submittedForm).val(),
        postalCode = $('input[name="postal_code"]', submittedForm).val() || "",
        proceedWithOriginalAddress = true,
        requestPayload = {
          action: "set_address",
          source: $(submittedForm).find('input[name="source"]').val() || null,
          phase: "address",
        },
        addressData = {
          'email': {
            selector: 'input[name=email]',
            value: $('input[name=email]', submittedForm).val() || null
          },
          'phone': {
            selector: 'input[name=phone]',
            value: sanitizeTelephoneNumber($('input[name=phone]', submittedForm).val()) || null
          },
          'phone_extension': {
            selector: 'input[name="telephone_extension"]',
            value: $('input[name="telephone_extension"]', submittedForm).val() || null
          },
          'first_name': {
            selector: 'input[name="first_name"]',
            value: $('input[name="first_name"]', submittedForm).val() || null
          },
          'last_name': {
            selector: 'input[name="last_name"]',
            value: $('input[name="last_name"]', submittedForm).val() || null
          },
          'country_code': {
            selector: 'input[name="country_code"]',
            value: $('input[name="country_code"]', submittedForm).val() || $('select[name="country_code"]', submittedForm).val() || null,
            suggested: null
          },
          'address[0]': {
            selector: 'input[name="address[0]"]',
            value: $('input[name="address[0]"]', submittedForm).val() || null,
            suggested: null
          },
          'address[1]': {
            selector: 'input[name="address[1]"]',
            value: $('input[name="address[1]"]', submittedForm).val() || null,
            suggested: null
          },
          'city_municipality': {
            selector: 'input[name="city_municipality"]',
            value: $('input[name="city_municipality"]', submittedForm).val() || null,
            suggested: null
          },
          'state_province': {
            selector: 'input[name="state_province"]',
            value: $('input[name="state_province"]', submittedForm).val() || $('select[name="state_province"]', submittedForm).val() || null,
            suggested: null
          },
          'postal_code': {
            selector: 'input[name="postal_code"]',
            value: ((country == "US") ? postalCode.substring(0,5) : postalCode),
            suggested: null
          },
          'usps': {
            selector: 'input[name="usps"]',
            value: $('input[name="usps"]', submittedForm).is(':checked'),
            suggested: 0
          },
          'address': {
            selector: 'input[name="id"]',
            value: $('input[name="id"]', submittedForm).val() || null || null,
          },
          'pobox': {
            value: 0,
            suggested: 0
          }
        };

      // If There Is An Address ID, Send It Along With The Action And Source
      if (isNotNullUndefinedOrEmpty(addressData['address']['value'])) {
        requestPayload['address'] = addressData['address']['value'];

        // For Convenience, All The Card's Address Info Is Copied Over To The Manual Form To Make Corrections Easier
        $(addressData['email']['selector'], manualForm).val(addressData['email']['value']);
        $(addressData['phone']['selector'], manualForm).val(addressData['phone']['value']);
        $(addressData['phone_extension']['selector'], manualForm).val(addressData['phone_extension']['value']);
        $(addressData['first_name']['selector'], manualForm).val(addressData['first_name']['value']);
        $(addressData['last_name']['selector'], manualForm).val(addressData['last_name']['value']);
        $(addressData['address[0]']['selector'], manualForm).val(addressData['address[0]']['value']);
        $(addressData['address[1]']['selector'], manualForm).val(addressData['address[1]']['value']);
        $(addressData['city_municipality']['selector'], manualForm).val(addressData['city_municipality']['value']);
        $(addressData['postal_code']['selector'], manualForm).val(addressData['postal_code']['value']);
        $(addressData['usps']['selector'], manualForm).val(((addressData['usps']['value'] == 1 || addressData['usps']['value'] == "true" || addressData['usps']['value'] == true) ? true : false));
        $('select[name=country_code] option[value=' + addressData['country_code']['value'] + ']', manualForm).prop('selected', true);
        $('select[name=state_province] option[value="' + addressData['state_province']['value'] + '"]', manualForm).prop('selected', true);
      }
      // If There Was No Address ID, Use The Manual Form, All Data Is Needed
      else {
        requestPayload['email'] = addressData['email']['value'];
        requestPayload['phone'] = addressData['phone']['value'];
        requestPayload['first_name'] = addressData['first_name']['value'];
        requestPayload['last_name'] = addressData['last_name']['value'];
        requestPayload['address[0]'] = addressData['address[0]']['value'];
        requestPayload['city_municipality'] = addressData['city_municipality']['value'];
        requestPayload['state_province'] = addressData['state_province']['value'];
        requestPayload['postal_code'] = addressData['postal_code']['value'];
        requestPayload['country_code'] = addressData['country_code']['value'];
        requestPayload['phone_extension'] = (isNotNullUndefinedOrEmpty(addressData['phone_extension']['value'])) ? addressData['phone_extension']['value'] : "";
        requestPayload['address[1]'] = (isNotNullUndefinedOrEmpty(addressData['address[1]']['value'])) ? addressData['address[1]']['value'] : "";
        requestPayload['usps'] = ((addressData['usps']['value'] == 1 || addressData['usps']['value'] == "true" || addressData['usps']['value'] == true) ? 1 : 0);
      }

      // Submit The Initial Address Request
      $.ajax({
        'url': '/shop/checkout/',
        'type': 'POST',
        'dataType': 'json',
        'data': requestPayload,
        'headers': {
          'Accept': 'application/json'
        },
        'complete': function (results) {
          var responseData = Object.create(results),
            responsePayload = responseData.responseJSON;
          // Request Worked, Reload Checkout State
          if (responseData.status == '200' && isNullUndefinedOrEmpty(responsePayload)) {
            that._checkoutStateController();
          }
          // Address Failed With Normal Error, Render UI
          else if (isNotNullUndefinedOrEmpty(responsePayload) && isNotNullUndefinedOrEmpty(responsePayload.errors) && isNullUndefinedOrEmpty(responsePayload.errors.validation)) {
            $(manualForm).show();
            $('div.add-shipping-address-button').hide();
            parseResponseErrors($(manualForm), responsePayload.errors);
            $(phase).scrollTop($('div#phase-ship-address').position().top);
            removeLoadingScreen();
          }
          // The Provided Address Results In A Suggested Change Or No Match Found
          else if (isNotNullUndefinedOrEmpty(responsePayload) && isNotNullUndefinedOrEmpty(responsePayload.errors) && isNotNullUndefinedOrEmpty(responsePayload.errors.validation)) {
            var errors = ((isNotNullUndefinedOrEmpty(responsePayload.errors)) ? responsePayload.errors : null),
              validation = ((isNotNullUndefinedOrEmpty(errors) && isNotNullUndefinedOrEmpty(errors.validation)) ? errors.validation : null),
              suggested = ((isNotNullUndefinedOrEmpty(validation) && isNotNullUndefinedOrEmpty(validation.suggested)) ? validation.suggested : null),
              scores = {};
            // Populate Override Option
            {
              $('div#original-name', 'div#use-original').text(addressData['first_name']['value'] + ' ' + addressData['last_name']['value']);
              $('div#original-address-one', 'div#use-original').text(addressData['address[0]']['value']);
              $('div#original-address-two', 'div#use-original').text(addressData['address[1]']['value']);
              $('div#original-city-state-zip', 'div#use-original').text(addressData['city_municipality']['value'] + ', ' + addressData['state_province']['value'] + ' ' + addressData['postal_code']['value']);

              $('input[name="email"]', 'form[name="use-original"]').val(addressData['email']['value']);
              $('input[name="phone"]', 'form[name="use-original"]').val(addressData['phone']['value']);
              $('input[name="telephone_extension"]', 'form[name="use-original"]').val(addressData['phone_extension']['value']);
              $('input[name="first_name"]', 'form[name="use-original"]').val(addressData['first_name']['value']);
              $('input[name="last_name"]', 'form[name="use-original"]').val(addressData['last_name']['value']);
              $('input[name="country_code"]', 'form[name="use-original"]').val(addressData['country_code']['value']);
              $('input[name="address[0]"]', 'form[name="use-original"]').val(addressData['address[0]']['value']);
              $('input[name="address[1]"]', 'form[name="use-original"]').val(addressData['address[1]']['value']);
              $('input[name="city_municipality"]', 'form[name="use-original"]').val(addressData['city_municipality']['value']);
              $('input[name="state_province"]', 'form[name="use-original"]').val(addressData['state_province']['value']);
              $('input[name="postal_code"]', 'form[name="use-original"]').val(addressData['postal_code']['value']);
              $('input[name="usps"]', 'form[name="use-original"]').val(((addressData['usps']['value'] == 1) ? true : false));
            }

            // Address Returned A Suggested Address
            if (isNotNullUndefinedOrEmpty(validation) && isNotNullUndefinedOrEmpty(suggested)) {
              scores = {
                city_municipality: ((validation['city_municipality']) ? +(validation['city_municipality']) : 0),
                clean: ((validation['clean']) ? +(validation['clean']) : 0),
                postal_code: ((validation['postal_code']) ? +(validation['postal_code']) : 0),
                state_province: ((validation['state_province']) ? +(validation['state_province']) : 0),
                street: ((validation['street']) ? +(validation['street']) : 0),
              };
              csrDataShare.shippingAddressScores = scores;
              csrDataShare.shippingAddressScores['pobox'] = suggested.pobox || false;

              // If A Score Is Under 100, Then Force The Change Interface
              for (key in scores) {
                if (key != 'pobox' && scores[key] < 100) {
                  proceedWithOriginalAddress = false;
                }
              }

              // Acceptance Was High Enough, Resubmit And Set As Final
              if (proceedWithOriginalAddress) {
                // Reset Request Payload Data
                {
                  delete requestPayload['address'];
                  requestPayload['pobox'] = ((suggested.pobox == true || suggested.pobox == "true" || suggested.pobox == 1) ? 1 : 0);
                  requestPayload['source'] = 'bypass';
                  requestPayload['address[0]'] = addressData['address[0]']['suggested'] = suggested.address[0];
                  requestPayload['address[1]'] = addressData['address[1]']['suggested'] = suggested.address[1];
                  requestPayload['city_municipality'] = addressData['city_municipality']['suggested'] = suggested.city_municipality;
                  requestPayload['country_code'] = addressData['country_code']['suggested'] = suggested.country_code;
                  requestPayload['email'] = addressData['email']['suggested'] = suggested.email;
                  requestPayload['first_name'] = addressData['first_name']['suggested'] = suggested.first_name;
                  requestPayload['last_name'] = addressData['last_name']['suggested'] = suggested.last_name;
                  requestPayload['phone'] = addressData['phone']['suggested'] = sanitizeTelephoneNumber(suggested.phone);
                  requestPayload['phone_extension'] = addressData['phone_extension']['suggested'] = suggested.phone_extension;
                  requestPayload['postal_code'] = addressData['postal_code']['suggested'] = ((suggested.country_code == "US") ? suggested.postal_code.substring(0,5) : suggested.postal_code);
                  requestPayload['state_province'] = addressData['state_province']['suggested'] = suggested.state_province;
                  requestPayload['usps'] = addressData['usps']['suggested'] = ((suggested.usps == 1 || suggested.usps == true || suggested.usps == "true") ? 1 : 0);
                  // ** These Fields Are Not Currently In Use **
                  // requestPayload['address[3]'] = suggested['address']['3'];
                  // requestPayload['organization_name'] = suggested['organization_name'];
                }

                // For Convenience, All The Card's Address Info Is Copied Over To The Manual Form To Make Corrections Easier
                {
                  $(addressData['email']['selector'], manualForm).val(addressData['email']['suggested']);
                  $(addressData['phone']['selector'], manualForm).val(addressData['phone']['suggested']);
                  $(addressData['phone_extension']['selector'], manualForm).val(addressData['phone_extension']['suggested']);
                  $(addressData['first_name']['selector'], manualForm).val(addressData['first_name']['suggested']);
                  $(addressData['last_name']['selector'], manualForm).val(addressData['last_name']['suggested']);
                  $(addressData['address[0]']['selector'], manualForm).val(addressData['address[0]']['suggested']);
                  $(addressData['address[1]']['selector'], manualForm).val(addressData['address[1]']['suggested']);
                  $(addressData['city_municipality']['selector'], manualForm).val(addressData['city_municipality']['suggested']);
                  $(addressData['postal_code']['selector'], manualForm).val(addressData['postal_code']['suggested']);
                  $(addressData['usps']['selector'], manualForm).val(((addressData['usps']['suggested'] == 1) ? true : false));
                  $('select[name=country_code] option[value=' + addressData['country_code']['suggested'] + ']', manualForm).prop('selected', true);
                  $('select[name=state_province] option[value="' + addressData['state_province']['suggested'] + '"]', manualForm).prop('selected', true);
                }

                // Override Should Succeed
                $.ajax({
                  'url': '/shop/checkout/',
                  'type': 'POST',
                  'dataType': 'json',
                  'data': requestPayload
                })
                .always(function(responseData, responseTextStatus, response) {
                  // Call Worked
                  if (responseTextStatus == 'success' && responseData == null) {
                    that._checkoutStateController();
                  }
                  // Call Did Not Work
                  else {
                    csrDataShare.debugErrors.push({
                      subject: 'Unexpected API ERROR While Attempting To Auto-Override Address ( c2f61e9d-b666-4aa8-be44-94c81386e381 )',
                      sourceError: response
                    });
                    // Render Errors In Response To The Proper Form
                    parseResponseErrors($(manualForm), 'We are sorry, something went wrong. If you are logged in to your account, your Shopping Cart has been saved. Please come back later to complete the Checkout. If you do not have an account, please create one and your Shopping Cart will be saved for checkout later too. Thank you for your patience and again we apologize for this inconvenience. <br/><br/> Error ID ( be44 )');
                    removeLoadingScreen();
                  }
                });
              }
              // Acceptance Was Not High Enough, Display Suggested Address Change Section
              else {
                addressData['address[0]']['suggested'] = suggested['address']['0'];
                addressData['address[1]']['suggested'] = suggested['address']['1'];
                addressData['city_municipality']['suggested'] = suggested['city_municipality'];
                addressData['country_code']['suggested'] = suggested['country_code'];
                addressData['email']['suggested'] = suggested['email'];
                addressData['first_name']['suggested'] = suggested['first_name'];
                addressData['last_name']['suggested'] = suggested['last_name'];
                addressData['phone']['suggested'] = sanitizeTelephoneNumber(suggested['phone']);
                addressData['phone_extension']['suggested'] = suggested['phone_extension'];
                addressData['postal_code']['suggested'] = suggested['postal_code'];
                addressData['state_province']['suggested'] = ((suggested['country_code'] == "US") ? suggested['state_province'].substring(0,5) : suggested['state_province']);
                addressData['usps']['suggested'] = ((suggested['usps'] == true || suggested['usps'] == "true" || suggested['usps'] == 1) ? 1 : 0);
                addressData['pobox']['suggested'] = ((suggested['pobox'] == true || suggested['pobox'] == "true" || suggested['pobox'] == 1) ? 1 : 0);

                $('div#suggested-address-one', 'div#use-suggested').text(addressData['address[0]']['suggested']);
                $('div#suggested-address-one', 'div#use-suggested').text(addressData['address[0]']['suggested']);
                $('div#suggested-name', 'div#use-suggested').text(addressData['first_name']['suggested'] + ' ' + addressData['last_name']['suggested']);
                $('div#suggested-address-one', 'div#use-suggested').text(addressData['address[0]']['suggested']);
                $('div#suggested-address-two', 'div#use-suggested').text(addressData['address[1]']['suggested']);
                $('div#suggested-city-state-zip', 'div#use-suggested').text(addressData['city_municipality']['suggested'] + ', ' + addressData['state_province']['suggested'] + ' ' + addressData['postal_code']['suggested']);

                $('input[name="pobox"]', 'form[name="use-suggested"]').val(addressData['pobox']['suggested']);
                $('input[name="email"]', 'form[name="use-suggested"]').val(addressData['email']['value']);
                $('input[name="phone"]', 'form[name="use-suggested"]').val(sanitizeTelephoneNumber(addressData['phone']['suggested']));
                $('input[name="telephone_extension"]', 'form[name="use-suggested"]').val(addressData['phone_extension']['suggested']);
                $('input[name="first_name"]', 'form[name="use-suggested"]').val(addressData['first_name']['suggested']);
                $('input[name="last_name"]', 'form[name="use-suggested"]').val(addressData['last_name']['suggested']);
                $('input[name="country_code"]', 'form[name="use-suggested"]').val(addressData['country_code']['suggested']);
                $('input[name="address[0]"]', 'form[name="use-suggested"]').val(addressData['address[0]']['suggested']);
                $('input[name="address[1]"]', 'form[name="use-suggested"]').val(addressData['address[1]']['suggested']);
                $('input[name="city_municipality"]', 'form[name="use-suggested"]').val(addressData['city_municipality']['suggested']);
                $('input[name="state_province"]', 'form[name="use-suggested"]').val(addressData['state_province']['suggested']);
                $('input[name="postal_code"]', 'form[name="use-suggested"]').val(addressData['postal_code']['suggested']);
                $('input[name="usps"]', 'form[name="use-suggested"]').val(((addressData['usps']['suggested'] == 1) ? true : false));

                // Show & Hide Appropriate Content
                $('div#saved-address-shipping').css('display', 'none');
                $('div#saved-address-shipping').hide();
                $('div#suggested-address-section').show();
                $('div#manual-entry').css('display', 'none');
                $('div#manual-entry').hide();
                $('div#address-change').css('display', 'inline-block');
                $('div#address-change').show();
                $('div#use-original').css('display', 'inline-block');
                $('div#use-original').show();
                $('div#use-suggested').parent().show();
                $(phase).scrollTop($('div#phase-ship-address').position().top);
                removeLoadingScreen();
              }
            }
            // Address Failed Validation With No Suggestion (No Match)
            else {
              // Show & Hide Appropriate Content
              $('div#saved-address-shipping').css('display', 'none');
              $('div#saved-address-shipping').hide();
              $('div#manual-entry').css('display', 'none');
              $('div#manual-entry').hide();
              $('div#address-change').css('display', 'inline-block');
              $('div#address-change').show();
              $('div#use-original').css('display', 'inline-block');
              $('div#use-original').show();
              $('div#use-suggested').parent().hide();
              $('div#suggested-address-section').css('display', 'inline-block');
              $('div#suggested-address-section').show();
              $(window).scrollTop($('div#phase-ship-address').position().top);
              removeLoadingScreen();
            }
          }
          // Unexpected Conditions Have Occurred
          else {
            csrDataShare.debugErrors.push({
              subject: 'Shipping Validation Did Not Return In Expected State ( fa712e49-f7c6-426e-a6b0-12384e245a77 )',
              sourceError: responseData
            });
            parseResponseErrors($(manualForm), 'We are sorry, something went wrong. If you are logged in to your account, your Shopping Cart has been saved. Please come back later to complete the Checkout. If you do not have an account, please create one and your Shopping Cart will be saved for checkout later too. Thank you for your patience and again we apologize for this inconvenience. <br/><br/> Error ID ( a6b0 )');
            $(phase).scrollTop($('div#phase-ship-address').position().top);
            removeLoadingScreen();
          }
        }
      }).done(function () {
        // Enable Form Submit Button
        $('button', phase).prop('disabled', false);
      });
    });


    /** ************************************************************************************************************************************************* //
     * SHIPPING SERVICE PHASE -> SUBMIT SELECTION
     * 
     * Enables the shipping method form to submit the shipping service selection.
     * 
     */
    $('div.phase.service', this.element).delegate('form[name="service"]', 'submit', function (e) {
      e.preventDefault();

      var form = $('div#phase-ship-method form[name="service"]'),
        phase = $(form).closest('.phase'),
        note = $(form).find('input[name="note"]').val(),
        requestPayload = {
          action: 'set_service',
          service: $(form).find('input[name=service]:checked').attr('value'),
          note: ((isNotNullUndefinedOrEmpty(note)) ? note : null)
        };

      // Set The Partial Ship Data
      if (form.find('input[name="partial-complete-ship"]:checked').attr('value') == 'partial-ship') {
        requestPayload['partialship'] = 1;
      }
      else {
        requestPayload['partialship'] = 0;
      }

      // Disable Submit Buttons And Engage 'Loading' Element
      $('button#checkout-ship-method-button', form).prop('disabled', true);
      initiateLoadingScreen();
      $('.error-message', form).remove();

      $.ajax({
        'url': '/shop/checkout/',
        'type': 'POST',
        'dataType': 'json',
        'data': requestPayload,
        'complete': function (data) {
          var response = Object.create(data),
            resPayload = response.responseJSON;

          if (response.status === 200) {
            if (resPayload != null && resPayload.errors) {
              $(window).scrollTop($(phase).position().top);
              parseResponseErrors(form, resPayload.errors);
            }
            else {
              that._checkoutStateController();
            }
          }
          else {
            csrDataShare.debugErrors.push({
              subject: 'Unexpected API ERROR While Attempting To Submit Shipping Service ( 2d778bbd-0959-42ac-aaff-4dded8636b3a )',
              sourceError: resPayload.errors
            });
            // Render Errors In Response To The Proper Form
            parseResponseErrors(form, 'We are sorry, something went wrong. If you are logged in to your account, your Shopping Cart has been saved. Please come back later to complete the Checkout. If you do not have an account, please create one and your Shopping Cart will be saved for checkout later too. Thank you for your patience and again we apologize for this inconvenience. <br/><br/> Error ID ( aaff )');
          }
          //Enable form submit button
          $('button#checkout-ship-method-button', form).prop('disabled', false);
          removeLoadingScreen();
        }
      });
    });


    /** ************************************************************************************************************************************************* //
     * PAYMENT PHASE -> VAULTED/MANUAL SHIPPING ADDRESS
     * 
     * Enables vaulted shipping addresses (as billing addresses) and the manual billing address form to submit the payment method.  This does not 
     * support the use of a vaulted payment method.
     * 
     */
    $('div.phase.payment', this.element).delegate('form[class*="billing-address-form"]', 'submit', function (e) {
      e.preventDefault();
      var form = e.target,
        phase = $(form).closest('.phase'),
        vaultedAddressId = $(form).find('input[name="id"]').val(),
        firstName = $(form).find('input[name="payment[address][first_name]"]').val(),
        lastName = $(form).find('input[name="payment[address][last_name]"]').val(),
        countryCode = $(form).find('select[name="payment[address][country_code]"]').val() || $(form).find('input[name="payment[address][country_code]"]').val(),
        addressOne = $(form).find('input[name="payment[address][address][0]"]').val(),
        addressTwo = $(form).find('input[name="payment[address][address][1]"]').val(),
        cityMunicipality = $(form).find('input[name="payment[address][city_municipality]"]').val(),
        stateProvince = $(form).find('select[name="payment[address][state_province]"]').val() || $(form).find('input[name="payment[address][state_province]"]').val(),
        postalCode = $(form).find('input[name="payment[address][postal_code]"]').val(),
        requestPayload = {
          action: 'set_payment',
          phase: 'payment',
          source: 'creditcard',
          type: 'creditcard',
          "payment[number]": $(phase).find('input[name="payment[number]"]').val(),
          "payment[expires_month]": $(phase).find('select[name="payment[expires_month]"] option:checked').val(),
          "payment[expires_year]": $(phase).find('select[name="payment[expires_year]"] option:checked').val(),
          "payment[cvc]": $(phase).find('input[name="payment[cvc]"]').val(),
          "return-redirect": false
        };

      // Manual Card + Shipping Address
      if ($(form).find('input[name="shipping"]').attr('value') == 'true') {
        requestPayload["payment[address_source]"] = "shipping";
        requestPayload['source'] = "shipping";
      }
      // Manual Card + Vaulted Address
      else if (vaultedAddressId != null && vaultedAddressId != undefined) {
        requestPayload['payment[address_source]'] = vaultedAddressId;
      }
      // Manual Card + Manual Address
      else {
        requestPayload['payment[address_source]'] = 'manual';
        requestPayload['payment[address][first_name]'] = firstName;
        requestPayload['payment[address][last_name]'] = lastName;
        requestPayload['payment[address][country_code]'] = countryCode;
        requestPayload['payment[address][address][0]'] = addressOne;
        requestPayload['payment[address][address][1]'] = ((isNullUndefinedOrEmpty(addressTwo)) ? "" : addressTwo);
        requestPayload['payment[address][city_municipality]'] = cityMunicipality;
        requestPayload['payment[address][state_province]'] = stateProvince;
        requestPayload['payment[address][postal_code]'] = postalCode;
      }

      // Disable Submit Buttons And Engage 'Loading' Element
      $('.error-message').remove();
      $('button', form).prop('disabled', true);
      initiateLoadingScreen('Validating Payment Info');

      // For Convenience, Copy Information From 'Address Cards' To Manual Input Form
      $('form#checkout-payment-billing-form').find('div.form-field input[name="payment[address][first_name]"]').val(firstName);
      $('form#checkout-payment-billing-form').find('div.form-field input[name="payment[address][last_name]"]').val(lastName);
      $('form#checkout-payment-billing-form').find('div.form-field select[name="payment[address][country_code]"]').val(countryCode);
      $('form#checkout-payment-billing-form').find('div.form-field input[name="payment[address][address][0]"]').val(addressOne);
      $('form#checkout-payment-billing-form').find('div.form-field input[name="payment[address][address][1]"]').val(addressTwo);
      $('form#checkout-payment-billing-form').find('div.form-field input[name="payment[address][city_municipality]"]').val(cityMunicipality);
      $('form#checkout-payment-billing-form').find('div.form-field select[name="payment[address][state_province]"]').val(stateProvince);
      $('form#checkout-payment-billing-form').find('div.form-field input[name="payment[address][postal_code]"]').val(postalCode);

      if(csrDataShare.quality.turn > 6) {
        setTimeout(function() {
          // Render Errors In Response To The Proper Form
          parsePaymentResponseErrors('Unexpected Error Encountered, Please Refresh and Try Again.  If the Problem Persists, Please Contact Customer Service');
          // Enable Form Submit Button
          $('button', form).prop('disabled', false);
        }, 3000);
      }
      else {
        var earnedTime = (csrDataShare.quality.turn > 2) ? 20000 : 0;
  
        setTimeout(function() {
          // Reusable Call To Attempt To Auto-Handle Known Issues Before The User Hits Them
          submitPaymentMethod(requestPayload, form)
            .then(function (responseData) {
              var unexpectedErrors = true;
              csrDataShare.quality.turn++;
              if (isNotNullUndefinedOrEmpty(responseData) && responseData.status === 200) {
                // Expected Payload and Status For Successful Request
                if (isNullUndefinedOrEmpty(responseData.responseJSON)) {
                  unexpectedErrors = false;
                  that._checkoutStateController();
                  window.scrollTo(0, 0);
                }
                // Render Expected Errors In Response To The Proper Form
                else if (isNotNullUndefinedOrEmpty(responseData.responseJSON.errors)) {
                  unexpectedErrors = false;
                  csrDataShare['rawPaymentError'] = responseData.responseJSON.errors;
                  parsePaymentResponseErrors(responseData.responseJSON.errors);
                }
              }
    
              if (unexpectedErrors == true) {
                csrDataShare.debugErrors.push({
                  subject: 'Unexpected API ERROR While Attempting To Set Payment ( 07dc7d55-550e-4e33-ab4d-8372ddeb476c )',
                  sourceError: responseData
                });
                // Render Errors In Response To The Proper Form
                parsePaymentResponseErrors('Unexpected Error Encountered, Please Refresh and Try Again.  If the Problem Persists, Please Contact Customer Service <br/><br/> Error ID ( ab4d )');
              }
    
              // Enable Form Submit Button
              $('button', form).prop('disabled', false);
              removeLoadingScreen();
            })
            .catch(function (error) {
              csrDataShare.quality.turn++;
              csrDataShare.debugErrors.push({
                subject: 'Unexpected API ERROR While Attempting To Set Payment ( 0bb64943-350b-4406-abe4-d63445629d23 )',
                sourceError: error
              });
              // Render Errors In Response To The Proper Form
              parsePaymentResponseErrors('Unexpected Error Encountered, Please Refresh and Try Again.  If the Problem Persists, Please Contact Customer Service <br/><br/> Error ID ( abe4 )');
              // Enable Form Submit Button
              $('button', form).prop('disabled', false);
              removeLoadingScreen();
            });
        }, earnedTime);
      }
    });

    /** ************************************************************************************************************************************************* //
     * PAYMENT PHASE -> VAULTED PAYMENT METHOD FORMS
     * 
     * Enables vaulted payment method cards to set the order's payment method.
     * 
     */
    $('div.phase.payment', this.element).delegate('form[class*="vaulted-payment-form"]', 'submit', function (e) {
      e.preventDefault();
      var form = e.target,
        phase = $(form).closest('.phase'),
        requestPayload = {
          action: $(form).find('input[name="action"]').val(),
          source: $(form).find('input[name="source"]').val(),
          payment: $(form).find('input[name="payment"]').val(),
          'return-redirect': false
        };

      // Disable Submit Buttons And Engage 'Loading' Element
      $('.error-message').remove();
      $('button', form).prop('disabled', true);
      initiateLoadingScreen('Validating Payment Info');

      if(csrDataShare.quality.turn > 6) {
        setTimeout(function() {
          parsePaymentResponseErrors('Unexpected Error Encountered, Please Wait and Try Again.  If the Problem Persists, Please Contact Customer Service <br/><br/> Error ID ( HPe4 )');
          removeLoadingScreen();
          $('button', form).prop('disabled', false);
        }, 3000);
      }
      else {
        var earnedTime = (csrDataShare.quality.turn > 2) ? 20000 : 0;

        setTimeout(function() {
          // Reusable Call To Attempt To Auto-Handle Known Issues Before The User Hits Them
          submitPaymentMethod(requestPayload, form)
            .then(function (responseData) {
              var unexpectedErrors = true;
              csrDataShare.quality.turn++;
    
              if (isNotNullUndefinedOrEmpty(responseData) && responseData.status === 200) {
                // Expected Payload and Status For Successful Request
                if (isNullUndefinedOrEmpty(responseData.responseJSON)) {
                  unexpectedErrors = false;
                  that._checkoutStateController();
                  window.scrollTo(0, 0);
                }
                // Render Expected Errors In Response To The Proper Form
                else if (isNotNullUndefinedOrEmpty(responseData.responseJSON.errors)) {
                  unexpectedErrors = false;
                  csrDataShare['rawPaymentError'] = responseData.responseJSON.errors;
                  // parseCheckoutPaymentErrors(responseData.responseJSON.errors);
                  parsePaymentResponseErrors(responseData.responseJSON.errors);
                }
              }
    
              if (unexpectedErrors == true) {
                csrDataShare.debugErrors.push({
                  subject: 'Unexpected API ERROR While Attempting To Set Payment ( 98059b52-5e28-44d2-a304-e8d00b3e0694 )',
                  sourceError: responseData
                });
                // Render Errors In Response To The Proper Form
                parsePaymentResponseErrors('Unexpected Error Encountered, Please Refresh and Try Again.  If the Problem Persists, Please Contact Customer Service  <br/><br/> Error ID ( 44d2 )');
              }
    
              // Enable Form Submit Button
              $('button', form).prop('disabled', false);
              removeLoadingScreen();
            })
            .catch(function (error) {
              csrDataShare.quality.turn++;
              csrDataShare.debugErrors.push({
                subject: 'Critical Unexpected API ERROR While Attempting To Set Payment ( 923655c2-9a67-44ab-82e5-d63c52f7939c )',
                sourceError: error
              });
              // Render Errors In Response To The Proper Form
              parsePaymentResponseErrors('Unexpected Error Encountered, Please Refresh and Try Again.  If the Problem Persists, Please Contact Customer Service  <br/><br/> Error ID ( 82e5 )');
    
              // Enable Form Submit Button
              $('button', form).prop('disabled', false);
              removeLoadingScreen();
            });
        }, earnedTime);
      }
    });


    /** ************************************************************************************************************************************************* //
     * REVIEW PHASE -> FINAL SUBMIT
     * 
     * Enable review forms to submit the final order with any customer notes.
     * 
     */
    $('div#body', this.element).delegate('form[name="submit-order"]', 'submit', function (e) {
      e.preventDefault();
      var form = $(e.target),
        phase = $(form).closest('.phase'),
        manualForm = $('form.error-target[name="submit-order"]'),
        requestPayload = {
          action: $(form).find('input[name="action"]').val(),
          note: manualForm.find('textarea[name="note"]').val(),
          'return-redirect': false,
        };

      // Disable Submit Buttons And Engage 'Loading' Element
      $('button', form).prop('disabled', true);
      initiateLoadingScreen('Placing Order...')

      $.ajax({
        'url': '/shop/checkout/',
        'type': 'POST',
        'dataType': 'json',
        'data': requestPayload,
        'headers': {
          'Accept': 'application/json'
        },
        'complete': function (data) {
          var response = Object.create(data),
          resPayload = response.responseJSON;

          if (resPayload != null && resPayload.errors) {
            // render on manual input form
            parseResponseErrors(manualForm, resPayload.errors);
          } else {
            // Navigate To Receipt View
            if (resPayload && resPayload.success && resPayload.success.redirect) {
              window.location.href = resPayload.success.redirect;
            } else {
              csrDataShare.debugErrors.push({
                subject: 'Unexpected API ERROR Attempting To Submit Checkout ( ba4dccbf-4aa1-4976-a5c2-7a234c416b66 )',
                sourceError: resPayload,
                additionalData: response
              });
              parseResponseErrors(form, 'We are sorry, something went wrong. If you are logged in to your account, your Shopping Cart has been saved. Please come back later to complete the Checkout. If you do not have an account, please create one and your Shopping Cart will be saved for checkout later too. Thank you for your patience and again we apologize for this inconvenience. <br/><br/> Error ID ( a5c2 )');
            }
            window.scrollTo(0, 0);
          }

          // Enable Form Submit Button
          $('button', form).prop('disabled', false);
          removeLoadingScreen();
        }
      });
    });
  },


  // Init
  '_init': function () {
    this._super();
    var that = this;
  },

  // PARSE THUMBNAIL - Converts Product Data Into A Usable Thumbnail Image Link
  '_parseThumbnail': function (thumbnail, brand) {
    var returnValue = "";

    // Product Image Data Is Available, Use It...
    if (thumbnail && thumbnail.file && thumbnail.file.checksum && thumbnail.file.size) {
      returnValue = ('/img/assets/asset/' + thumbnail.file.checksum + '/' + thumbnail.file.size + '/thumb.png');
    }
    // Default to 'brand' generic logo image
    else {
      var brandUrl = brand.toLowerCase().replace(/[^0-9a-z]+/g, '-').replace(/^-+|-+$/gm, '');
      returnValue = ('/img/assets/brand/' + brandUrl + '/thumb.png');
    }
    return returnValue;
  },

  // POPULATE REVIEW ORDER - Populates the Review phase with appropriate order details.
  '_populateReviewOrder': function (quote, payment, getShopPayload, currentPartialShipValue) {
    if (quote != null && quote != undefined && quote.items != null && quote.items != undefined && quote.items.length >= 1) {
      var that = this,
        quoteItems = quote.items,
        phase = $('div#cart-item-list-container').closest('.phase'),
        itemDetailList = {};

      // Collect The Items Prices, Quantity, and Taxes
      for (var key in quoteItems) {
        itemDetailList[quoteItems[key].product] = {
          lineItemPrice: quoteItems[key].price,
          productId: quoteItems[key].product,
          qty: quoteItems[key].quantity,
          tax: quoteItems[key].tax
        };
      }

      var cartItems = getShopPayload.shopcart.items;

      for (var key in cartItems) {
        if (cartItems[key] != null && cartItems[key] != undefined && cartItems[key].product != null && cartItems[key].product != undefined && cartItems[key].product.id != null && cartItems[key].product.id != undefined) {
          var product = cartItems[key].product;

          itemDetailList[product.id]['regularUnitPrice'] = product.stock.regular;
          itemDetailList[product.id]['unitPrice'] = product.stock.price;
          itemDetailList[product.id]['oem'] = product.oem;
          itemDetailList[product.id]['supersede'] = (product.supersede && product.supersede.title) ? product.supersede.title : "";
          itemDetailList[product.id]['thumbnail'] = product.thumbnail;
          itemDetailList[product.id]['description'] = product.description;
          itemDetailList[product.id]['title'] = product.title;
          itemDetailList[product.id]['timeToShip'] = product.stock.time_to_ship;
          itemDetailList[product.id]['availability'] = product.stock.availability;
          itemDetailList[product.id]['qoh'] = product.stock.quantity_on_hand;
        }
      };

      var lineItemsHtml = "",
        lineItemCount = getShopPayload.shopcart.count,
        subtotal = getShopPayload.shopcart.subtotal,
        shippingCost = quote.service.rate,
        shippingTax = quote.service.tax,
        lineItemTax = 0.0;

      for (var key in itemDetailList) {
        // Build The Thumbnail & Supersede Data For Each Product
        var thumbnail = that._parseThumbnail(itemDetailList[key].thumbnail, itemDetailList[key].oem),
          supersedeData = ((itemDetailList[key].supersede != "") ? (
            '<span>(Superseded to </span>' +
            '<span class="part-number">' + itemDetailList[key].supersede + '</span>' +
            '<span>)</span>' +
            '<a href="/help/faq/#shopping-supersede" class="faq-help" target="_blank"> <i class="far fa-question-circle"></i></a>'
          ) : '');

        // Build Each Product's Line Item Listing

        lineItemsHtml += (
          '<div class="card rounded shadow-sm mx-0 p-05 my-1 mx-sm-2 my-md-3" data-product-id="' + itemDetailList[key].productId + '">' +
          '<div class="row no-gutters">' +
          '<div class="card-img d-inline align-content-center justify-content-center col-3 col-sm-2">' +
          '<img class="img-fit mx-auto my-auto" src="' + thumbnail + '"></img>' +
          '</div>' +
          '<div class="details part text-left col px-2">' +
          '<div>' +
          '<h3 class="title">' +
          '<span class="manufacturing-brand">' + itemDetailList[key].oem + '</span>' +
          '<span> Part# </span>' +
          '<span class="part-number" title="' + itemDetailList[key].title + '">' + itemDetailList[key].title + '</span>' +
          '</h3>' +
          '<h4 class="description h5 my-2" title="' + itemDetailList[key].description + '">' + itemDetailList[key].description + 
          ((supersedeData != null && supersedeData != undefined && supersedeData != "") ? ('<p class="supersede"> ' + supersedeData + '</p>') : "") +
  '</h4>' +
          '</div>' +
          '</div>' +
          '<div class="price col-12 col-sm-auto text-right mt-auto mb-0 mr-0 pr-2 pb-2 ml-auto">' +
          '<div class="item">' +
          '<div class="subtotal h2 mb-n1">' +
          '$' +
          '<span class="price">' + (+(itemDetailList[key].lineItemPrice) * +(itemDetailList[key].qty)).toFixed(2) + '</span>' +
          '<span> / qty </span>' +
          '<span class="quantity">' + itemDetailList[key].qty + '</span>' +
          '</div>' +
          '<div class="each">' +
          '($' +
          '<span class="price">' + (+(itemDetailList[key].unitPrice)).toFixed(2) + '</span>' +
          ' each)' +
          '</div>' +
          '</div>' +
          '<p class="shipping mb-1 mb-sm-2">' +
          '<span class="text-info time-to-ship">' + that._parseTimeToShip(itemDetailList[key].timeToShip, itemDetailList[key].availability, itemDetailList[key].qoh) + '</span>' +
          '</p>' +
          '</div>' +
          '</div>' +
          '</div>');

        // Calculate The Tax For The Line Items
        lineItemTax += (+(itemDetailList[key].tax) * +(itemDetailList[key].qty));
      };

      // Item Listing
      $(phase).find('div#cart-item-list-container').html(lineItemsHtml);

      // Populate Final Review Summary Data

      // Shipping Address Details Card
      $(phase).find('*#first-last-name').text((quote['address']['first_name'] + ' ' + quote['address']['last_name']));
      $(phase).find('*#address-one').text(quote['address']['address'][0]);
      $(phase).find('*#address-two').text(quote['address']['address'][1]);
      $(phase).find('*#city-state-zip').text((quote['address']['city_municipality'] + ', ' + quote['address']['state_province']) + ' ' + quote['address']['postal_code']);
      $(phase).find('*#country').text(quote['address']['country_code']);
      $(phase).find('*#email').text(quote['address']['email']);

      // Shipping Shipping Service Details Card
      var shippingBaseText = quote['service']['carrier'] + " " + quote['service']['title'] + ": $";

      if (currentPartialShipValue == true) {
        var halfValue = (parseFloat(quote['service']['rate']) / 2).toFixed(2);

        $(phase).find('div#shipping-title').text("1st: " + shippingBaseText + halfValue);
        $(phase).find('div#partial-shipping-second-service').text("2nd: " + shippingBaseText + halfValue);
        $(phase).find('div#partial-shipping-second-service').show();

        }
      else {
        $(phase).find('div#shipping-title').text(shippingBaseText + quote['service']['rate']);
        $(phase).find('div#partial-shipping-second-service').hide();
      }

      // Payment Details Card
      $(phase).find('div#payment-details').text(payment['description']);

      // Costs Details Card
      $(phase).find('span#cost-item-count').text(lineItemCount);
      $(phase).find('span#cost-subtotal').text((+(subtotal)).toFixed(2));
      $(phase).find('span#cost-shipping').text((+(shippingCost)).toFixed(2));
      $(phase).find('span#cost-tax').text((+(lineItemTax) + +(shippingTax)).toFixed(2));
      $(phase).find('span#cost-grandtotal').text((+(subtotal) + +(shippingCost) + +(lineItemTax) + +(shippingTax)).toFixed(2));
    }
  },

  // POPULATE VAULTED ADDRESSES FOR SHIPPING - Determines what, if any, addresses should be populated in the shipping vaulted address section.
  '_populateVaultedShipAddresses': function (addresses) {
    var that = this,
      cardCount = 0,
      vaultedAddressPhaseSection = 'div#saved-address-shipping',
      shipAddressContainer = 'div#shipping-addresses-container';

    // Clear Current Contents Of Stored Address Cards
    $(shipAddressContainer + ' > *').remove();

    // Loop Through Provided Addresses And Generate Cards To Append To Saved Address Sections
    if (isNotNullUndefinedOrEmpty(addresses)) {
      $(vaultedAddressPhaseSection).show();
      $(shipAddressContainer).show();
      for (var key in addresses) {
        // Currently Limiting To 8 Cards Due To Display 'Overload'
        if (cardCount < 8) {
          var tempAddress = {
            addressId: addresses[key].id,
            // ? Manual Truncation Of Title, Should Be Able To Handle In CSS Instead?
            title: that._escapeHtml((addresses[key].title.length > 16) ? (addresses[key].title.substring(0, 16) + '...') : addresses[key].title),
            email: that._escapeHtml(addresses[key].email),
            firstName: that._escapeHtml(addresses[key].first_name),
            lastName: that._escapeHtml(addresses[key].last_name),
            addressOne: that._escapeHtml(addresses[key].address[0]),
            addressTwo: that._escapeHtml(addresses[key].address[1]),
            city: that._escapeHtml(addresses[key].city_municipality),
            state: that._escapeHtml(addresses[key].state_province),
            zip: that._escapeHtml(addresses[key].postal_code),
            country: that._escapeHtml(addresses[key].country_code),
            description: that._escapeHtml(addresses[key].description),
            email: that._escapeHtml(addresses[key].email)
          },
            // Build The UI Card For The Address
            addressCard =
              '<div class="col-md-3 my-2">' +
              '<div class="card rounded shadow-sm mx-2 p-0 h-100">' +
              '<h3 class="card-header bg-light h5 py-2 mb-0 text-center">' + tempAddress.title + '</h3>' +
              '<div class="card-body px-1 py-0">' +
              '<ul class="list-group list-group-flush mx-1 my-2 px-0">' +
              '<li class="list-group-item border-0 my-0 pt-1 pb-2 text-truncate">' + tempAddress.firstName + ' ' + tempAddress.lastName + '</li>' +
              '<li class="list-group-item border-0 my-0 py-1 text-truncate">' + tempAddress.addressOne + '</li>' +
              ((tempAddress.addressTwo != null && tempAddress.addressTwo != undefined && tempAddress.addressTwo != "") ? ('<li class="list-group-item border-0 my-0 py-1 text-truncate">' + tempAddress.addressTwo + '</li>') : "") +
              '<li class="list-group-item border-0 my-0 py-1 text-truncate">' + tempAddress.city + ', ' + tempAddress.state + ' ' + tempAddress.zip + '</li>' +
              '<li class="list-group-item border-0 my-0 py-2 text-truncate">' + tempAddress.email + '</li>' +
              '</ul>' +
              ((tempAddress.description != null && tempAddress.description != undefined && tempAddress.description != '') ? ('<p class="bg-light mx-2 my-2 px-2 py-1 text-center text-wrap"><span>' + tempAddress.description + '</span></p>') : '') +
              '</div>' +
              '<div class="address-card-actions text-center card-footer bg-light p-0 m-0">' +
              '<form class="shipping-address-form main align-self-end" name="' + addresses[key].title + '">' +
              '<input type="hidden" name="action" value="set_address" />' +
              '<input type="hidden" name="phase" value="address" />' +
              '<input type="hidden" name="source" value="vaulted" />' +
              '<input type="hidden" name="validated" />' +
              '<input type="hidden" name="id" value="' + addresses[key].id + '" />' +
              '<input type="hidden" name="email" value="' + addresses[key].email + '" />' +
              '<input type="hidden" name="phone" value="' + sanitizeTelephoneNumber(addresses[key].phone) + '" />' +
              '<input type="hidden" name="telephone_extension" value="' + addresses[key].phone_extension + '" />' +
              '<input type="hidden" name="first_name" value="' + addresses[key].first_name + '" />' +
              '<input type="hidden" name="last_name" value="' + addresses[key].last_name + '" />' +
              '<input type="hidden" name="country_code" value="' + addresses[key].country_code + '" />' +
              '<input type="hidden" name="address[0]" value="' + addresses[key].address[0] + '" />' +
              '<input type="hidden" name="address[1]" value="' + addresses[key].address[1] + '" />' +
              '<input type="hidden" name="city_municipality" value="' + addresses[key].city_municipality + '" />' +
              '<input type="hidden" name="state_province" value="' + addresses[key].state_province + '" />' +
              '<input type="hidden" name="postal_code" value="' + addresses[key].postal_code + '" />' +
              '<button class="shipping-address-button btn btn-primary text-white my-3" data-address-id="' + addresses[key].id + '" type="submit">Use This Address</button>' +
              '</form>' +
              '</div>' +
              '</div>' +
              '</div>';

          // Add Current Address Card Into Existing Content
          $(shipAddressContainer).append(addressCard);
          cardCount++;
        }
      };
      $('div#manual-entry form.main.shipping-address-form').hide();
    }
    // Hide Vaulted Address Sections If None Are Present
    else {
      $(vaultedAddressPhaseSection).hide();
      $('div#manual-entry div.add-shipping-address-button').hide();
      $('div#manual-entry form.main.shipping-address-form').show();
    }
  },

  // POPULATE VAULTED BILLING ADDRESSES - Takes an array of vaulted addresses and generates the vaulted address cards for billing.
  '_populateVaultedBillAddresses': function (addresses, currentAddress) {
    var that = this,
      billAddressContainer = 'div#billing-addresses-container';

    if (addresses == null || addresses == undefined || addresses == {}) {
      addresses = [];
    }

    // Add The Current Checkout's Shipping Address As A 'Same As Shipping' Option
    if (currentAddress != null && currentAddress != undefined && currentAddress != {}) {
      currentAddress.title = "Same as Shipping";
      currentAddress.description = "Use the Shipping Address as the Billing Address";
      currentAddress.shipping = true;
      addresses.unshift(currentAddress);
    }

    // Clear Current Contents Of Stored Address Cards
    $(billAddressContainer + ' > *').remove();

    // Loop Through Provided Addresses And Generate Cards To Append To Saved Address Sections
    if (addresses != null && addresses != undefined && addresses.length > 0) {
      $(billAddressContainer).show();
      $('div#saved-address-billing').show();

      for (var key in addresses) {
        var tempAddress = {
          addressId: addresses[key].id,
          title: that._escapeHtml((addresses[key].title.length > 16) ? (addresses[key].title.substring(0, 16) + '...') : addresses[key].title),
          email: that._escapeHtml(addresses[key].email),
          firstName: that._escapeHtml(addresses[key].first_name),
          lastName: that._escapeHtml(addresses[key].last_name),
          addressOne: that._escapeHtml(addresses[key].address[0]),
          addressTwo: that._escapeHtml(addresses[key].address[1]),
          city: that._escapeHtml(addresses[key].city_municipality),
          state: that._escapeHtml(addresses[key].state_province),
          zip: that._escapeHtml(addresses[key].postal_code),
          country: that._escapeHtml(addresses[key].country_code),
          description: that._escapeHtml(addresses[key].description)
        },
          addressCard =
          '<div class="col-md-3 my-3">' +
          '<div class="card rounded shadow-sm mx-2 p-0 h-100">' +
          '<h3 class="card-header bg-light h5 mb-0 text-center">' + tempAddress.title + '</h3>' +
          '<div class="card-body px-1 py-0">' +
          '<ul class="list-group list-group-flush mx-1 my-2 px-0">' +
          '<li class="list-group-item border-0 my-0 pt-1 pb-3 text-truncate">' + tempAddress.firstName + ' ' + tempAddress.lastName + '</li>' +
          '<li class="list-group-item border-0 my-0 py-1 text-truncate">' + tempAddress.addressOne + '</li>' +
          ((tempAddress.addressTwo != null && tempAddress.addressTwo != undefined && tempAddress.addressTwo != "") ? ('<li class="list-group-item border-0 my-0 py-1 text-truncate">' + tempAddress.addressTwo + '</li>') : "") +
          '<li class="list-group-item border-0 my-0 py-1 text-truncate">' + tempAddress.city + ', ' + tempAddress.state + ' ' + tempAddress.zip + '</li>' +
          '<li class="list-group-item border-0 my-0 py-3 text-truncate">' + tempAddress.email + '</li>' +
          '</ul>' +
          ((tempAddress.description != null && tempAddress.description != undefined && tempAddress.description != '') ? ('<p class="bg-light mx-2 my-3 px-2 py-1 text-center text-wrap"><span>' + tempAddress.description + '</span></p>') : '') +
          '</div>' +
          '<div class="address-card-actions text-center card-footer bg-light p-0 m-0">' +
          '<form class="billing-address-form main align-self-end" name="' + addresses[key].title + '">' +
          '<input type="hidden" name="action" value="set_payment" />' +
          '<input type="hidden" name="phase" value="payment" />' +
          '<input type="hidden" name="validated" />' +
          '<input type="hidden" name="shipping" value="' + ((addresses[key].shipping == true) ? 'true' : 'false') + '" />' +
          '<input type="hidden" name="id" value="' + addresses[key].id + '" />' +
          '<input type="hidden" name="email" value="' + addresses[key].email + '" />' +
          '<input type="hidden" name="phone" value="' + sanitizeTelephoneNumber(addresses[key].phone) + '" />' +
          '<input type="hidden" name="telephone_extension" value="' + addresses[key].phone_extension + '" />' +
          '<input type="hidden" name="first_name" value="' + addresses[key].first_name + '" />' +
          '<input type="hidden" name="last_name" value="' + addresses[key].last_name + '" />' +
          '<input type="hidden" name="country_code" value="' + addresses[key].country_code + '" />' +
          '<input type="hidden" name="address[0]" value="' + addresses[key].address[0] + '" />' +
          '<input type="hidden" name="payment[address][address][1]" value="' + ((isNullUndefinedOrEmpty(addresses[key].address[1]) ? "" : addresses[key].address[1])) + '" />' +
          '<input type="hidden" name="city_municipality" value="' + addresses[key].city_municipality + '" />' +
          '<input type="hidden" name="state_province" value="' + addresses[key].state_province + '" />' +
          '<input type="hidden" name="postal_code" value="' + addresses[key].postal_code + '" />' +
          '<button class="shipping-address-button btn btn-primary text-white my-3" data-address-id="' + addresses[key].id + '" type="submit">Use This Address</button>' +
          '</form>' +
          '</div>' +
          '</div>' +
          '</div>';

        $(billAddressContainer).append(addressCard);
      };
    } else {
      // Hide Vaulted Address Sections If None Are Present
      $('div#saved-address-billing').hide();
    }
  },

  // POPULATE VAULTED Payment methods - Takes an array of vaulted payment methods and generates the payment method cards.
  '_populateVaultedPaymentMethods': function (paymentMethods) {
    var that = this,
      paymentMethodContainer = 'div#payment-methods-container',
      savedPaymentMethodsSection = 'div#saved-payment-methods',
      paymentCards = '';

    // Loop Through Provided Payment Methods And Generate Cards To Append To Saved Payment Method Sections
    if (paymentMethods != null && paymentMethods != undefined && paymentMethods != {}) {
      $(paymentMethodContainer).show();
      $(savedPaymentMethodsSection).show();

      for (var key in paymentMethods) {
        var tempPayment = {
          paymentMethodId: paymentMethods[key].id,
          title: that._escapeHtml((paymentMethods[key].title.length > 16) ? (paymentMethods[key].title.substring(0, 16) + '...') : paymentMethods[key].title),
          description: that._escapeHtml(paymentMethods[key].description),
          details: (paymentMethods[key].payment != null && paymentMethods[key].payment != undefined) ? that._escapeHtml(paymentMethods[key].payment.description) : '',
        },
          paymentCard =
            '<div class="col-md-3 my-3">' +
            '<div class="card rounded shadow-sm mx-2 p-0 h-100">' +
            '<div class="card-header text-center bg-light h5 text-truncate">' +
            tempPayment.title +
            '</div>' +
            '<div class="card-body text-center p-2">' +
            '<div class="address-card-details">' +
            tempPayment.details +
            '</div>' +
            ((tempPayment.description != null && tempPayment.description != undefined && tempPayment.description != '') ? ('<div class="address-card-description bg-light mx-2 my-3 px-2 py-1 text-center text-wrap"><span>' + tempPayment.description + '</span></div>') : '') +
            '</div>' +
            '<div class="address-card-actions text-center card-footer bg-light p-0 m-0">' +
            '<form name="' + paymentMethods[key].id + '" class="vaulted-payment-form main">' +
            '<input type="hidden" name="action" value="set_payment" />' +
            '<input type="hidden" name="source" value="vaulted" />' +
            '<input type="hidden" name="payment" value="' + paymentMethods[key].id + '" />' +
            '<button type="submit" class="btn btn-primary text-white vaulted-payment-button my-3 mx-2" data-payment-id="' + paymentMethods[key].id + '">Use This Payment Method</button>' +
            '</form>' +
            '</div>' +
            '</div>' +
            '</div>';

        paymentCards += paymentCard;
      };
      // Replaces any existing content in the placeholder div with the newly generated payment methods available.
      $(paymentMethodContainer).html(paymentCards);
    } else {
      // Hide Vaulted Payments Sections If None Are Present
      $(savedPaymentMethodsSection).css('display', 'none');
    }
  },

  // Populate Shipping Services -  Creates the shipping service options if found.
  '_populateShippingServices': function (services, currentPartialShipValue) {
    var form = $('div.phase.service form[name=service]'),
      selectFirstOption = ' checked="true"';

    $(form).find('div#service-options').empty();

    if(services.length >= 1) {
      $(form).find('button#checkout-ship-method-button').prop('disabled', false);

      for (var index in services) {
        var currentDisplayRate = services[index].rate;

        if (currentPartialShipValue == true) {
          currentDisplayRate = (parseFloat(services[index].rate) * 2).toFixed(2);
        }

        var option =
        '<div class="bg-light service-option rounded shadow-sm mx-1 my-2 px-1 py-2">' +
            '<div class="form-check d-inline-block align-middle w-100 mx-0 px-0">' +
                '<input class="form-check-input h-100 ml-1 mr-0 px-0" type="radio" name="service" id="' + services[index].id + '" value="' + index.toString() + '"' + selectFirstOption + ' required />' +
                '<label class="form-check-label ml-2 row w-100 flex-wrap px-2" for="' + services[index].id + '">' +
                    '<div class="col-md-8 "><b>' + services[index].title + '</b><i class="text-muted"> via ' + services[index].carrier + '</i></div>' +
                    '<div class="col-md-8 order-md-3 text-info text-muted">' + services[index].description + '</div>' +
                    '<div class="col-md-4 order-md-2 text-right font-weight-bold service-option-price-value">' + currentDisplayRate + '</div>' +
                '</label>' +
            '</div>' +
        '</div>';
        
        selectFirstOption = '';

        $(form).find('div#service-options').append(option);
      }
    }
    else {
      var option = 
        '<div id="review-data-error" class="alert alert-danger rounded shadow-sm px-3 py-2 m-3">' +
          '<h3 class="h5 alert-heading">Service Error</h3>' +
          '<p class="bg-light px-2 py-1 rounded">We can\'t retrieve needed information at this time. Please save your Shopping Cart by logging in or creating an account.  Then try again shortly, or contact our Custoemr Service for assisance.</p>' +
        '</div>';

      $(form).find('div#service-options').append(option);
      $(form).find('button#checkout-ship-method-button').prop('disabled', true);
    }
  },

  // Converts the time to ship value into a customer facing message.
  '_parseTimeToShip': function (timeToShip, availability, qoh) {
    var wording = '';
    // If availability was not passed or was not 'ava', lookup the 'status'
    if (isNotNullUndefinedOrEmpty(availability) && availability != 'ava') {
      switch (availability) {
        case 'dis': wording = 'Discontinued'; break;
        case 'obs': wording = 'Obsolete'; break;
        case 'nla': wording = 'Not Available'; break;
        case 'cfa': wording = 'Call for Availability'; break;
      }
    }
    // If 'available', there should be a value for TTS
    else {
      if (qoh > 19) {
        wording = "In Stock, Qty 20+";
      }
      else if (qoh > 4) {
        wording = "In Stock, Qty " + qoh;
      }
      else if (qoh > 0) {
        wording = "In Stock, Only " + qoh + " left!";
      }
      else if (timeToShip.length == 2) {
        wording = "Usually ships in " + timeToShip[0] + "-" + timeToShip[1] + " days";
      }
      else if (qoh != null && timeToShip.length == 1) {
        wording = "Usually ships in 1 day";
      }
    }
    return ('<span class="review-tts text-info">' + wording + '</span>');
  },

  '_fillOutShippingAddressPhase': function (address) {
    if (address != null && address != undefined) {
      var form = $('div.phase.address form[name="manual"]');

      $(form).find('input[name=email]').val(address.email);
      $(form).find('input[name=phone]').val(sanitizeTelephoneNumber(address.phone));
      $(form).find('input[name=telephone_extension]').val(address.telephone_extension);
      $(form).find('input[name=first_name]').val(address.first_name);
      $(form).find('input[name=last_name]').val(address.last_name);
      $(form).find('select[name=country_code] option[value=' + address.country_code + ']').attr('selected', 'selected');
      $(form).find('input[name="address[0]"]').val(address.address[0]);
      $(form).find('input[name="address[1]"]').val(address.address[1]);
      $(form).find('input[name=city_municipality]').val(address.city_municipality);
      $(form).find('select[name=state_province] option[value=' + address.state_province + ']').attr('selected', 'selected');
      $(form).find('input[name=postal_code]').val(address.postal_code);
      $(form).find('input[name=usps]').prop('checked', ((address.usps == 1 || address.usps == "true" || address.usps == true) ? true : false));

      // Show & Hide Appropriate Content
      $('div#saved-address-shipping').show();
      $('div#manual-entry').show();
      $('div#address-change').hide();
    }
  },


  '_fillOutShippingServicePhase': function (service) {
    if (service != null && service != undefined) {
      var form = $('div.phase.service form[name=service]');
      $(form).find('input#' + service.id + '').prop('checked', true);
    }
  },


  '_fillOutPaymentForm': function (payment) {
    var that = this;

    /* If there is a payment method present for the checkout, this will 
    change the payment method phase to only show the 'currently' selected option */
    if (payment != null && payment != undefined && payment != {}) {
      var paymentCard =
        '<div class="card mb-3">' +
        '<h3 class="card-header h5 bg-light text-center">' +
        ((payment.title != null && payment.title != undefined && payment.title != {}) ? payment.title : 'Current Card') +
        '</h3>' +
        '<div class="card-body text-center">' +
        '<p>' + payment.description + '</p>' +
        '<div class="address-card-actions">' +
        '<form class="change-payment-method main">' +
        '<input type="hidden" name="action" value="set_phase" />' +
        '<input type="hidden" name="phase" value="payment" />' +
        '<button type="submit" class="btn btn-primary text-white change-payment-button">Change This Payment Method</button>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '</div>';

      $('div[class~=phase][class~=payment]').find('div#saved-payment-methods').css('display', 'none');
      $('div[class~=phase][class~=payment]').find('div[class~=phase-section][class~=manual]').css('display', 'none');
      $('div[class~=phase][class~=payment]').find('div#current-payment-method-container').css('display', 'inline-block');

      $('div#phase-payment div#current-payment-method-container').html(paymentCard);
    }
  },


  /**
   * Converts several characters to their respective HTML elements
   * @param {*} text 
   */
  '_escapeHtml': function (text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }

    return (isNotNullUndefinedOrEmpty(text)) ? text.replace(/[&<>"']/g, function (m) {
      return map[m];
    }) : text;
  },

  '_checkoutStateController': function () {
    var that = this,
        checkoutState = {
          login: false,
          address: false,
          service: false,
          payment: false
        },
        currentState = 'login';

    function ajaxGetShop(retries) {
      var dfd = $.Deferred(),
          retries = ((isNotNullUndefinedOrEmpty(retries)) ? retries : 3),
          request = $.ajax({
            url: '/shop',
            type: 'GET',
            dataType: 'json'
          });

      request.done(function (data, textStatus, jqXHR) {
        if (jqXHR.status == 200) {
          dfd.resolve(request);
        }
        else if (retries > 0){
          setTimeout(function () {
            dfd.resolve(
              ajaxGetShop(--retries)
            );
          }, 500);
        }
        else {
          dfd.resolve(request);
        }
      });

      return dfd.promise();
    };

    function ajaxGetCheckout(retries) {
      var dfd = $.Deferred(),
      retries = ((isNotNullUndefinedOrEmpty(retries)) ? retries : 3),
      request = $.ajax({
            url: '/shop/checkout',
            type: 'GET',
            dataType: 'json'
          });

      request.done(function (data, textStatus, jqXHR) {
        if (jqXHR.status == 200) {
          dfd.resolve(request);
        }
        else if (retries > 0){
          setTimeout(function () {
            dfd.resolve(
              ajaxGetCheckout(--retries)
            );
          }, 500);
        }
        else {
          dfd.resolve(request);
        }
      });

      return dfd.promise();
    };
  
    try {
      $.when(ajaxGetShop(), ajaxGetCheckout())
      .done(function (getShopResponse, getCheckoutResponse) {
        if(getShopResponse.status === 200 && getCheckoutResponse.status === 200) {
          var getShopPayload = getShopResponse.responseJSON,
              getCheckoutPayload = getCheckoutResponse.responseJSON,
              order = getCheckoutPayload.order,
              quote = getCheckoutPayload.order.quote,
              runningTax = 't.b.d.',
              runningTotal = 't.b.d.',
              allowPartialSelection = false,
              currentPartialShipValue = false;
              
          // Hide NLA Part Card
          $('div#nla-part-notice-card').hide();

          // Summary Item Count And Subtotal
          $('span.summary-item-count').text(getShopPayload.shopcart.count);
          $('div.summary-subtotal').text('$'+getShopPayload.shopcart.subtotal);

          // Evaluate Checkout State
          checkoutState.login = ((isNotNullUndefinedOrEmpty(getCheckoutPayload.account)) ? true : false);
          checkoutState.address = ((isNotNullUndefinedOrEmpty(order.address)) ? true : false);
          checkoutState.service = ((isNotNullUndefinedOrEmpty(order.service)) ? true : false);
          checkoutState.payment = ((isNotNullUndefinedOrEmpty(order.payment)) ? true : false);

          if (checkoutState.payment && checkoutState.service && checkoutState.address) currentState = 'review';
          else if (checkoutState.service && checkoutState.address) currentState = 'payment';
          else if (checkoutState.address) currentState = 'service';
          else if (checkoutState.login) currentState = 'address';
          else if (checkoutState.login == true) currentState = 'address';

          if (isNotNullUndefinedOrEmpty(quote) && isNotNullUndefinedOrEmpty(quote.service) && isNotNullUndefinedOrEmpty(quote.service.partialship) && isNotNullUndefinedOrEmpty(quote.service.partialship.scalar) && quote.service.partialship.scalar == true) {
            currentPartialShipValue = true;
          }

          // Summary Shipping Cost If Available
          var shippingCostText = (checkoutState.service && isNotNullUndefinedOrEmpty(order.service) && isNotNullUndefinedOrEmpty(order.service.rate)) ? ('$' + order.service.rate) : 't.b.d.';
          $('div.summary-shipping').text(shippingCostText);

          // Totals And Taxes
          if (isNotNullUndefinedOrEmpty(quote) && isNotNullUndefinedOrEmpty(quote.items) && isNotNullUndefinedOrEmpty(order.service)) {
            runningTax = 0;
            runningTotal = +(0);

            for (var item in quote.items) {
              runningTotal += (+(quote.items[item].price) * +(quote.items[item].quantity));
              runningTax += (+(quote.items[item].tax) * +(quote.items[item].quantity));
            }

            runningTax += (+(quote.service.tax));
            runningTotal += (runningTax + (+(order.service.rate)));

            // Convert Back To A String With The Dollar Sign
            runningTax = ('$' + (+(runningTax)).toFixed(2));
            runningTotal = ('$' + (+(runningTotal)).toFixed(2));
          }
          $('div.summary-tax').text(runningTax);
          $('div.summary-total').text(runningTotal);

          // Check For 'Ghost Parts'
          if (getShopPayload.shopcart.count != order.items.length) {
            var ghostParts = {};
            // Find The Missing Parts
            order.items.forEach(function (item) {
              var partPresent = false;
              for (var key in getShopPayload.shopcart.items) {
                if (item.product == getShopPayload.shopcart.items[key].product.id) {
                  partPresent = true;
                  break;
                }
              }

              if(partPresent == false) {
                ghostParts[item.product] = {};
              }
            })

            // Attempt To Remove The Trouble Parts And Add A Notice
            var missingItemListElement = $('div.nla-item-list-element'),
                missingItemElement = $('div.nla-item-element').remove();
                  
            // Show The Error Card
            $('div#nla-part-notice-card').show();

            for(var productId in ghostParts) {
              try {
                $.ajax({
                  url: '/shop/',
                  type: 'POST',
                  dataType:'json',
                  data: {
                    action: 'remove_item',
                    product: productId
                  }
                })
                .done(function (responseData) {
                  // No Action Currently Needed
                });
              }
              catch (e) {
                csrDataShare.debugErrors.push({
                  subject: 'Unable to remove non "ava" part from shopping cart ( 2e7a1c43-bf26-4da3-9d22-8c3deab7a5dd )',
                  sourceError: e
                });
                // Render Errors In Response To The Proper Form
                parseResponseErrors(form, 'We are sorry, one of your saved parts is no longer available and could not be removed automatically.  Please call Customer Service and an agent will help complete your order. <br/><br/> Error ID ( 2e7a )');
              }
              

              try {
                $.ajax({
                  url: '/parts/id-' + productId,
                  type: 'GET',
                  dataType:'json',
                  headers: {
                    "accepts": "application/json"
                  }
                })
                .done(function (rspData) {
                  var thumbnailData = rspData.part.assets.photos[0],
                      thumbnailBrand =  rspData.part.facets.manufacturing_brand[0],
                      thumbnailSource = null;

                  if (thumbnailData && thumbnailData.file && thumbnailData.file.checksum && thumbnailData.file.size) {
                    thumbnailSource = ('/img/assets/asset/' + thumbnailData.file.checksum + '/' + thumbnailData.file.size + '/thumb.png');
                  }
                  // Default to 'brand' generic logo image
                  else {
                    var brandUrl = thumbnailBrand.toLowerCase().replace(/[^0-9a-z]+/g, '-').replace(/^-+|-+$/gm, '');
                    thumbnailSource = ('/img/assets/brand/' + brandUrl + '/thumb.png');
                  }
                  var missingItemContent = missingItemElement.clone();
                  missingItemContent.find('img').attr('src',thumbnailSource);
                  missingItemContent.find('a.part-url').attr('href','/parts/'+ rspData.part.url).text(rspData.part.description + ' ' + rspData.part.title);
                  missingItemListElement.append(missingItemContent);
                });
              }
              catch (e) {
                // Do Nothing, If Part Wasn't Able To Be Removed, The Error Affecting The User Will Have Been Handled There, Continue With Processing
              }
            }
          }


          // Determine If Partial Shipping Is An Option
          if(getShopPayload.shopcart.items.length > 1) {
            var oneAvailable = false,
                oneNotAvailable = false;

            for(var i = 0; i < getShopPayload.shopcart.items.length; i++) {
              var quantityOnHand = getShopPayload.shopcart.items[i].product.stock.quantity_on_hand,
                timeToShip = getShopPayload.shopcart.items[i].product.stock.time_to_ship;
              
              if (isNotNullUndefinedOrEmpty(quantityOnHand) && quantityOnHand > 0) {
                oneAvailable = true;
              }
              else if (timeToShip.length > 1) {
                oneNotAvailable = true;
              }
              
              if (oneAvailable == true && oneNotAvailable == true) {
                allowPartialSelection = true;
                break;
              }
            }

            if (allowPartialSelection == false) {
              currentPartialShipValue = false;
            }
          }

          var currentBillingAddress = ((order.additional != null && order.additional.billing_address != null) ? order.additional.billing_address : null);

          // Controllers To Update Views
          that._loginController(currentState == 'login');
          that._shippingAddressController(order.address, getCheckoutPayload.addresses, checkoutState.address, currentState == 'address');
          that._shippingServiceController(order.service, order.services, checkoutState.service, allowPartialSelection, currentPartialShipValue, currentState == 'service');
          that._paymentController(order.payment, getCheckoutPayload.payments, getCheckoutPayload.addresses, order.address, currentBillingAddress, checkoutState.payment, currentState == 'payment');
          that._reviewController(order.address, order.service, order.payment, quote, currentState == 'review', getShopPayload, currentPartialShipValue);
          removeLoadingScreen();
        }
        else {
          var sourceError = {
            getShopResponse: String.toString(getShopResponse),
            getCheckoutResponse: String.toString(getCheckoutResponse)
          };

          csrDataShare.debugErrors.push({
            subject: 'Unexpected API Response Attempting To Get Current Checkout State ( bfbd278a-617d-4db8-b23a-2878aa2ff8db )',
            sourceError: sourceError
          });
          // Render Errors In Response To The Proper Form
          parseResponseErrors(form, 'We are sorry, something went wrong. If you are logged in to your account, your Shopping Cart has been saved. Please come back later to complete the Checkout. If you do not have an account, please create one and your Shopping Cart will be saved for checkout later too. Thank you for your patience and again we apologize for this inconvenience. <br/><br/> Error ID ( aa2f )');
          removeLoadingScreen();
        }
      });
    }
    catch (e) {
      csrDataShare.debugErrors.push({
        subject: 'Unexpected Uncaught Exception While Attempting To Get Checkout State ( 46ca670a-30eb-4f05-a34e-cd95ece48942 )',
        sourceError: String.toString(e)
      });
      // Render Errors In Response To The Proper Form
      parseResponseErrors(form, 'We are sorry, something went wrong. If you are logged in to your account, your Shopping Cart has been saved. Please come back later to complete the Checkout. If you do not have an account, please create one and your Shopping Cart will be saved for checkout later too. Thank you for your patience and again we apologize for this inconvenience. <br/><br/> Error ID ( ce48 )');
      removeLoadingScreen();
    }
  },


  // Login State Controller 
  '_loginController': function (nextStep) {
    // Any Part Of The Checkout Has Been Completed, Then Skip Login
    if (nextStep == false) {
      $('div#phase-login').hide();
    }
    else {
      $('div#phase-login').show();
      $(window).scrollTop($('div#checkout-order-summary').position().top);
    }
  },


  /** SHIPPING ADDRESS CONTROLLER ************************************************************************************************************************************************* //
   * 
   * Takes the current address, vaulted shipping addresses, checkout phase, and account data to determine the current state of the shipping address phase card.
   * 
   */
  '_shippingAddressController': function (currentAddress, vaultedShippingAddresses, stepComplete, nextStep) {
    var that = this,
      phaseCard = 'div#phase-ship-address';

    // Pre-Fill Available Vaulted Addresses
    that._populateVaultedShipAddresses(vaultedShippingAddresses);

    if(isNotNullUndefinedOrEmpty(currentAddress)) {
      $(phaseCard).find('div#manual-entry').show();
      $(phaseCard).find('div#manual-entry div.add-shipping-address-button').hide();
      $(phaseCard).find('div#manual-entry form.main.shipping-address-form').show();
    }

    // Checkout Process For Shipping Address Is Done/Complete
    if (stepComplete == true) {
      $(phaseCard).show();
      $(phaseCard).find('div.card-body').hide();
      $(phaseCard).find('div.hide-card-action').hide();
      $(phaseCard).find('div.show-card-action').show();
      $(phaseCard).find('div#address-change').hide();
      $(phaseCard).find('h2.card-header').first().addClass('border border-1 border-success').removeClass('border-danger');
      that._fillOutShippingAddressPhase(currentAddress);
    }
    // Checkout Process Is Currently On Shipping
    else if (stepComplete == false && nextStep == true) {
      $('div#address-change').hide();
      $(phaseCard).show();
      $(phaseCard).find('div.card-body').show();
      $(phaseCard).find('div.hide-card-action').show();
      $(phaseCard).find('div.show-card-action').hide();
      $(phaseCard).find('h2.card-header').first().addClass('border border-1 border-danger').removeClass('border-success');
    }
    // Shipping Is Neither Complete Nor Active
    else {
      $(phaseCard).find('h2.card-header').first().removeClass('border border-1 border-danger');
      $(phaseCard).hide();
    }
  },


  // SHIPPING SERVICE CONTROLLER
  '_shippingServiceController': function (currentShippingService, shippingServices, stepComplete, allowPartialSelection, currentPartialShipValue, nextStep) {
    var that = this,
      phaseCard = 'div#phase-ship-method';

    // Populate The Current Shipping Service Options
    that._populateShippingServices(shippingServices, currentPartialShipValue);

    // Handle If Partial Ship Can Be Set
    var partialShipPromptElement = $('div[id="partial-ship-prompt"]')

    if (allowPartialSelection == false) {
      // Hide Partial Ship UI Element
      partialShipPromptElement.hide();
    }
    else {
      // Show Partial Ship UI Element
      partialShipPromptElement.show();
    }

    // Set Initial Value
    if (currentPartialShipValue == true) {
      partialShipPromptElement.find('input[value="complete-ship"]').val();
      partialShipPromptElement.find('input[value="complete-ship"]').prop('checked', false);
      partialShipPromptElement.find('input[value="partial-ship"]').prop('checked', true);
    }
    else {
      partialShipPromptElement.find('input[value="partial-ship"]').prop('checked', false);
      partialShipPromptElement.find('input[value="complete-ship"]').prop('checked', true);
    }

    // There Is A Shipping Service Set
      if (stepComplete == true) {
      $(phaseCard).show();
      $(phaseCard).find('div.card-body').hide();
      $(phaseCard).find('div.hide-card-action').hide();
      $(phaseCard).find('div.show-card-action').show();
      $(phaseCard).find('h2.card-header').first().addClass('border border-1 border-success').removeClass('border-danger');
      that._fillOutShippingServicePhase(currentShippingService);
    }
    // Phase Is Currently Shipping Service
    else if (nextStep) {
      $(phaseCard).show();
      $(phaseCard).find('div.card-body').show();
      $(phaseCard).find('div.hide-card-action').show();
      $(phaseCard).find('div.show-card-action').hide();
      $(phaseCard).find('h2.card-header').first().addClass('border border-1 border-danger').removeClass('border-success');
      $(window).scrollTop($('div#phase-ship-method').position().top);
    }
    else {
      $(phaseCard).find('h2.card-header').first().removeClass('border border-1 border-danger');
      $(phaseCard).hide();
    }
  },

  '_populateCurrentBillingAddress': function(currentBillingAddress) {
    var form = $('form#checkout-payment-billing-form');
    form.find('input[name="payment[address][first_name]').val(currentBillingAddress.first_name);
    form.find('input[name="payment[address][last_name]').val(currentBillingAddress.last_name);
    form.find('input[name="payment[address][address][0]').val(currentBillingAddress.address[0]);
    form.find('input[name="payment[address][address][1]').val(currentBillingAddress.address[1]);
    form.find('select[name="payment[address][country_code]').find('option[value="' + currentBillingAddress.country_code + '"]').prop('selected', true);
    form.find('input[name="payment[address][city_municipality]').val(currentBillingAddress.city_municipality);
    form.find('select[name="payment[address][state_province]').find('option[value="' + currentBillingAddress.state_province + '"]').prop('selected', true);
    form.find('input[name="payment[address][postal_code]').val(currentBillingAddress.postal_code);
  },

  /** PAYMENT CONTROLLER ************************************************************************************************************************************************* //
   * 
   * Controls The Consumption And Display Of The Payment Phase Section
   * 
   * @param {*} currentPaymentMethod 
   * @param {*} vaultedPaymentMethods 
   * @param {*} vaultedShippingAddresses 
   * @param {*} currentShippingAddress 
   * @param {*} checkoutPhase 
   */
  '_paymentController': function (currentPaymentMethod, vaultedPaymentMethods, vaultedShippingAddresses, currentShippingAddress, currentBillingAddress, stepComplete, nextStep) {
    var that = this,
      phaseCard = 'div#phase-payment';

    // Populate The Current Shipping Service Options
    that._populateVaultedPaymentMethods(vaultedPaymentMethods);
    that._populateVaultedBillAddresses(vaultedShippingAddresses, currentShippingAddress);

    // Populate The Current Billing Address If Set
    if(currentBillingAddress != null) {
      that._populateCurrentBillingAddress(currentBillingAddress);
    }

    // There Is Currently A Payment Method Set
    if (stepComplete == true) {
      $('div#phase-payment div.phase-section.change').css('display', 'block');
      $(phaseCard).show();
      $(phaseCard).find('div.card-body').hide();
      $(phaseCard).find('div.hide-card-action').hide();
      $(phaseCard).find('div.show-card-action').show();
      $(phaseCard).find('h2.card-header').first().addClass('border border-1 border-success').removeClass('border-danger');
      that._fillOutPaymentForm(currentPaymentMethod);
    } 
    // Phase Is Currently Shipping Service
    else if (nextStep == true) {
      $('div#phase-payment div.phase-section.change').css('display', 'none');
      $(phaseCard).show();
      $(phaseCard).find('div.card-body').show();
      $(phaseCard).find('div.hide-card-action').show();
      $(phaseCard).find('div.show-card-action').hide();
      $(phaseCard).find('h2.card-header').first().addClass('border border-1 border-danger').removeClass('border-success');
      $(window).scrollTop($('div#phase-payment').position().top);
    }
    else {
      $(phaseCard).find('h2.card-header').first().removeClass('border border-1 border-danger');
      $(phaseCard).hide();
    }
  },


  /** REVIEW CONTROLLER ************************************************************************************************************************************************* //
   * 
   * @param {*} currentShippingAddress
   * @param {*} currentShippingService
   * @param {*} currentPaymentMethod
   * @param {*} items
   * @param {*} quote
   * @param {*} reviewStates
   */
  '_reviewController': function (currentShippingAddress, currentShippingService, currentPaymentMethod, quote, nextStep, getShopPayload, currentPartialShipValue) {
    var that = this,
      phaseCard = 'div#phase-review',
      summaryCheckoutButton = $('div#checkout-order-summary').find('button').first();
      
    // User Can Self Navigate To This Phase If Other Steps Are Complete
    if (isNotNullUndefinedOrEmpty(currentShippingAddress) && isNotNullUndefinedOrEmpty(currentShippingService) && isNotNullUndefinedOrEmpty(currentPaymentMethod) && isNotNullUndefinedOrEmpty(quote)) {
      // Phase Is Currently Review
      if (nextStep == true) {
        if (isNullUndefinedOrEmpty(quote.address) || quote.items.length < 1 || isNullUndefinedOrEmpty(quote.service)) {
          // Checkout State Error

          $('div#server-error-review-message').show();
          summaryCheckoutButton.prop('disabled', true);
          $('button[name="submit-order"]').prop('disabled', true);
        }
        else {
          that._populateReviewOrder(quote, currentPaymentMethod, getShopPayload, currentPartialShipValue);

          $('div#server-error-review-message').hide();
          $(phaseCard).show();
          $(phaseCard).find('div.card-body').show();
          $(phaseCard).find('div.hide-card-action').show();
          $(phaseCard).find('div.show-card-action').hide();
          
          summaryCheckoutButton.prop('disabled', false);
          $('button[name="submit-order"]').prop('disabled', false);
        }
      }
      else {
        $(phaseCard).hide();
        $('div#server-error-review-message').hide();
      }
    } 
    else {
      $('div#server-error-review-message').hide();
      summaryCheckoutButton.prop('disabled', true);
      $('button[name="submit-order"]').prop('disabled', true);

    }
  }
});


function isEmptyObject(variable) {
  for (var key in variable) {
    if (variable.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}


/**
 * Helper function to identify data that is empty or not set
 * 
 */
function isNullUndefinedOrEmpty(variable) {
  return (
    variable == undefined ||
    variable == null ||
    ((variable.constructor === Object) && isEmptyObject(variable)) ||
    (Array.isArray(variable) && variable.length == 0)
  );
}


/**
 * Helper function to identify data that is not empty or set
 * 
 */
function isNotNullUndefinedOrEmpty(variable) {
  return (
    variable != undefined &&
    variable != null &&
    (variable.constructor !== Object || (isEmptyObject(variable) == false)) &&
    (!Array.isArray(variable) || variable.length != 0)
  );
}


function sanitizeTelephoneNumber(numberToSanitize) {
  // Remove All Non-Numeric Characters, Then Remove All Leading '0's Or '1's, Then Takes The First 10 Numbers As The Telephone Number
  return (isNotNullUndefinedOrEmpty(numberToSanitize) && ((typeof numberToSanitize === 'string') || (numberToSanitize instanceof String))) ? (numberToSanitize.replace(/\D/g, '').replace(/^[0|1]+/g, '').substring(0, 10)) : "";
}

function parseResponseErrors(targetForm, errors, targetField) {
  if(isNotNullUndefinedOrEmpty(errors)) {
    // First, Check And Process If Returned Errors Is a Simple String, And As Such Should Be The Final Message To Display
    if(typeof errors === 'string' || errors instanceof String) {
      var updateField = targetForm.find('input[name="'+ targetField +'"]');
      if(isNotNullUndefinedOrEmpty(targetField) && isNotNullUndefinedOrEmpty(updateField) && updateField.length > 0) {
        updateField.closest('div.form-group').append(
          ('<div class="text-danger ml-2 mt-1 font-weight-bold error-message"><div>' + errors + '</div></div>')
        );
      }
      else {
        targetForm.find('div.error').append(
          ('<div class="text-danger ml-2 mt-1 font-weight-bold error-message"><div>' + targetField + ' ' + errors + '</div></div>')
        );
      }
    }
    // Next, Check If The Error Variable Is An Array
    else if(Array.isArray(errors) && errors.length > 0) {
      errors.forEach(function(element) {
        parseResponseErrors(targetForm, element, targetField);
      });
    }
    // Next, Check If The Errors Variable Is An Object
    else if (typeof errors === 'object' || errors instanceof Object) {
      for(property in errors) {
        var fieldName = ((isNotNullUndefinedOrEmpty(targetField)) ? (targetField + "[" + property + "]") : property);
        parseResponseErrors(targetForm, errors[property], fieldName);
      }
    }
    // Otherwise, Treat The Variable As The Final Error Message Converting Whatever Value The Variable Is To A String
    else {
      targetForm.find('div.error').append(
        ('<div class="text-danger ml-2 mt-1 font-weight-bold error-message"><div>' + targetField + ' ' + JSON.stringify(errors) + '</div></div>')
      );
    }

    try {
      $('div.error-message:first')[0].scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    }
    catch (e) {
      window.scrollTo(0, 0);
    }
  }
}

function parsePaymentResponseErrors(errors) {
  var billingAddressForm = $('form#checkout-payment-billing-form'),
      creditCardForm = $('form[name="creditcard-segment"]');

  if(isNotNullUndefinedOrEmpty(errors.payment)) {
    parseResponseErrors(creditCardForm, errors.payment, 'payment');
    delete errors.payment;
  }

  if(isNotNullUndefinedOrEmpty(errors)) {
    parseResponseErrors(billingAddressForm, errors, null);
  }
}

function submitPaymentMethod(requestPayload, form) {
  return new Promise(function (resolve, reject) {
    grecaptcha.ready(function () {
      grecaptcha.execute(ptrecaptchasitekeys.v3, {action: 'submit'}).then(function (token) {
        // Add your logic to submit to your backend server here.  
        requestPayload.grecaptcha_token = token;
        $.ajax({
          'url': '/shop/checkout/',
          'type': 'POST',
          'dataType': 'json',
          'data': requestPayload,
          'complete': (function (responseData) {
            // Catch All Response
            resolve({
              status: responseData.status,
              responseJSON: responseData.responseJSON
            });
          })
        });
      }).catch(function (err) {
        csrDataShare.debugErrors.push({
          subject: 'Unexpected API ERROR While Attempting To Authenticate ( 243c2179-cdb0-43bb-8b5c-ff4541122261 )',
          sourceError: err
        });
        // Render Errors In Response To The Proper Form
        parseResponseErrors(form, 'We are sorry, something went wrong. If you are logged in to your account, your Shopping Cart has been saved. Please come back later to complete the Checkout. If you do not have an account, please create one and your Shopping Cart will be saved for checkout later too. Thank you for your patience and again we apologize for this inconvenience. <br/><br/> Error ID ( 43bb )');
      });
    });
  });
}

function initiateLoadingScreen(title) {
  var loader =
  '<div class="position-fixed d-flex vh-100 vw-100 loader-screen" id="loading-screen">' +
    '<div class="row align-items-center justify-content-center p-0 m-0 w-100">' +
      '<div class="card rounded">' +
    '<h2 class="h3 font-weight-bold bg-dark card-header text-white text-center">' + ((title) ? title : 'Updating...') + '</h2>' +
    '<div class="card-body text-center p-5">' +
        '<div class="loader mx-auto"></div>' +
    '</div>' +
      '</div>' +
    '</div>' +
  '</div>';

  $('div#body').append(loader);
}

function removeLoadingScreen() {
  try {
    $('div#loading-screen').remove(); 
  } catch(e) {

  }
}

/**
 * pt.ShopReceipt
 */
$.widget('pt.ShopReceipt', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function(){
    this._super();
    var that = this;

    //bind click on print link
    $('.print a', this.element).on('click', function(e){
      e.preventDefault();
      window.print();
    });
  },

  /**
   * Init
   */
  '_init' : function(){
    this._super();

    //show print div
    $('.print', this.element).show();

    //send conversion data (only trigger this once across sessions)
    if($('#body', this.element).attr('data-conversion')){
      this._sendConversions();
    }
  },

  /**
   * Send order conversion data to trackers
   */
  '_sendConversions' : function(){
    let revenueValue = $('p.grandtotal span.grandtotal', this.element).text();

    //send to Bing
    window.uetq.push('event', 'purchase', { 'revenue_value': revenueValue, 'currency': 'USD' });

    //conversion tracking for Google is done through Google Tag Manager
  }
});

/**
 * pt.ShopOrder
 */
$.widget('pt.ShopOrder', $.pt.Controller, {
  /**
   * Options
   */
  'options' : {
  },

  /**
   * Create
   */
  '_create' : function() {
    this._super();
    var that = this;

    //create email dialog
    $('#menu-email', this.element).MenuEmail();
    
    // style click on mail text-secondary
    $('.logs .logs .log[mailid] p.log').addClass('text-secondary');

    //delegate click on mail log rows
    $('.logs', this.element).delegate('.log[mailid] p.log', 'click', function(e) {
      var log = $(this).parent();
      var mailid = $(log).attr('mailid');
      var title = $('p.log', log).html() + ' ' + $('p.time', log).html();
      $('#menu-email').MenuEmail({'title' : title, 'mailid' : mailid});
      $('#menu-email').MenuEmail('open');
    });

    //show print div and bind click on link
    $('.print', this.element).show();
    $('.print a', this.element).on('click', function(e) {
      e.preventDefault();
      window.print();
    });
  },

  /**
   * Init
   */
  '_init' : function() {
    this._super();
  }
});

$(document).ready(function(){
  var bodyclass = $('#body').attr('class').split(' ');

  if ($.inArray('home', bodyclass) !== -1) {
    $('body').Home();
  } else if ($.inArray('account-account', bodyclass) !== -1) {
    $('body').AccountAccount();
  } else if ($.inArray('account-addresses', bodyclass) !== -1) {
    $('body').AccountAddresses();
  } else if ($.inArray('account-carts', bodyclass) !== -1) {
    $('body').AccountCarts();
  } else if ($.inArray('account-forgot-pass', bodyclass) !== -1) {
    $('body').AccountForgotPass();
  } else if ($.inArray('account-login', bodyclass) !== -1) {
    $('body').AccountLogin();
  } else if ($.inArray('account-orders', bodyclass) !== -1) {
    $('body').AccountOrders();
  } else if ($.inArray('account-payments', bodyclass) !== -1) {
    $('body').AccountPayments();
  } else if ($.inArray('catalog-brand', bodyclass) !== -1) {
    $('body').CatalogBrand();
  } else if ($.inArray('catalog-brands', bodyclass) !== -1) {
    $('body').CatalogBrands();
  } else if ($.inArray('catalog-categories', bodyclass) !== -1) {
    $('body').CatalogCategories();
  } else if ($.inArray('catalog-category', bodyclass) !== -1) {
    $('body').CatalogCategory();
  } else if ($.inArray('catalog-ipl', bodyclass) !== -1) {
    $('body').CatalogIpl();
  } else if ($.inArray('catalog-model', bodyclass) !== -1) {
    $('body').CatalogModel();
  } else if ($.inArray('catalog-part', bodyclass) !== -1) {
    $('body').CatalogPart();
  } else if ($.inArray('catalog-search', bodyclass) !== -1) {
    $('body').CatalogSearch();
  } else if ($.inArray('help-contact-us', bodyclass) !== -1) {
    $('body').HelpContactUs();
  } else if ($.inArray('shop-checkout', bodyclass) !== -1) {
    $('body').ShopCheckout();
  } else if ($.inArray('shop-order', bodyclass) !== -1) {
    $('body').ShopOrder();
  } else if ($.inArray('shop-receipt', bodyclass) !== -1) {
    $('body').ShopReceipt();
  } else if ($.inArray('shop-shopcart', bodyclass) !== -1) {
    $('body').ShopShopcart();
  } else {
    $('body').Controller();
  }
});

