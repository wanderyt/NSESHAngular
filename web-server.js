#!/usr/bin/env node

var util = require('util'),
    http = require('http'),
    fs = require('fs'),
    url = require('url'),
    events = require('events'),
    mysql = require('./mysql-connection'),
    path=require("path"),
    mime=require("./mime").mime;

var DEFAULT_PORT = 8000;
var FILE_PORT    = 8003;

function main(argv) {
    new HttpServer({
        'GET': createServlet(StaticServlet),
        'HEAD': createServlet(StaticServlet)
    }).start(Number(argv[2]) || DEFAULT_PORT);

    //创建服务器
    http.createServer(function(req,res){
        //将url地址的中的%20替换为空格，不然Node.js找不到文件
        debugger;
        var pathname=url.parse(req.url).pathname.replace(/%20/g,' '),
            re=/(%[0-9A-Fa-f]{2}){3}/g;
        //能够正确显示中文，将三字节的字符转换为utf-8编码
        pathname=pathname.replace(re,function(word){
            var buffer=new Buffer(3),
                array=word.split('%');
            array.splice(0,1);
            array.forEach(function(val,index){
                buffer[index]=parseInt('0x'+val,16);
            });
            return buffer.toString('utf8');
        });
        console.log("pathname : " + pathname);
        if(pathname=='/'){
            listDirectory(root,req,res);
        }else{
            filename=path.join(root,pathname);
            path.exists(filename,function(exists){
                if(!exists){
                    util.error('找不到文件'+filename);
                    write404(req,res);
                }else{
                    fs.stat(filename,function(err,stat){
                        if(stat.isFile()){
                            showFile(filename,req,res);
                        }else if(stat.isDirectory()){
                            listDirectory(filename,req,res);
                        }
                    });
                }
            });
        }
    }).listen(FILE_PORT);
}

function escapeHtml(value) {
  return value.toString().
    replace('<', '&lt;').
    replace('>', '&gt;').
    replace('"', '&quot;');
}

function createServlet(Class) {
  var servlet = new Class();
  return servlet.handleRequest.bind(servlet);
}

/**
 * An Http server implementation that uses a map of methods to decide
 * action routing.
 *
 * @param {Object} Map of method => Handler function
 */
function HttpServer(handlers) {
  this.handlers = handlers;
  this.server = http.createServer(this.handleRequest_.bind(this));
}

HttpServer.prototype.start = function(port) {
  this.port = port;
  this.server.listen(port);
  util.puts('Http Server running at http://localhost:' + port + '/');
};

HttpServer.prototype.parseUrl_ = function(urlString) {
  var parsed = url.parse(urlString);
  parsed.pathname = url.resolve('/', parsed.pathname);
  return url.parse(url.format(parsed), true);
};

HttpServer.prototype.handleRequest_ = function(req, res) {
  var logEntry = req.method + ' ' + req.url;
  if (req.headers['user-agent']) {
    logEntry += ' ' + req.headers['user-agent'];
  }
  util.puts(logEntry);
  req.url = this.parseUrl_(req.url);
  var handler = this.handlers[req.method];
  if (!handler) {
    res.writeHead(501);
    res.end();
  } else {
    handler.call(this, req, res);
  }
};

/**
 * Handles static content.
 */
function StaticServlet() {}

StaticServlet.MimeMap = {
  'txt': 'text/plain',
  'html': 'text/html',
  'css': 'text/css',
  'xml': 'application/xml',
  'json': 'application/json',
  'js': 'application/javascript',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'gif': 'image/gif',
  'png': 'image/png',
  'svg': 'image/svg+xml'
};

StaticServlet.prototype.handleRequest = function(req, res) {
  var self = this;
  var path = ('./' + req.url.pathname).replace('//','/').replace(/%(..)/g, function(match, hex){
    return String.fromCharCode(parseInt(hex, 16));
  });
  var parts = path.split('/');
  if (parts[parts.length-1].charAt(0) === '.')
    return self.sendForbidden_(req, res, path);
  console.log("path : " + path);
  if (parts[parts.length-1].split('.')[1] === 'json')
    return self.sendJSON_(req, res, parts[parts.length-1].split('.')[0]);
  fs.stat(path, function(err, stat) {
    if (err)
      return self.sendMissing_(req, res, path);
    if (stat.isDirectory())
      return self.sendDirectory_(req, res, path);
    return self.sendFile_(req, res, path);
  });
}

StaticServlet.prototype.sendError_ = function(req, res, error) {
  res.writeHead(500, {
      'Content-Type': 'text/html'
  });
  res.write('<!doctype html>\n');
  res.write('<title>Internal Server Error</title>\n');
  res.write('<h1>Internal Server Error</h1>');
  res.write('<pre>' + escapeHtml(util.inspect(error)) + '</pre>');
  util.puts('500 Internal Server Error');
  util.puts(util.inspect(error));
};

StaticServlet.prototype.sendMissing_ = function(req, res, path) {
  path = path.substring(1);
  res.writeHead(404, {
      'Content-Type': 'text/html'
  });
  res.write('<!doctype html>\n');
  res.write('<title>404 Not Found</title>\n');
  res.write('<h1>Not Found</h1>');
  res.write(
    '<p>The requested URL ' +
    escapeHtml(path) +
    ' was not found on this server.</p>'
  );
  res.end();
  util.puts('404 Not Found: ' + path);
};

StaticServlet.prototype.sendForbidden_ = function(req, res, path) {
  path = path.substring(1);
  res.writeHead(403, {
      'Content-Type': 'text/html'
  });
  res.write('<!doctype html>\n');
  res.write('<title>403 Forbidden</title>\n');
  res.write('<h1>Forbidden</h1>');
  res.write(
    '<p>You do not have permission to access ' +
    escapeHtml(path) + ' on this server.</p>'
  );
  res.end();
  util.puts('403 Forbidden: ' + path);
};

StaticServlet.prototype.sendRedirect_ = function(req, res, redirectUrl) {
  res.writeHead(301, {
      'Content-Type': 'text/html',
      'Location': redirectUrl
  });
  res.write('<!doctype html>\n');
  res.write('<title>301 Moved Permanently</title>\n');
  res.write('<h1>Moved Permanently</h1>');
  res.write(
    '<p>The document has moved <a href="' +
    redirectUrl +
    '">here</a>.</p>'
  );
  res.end();
  util.puts('301 Moved Permanently: ' + redirectUrl);
};

StaticServlet.prototype.sendFile_ = function(req, res, path) {
  var self = this;
  var file = fs.createReadStream(path);
  res.writeHead(200, {
    'Content-Type': StaticServlet.
      MimeMap[path.split('.').pop()] || 'text/plain'
  });
  if (req.method === 'HEAD') {
    res.end();
  } else {
    file.on('data', res.write.bind(res));
    file.on('close', function() {
      res.end();
    });
    file.on('error', function(error) {
      self.sendError_(req, res, error);
    });
  }
};

StaticServlet.prototype.sendDirectory_ = function(req, res, path) {
  var self = this;
  if (path.match(/[^\/]$/)) {
    req.url.pathname += '/';
    var redirectUrl = url.format(url.parse(url.format(req.url)));
    return self.sendRedirect_(req, res, redirectUrl);
  }
  fs.readdir(path, function(err, files) {
    if (err)
      return self.sendError_(req, res, error);

    if (!files.length)
      return self.writeDirectoryIndex_(req, res, path, []);

    var remaining = files.length;
    files.forEach(function(fileName, index) {
      fs.stat(path + '/' + fileName, function(err, stat) {
        if (err)
          return self.sendError_(req, res, err);
        if (stat.isDirectory()) {
          files[index] = fileName + '/';
        }
        if (!(--remaining))
          return self.writeDirectoryIndex_(req, res, path, files);
      });
    });
  });
};

StaticServlet.prototype.writeDirectoryIndex_ = function(req, res, path, files) {
  path = path.substring(1);
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  if (req.method === 'HEAD') {
    res.end();
    return;
  }
  res.write('<!doctype html>\n');
  res.write('<title>' + escapeHtml(path) + '</title>\n');
  res.write('<style>\n');
  res.write('  ol { list-style-type: none; font-size: 1.2em; }\n');
  res.write('</style>\n');
  res.write('<h1>Directory: ' + escapeHtml(path) + '</h1>');
  res.write('<ol>');
  files.forEach(function(fileName) {
    if (fileName.charAt(0) !== '.') {
      res.write('<li><a href="' +
        escapeHtml(fileName) + '">' +
        escapeHtml(fileName) + '</a></li>');
    }
  });
  res.write('</ol>');
  res.end();
};

StaticServlet.prototype.sendJSON_ = function(req, res, path) {
    var handler = dispatchURLByDatabase(path);
    var params = url.parse(req.url, true).query;
    console.log(path);
    console.log(params);
    handler(function(data) {
        if(data.err) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            res.write(mysql.messageBundle[data.err.code] || 'Error');
            res.end();
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.write(JSON.stringify(data));
            res.end();
        }
    }, params);
};

function dispatchURLByDatabase(path) {
    if(path == 'weekly') {
        return mysql.getWeekSchedules;
    } else if(path == 'allPhoto') {
        return mysql.getAllActivityPhoto;
    } else if(path == 'allPhotoType') {
        return mysql.getAllTypes;
    } else if(path == 'photoByType') {
        return mysql.getAllActivityPhotoByType;
    } else if(path == 'onePhotoByType') {
        return mysql.getOneActivityPhotoByType;
    }
}

// -------------------- File System ----------------------------
//www根目录
var root="C:\\";

if(!path.existsSync(root)){
    util.error(root+"文件夹不存在，请重新制定根文件夹！");
    process.exit();
}

//显示文件夹下面的文件
function listDirectory(parentDirectory,req,res){
    fs.readdir(parentDirectory,function(error,files){
        var body=formatBody(parentDirectory,files);
        res.writeHead(200,{
            "Content-Type":"text/html;charset=utf-8",
            "Content-Length":Buffer.byteLength(body,'utf8'),
            "Server":"NodeJs("+process.version+")"
        });
        res.write(body,'utf8');
        res.end();
    });

}

//显示文件内容
function showFile(file,req,res){
    fs.readFile(filename,'binary',function(err,file){
        var contentType=mime.lookupExtension(path.extname(filename));
        res.writeHead(200,{
            "Content-Type":contentType,
            "Content-Length":Buffer.byteLength(file,'binary'),
            "Server":"NodeJs("+process.version+")"
        });
        res.write(file,"binary");
        res.end();
    })
}

//在Web页面上显示文件列表，格式为<ul><li></li><li></li></ul>
function formatBody(parent,files){
    var res=[],
        length=files.length;
    res.push("<!doctype>");
    res.push("<html>");
    res.push("<head>");
    res.push("<meta http-equiv='Content-Type' content='text/html;charset=utf-8'></meta>")
    res.push("<title>Node.js文件服务器</title>");
    res.push("</head>");
    res.push("<body width='100%'>");
    res.push("<ul>")
    files.forEach(function(val,index){
        var stat=fs.statSync(path.join(parent,val));
        console.log(path.basename(val));
        var parentSplits = parent.split(root);
        var parentPath = parentSplits[1];
        if(stat.isDirectory(val)) {
            val = path.basename(val) + "/";
        } else {
            val=path.basename(val);
        }
        console.log("/"+parentPath+"/"+val);
        res.push("<li><a href='"+"/"+parentPath+"/"+val+"'>"+val+"</a></li>");
    });
    res.push("</ul>");
    res.push("<div style='position:relative;width:98%;bottom:5px;height:25px;background:gray'>");
    res.push("<div style='margin:0 auto;height:100%;line-height:25px;text-align:center'>Powered By Node.js</div>");
    res.push("</div>")
    res.push("</body>");
    return res.join("");
}

//如果文件找不到，显示404错误
function write404(req,res){
    var body="文件不存在:-(";
    res.writeHead(404,{
        "Content-Type":"text/html;charset=utf-8",
        "Content-Length":Buffer.byteLength(body,'utf8'),
        "Server":"NodeJs("+process.version+")"
    });
    res.write(body);
    res.end();
}

// ---------------------------- End --------------------------------

// Must be last,
main(process.argv);
