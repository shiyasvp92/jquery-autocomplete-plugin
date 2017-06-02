# jquery-autocomplete-plugin
This plugin will take each key inputs from input field and suggest the complete keywords in a list by querying given API. Help users to type less. List of items going to input is suggested by this plugin.

You can find the plugin script in 'js' folder, autocomplete.js.

Use this plugin as:

           $(selector).autocomplete({
                    url: 'your search API url',
                    minLength: 'minimum number of characters needed in field to start autocomplete, default is 2',
                    className: 'css style class given to list generated, default is "auto-list"'
              });
              
     And that's all.
     
An example html is included ****PLEASE DO RUN CORS extension FOR API TO RUN, ELSE CROSS-ORIGIN ISSUE WILL RISE****
