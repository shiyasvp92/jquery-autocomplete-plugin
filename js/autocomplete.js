/** This plugin help to give any input field auto-list power. Which is, when someone
entering any input(especially for Searches). This plugin will run provided API
and display users with suggested list. Ease users to make decissions*/
(function($){
    /*Provide API url(From which query done), minLength(required to start auto list, default: 2) 
    and css syle class name(For styling the generated list , default : auto-list)*/
    $.fn.autocomplete = function({
                            url,
                            minLength = 2,
                            className = 'auto-list'
                        })  {
        this.each(function(){
            /*Module contains all needed functions*/
            var module = {
                /* Field to which power is given */
                searchBox: $(this),

                /* Return result is pushed to this list */
                list : null,

                /* Initialise elements, variables and event listeners */
                init:function(){
                    const uniq = Math.round(Math.random()*100);
                    const listProperties = {
                        'id' : 'results'+uniq ,
                        'class': className
                    };

                    $(this.searchBox).after($('<ul>',listProperties));

                    this.list = $('#results'+uniq);

                    /* On keyup or click in the field generate the autolist */
                    $(this.searchBox).on({
                        keyup : function(){
                            module.getList($(this));
                        },
                        click: function(){
                            module.getList($(this));
                        }
                    });

                    $(window).click(function(e){
                        module.clearList();
                        e.preventDefault();
                    });
                },

                /* Obtain list from API given and push to list */
                getList : function(searchElem){
                    let searchKey = searchElem.val();
                    if(searchKey.length >= minLength){
                        module.clearList();
                        module.generateItem({value: 'Loading...'});
                        $.get({
                                url: url + searchKey,
                            }, function success(data){
                                var result = JSON.parse(data);
                                module.clearList();
                                
                                result.forEach(function(element) {
                                    module.generateItem(element)
                                }, this);

                                $('.results li:not(:last-child)').css('border-bottom','0');
                            });
                    } else {
                        module.clearList();
                    }
                },

                /* clears the list if minlength < 2, field is blured or any selection made */
                clearList: function() {
                    this.list.html('');
                },

                /* for each return item for list, it is shown in view and event listener added */
                generateItem: function(data){
                     $('<li>', {
                        'text': data.value,
                        prop: { size: "30" }
                    }).on('click',function(e){
                        this.searchBox.val(this.innerText);
                        this.clearList();
                        e.preventDefault();
                    }).appendTo(this.list);
                }

            };
            module.init();
        });       
    }
    
}(jQuery));