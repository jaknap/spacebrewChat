let id=0;
$(window).on("load", setup);
            // Spacebrew Object
            let sb;
            let app_name = "string application";
                
            let strArr = [];

            /**
            * setup Function that connect to spacebrew and creates a listener for clicks of the submit button.
            */
            function setup (){
                id++;
                app_name = app_name + ' ' + id;
                // setup spacebrew
                sb = new Spacebrew.Client({ server: "192.168.1.7", reconnect:true });
                sb.name(app_name);
                sb.description("This app sends text from an HTML form."); // set the app description
                // create the spacebrew subscription channels
                sb.addPublish("text", "string", "");    // create the publication feed
                sb.addPublish("buttonPress", "boolean", false);    // create the publication feed

                sb.addSubscribe("text", "string");      // create the subscription feed
                sb.addSubscribe("toggleBackground", "boolean");      // create the subscription feed
                sb.onBooleanMessage = onBooleanMessage;

                // configure the publication and subscription feeds
                sb.onStringMessage = onStringMessage;       
                sb.onOpen = onOpen;
                // connect to spacbrew
                sb.connect();  
                // listen to button clicks
                $("#button").on("mousedown", onMouseDownStr);
                $("#buttonMsg").on("mousedown", onMouseDownCol);

            }
            /**
             * Function that is called when Spacebrew connection is established
             */
            function onOpen() {

                var message = "Connected as <strong>" + sb.name() + "</strong>. ";
                if (sb.name() === app_name) {
                    message += "<br>You can customize this app's name in the query string by adding <strong>name=your_app_name</strong>."
                }
                
                //$("#name").html( message );
            }
            /**
            * onMouseDown Function that is called when the submit button is pressed. It reads the
            *     text in the input box, and then sends it to spacebrew. It accepts a mouse event
            *     object, though we don't use it in this example.
            */
            function onMouseDownStr (evt){
                var newString = $("#string").val();   // load text from input box
                if (newString !== "") {               // if input box is not blank
                    console.log("Sending message " + newString); 
                    sb.send("text", "string", newString);   // send string to spacebrew
                    $("#string").val("");                   // clear the text box
                    $("#status").text(newString); // display the sent message in the browser         
                }
            }

            function onMouseDownCol (evt){
                    sb.send("buttonPress", "boolean", "true");
            }
            /**
             * onStringMessage Function that is called whenever new spacebrew string messages are received.
             *          It accepts two parameters:
             * @param  {String} name    Holds name of the subscription feed channel
             * @param  {String} value   Holds value received from the subscription feed
             */
            function onStringMessage( name, value ){
                
                console.log("[onBooleanMessage] boolean message received ", value);
                strArr.push(value+"BOY!");
                console.log(strArr.join(''));
                $("#msg_received").text(strArr); // display the sent message in the browser         
            }

            function onBooleanMessage( name, value ){
            console.log("[onBooleanMessage] boolean message received ", value);
            if (value) {

                document.body.style.background = "rgb(200,0,0)"; 
            } else {
                let bckgnd = getRandomInt(0,255).toString();
                console.log(bckgnd);
                document.body.style.background = 'rgb('+bckgnd+',0,'+bckgnd+')';              
            }
        }

        function getRandomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }
