# Web-Server

Web server as the name suggests is a tool that you can use to run a web server to develop websites. You can use this to see what your web pages look like when they are run on a server.

## How to install

```npm i -g @ishthedev/http-web-server```

Note that if you are on linux and you get a permission error on this, just add the sudo command before the above command and it should install fine. 

```sudo npm i -g @ishthedev/http-web-server```

## How it works

Once you have installed it globally, you should have a command:

            http-web-server

available on your machine, run the above command and you should see some information on what commands you can run.

The CLI uses a file reader to read the content of html files and renders that content on the browser. 

All your html files have to be in one directory! This directory will be './src/html', this is configurable, so you can change the value of this directory using the CLI. Any html files outside this directory will not be read or rendered to the browser.

What you enter in the URL bar will correspond to what html file gets rendered, for example, if I enter 

            localhost:3000/home

The web server will look for a file called home.html in the directory './src/html', if it finds it, it will render the content to the screen, if it doesn't find it will just print a 404 Page not found message on the browser screen.

You can also have sub-folders with html files in them, for example, given I have the following directory structure for './src/html'

    src
        html
            home.html (file)
            pages(directory)
                about.html


I can access the about.html page using the following url:

            localhost:3000/pages/about


If you try to enter a URL without a path to a html file, for example:

            localhost:3000/

It will look for a file called 'index.html' in the html directory and render its content on the browser if it exists.


## How to use

Commands:

        http-web-server runserver [port-number] [html-directory-path]


Start the web server with the port-number you specify and the html directory that you want the server to look at to render your html files to the screen.


        http-web-server default

Starts the web server with default values set for the port number (3000) and the html directory ('./src/html')


        http-web-server``` or ```http-web-server help

Brings up the help screen, which shows you all the commands you can run with the http-web-server


Hope this helps people build amazing websites! :).