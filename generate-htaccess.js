const fs = require("fs");
const path = require("path");

const buildDir = path.join(__dirname, "build"); // Path to the build directory

// Create the 'build' directory if it doesn't exist
try {
  // Create the 'build' directory if it doesn't exist
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  }

  const htaccessContent = `
RewriteEngine On
RewriteBase /

# If the requested resource is not a file or directory,
# rewrite the request to the index.html file
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]

# MIME type configuration for certain file types
AddType text/html .html
AddType application/javascript .js
AddType text/css .css

# Gzip compression for certain file types
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml application/xml application/xhtml+xml text/javascript text/css application/x-javascript
</IfModule>

# Set caching headers for certain file types
<FilesMatch "\\.(ico|pdf|flv|jpg|jpeg|png|gif|js|css|swf)$">
    Header set Cache-Control "max-age=2592000, public"
</FilesMatch>

# Disable ETags (optional, can improve caching behavior)
Header unset ETag
FileETag None
`;

  fs.writeFileSync(path.join(buildDir, ".htaccess"), htaccessContent.trim());

  console.log(".htaccess file generated successfully.");
} catch (error) {
  console.error("Error generating .htaccess file:", error);
}