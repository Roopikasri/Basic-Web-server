// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Function to serve HTML content
function serveHtml(res, filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}

// Function to serve CSS files
function serveCss(res, filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    }
  });
}

// Function to read content from a text file
function readFileContent(res, filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    }
  });
}

// Function to write content to a text file
function writeFileContent(res, filePath, content) {
  fs.writeFile(filePath, content, 'utf8', (err) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('File written successfully');
    }
  });
}

// Function to delete a file
function deleteFile(res, filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found or could not be deleted');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('File deleted successfully');
    }
  });
}

// Function to rename a file
function renameFile(res, oldPath, newPath) {
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found or could not be renamed');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('File renamed successfully');
    }
  });
}

// Create the server
const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/') {
    // Serve the HTML file for the root route
    serveHtml(res, path.join(__dirname, 'index.html'));

  } else if (url === '/styles.css') {
    // Serve the CSS file
    serveCss(res, path.join(__dirname, 'styles.css'));

  } else if (url === '/read-file') {
    // Read the content of a text file
    readFileContent(res, path.join(__dirname, 'example.txt'));

  } else if (url === '/write-file') {
    // Write some content to a text file
    const contentToWrite = 'Hello, this is a test write operation!';
    writeFileContent(res, path.join(__dirname, 'example.txt'), contentToWrite);

  } else if (url === '/delete-file') {
    // Delete the text file
    deleteFile(res, path.join(__dirname, 'example.txt'));

  } else if (url === '/rename-file') {
    // Rename the text file
    renameFile(res, path.join(__dirname, 'example.txt'), path.join(__dirname, 'renamed.txt'));

  } else {
    // 404 for undefined routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
