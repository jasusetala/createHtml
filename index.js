#!/usr/bin/env node
var program = require('commander');

program
    .arguments('<filename>')
    .option('-j, --jquery', 'Add jQuery (Google CDN)')
    .option('-b, --bootstrap', 'Add Bootstrap (CDN)')
    .action(function(filename) {
        var fs = require('fs');
        var stream = fs.createWriteStream(filename + '.html');
        stream.once('open', function(fd) {
            stream.write('<!doctype html>\n' +
                '<html lang="en">\n' +
                '<head>\n' +
                '   <meta charset="utf-8">\n' +
                '   <title></title>\n' +
                '   <base href="/">\n' +
                '   <meta name="viewport" content="width=device-width, initial-scale=1">\n');
            if (program.jquery || program.bootstrap) {
                stream.write('   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>\n');
            }
            if (program.bootstrap) {
                stream.write('   <!-- Bootstrap -->\n' + 
                    '   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">\n' +
                    '   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">\n' +
                    '   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>\n \n');
            }
            stream.write('   <link href="#" rel="stylesheet">\n' +
                '</head>\n' +
                '<body>\n' + 
                '   Hello World!\n' +
                '</body>\n' +
                '</html>');
            stream.end();
        }); 
        console.log(filename + '.html was created');
    });
program.parse(process.argv);
