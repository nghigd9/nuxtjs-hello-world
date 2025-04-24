<template>
  <aside class="tools-sidebar">
    <h2 class="sidebar-title">Tools Menu</h2>
    <nav>
      <!-- Link to All Tools Index -->
      <div class="category-block">
         <NuxtLink to="/" class="sidebar-link all-tools-link" active-class="is-active">
            <Icon name="uil:apps" class="link-icon" />
            <span>All Tools</span>
          </NuxtLink>
      </div>

      <!-- Iterate over categories -->
      <div v-for="category in toolCategories" :key="category.name" class="category-block">
        <h3 class="category-title" @click="toggleCategory(category)">
          <Icon v-if="category.icon" :name="category.icon" class="category-icon" />
          <span>{{ category.name }}</span>
          <!-- Toggle Icon -->
          <Icon
            :name="category.isOpen ? 'uil:angle-down' : 'uil:angle-right'"
            class="toggle-icon"
          />
        </h3>
        <!-- Use v-show to toggle visibility -->
        <ul v-show="category.isOpen">
          <li v-for="tool in category.tools" :key="tool.path">
            <NuxtLink :to="tool.path" class="sidebar-link" active-class="is-active">
              <!-- Add Tool Icon -->
              <Icon v-if="tool.icon" :name="tool.icon" class="link-icon tool-item-icon" />
              <span>{{ tool.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue';

const toolCategories = ref([
  // --- Existing Categories Expanded ---
  {
    name: 'Image Utilities',
    icon: 'uil:image',
    isOpen: false,
    tools: [
      // Compression
      { name: 'Compress JPEG', path: '/image/compress-jpeg' },
      { name: 'Compress PNG', path: '/image/compress-png' },
      { name: 'Compress GIF', path: '/image/compress-gif' },
      { name: 'Compress SVG', path: '/image/compress-svg' },
      { name: 'Compress WebP', path: '/image/compress-webp' },
      { name: 'Compress AVIF', path: '/image/compress-avif' },
      { name: 'Bulk Image Compressor', path: '/image/bulk-compressor' },
      // Conversion
      { name: 'Convert PNG to JPG', path: '/image/png-to-jpg' },
      { name: 'Convert JPG to PNG', path: '/image/jpg-to-png' },
      { name: 'Convert Image to WebP', path: '/image/convert-to-webp' },
      { name: 'Convert Image to AVIF', path: '/image/convert-to-avif' },
      { name: 'Convert Image to GIF', path: '/image/convert-to-gif' },
      { name: 'Convert Image to BMP', path: '/image/convert-to-bmp' },
      { name: 'Convert Image to TIFF', path: '/image/convert-to-tiff' },
      { name: 'Convert HEIC to JPG', path: '/image/heic-to-jpg' },
      { name: 'Convert HEIC to PNG', path: '/image/heic-to-png' },
      { name: 'Convert SVG to PNG', path: '/image/svg-to-png' },
      { name: 'Convert SVG to JPG', path: '/image/svg-to-jpg' },
      { name: 'Convert ICO to PNG', path: '/image/ico-to-png' },
      { name: 'Convert PNG to ICO', path: '/image/png-to-ico' },
      { name: 'Convert Image to Base64', path: '/image/image-to-base64' },
      { name: 'Base64 to Image', path: '/image/base64-to-image' },
      { name: 'Progressive JPEG Converter', path: '/image/progressive-jpeg' },
      // Editing & Manipulation
      { name: 'Resize Image', path: '/image/resize-image' },
      { name: 'Crop Image', path: '/image/crop-image' },
      { name: 'Rotate Image', path: '/image/rotate-image' },
      { name: 'Flip Image', path: '/image/flip-image' },
      { name: 'Add Watermark to Image', path: '/image/add-watermark' },
      { name: 'Remove Background (AI)', path: '/image/remove-background' },
      { name: 'Image Color Adjuster', path: '/image/color-adjust' },
      { name: 'Image Filter Effects', path: '/image/filter-effects' },
      { name: 'Create Favicon', path: '/image/create-favicon' },
      { name: 'Image Splitter', path: '/image/image-splitter' },
      { name: 'Merge Images', path: '/image/merge-images' },
      { name: 'Image to ASCII Art', path: '/image/image-to-ascii' },
      // Metadata
      { name: 'EXIF Viewer', path: '/image/exif-viewer' },
      { name: 'EXIF Remover', path: '/image/exif-remover' },
      { name: 'Edit Image Metadata (IPTC/XMP)', path: '/image/edit-metadata' },
      // Analysis & Information
      { name: 'Image Dimensions Finder', path: '/image/dimensions-finder' },
      { name: 'Image Color Extractor', path: '/image/color-extractor' },
      { name: 'Image File Size Analyzer', path: '/image/filesize-analyzer' },
      { name: 'Image DPI Checker', path: '/image/dpi-checker' },
      { name: 'Similar Image Finder (Local)', path: '/image/similar-image-finder' },
      { name: 'Image Type Detector', path: '/image/image-type-detector' },
      { name: 'Dominant Color Finder', path: '/image/dominant-color' },
      // Generation
      { name: 'Solid Color Image Generator', path: '/image/solid-color-generator' },
      { name: 'Gradient Image Generator', path: '/image/gradient-generator' },
      { name: 'Placeholder Image Generator', path: '/image/placeholder-generator' },
      { name: 'Test Pattern Generator', path: '/image/test-pattern-generator' },
    ]
  },
  {
    name: 'Formatter, Minifier & Validator',
    icon: 'uil:file-edit-alt',
    isOpen: true,
    tools: [
      // JSON
      { name: 'JSON Formatter', path: '/formatter/json-formatter' },
      { name: 'JSON Minifier', path: '/formatter/json-minifier' },
      { name: 'JSON Validator', path: '/formatter/json-validator' },
      { name: 'JSON Schema Validator', path: '/formatter/json-schema-validator' },
      { name: 'JSON Path Tester', path: '/formatter/json-path-tester' },
      { name: 'JSON to XML', path: '/formatter/json-to-xml' },
      { name: 'JSON to CSV', path: '/formatter/json-to-csv' },
      { name: 'JSON to YAML', path: '/formatter/json-to-yaml' },
      { name: 'JSON to TSV', path: '/formatter/json-to-tsv' },
      { name: 'JSON to HTML Table', path: '/formatter/json-to-html-table' },
      { name: 'JSON Escape/Unescape', path: '/formatter/json-escape' }, // Moved from String
      { name: 'JSON Sorter', path: '/formatter/json-sorter' },
      { name: 'JSON Diff', path: '/formatter/json-diff' },
      { name: 'JSON Editor', path: '/formatter/json-editor' },
      { name: 'JSON Flatten/Unflatten', path: '/formatter/json-flatten' },
      // XML
      { name: 'XML Formatter', path: '/formatter/xml-formatter' },
      { name: 'XML Minifier', path: '/formatter/xml-minifier' },
      { name: 'XML Validator', path: '/formatter/xml-validator' },
      { name: 'XML Schema (XSD) Validator', path: '/formatter/xsd-validator' },
      { name: 'XPath Tester', path: '/formatter/xpath-tester' },
      { name: 'XML to JSON', path: '/formatter/xml-to-json' },
      { name: 'XML to CSV', path: '/formatter/xml-to-csv' },
      { name: 'XML to YAML', path: '/formatter/xml-to-yaml' },
      { name: 'XML to HTML Table', path: '/formatter/xml-to-html-table' },
      { name: 'XML Editor', path: '/formatter/xml-editor' },
      { name: 'XML Diff', path: '/formatter/xml-diff' },
      // HTML
      { name: 'HTML Beautifier', path: '/formatter/html-beautifier' },
      { name: 'HTML Minifier', path: '/formatter/html-minifier' },
      { name: 'HTML Validator', path: '/formatter/html-validator' },
      { name: 'HTML Entity Encoder/Decoder', path: '/formatter/html-entities' },
      { name: 'HTML Stripper', path: '/formatter/html-stripper' },
      { name: 'HTML to JSX', path: '/formatter/html-to-jsx' },
      { name: 'JSX to HTML', path: '/formatter/jsx-to-html' },
      { name: 'HTML to Pug', path: '/formatter/html-to-pug' },
      { name: 'Pug to HTML', path: '/formatter/pug-to-html' },
      { name: 'HTML to Markdown', path: '/formatter/html-to-markdown' },
      { name: 'HTML Editor', path: '/formatter/html-editor' },
      { name: 'HTML Diff', path: '/formatter/html-diff' },
      // CSS
      { name: 'CSS Beautifier', path: '/formatter/css-beautifier' },
      { name: 'CSS Minifier', path: '/formatter/css-minifier' },
      { name: 'CSS Validator', path: '/formatter/css-validator' },
      { name: 'CSS Prefixer', path: '/formatter/css-prefixer' },
      { name: 'CSS Unit Converter', path: '/formatter/css-unit-converter' },
      { name: 'CSS Sorter', path: '/formatter/css-sorter' },
      { name: 'LESS Compiler', path: '/formatter/less-compiler' },
      { name: 'SASS/SCSS Compiler', path: '/formatter/sass-compiler' },
      { name: 'CSS to Inline Style', path: '/formatter/css-to-inline' },
      { name: 'CSS Color Converter', path: '/formatter/css-color-converter' }, // See Color Utils
      { name: 'CSS Editor', path: '/formatter/css-editor' },
      { name: 'CSS Diff', path: '/formatter/css-diff' },
      // JavaScript
      { name: 'JavaScript Beautifier', path: '/formatter/js-beautifier' },
      { name: 'JavaScript Minifier (Uglify/Terser)', path: '/formatter/js-minifier' },
      { name: 'JavaScript Validator (ESLint)', path: '/formatter/js-validator' },
      { name: 'JavaScript Obfuscator', path: '/formatter/js-obfuscator' },
      { name: 'JavaScript Deobfuscator (Simple)', path: '/formatter/js-deobfuscator' },
      { name: 'CoffeeScript Compiler', path: '/formatter/coffeescript-compiler' },
      { name: 'TypeScript Compiler', path: '/formatter/typescript-compiler' },
      { name: 'Babel Transpiler', path: '/formatter/babel-transpiler' },
      { name: 'JS Editor', path: '/formatter/js-editor' },
      { name: 'JS Diff', path: '/formatter/js-diff' },
      // SQL
      { name: 'SQL Formatter', path: '/formatter/sql-formatter' },
      { name: 'SQL Minifier', path: '/formatter/sql-minifier' },
      { name: 'SQL Validator', path: '/formatter/sql-validator' },
      { name: 'SQL Editor', path: '/formatter/sql-editor' },
      // YAML
      { name: 'YAML Formatter', path: '/formatter/yaml-formatter' },
      { name: 'YAML Validator', path: '/formatter/yaml-validator' },
      { name: 'YAML to JSON', path: '/formatter/yaml-to-json' },
      { name: 'YAML to XML', path: '/formatter/yaml-to-xml' },
      { name: 'YAML to Properties', path: '/formatter/yaml-to-properties' },
      { name: 'YAML Editor', path: '/formatter/yaml-editor' },
      { name: 'YAML Diff', path: '/formatter/yaml-diff' },
      // CSV
      { name: 'CSV to JSON', path: '/formatter/csv-to-json' },
      { name: 'CSV to XML', path: '/formatter/csv-to-xml' },
      { name: 'CSV to YAML', path: '/formatter/csv-to-yaml' },
      { name: 'CSV to HTML Table', path: '/formatter/csv-to-html-table' },
      { name: 'CSV Validator', path: '/formatter/csv-validator' },
      { name: 'CSV Editor', path: '/formatter/csv-editor' },
      { name: 'CSV Diff', path: '/formatter/csv-diff' },
      { name: 'TSV to CSV', path: '/formatter/tsv-to-csv' },
      { name: 'CSV to TSV', path: '/formatter/csv-to-tsv' },
      // Other Data Formats
      { name: 'Properties to JSON', path: '/formatter/properties-to-json' },
      { name: 'Properties to YAML', path: '/formatter/properties-to-yaml' },
      { name: 'TOML Validator', path: '/formatter/toml-validator' },
      { name: 'TOML to JSON', path: '/formatter/toml-to-json' },
      { name: 'JSON to TOML', path: '/formatter/json-to-toml' },
      // Code (General/Other Languages)
      { name: 'PHP Formatter', path: '/formatter/php-formatter' },
      { name: 'PHP Minifier (Simple)', path: '/formatter/php-minifier' },
      { name: 'PHP Validator', path: '/formatter/php-validator' },
      { name: 'Python Formatter (Black)', path: '/formatter/python-formatter' },
      { name: 'Python Validator (Pylint)', path: '/formatter/python-validator' },
      { name: 'Ruby Formatter', path: '/formatter/ruby-formatter' },
      { name: 'Ruby Validator', path: '/formatter/ruby-validator' },
      { name: 'Go Formatter (gofmt)', path: '/formatter/go-formatter' },
      { name: 'Go Validator', path: '/formatter/go-validator' },
      { name: 'C# Formatter', path: '/formatter/csharp-formatter' },
      { name: 'Java Formatter', path: '/formatter/java-formatter' },
      { name: 'Swift Formatter', path: '/formatter/swift-formatter' },
      { name: 'Kotlin Formatter', path: '/formatter/kotlin-formatter' },
      { name: 'INI Formatter', path: '/formatter/ini-formatter' },
      { name: 'INI Validator', path: '/formatter/ini-validator' },
      { name: 'Diff Checker (Generic)', path: '/formatter/diff-checker' }, // Text diff moved here
    ]
  },
  {
    name: 'Internet & Network Tools',
    icon: 'uil:globe',
    isOpen: false,
    tools: [
      // IP & Domain
      { name: 'My IP Address', path: '/internet/my-ip' },
      { name: 'IP Geolocation Lookup', path: '/internet/ip-geolocation' },
      { name: 'Reverse IP Lookup', path: '/internet/reverse-ip' },
      { name: 'Domain Whois Lookup', path: '/internet/whois-lookup' },
      { name: 'DNS Record Lookup', path: '/internet/dns-lookup' },
      { name: 'Subdomain Finder', path: '/internet/subdomain-finder' },
      { name: 'IP Subnet Calculator', path: '/internet/subnet-calculator' },
      { name: 'IP Address Converter (v4/v6)', path: '/internet/ip-converter' },
      { name: 'Is Website Down?', path: '/internet/is-down' },
      // URL
      { name: 'URL Encoder', path: '/internet/url-encode' },
      { name: 'URL Decoder', path: '/internet/url-decode' },
      { name: 'URL Parser', path: '/internet/url-parser' },
      { name: 'Bulk URL Encoder/Decoder', path: '/internet/bulk-url-coder' },
      { name: 'URL Shortener (Internal/Demo)', path: '/internet/url-shortener' },
      { name: 'URL Expander', path: '/internet/url-expander' },
      { name: 'Punycode Converter', path: '/internet/punycode-converter' },
      // HTTP & Web
      { name: 'HTTP Header Viewer', path: '/internet/http-header-viewer' },
      { name: 'HTTP Status Code Checker', path: '/internet/http-status-checker' },
      { name: 'Website Screenshot Generator', path: '/internet/website-screenshot' },
      { name: 'User Agent Analyzer', path: '/internet/user-agent-analyzer' },
      { name: 'MIME Type Lookup', path: '/internet/mime-type-lookup' },
      { name: 'Open Graph Checker', path: '/internet/og-checker' },
      { name: 'Twitter Card Validator', path: '/internet/twitter-card-validator' },
      { name: 'robots.txt Tester', path: '/internet/robots-tester' },
      { name: 'sitemap.xml Validator', path: '/internet/sitemap-validator' },
      { name: 'HTML Source Code Viewer', path: '/internet/view-source' },
      { name: 'Website Technology Checker', path: '/internet/tech-checker' },
      { name: 'SSL Certificate Checker', path: '/internet/ssl-checker' },
      { name: 'Ping Tool', path: '/internet/ping' },
      { name: 'Traceroute Tool', path: '/internet/traceroute' },
      { name: 'Port Scanner', path: '/internet/port-scanner' },
      { name: 'Password Strength Meter', path: '/internet/password-strength' }, // Related to Crypto
      { name: 'Email Validator (Syntax Check)', path: '/internet/email-validator' },
      { name: 'MAC Address Lookup (OUI)', path: '/internet/mac-lookup' },
      { name: 'ISP Lookup', path: '/internet/isp-lookup' },
      { name: 'HTTP Request Maker', path: '/internet/http-request-maker' },
      { name: 'CORS Tester', path: '/internet/cors-tester' },
      { name: 'Websocket Tester', path: '/internet/websocket-tester' },
      { name: 'Website Link Extractor', path: '/internet/link-extractor' },
      { name: 'Website Image Extractor', path: '/internet/image-extractor' },
    ]
  },
  {
    name: 'Hash & Cryptography',
    icon: 'uil:lock-alt',
    isOpen: false,
    tools: [
      // Hashing
      { name: 'MD2 Hash Generator', path: '/crypto/md2-generator' },
      { name: 'MD4 Hash Generator', path: '/crypto/md4-generator' },
      { name: 'MD5 Hash Generator', path: '/crypto/md5-generator' },
      { name: 'SHA1 Hash Generator', path: '/crypto/sha1-generator' },
      { name: 'SHA224 Hash Generator', path: '/crypto/sha224-generator' },
      { name: 'SHA256 Hash Generator', path: '/crypto/sha256-generator' },
      { name: 'SHA384 Hash Generator', path: '/crypto/sha384-generator' },
      { name: 'SHA512 Hash Generator', path: '/crypto/sha512-generator' },
      { name: 'SHA3-224 Hash Generator', path: '/crypto/sha3-224-generator' },
      { name: 'SHA3-256 Hash Generator', path: '/crypto/sha3-256-generator' },
      { name: 'SHA3-384 Hash Generator', path: '/crypto/sha3-384-generator' },
      { name: 'SHA3-512 Hash Generator', path: '/crypto/sha3-512-generator' },
      { name: 'RIPEMD-128 Hash Generator', path: '/crypto/ripemd128-generator' },
      { name: 'RIPEMD-160 Hash Generator', path: '/crypto/ripemd160-generator' },
      { name: 'RIPEMD-256 Hash Generator', path: '/crypto/ripemd256-generator' },
      { name: 'RIPEMD-320 Hash Generator', path: '/crypto/ripemd320-generator' },
      { name: 'Whirlpool Hash Generator', path: '/crypto/whirlpool-generator' },
      { name: 'Tiger Hash Generator', path: '/crypto/tiger-generator' },
      { name: 'Adler-32 Checksum Generator', path: '/crypto/adler32-generator' },
      { name: 'CRC32 Checksum Generator', path: '/crypto/crc32-generator' },
      { name: 'CRC32B Checksum Generator', path: '/crypto/crc32b-generator' },
      { name: 'FNV1a Hash Generator', path: '/crypto/fnv1a-generator' },
      { name: 'File Hash Generator (MD5, SHA1, SHA256)', path: '/crypto/file-hash-generator' },
      // Encoding / Decoding
      { name: 'BASE32 Encode/Decode', path: '/crypto/base32-coder' },
      { name: 'BASE58 Encode/Decode', path: '/crypto/base58-coder' },
      { name: 'BASE64 Encode', path: '/crypto/base64-encode' },
      { name: 'BASE64 Decode', path: '/crypto/base64-decode' },
      { name: 'BASE64 URL Safe Encode/Decode', path: '/crypto/base64url-coder' },
      { name: 'BASE85 Encode/Decode', path: '/crypto/base85-coder' },
      { name: 'BASE91 Encode/Decode', path: '/crypto/base91-coder' },
      { name: 'URL Encode/Decode', path: '/crypto/url-coder' }, // Duplicate of internet tool, maybe focus on component encoding
      { name: 'HTML Entities Encode/Decode', path: '/crypto/html-entities-coder' }, // Duplicate of formatter tool
      { name: 'Binary to Text (ASCII)', path: '/crypto/bin-to-text' }, // From Number
      { name: 'Text to Binary (ASCII)', path: '/crypto/text-to-bin' }, // From Number
      { name: 'Hex Encode/Decode', path: '/crypto/hex-coder' },
      { name: 'Octal Encode/Decode', path: '/crypto/octal-coder' },
      { name: 'Morse Code Translator', path: '/crypto/morse-code' },
      // Symmetric Encryption
      { name: 'AES Encryptor', path: '/crypto/aes-encryptor' },
      { name: 'AES Decryptor', path: '/crypto/aes-decryptor' },
      { name: 'DES Encryptor/Decryptor', path: '/crypto/des-coder' },
      { name: 'TripleDES Encryptor/Decryptor', path: '/crypto/3des-coder' },
      { name: 'Rabbit Encryptor/Decryptor', path: '/crypto/rabbit-coder' },
      { name: 'RC4 Encryptor/Decryptor', path: '/crypto/rc4-coder' },
      // Asymmetric Encryption
      { name: 'RSA Key Pair Generator', path: '/crypto/rsa-key-generator' },
      { name: 'RSA Encryptor/Decryptor', path: '/crypto/rsa-coder' },
      { name: 'PGP Encrypt/Decrypt (Text)', path: '/crypto/pgp-coder' },
      { name: 'ECC Key Pair Generator', path: '/crypto/ecc-key-generator' },
      // Password Hashing & KDF
      { name: 'Password Generator', path: '/crypto/password-generator' },
      { name: 'bcrypt Generator', path: '/crypto/bcrypt-generator' },
      { name: 'bcrypt Verifier', path: '/crypto/bcrypt-verifier' },
      { name: 'scrypt Generator', path: '/crypto/scrypt-generator' },
      { name: 'Argon2 Generator', path: '/crypto/argon2-generator' },
      { name: 'PBKDF2 Generator', path: '/crypto/pbkdf2-generator' },
      // MAC & Signatures
      { name: 'HMAC Generator (MD5, SHA1, SHA256, etc.)', path: '/crypto/hmac-generator' },
      { name: 'JWT (JSON Web Token) Decoder', path: '/crypto/jwt-decoder' },
      { name: 'JWT Generator/Signer', path: '/crypto/jwt-generator' },
      { name: 'JWT Verifier', path: '/crypto/jwt-verifier' },
      { name: 'SAML Decoder/Parser', path: '/crypto/saml-decoder' },
      { name: 'Digital Signature Generator (RSA)', path: '/crypto/digital-signature-generator' },
      { name: 'Digital Signature Verifier (RSA)', path: '/crypto/digital-signature-verifier' },
      // Randomness
      { name: 'Random String Generator', path: '/crypto/random-string' },
      { name: 'Random Number Generator (Cryptographically Secure)', path: '/crypto/csprng' },
      { name: 'UUID/GUID Generator', path: '/crypto/uuid-generator' }, // Also in Generators
      { name: 'Random Byte Generator', path: '/crypto/random-bytes' },
      { name: 'Shuffle List', path: '/crypto/shuffle-list' }, // Uses randomness
      // Misc Crypto
      { name: 'ROT13 Cipher', path: '/crypto/rot13-cipher' },
      { name: 'Vigenere Cipher', path: '/crypto/vigenere-cipher' },
      { name: 'Caesar Cipher', path: '/crypto/caesar-cipher' },
      { name: 'One-Time Pad (OTP) Generator/Applier (Demo)', path: '/crypto/otp-demo' },
      { name: 'Steganography (Text in Image - Simple)', path: '/crypto/steganography-text-image' },
      { name: 'SSL/TLS Cipher Suite List', path: '/crypto/ssl-cipher-list' },
    ]
  },
  {
    name: 'Number Conversion & Calculation',
    icon: 'uil:calculator',
    isOpen: false,
    tools: [
      // Base Conversion
      { name: 'Binary to Decimal', path: '/number/bin-to-dec' },
      { name: 'Decimal to Binary', path: '/number/dec-to-bin' },
      { name: 'Binary to Hex', path: '/number/bin-to-hex' },
      { name: 'Hex to Binary', path: '/number/hex-to-bin' },
      { name: 'Binary to Octal', path: '/number/bin-to-oct' },
      { name: 'Octal to Binary', path: '/number/oct-to-bin' },
      { name: 'Decimal to Hex', path: '/number/dec-to-hex' },
      { name: 'Hex to Decimal', path: '/number/hex-to-dec' },
      { name: 'Decimal to Octal', path: '/number/dec-to-oct' },
      { name: 'Octal to Decimal', path: '/number/oct-to-dec' },
      { name: 'Hex to Octal', path: '/number/hex-to-oct' },
      { name: 'Octal to Hex', path: '/number/oct-to-hex' },
      { name: 'Base N to Base M Converter', path: '/number/base-converter' },
      // Roman Numerals
      { name: 'Roman Numerals Chart', path: '/number/roman-chart' },
      { name: 'Numbers to Roman', path: '/number/num-to-roman' },
      { name: 'Roman to Numbers', path: '/number/roman-to-num' },
      // Fractions & Percentages
      { name: 'Fraction to Decimal', path: '/number/frac-to-dec' },
      { name: 'Decimal to Fraction', path: '/number/dec-to-frac' },
      { name: 'Percent to Decimal', path: '/number/percent-to-dec' },
      { name: 'Decimal to Percent', path: '/number/dec-to-percent' },
      { name: 'Percent to Fraction', path: '/number/percent-to-frac' },
      { name: 'Fraction to Percent', path: '/number/frac-to-percent' },
      { name: 'Percentage Calculator', path: '/number/percentage-calculator' },
      { name: 'Percentage Change Calculator', path: '/number/percentage-change' },
      { name: 'Fraction Calculator (Add, Subtract, etc.)', path: '/number/fraction-calculator' },
      { name: 'Ratio Calculator', path: '/number/ratio-calculator' },
      // Color Codes (Moved some from Image/CSS)
      { name: 'Hex to RGB', path: '/number/hex-to-rgb' },
      { name: 'RGB to Hex', path: '/number/rgb-to-hex' },
      { name: 'Hex to RGBA', path: '/number/hex-to-rgba' },
      { name: 'RGBA to Hex', path: '/number/rgba-to-hex' },
      { name: 'RGB to HSL', path: '/number/rgb-to-hsl' },
      { name: 'HSL to RGB', path: '/number/hsl-to-rgb' },
      { name: 'RGB to HSV', path: '/number/rgb-to-hsv' },
      { name: 'HSV to RGB', path: '/number/hsv-to-rgb' },
      { name: 'Hex to HSL', path: '/number/hex-to-hsl' },
      { name: 'HSL to Hex', path: '/number/hsl-to-hex' },
      { name: 'Hex to CMYK (Approximate)', path: '/number/hex-to-cmyk' },
      { name: 'CMYK to Hex (Approximate)', path: '/number/cmyk-to-hex' },
      { name: 'Color Name to Hex/RGB', path: '/number/color-name-lookup' },
      // ASCII & Text Encoding
      { name: 'ASCII Table', path: '/number/ascii-table' },
      { name: 'Extended ASCII Table', path: '/number/extended-ascii-table' },
      { name: 'ASCII to Text', path: '/string/ascii-to-text' }, // Moved to String
      { name: 'Text to ASCII', path: '/string/text-to-ascii' }, // Moved to String
      { name: 'Hex to ASCII', path: '/number/hex-to-ascii' },
      { name: 'ASCII to Hex', path: '/number/ascii-to-hex' },
      { name: 'Decimal to ASCII', path: '/number/dec-to-ascii' },
      { name: 'ASCII to Decimal', path: '/number/ascii-to-dec' },
      { name: 'Binary to Text', path: '/number/bin-to-text' }, // See Crypto
      { name: 'Text to Binary', path: '/number/text-to-bin' }, // See Crypto
      { name: 'Unicode Character Inspector', path: '/number/unicode-inspector' },
      { name: 'UTF-8 Encoder/Decoder', path: '/number/utf8-coder' },
      // Basic Math & Calculation
      { name: 'Scientific Calculator', path: '/number/scientific-calculator' },
      { name: 'Standard Deviation Calculator', path: '/number/std-dev-calculator' },
      { name: 'Mean, Median, Mode Calculator', path: '/number/mean-median-mode' },
      { name: 'Prime Number Checker', path: '/number/prime-checker' },
      { name: 'Prime Number Generator', path: '/number/prime-generator' },
      { name: 'GCD/LCM Calculator', path: '/number/gcd-lcm-calculator' },
      { name: 'Factorial Calculator', path: '/number/factorial-calculator' },
      { name: 'Fibonacci Sequence Generator', path: '/number/fibonacci-generator' },
      { name: 'Random Number Generator (Simple)', path: '/number/random-number-generator' },
      { name: 'Number Sequence Generator', path: '/number/sequence-generator' },
      { name: 'Significant Figures Calculator', path: '/number/sig-figs-calculator' },
      { name: 'Rounding Calculator', path: '/number/rounding-calculator' },
      // Financial (Simple)
      { name: 'Simple Interest Calculator', path: '/number/simple-interest' },
      { name: 'Compound Interest Calculator', path: '/number/compound-interest' },
      { name: 'Loan Payment Calculator', path: '/number/loan-calculator' },
      { name: 'Salary Calculator (Hourly/Annual)', path: '/number/salary-calculator' },
      { name: 'Tip Calculator', path: '/number/tip-calculator' },
      { name: 'Sales Tax Calculator', path: '/number/sales-tax-calculator' },
      { name: 'Currency Converter (API Based)', path: '/number/currency-converter' },
      // Number Properties
      { name: 'Number to Words Converter', path: '/string/num-to-words' }, // Moved to String
      { name: 'Spell Out Check Amount', path: '/number/spell-check-amount' },
      { name: 'Integer Properties (Even/Odd, etc)', path: '/number/integer-properties' },
      { name: 'IEEE 754 Floating Point Converter', path: '/number/ieee754-converter' },
    ]
  },
  {
    name: 'String & Text Utilities',
    icon: 'uil:text',
    isOpen: false,
    tools: [
      // Basic Manipulation
      { name: 'Text Editor Online', path: '/string/text-editor' },
      { name: 'Word Counter', path: '/string/word-counter' },
      { name: 'Character Count', path: '/string/char-counter' },
      { name: 'Line Count', path: '/string/line-counter' },
      { name: 'Sentence Counter', path: '/string/sentence-counter' },
      { name: 'Paragraph Counter', path: '/string/paragraph-counter' },
      { name: 'Case Converter (Upper, Lower, Title, etc.)', path: '/string/case-converter' },
      { name: 'Reverse Text', path: '/string/reverse-text' },
      { name: 'Reverse Words', path: '/string/reverse-words' },
      { name: 'Reverse Lines', path: '/string/reverse-lines' },
      { name: 'Trim Spaces (Leading, Trailing, Extra)', path: '/string/trim-spaces' },
      { name: 'Sort Lines (Alphabetical, Numerical)', path: '/string/sort-lines' },
      { name: 'Randomize Lines', path: '/string/randomize-lines' },
      { name: 'Add Prefix/Suffix to Lines', path: '/string/add-prefix-suffix' },
      { name: 'Remove Duplicate Lines', path: '/string/remove-duplicates' },
      { name: 'Remove Blank Lines', path: '/string/remove-blanks' },
      { name: 'Remove Lines Containing String', path: '/string/remove-lines-containing' },
      { name: 'Keep Lines Containing String', path: '/string/keep-lines-containing' },
      { name: 'Add Line Numbers', path: '/string/add-line-numbers' },
      { name: 'Remove Line Numbers', path: '/string/remove-line-numbers' },
      { name: 'Find and Replace Text', path: '/string/find-replace' },
      { name: 'Text Repeater', path: '/string/text-repeater' },
      { name: 'Normalize Text (Accents, Diacritics)', path: '/string/normalize-text' },
      { name: 'Text Cleaner (Remove extra spaces, newlines)', path: '/string/text-cleaner' },
      // Regex
      { name: 'Regex Tester (Live)', path: '/string/regex-tester' },
      { name: 'Regex Replace Tool', path: '/string/regex-replace' },
      { name: 'Regex Cheat Sheet', path: '/string/regex-cheatsheet' },
      { name: 'Regex Generator (Simple Patterns)', path: '/string/regex-generator' },
      { name: 'Regex Match Extractor', path: '/string/regex-extractor' },
      // Extraction & Parsing
      { name: 'Email Extractor', path: '/string/email-extractor' },
      { name: 'URL Extractor', path: '/string/url-extractor' },
      { name: 'Phone Number Extractor', path: '/string/phone-extractor' },
      { name: 'Hashtag Extractor', path: '/string/hashtag-extractor' },
      { name: 'Number Extractor', path: '/string/number-extractor' },
      { name: 'Extract Text Between Delimiters', path: '/string/extract-between-delimiters' },
      { name: 'Split Text by Delimiter', path: '/string/split-text' },
      { name: 'Join Text with Delimiter', path: '/string/join-text' },
      // Comparison
      { name: 'Text Difference Checker', path: '/string/text-diff' }, // Moved to Formatter
      { name: 'Levenshtein Distance Calculator', path: '/string/levenshtein-distance' },
      { name: 'Text Similarity Checker (Simple)', path: '/string/text-similarity' },
      // Generation & Conversion
      { name: 'Lorem Ipsum Generator', path: '/string/lorem-ipsum' },
      { name: 'URL Slug Generator', path: '/string/slug-generator' },
      { name: 'Number to Words Converter', path: '/string/num-to-words' }, // From Number
      { name: 'Text to ASCII Art Generator', path: '/string/text-to-ascii-art' },
      { name: 'Text to Speech (Simple Browser API)', path: '/string/text-to-speech' },
      { name: 'Text to Morse Code', path: '/string/text-to-morse' },
      { name: 'Morse Code to Text', path: '/string/morse-to-text' },
      { name: 'Text to Leetspeak', path: '/string/text-to-leetspeak' },
      { name: 'Leetspeak to Text', path: '/string/leetspeak-to-text' },
      { name: 'Figlet Text Generator', path: '/string/figlet-generator' },
      { name: 'Text to Uppercase/Lowercase/Capitalize', path: '/string/case-changer' }, // More specific case tool
      { name: 'Text to ROT13', path: '/string/text-to-rot13' }, // See Crypto
      { name: 'ROT13 to Text', path: '/string/rot13-to-text' }, // See Crypto
      { name: 'Text to Binary (ASCII)', path: '/string/text-to-bin' }, // From Number/Crypto
      { name: 'Binary to Text (ASCII)', path: '/string/bin-to-text' }, // From Number/Crypto
      { name: 'Text to Hex (ASCII)', path: '/string/text-to-hex' },
      { name: 'Hex to Text (ASCII)', path: '/string/hex-to-text' }, // Moved from Number
      { name: 'Text to ASCII Codes (Decimal)', path: '/string/text-to-ascii' }, // From Number
      { name: 'ASCII Codes (Decimal) to Text', path: '/string/ascii-to-text' }, // From Number
      { name: 'Text to Base64', path: '/string/text-to-base64' }, // See Crypto
      { name: 'Base64 to Text', path: '/string/base64-to-text' }, // See Crypto
      // Analysis
      { name: 'Text Readability Score (Flesch-Kincaid, etc.)', path: '/string/readability-score' },
      { name: 'Keyword Density Checker', path: '/string/keyword-density' },
      { name: 'Text Statistics Analyzer', path: '/string/text-stats' },
      { name: 'Language Detector (Simple)', path: '/string/language-detector' },
      { name: 'Palindrome Checker', path: '/string/palindrome-checker' },
    ]
  },

  // --- New Categories ---
  {
    name: 'Date & Time Utilities',
    icon: 'uil:clock',
    isOpen: false,
    tools: [
      { name: 'Current Unix Timestamp', path: '/datetime/current-unix-timestamp' },
      { name: 'Unix Timestamp Converter', path: '/datetime/unix-timestamp-converter' },
      { name: 'Date to Unix Timestamp', path: '/datetime/date-to-unix' },
      { name: 'Date Difference Calculator', path: '/datetime/date-difference' },
      { name: 'Add/Subtract Time from Date', path: '/datetime/add-subtract-time' },
      { name: 'World Clock / Timezone Converter', path: '/datetime/timezone-converter' },
      { name: 'Stopwatch Online', path: '/datetime/stopwatch' },
      { name: 'Timer Online', path: '/datetime/timer' },
      { name: 'Date Format Converter', path: '/datetime/date-format-converter' },
      { name: 'Week Number Calculator', path: '/datetime/week-number' },
      { name: 'Day of the Year Calculator', path: '/datetime/day-of-year' },
      { name: 'Working Days Calculator', path: '/datetime/working-days' },
      { name: 'Age Calculator', path: '/datetime/age-calculator' },
      { name: 'Time Duration Calculator', path: '/datetime/duration-calculator' },
      { name: 'Leap Year Checker', path: '/datetime/leap-year-checker' },
      { name: 'Countdown Timer Generator', path: '/datetime/countdown-generator' },
      { name: 'Date Range Generator', path: '/datetime/date-range-generator' },
      { name: 'Calendar Generator (Printable)', path: '/datetime/calendar-generator' },
      { name: 'Human Readable Time Diff ("ago")', path: '/datetime/human-time-diff' },
      { name: 'ISO 8601 Date Formatter/Parser', path: '/datetime/iso8601-parser' },
      { name: 'RFC 2822 Date Formatter/Parser', path: '/datetime/rfc2822-parser' },
      { name: 'MySQL Timestamp Converter', path: '/datetime/mysql-timestamp-converter' },
      { name: 'PostgreSQL Timestamp Converter', path: '/datetime/pgsql-timestamp-converter' },
      { name: 'Excel Date Converter', path: '/datetime/excel-date-converter' },
    ]
  },
  {
    name: 'Color Utilities',
    icon: 'uil:palette',
    isOpen: false,
    tools: [
      { name: 'Color Picker (Eyedropper)', path: '/color/color-picker' },
      { name: 'Color Converter (HEX, RGB, HSL, HSV, CMYK)', path: '/color/color-converter' }, // Comprehensive version
      { name: 'Color Palette Generator', path: '/color/palette-generator' },
      { name: 'Color Gradient Generator', path: '/color/gradient-generator' },
      { name: 'Extract Colors from Image', path: '/color/image-color-extractor' }, // Duplicate of Image tool
      { name: 'Color Blender/Mixer', path: '/color/color-blender' },
      { name: 'Color Contrast Checker (WCAG)', path: '/color/contrast-checker' },
      { name: 'Find Color Name', path: '/color/color-name-finder' }, // Duplicate of Number tool
      { name: 'Generate Shades/Tints of Color', path: '/color/shades-tints-generator' },
      { name: 'Random Color Generator', path: '/color/random-color-generator' },
      { name: 'Web Safe Colors Chart', path: '/color/web-safe-colors' },
      { name: 'Material Design Colors Chart', path: '/color/material-design-colors' },
      { name: 'Tailwind CSS Colors Chart', path: '/color/tailwind-colors' },
      { name: 'Color Wheel', path: '/color/color-wheel' },
      { name: 'Color Blindness Simulator', path: '/color/color-blindness-simulator' },
      { name: 'CSS Filter Generator', path: '/color/css-filter-generator' },
      { name: 'Color Palette from Website URL', path: '/color/website-palette-extractor' },
      { name: 'Pantone Color Finder (Approximate)', path: '/color/pantone-finder' },
      { name: 'Complementary Color Finder', path: '/color/complementary-color' },
      { name: 'Analogous Color Finder', path: '/color/analogous-color' },
      { name: 'Triadic Color Finder', path: '/color/triadic-color' },
      { name: 'Split Complementary Color Finder', path: '/color/split-complementary-color' },
      { name: 'Tetradic Color Finder', path: '/color/tetradic-color' },
    ]
  },
  {
    name: 'Unit Conversion',
    icon: 'uil:ruler-combined',
    isOpen: false,
    tools: [
      // Length
      { name: 'Length Converter (m, km, mi, ft, etc.)', path: '/units/length-converter' },
      { name: 'Height Converter (cm, ft/in)', path: '/units/height-converter' },
      // Area
      { name: 'Area Converter (sqm, sqft, acre, etc.)', path: '/units/area-converter' },
      // Volume
      { name: 'Volume Converter (L, mL, gal, oz, etc.)', path: '/units/volume-converter' },
      { name: 'Cooking Measurement Converter', path: '/units/cooking-converter' },
      // Mass / Weight
      { name: 'Weight Converter (kg, lb, oz, stone, etc.)', path: '/units/weight-converter' },
      // Temperature
      { name: 'Temperature Converter (C, F, K)', path: '/units/temperature-converter' },
      // Speed
      { name: 'Speed Converter (km/h, mph, m/s, knots)', path: '/units/speed-converter' },
      // Data Size
      { name: 'Data Storage Converter (B, KB, MB, GB, TB)', path: '/units/data-storage-converter' },
      { name: 'Data Transfer Rate Converter (bps, Kbps, Mbps)', path: '/units/data-rate-converter' },
      // Time (Duration)
      { name: 'Time Duration Converter (s, min, hr, day)', path: '/units/time-duration-converter' },
      // Pressure
      { name: 'Pressure Converter (Pa, psi, bar, atm)', path: '/units/pressure-converter' },
      // Energy
      { name: 'Energy Converter (J, cal, kWh)', path: '/units/energy-converter' },
      // Power
      { name: 'Power Converter (W, hp)', path: '/units/power-converter' },
      // Frequency
      { name: 'Frequency Converter (Hz, kHz, MHz, GHz)', path: '/units/frequency-converter' },
      // Angle
      { name: 'Angle Converter (deg, rad, grad)', path: '/units/angle-converter' },
      // Fuel Consumption
      { name: 'Fuel Consumption Converter (L/100km, MPG)', path: '/units/fuel-consumption-converter' },
      // Typography
      { name: 'Typography Unit Converter (px, pt, em, rem)', path: '/units/typography-converter' }, // Also related to CSS
      // Number System Prefixes (SI)
      { name: 'SI Prefix Converter (kilo, mega, giga...)', path: '/units/si-prefix-converter' },
      // Torque
      { name: 'Torque Converter (Nm, ft-lb)', path: '/units/torque-converter' },
      // Flow Rate
      { name: 'Flow Rate Converter (L/s, GPM)', path: '/units/flow-rate-converter' },
      // Density
      { name: 'Density Converter (kg/m³, lb/ft³)', path: '/units/density-converter' },
      // Luminance
      { name: 'Luminance Converter (cd/m², nit)', path: '/units/luminance-converter' },
      // Illuminance
      { name: 'Illuminance Converter (lux, foot-candle)', path: '/units/illuminance-converter' },
      // Currency - See Number Conversion
    ]
  },
  {
    name: 'Web Development Utilities',
    icon: 'uil:brackets-curly',
    isOpen: false,
    tools: [
      // Generators
      { name: 'Meta Tag Generator', path: '/webdev/meta-tag-generator' },
      { name: 'robots.txt Generator', path: '/webdev/robots-generator' },
      { name: 'sitemap.xml Generator', path: '/webdev/sitemap-generator' },
      { name: 'HTML Boilerplate Generator', path: '/webdev/html-boilerplate' },
      { name: 'CSS Reset Generator', path: '/webdev/css-reset' },
      { name: 'README.md Generator', path: '/webdev/readme-generator' },
      { name: '.htaccess Generator', path: '/webdev/htaccess-generator' },
      { name: 'Structured Data (Schema.org) Generator', path: '/webdev/structured-data-generator' },
      { name: 'CSS Grid Generator', path: '/webdev/css-grid-generator' },
      { name: 'CSS Flexbox Generator', path: '/webdev/css-flexbox-generator' },
      { name: 'CSS Box Shadow Generator', path: '/webdev/box-shadow-generator' },
      { name: 'CSS Border Radius Generator', path: '/webdev/border-radius-generator' },
      { name: 'CSS Clip Path Generator', path: '/webdev/clip-path-generator' },
      { name: 'Button Generator (CSS)', path: '/webdev/css-button-generator' },
      { name: 'Form Generator (HTML)', path: '/webdev/html-form-generator' },
      { name: 'Table Generator (HTML)', path: '/webdev/html-table-generator' },
      // Checkers & Validators (Web Specific)
      { name: 'HTML Validator', path: '/webdev/html-validator' }, // Duplicate
      { name: 'CSS Validator', path: '/webdev/css-validator' }, // Duplicate
      { name: 'JavaScript Validator', path: '/webdev/js-validator' }, // Duplicate
      { name: 'JSON Validator', path: '/webdev/json-validator' }, // Duplicate
      { name: 'Accessibility Checker (Basic)', path: '/webdev/accessibility-checker' },
      { name: 'Broken Link Checker (Input URL)', path: '/webdev/broken-link-checker' },
      { name: 'Mobile-Friendly Test', path: '/webdev/mobile-friendly-test' },
      { name: 'Website Performance Test (Basic)', path: '/webdev/performance-test' },
      { name: 'Open Graph Checker', path: '/webdev/og-checker' }, // Duplicate
      { name: 'Twitter Card Validator', path: '/webdev/twitter-card-validator' }, // Duplicate
      { name: 'Schema Markup Validator', path: '/webdev/schema-validator' },
      // Snippets & Cheatsheets
      { name: 'HTML Cheat Sheet', path: '/webdev/html-cheatsheet' },
      { name: 'CSS Cheat Sheet', path: '/webdev/css-cheatsheet' },
      { name: 'JavaScript Cheat Sheet', path: '/webdev/js-cheatsheet' },
      { name: 'Git Cheat Sheet', path: '/webdev/git-cheatsheet' },
      { name: 'HTTP Status Codes Cheat Sheet', path: '/webdev/http-status-codes' },
      { name: 'SQL Cheat Sheet', path: '/webdev/sql-cheatsheet' },
      { name: 'Regex Cheat Sheet', path: '/webdev/regex-cheatsheet' }, // Duplicate
      { name: 'Docker Cheat Sheet', path: '/webdev/docker-cheatsheet' },
      { name: 'Kubernetes Cheat Sheet', path: '/webdev/k8s-cheatsheet' },
      // Miscellaneous
      { name: 'Screen Size/Resolution Detector', path: '/webdev/screen-size-detector' },
      { name: 'Viewport Size Detector', path: '/webdev/viewport-detector' },
      { name: 'Keyboard Event Code Tester', path: '/webdev/keyboard-event-tester' },
      { name: 'Device Mockup Generator', path: '/webdev/device-mockup-generator' },
      { name: 'Data URI Generator', path: '/webdev/data-uri-generator' },
      { name: 'Subresource Integrity (SRI) Generator', path: '/webdev/sri-generator' },
      { name: 'Content Security Policy (CSP) Generator', path: '/webdev/csp-generator' },
      { name: 'Feature Policy Generator', path: '/webdev/feature-policy-generator' },
      { name: 'WebP Compatibility Test', path: '/webdev/webp-compatibility' },
      { name: 'AVIF Compatibility Test', path: '/webdev/avif-compatibility' },
      { name: 'JavaScript Event Loop Visualizer (Link)', path: '/webdev/event-loop-visualizer' },
      { name: 'Can I Use Embed', path: '/webdev/caniuse-embed' },
      { name: 'API Request Builder', path: '/webdev/api-request-builder' }, // Simple HTTP Client
      { name: 'CORS Proxy Tester', path: '/webdev/cors-proxy-tester' },
      { name: 'Local Storage Editor/Viewer', path: '/webdev/localstorage-editor' },
      { name: 'Session Storage Editor/Viewer', path: '/webdev/sessionstorage-editor' },
      { name: 'Cookie Editor/Viewer', path: '/webdev/cookie-editor' },
    ]
  },
  {
    name: 'Data Conversion & Generation',
    icon: 'uil:database-alt',
    isOpen: false,
    tools: [
      // Conversions (Cross-Format) - Many duplicates, centralizing some
      { name: 'JSON to CSV', path: '/data/json-to-csv' },
      { name: 'CSV to JSON', path: '/data/csv-to-json' },
      { name: 'JSON to XML', path: '/data/json-to-xml' },
      { name: 'XML to JSON', path: '/data/xml-to-json' },
      { name: 'JSON to YAML', path: '/data/json-to-yaml' },
      { name: 'YAML to JSON', path: '/data/yaml-to-json' },
      { name: 'XML to CSV', path: '/data/xml-to-csv' },
      { name: 'CSV to XML', path: '/data/csv-to-xml' },
      { name: 'YAML to CSV', path: '/data/yaml-to-csv' },
      { name: 'CSV to YAML', path: '/data/csv-to-yaml' },
      { name: 'XML to YAML', path: '/data/xml-to-yaml' },
      { name: 'YAML to XML', path: '/data/yaml-to-xml' },
      { name: 'CSV to HTML Table', path: '/data/csv-to-html-table' },
      { name: 'JSON to HTML Table', path: '/data/json-to-html-table' },
      { name: 'SQL Insert to JSON', path: '/data/sql-to-json' },
      { name: 'SQL Insert to CSV', path: '/data/sql-to-csv' },
      { name: 'JSON to SQL Insert', path: '/data/json-to-sql' },
      { name: 'CSV to SQL Insert', path: '/data/csv-to-sql' },
      { name: 'Excel to CSV', path: '/data/excel-to-csv' },
      { name: 'CSV to Excel', path: '/data/csv-to-excel' },
      { name: 'Excel to JSON', path: '/data/excel-to-json' },
      { name: 'JSON to Excel', path: '/data/json-to-excel' },
      { name: 'TSV to JSON', path: '/data/tsv-to-json' },
      { name: 'JSON to TSV', path: '/data/json-to-tsv' },
      { name: 'TSV to CSV', path: '/data/tsv-to-csv' },
      { name: 'CSV to TSV', path: '/data/csv-to-tsv' },
      { name: 'Properties to JSON', path: '/data/properties-to-json' },
      { name: 'JSON to Properties', path: '/data/json-to-properties' },
      { name: 'TOML to JSON', path: '/data/toml-to-json' },
      { name: 'JSON to TOML', path: '/data/json-to-toml' },
      // Data Generation
      { name: 'Fake Data Generator (Names, Addresses, etc.)', path: '/data/fake-data-generator' },
      { name: 'Test Data Generator (CSV)', path: '/data/test-csv-generator' },
      { name: 'Test Data Generator (JSON)', path: '/data/test-json-generator' },
      { name: 'UUID/GUID Generator', path: '/data/uuid-generator' }, // Duplicate
      { name: 'Random List Generator', path: '/data/random-list-generator' },
      { name: 'Generate Sequence of Numbers', path: '/data/number-sequence-generator' }, // Duplicate
      { name: 'Generate Sequence of Dates', path: '/data/date-sequence-generator' }, // Duplicate
      { name: 'QR Code Generator', path: '/data/qr-code-generator' },
      { name: 'Barcode Generator (Various Formats)', path: '/data/barcode-generator' },
      { name: 'Credit Card Number Generator (Test/BIN)', path: '/data/credit-card-generator' },
      { name: 'IBAN Generator (Test)', path: '/data/iban-generator' },
      // Data Manipulation & Cleaning
      { name: 'CSV Cleaner (Header/Delimiter Issues)', path: '/data/csv-cleaner' },
      { name: 'JSON Cleaner (Trailing Commas, etc.)', path: '/data/json-cleaner' },
      { name: 'Data Scrubber/Anonymizer (Simple)', path: '/data/data-scrubber' },
      { name: 'Column Extractor (CSV/TSV)', path: '/data/column-extractor' },
      { name: 'Row Filter (CSV/TSV)', path: '/data/row-filter' },
      { name: 'Merge CSV Files', path: '/data/merge-csv' },
      { name: 'Split CSV File', path: '/data/split-csv' },
      // Data Viewing & Analysis
      { name: 'CSV Viewer/Editor', path: '/data/csv-viewer' },
      { name: 'JSON Viewer/Editor', path: '/data/json-viewer' },
      { name: 'XML Viewer/Editor', path: '/data/xml-viewer' },
      { name: 'YAML Viewer/Editor', path: '/data/yaml-viewer' },
      { name: 'Data Profiler (Simple CSV Stats)', path: '/data/data-profiler' },
      { name: 'Data Schema Generator (from JSON/CSV)', path: '/data/schema-generator' },
      // Barcode / QR Code Tools
      { name: 'QR Code Reader/Decoder', path: '/data/qr-code-reader' },
      { name: 'Barcode Reader/Decoder', path: '/data/barcode-reader' },
    ]
  },
  {
    name: 'SEO Utilities',
    icon: 'uil:search-alt',
    isOpen: false,
    tools: [
      { name: 'Meta Tag Analyzer', path: '/seo/meta-tag-analyzer' },
      { name: 'Meta Tag Generator', path: '/seo/meta-tag-generator' }, // Duplicate
      { name: 'Keyword Density Checker', path: '/seo/keyword-density' }, // Duplicate
      { name: 'Website Word Count', path: '/seo/website-word-count' },
      { name: 'robots.txt Generator', path: '/seo/robots-generator' }, // Duplicate
      { name: 'robots.txt Tester', path: '/seo/robots-tester' }, // Duplicate
      { name: 'sitemap.xml Generator', path: '/seo/sitemap-generator' }, // Duplicate
      { name: 'sitemap.xml Validator', path: '/seo/sitemap-validator' }, // Duplicate
      { name: 'Structured Data (Schema.org) Generator', path: '/seo/schema-generator' }, // Duplicate
      { name: 'Structured Data Validator', path: '/seo/schema-validator' }, // Duplicate
      { name: 'Open Graph Checker', path: '/seo/og-checker' }, // Duplicate
      { name: 'Twitter Card Validator', path: '/seo/twitter-card-validator' }, // Duplicate
      { name: 'Hreflang Tag Generator', path: '/seo/hreflang-generator' },
      { name: 'SERP Snippet Preview Tool', path: '/seo/serp-preview' },
      { name: 'Website Redirect Checker', path: '/seo/redirect-checker' },
      { name: 'Domain Authority / Page Authority Checker (API)', path: '/seo/da-pa-checker' },
      { name: 'Website Header Checker', path: '/seo/header-checker' }, // Duplicate
      { name: 'Website Link Extractor', path: '/seo/link-extractor' }, // Duplicate
      { name: 'Website Spider/Crawler Simulator', path: '/seo/spider-simulator' },
      { name: 'URL Slug Generator', path: '/seo/slug-generator' }, // Duplicate
      { name: 'Google Cache Viewer', path: '/seo/google-cache-viewer' },
      { name: 'Mobile-Friendly Test', path: '/seo/mobile-friendly-test' }, // Duplicate
      { name: 'Website Speed Test (Basic)', path: '/seo/speed-test' }, // Duplicate
      { name: 'Canonical Tag Checker', path: '/seo/canonical-checker' },
      { name: 'Title Tag Length Checker', path: '/seo/title-length-checker' },
      { name: 'Meta Description Length Checker', path: '/seo/description-length-checker' },
      { name: 'Google Trends Embed', path: '/seo/google-trends' },
      { name: 'Keyword Research Tool (Simple Suggest)', path: '/seo/keyword-suggest' },
      { name: 'Competitor SEO Analysis (Basic)', path: '/seo/competitor-analysis' },
    ]
  },
  {
    name: 'Miscellaneous Utilities',
    icon: 'uil:apps',
    isOpen: false,
    tools: [
      { name: 'Dice Roller', path: '/misc/dice-roller' },
      { name: 'Coin Flipper', path: '/misc/coin-flipper' },
      { name: 'Random Name Picker', path: '/misc/random-name-picker' },
      { name: 'Yes/No Decision Maker', path: '/misc/yes-no-generator' },
      { name: 'Morse Code Translator', path: '/misc/morse-translator' }, // Duplicate
      { name: 'Binary Clock', path: '/misc/binary-clock' },
      { name: 'Braille Translator (Grade 1)', path: '/misc/braille-translator' },
      { name: 'NATO Phonetic Alphabet Translator', path: '/misc/nato-phonetic' },
      { name: 'Sound Generator (Sine, Square, Saw)', path: '/misc/sound-generator' },
      { name: 'Metronome Online', path: '/misc/metronome' },
      { name: 'BMI Calculator', path: '/misc/bmi-calculator' },
      { name: 'BMR Calculator', path: '/misc/bmr-calculator' },
      { name: 'Pregnancy Due Date Calculator', path: '/misc/due-date-calculator' },
      { name: 'Unit Price Calculator', path: '/misc/unit-price-calculator' },
      { name: 'Aspect Ratio Calculator', path: '/misc/aspect-ratio-calculator' },
      { name: 'Screen Resolution List', path: '/misc/screen-resolutions' },
      { name: 'Periodic Table', path: '/misc/periodic-table' },
      { name: 'World Capitals Quiz', path: '/misc/capitals-quiz' },
      { name: 'Typing Speed Test', path: '/misc/typing-test' },
      { name: 'Markdown Editor/Preview', path: '/misc/markdown-editor' },
      { name: 'ASCII Art Generator', path: '/misc/ascii-art-generator' }, // Duplicate
      { name: 'Graph Paper Generator', path: '/misc/graph-paper-generator' },
      { name: 'Logic Gate Simulator (Simple)', path: '/misc/logic-gate-simulator' },
      { name: 'Credit Card Validator (Luhn Algorithm)', path: '/misc/luhn-validator' },
      { name: 'IBAN Validator', path: '/misc/iban-validator' },
      { name: 'ISBN Validator/Converter', path: '/misc/isbn-validator' },
      { name: 'Wind Chill Calculator', path: '/misc/wind-chill-calculator' },
      { name: 'Heat Index Calculator', path: '/misc/heat-index-calculator' },
      { name: 'Simple Poll Creator', path: '/misc/simple-poll' },
      { name: 'Drawing / Sketchpad', path: '/misc/sketchpad' },
      { name: 'Clipboard History (Session Only)', path: '/misc/clipboard-history' },
      { name: 'Emoji Picker / Search', path: '/misc/emoji-picker' },
      { name: 'Github Gist Embed Tool', path: '/misc/gist-embed' },
      { name: 'File Type Detector (By Extension)', path: '/misc/file-type-detector' },
    ]
  },
    // ... potentially more categories or tools within existing ones to reach 1000+
    // Example: PDF Tools, Video Tools, Audio Tools, Document Converters, etc.
  {
    name: 'PDF Utilities',
    icon: 'uil:file-alt',
    isOpen: false,
    tools: [
      { name: 'Merge PDF Files', path: '/pdf/merge-pdf' },
      { name: 'Split PDF File', path: '/pdf/split-pdf' },
      { name: 'Compress PDF', path: '/pdf/compress-pdf' },
      { name: 'PDF to Word', path: '/pdf/pdf-to-word' },
      { name: 'Word to PDF', path: '/pdf/word-to-pdf' },
      { name: 'PDF to Excel', path: '/pdf/pdf-to-excel' },
      { name: 'Excel to PDF', path: '/pdf/excel-to-pdf' },
      { name: 'PDF to PPT', path: '/pdf/pdf-to-ppt' },
      { name: 'PPT to PDF', path: '/pdf/ppt-to-pdf' },
      { name: 'PDF to JPG', path: '/pdf/pdf-to-jpg' },
      { name: 'JPG to PDF', path: '/pdf/jpg-to-pdf' },
      { name: 'PDF to PNG', path: '/pdf/pdf-to-png' },
      { name: 'PNG to PDF', path: '/pdf/png-to-pdf' },
      { name: 'HTML to PDF', path: '/pdf/html-to-pdf' },
      { name: 'Unlock PDF (Remove Password)', path: '/pdf/unlock-pdf' },
      { name: 'Protect PDF (Add Password)', path: '/pdf/protect-pdf' },
      { name: 'Rotate PDF Pages', path: '/pdf/rotate-pdf' },
      { name: 'Add Page Numbers to PDF', path: '/pdf/add-page-numbers' },
      { name: 'Add Watermark to PDF', path: '/pdf/add-pdf-watermark' },
      { name: 'Extract Images from PDF', path: '/pdf/extract-pdf-images' },
      { name: 'Extract Text from PDF', path: '/pdf/extract-pdf-text' },
      { name: 'Organize PDF Pages (Delete, Reorder)', path: '/pdf/organize-pdf' },
      { name: 'PDF Reader/Viewer', path: '/pdf/pdf-viewer' },
      { name: 'Sign PDF (Draw Signature)', path: '/pdf/sign-pdf' },
      { name: 'Fill PDF Form', path: '/pdf/fill-pdf-form' },
      { name: 'Repair PDF', path: '/pdf/repair-pdf' },
      { name: 'PDF Metadata Viewer', path: '/pdf/pdf-metadata-viewer' },
      { name: 'PDF Metadata Editor', path: '/pdf/edit-pdf-metadata' },
      { name: 'PDF/A Converter', path: '/pdf/pdfa-converter' },
      { name: 'Compare PDF Files (Visual)', path: '/pdf/compare-pdf' },
    ]
  },
  {
    name: 'Video Utilities',
    icon: 'uil:video',
    isOpen: false,
    tools: [
      { name: 'Convert Video (MP4, AVI, MOV, WEBM)', path: '/video/convert-video' },
      { name: 'Compress Video', path: '/video/compress-video' },
      { name: 'Video to GIF Converter', path: '/video/video-to-gif' },
      { name: 'Video to MP3 Converter', path: '/video/video-to-mp3' },
      { name: 'Resize Video Dimensions', path: '/video/resize-video' },
      { name: 'Trim / Cut Video', path: '/video/trim-video' },
      { name: 'Merge Videos', path: '/video/merge-videos' },
      { name: 'Rotate Video', path: '/video/rotate-video' },
      { name: 'Add Audio to Video', path: '/video/add-audio-to-video' },
      { name: 'Remove Audio from Video', path: '/video/remove-audio-from-video' },
      { name: 'Add Watermark to Video', path: '/video/add-video-watermark' },
      { name: 'Extract Audio from Video', path: '/video/extract-audio' }, // Duplicate
      { name: 'Extract Frames from Video (as Images)', path: '/video/extract-frames' },
      { name: 'Video Player (Local File)', path: '/video/video-player' },
      { name: 'Video Metadata Viewer', path: '/video/video-metadata-viewer' },
      { name: 'Create Video from Images (Slideshow)', path: '/video/images-to-video' },
      { name: 'Loop Video', path: '/video/loop-video' },
      { name: 'Change Video Speed (Slowmo/Fast)', path: '/video/change-video-speed' },
      { name: 'Subtitle Adder (Simple)', path: '/video/add-subtitles' },
      { name: 'Subtitle Extractor', path: '/video/extract-subtitles' },
    ]
  },
  {
    name: 'Audio Utilities',
    icon: 'uil:music',
    isOpen: false,
    tools: [
      { name: 'Convert Audio (MP3, WAV, OGG, FLAC)', path: '/audio/convert-audio' },
      { name: 'Compress Audio', path: '/audio/compress-audio' },
      { name: 'Trim / Cut Audio', path: '/audio/trim-audio' },
      { name: 'Merge Audio Files', path: '/audio/merge-audio' },
      { name: 'Change Audio Volume', path: '/audio/change-volume' },
      { name: 'Change Audio Speed (Pitch Optional)', path: '/audio/change-audio-speed' },
      { name: 'Audio Pitch Shifter', path: '/audio/pitch-shifter' },
      { name: 'Reverse Audio', path: '/audio/reverse-audio' },
      { name: 'Audio Equalizer (Simple)', path: '/audio/equalizer' },
      { name: 'Audio Player (Local File)', path: '/audio/audio-player' },
      { name: 'Audio Metadata (ID3 Tag) Viewer', path: '/audio/audio-metadata-viewer' },
      { name: 'Audio Metadata (ID3 Tag) Editor', path: '/audio/edit-audio-metadata' },
      { name: 'Voice Recorder (Browser)', path: '/audio/voice-recorder' },
      { name: 'Text to Speech', path: '/audio/text-to-speech' }, // Duplicate
      { name: 'Audio Spectrum Analyzer', path: '/audio/spectrum-analyzer' },
      { name: 'BPM Detector', path: '/audio/bpm-detector' },
      { name: 'Audio Normalizer', path: '/audio/audio-normalizer' },
      { name: 'Audio Fade In/Out', path: '/audio/audio-fader' },
      { name: 'Midi Player', path: '/audio/midi-player' },
      { name: 'Audio Joiner', path: '/audio/audio-joiner' }, // Alias for Merge
    ]
  },
  {
    name: 'Document Converters',
    icon: 'uil:file-export',
    isOpen: false,
    tools: [
      // Doc/Docx
      { name: 'Word to PDF', path: '/document/word-to-pdf' }, // Duplicate
      { name: 'PDF to Word', path: '/document/pdf-to-word' }, // Duplicate
      { name: 'Word to TXT', path: '/document/word-to-txt' },
      { name: 'Word to HTML', path: '/document/word-to-html' },
      { name: 'Word to ODT', path: '/document/word-to-odt' },
      { name: 'ODT to Word', path: '/document/odt-to-word' },
      // Xls/Xlsx
      { name: 'Excel to PDF', path: '/document/excel-to-pdf' }, // Duplicate
      { name: 'PDF to Excel', path: '/document/pdf-to-excel' }, // Duplicate
      { name: 'Excel to CSV', path: '/document/excel-to-csv' }, // Duplicate
      { name: 'CSV to Excel', path: '/document/csv-to-excel' }, // Duplicate
      { name: 'Excel to JSON', path: '/document/excel-to-json' }, // Duplicate
      { name: 'JSON to Excel', path: '/document/json-to-excel' }, // Duplicate
      { name: 'Excel to HTML Table', path: '/document/excel-to-html' },
      { name: 'ODS to Excel', path: '/document/ods-to-excel' },
      { name: 'Excel to ODS', path: '/document/excel-to-ods' },
      // Ppt/Pptx
      { name: 'PowerPoint to PDF', path: '/document/ppt-to-pdf' }, // Duplicate
      { name: 'PDF to PowerPoint', path: '/document/pdf-to-ppt' }, // Duplicate
      { name: 'PowerPoint to Images (JPG/PNG)', path: '/document/ppt-to-images' },
      { name: 'ODP to PowerPoint', path: '/document/odp-to-ppt' },
      { name: 'PowerPoint to ODP', path: '/document/ppt-to-odp' },
      // Others
      { name: 'HTML to PDF', path: '/document/html-to-pdf' }, // Duplicate
      { name: 'HTML to DOCX', path: '/document/html-to-docx' },
      { name: 'HTML to TXT', path: '/document/html-to-txt' },
      { name: 'Markdown to HTML', path: '/document/md-to-html' },
      { name: 'HTML to Markdown', path: '/document/html-to-md' }, // Duplicate
      { name: 'Markdown to PDF', path: '/document/md-to-pdf' },
      { name: 'RTF to PDF', path: '/document/rtf-to-pdf' },
      { name: 'RTF to DOCX', path: '/document/rtf-to-docx' },
      { name: 'ePub to PDF', path: '/document/epub-to-pdf' },
      { name: 'Mobi to PDF', path: '/document/mobi-to-pdf' },
      { name: 'ePub Viewer', path: '/document/epub-viewer' },
      { name: 'Text File Viewer', path: '/document/txt-viewer' },
      { name: 'Document Viewer (Word, Excel, PPT)', path: '/document/doc-viewer' },
      { name: 'Extract Text from Document', path: '/document/extract-doc-text' },
      { name: 'Extract Images from Document', path: '/document/extract-doc-images' },
    ]
  },
]);

const cryptoCategoryIndex = toolCategories.value.findIndex(cat => cat.name === 'Hash & Cryptography');
if (cryptoCategoryIndex !== -1) {
  toolCategories.value[cryptoCategoryIndex].tools.push(
    { name: 'AES-GCM Encryptor/Decryptor', path: '/crypto/aes-gcm-coder' },
    { name: 'AES-CBC Encryptor/Decryptor', path: '/crypto/aes-cbc-coder' },
    { name: 'ChaCha20 Encryptor/Decryptor', path: '/crypto/chacha20-coder' },
    { name: 'HMAC-SHA384 Generator', path: '/crypto/hmac-sha384-generator' },
    { name: 'HMAC-SHA512 Generator', path: '/crypto/hmac-sha512-generator' },
    { name: 'XOR Cipher Tool', path: '/crypto/xor-cipher' },
    { name: 'Fernet Token Generator/Verifier', path: '/crypto/fernet-coder' },
    { name: 'Public Key Extractor (from Cert)', path: '/crypto/pubkey-extractor' },
    { name: 'Certificate Signing Request (CSR) Decoder', path: '/crypto/csr-decoder' },
    { name: 'X.509 Certificate Decoder', path: '/crypto/x509-decoder' },
    { name: 'Certificate Chain Validator', path: '/crypto/cert-chain-validator' },
    { name: 'SSH Key Generator', path: '/crypto/ssh-key-generator' },
    { name: 'Password Entropy Calculator', path: '/crypto/password-entropy' },
    { name: 'Secret Sharing Scheme (Shamir)', path: '/crypto/shamir-secret-sharing' },
  );
}

// Example for Number Conversion:
const numberCategoryIndex = toolCategories.value.findIndex(cat => cat.name === 'Number Conversion & Calculation');
if (numberCategoryIndex !== -1) {
  toolCategories.value[numberCategoryIndex].tools.push(
    { name: 'Bitwise Calculator (AND, OR, XOR, NOT)', path: '/number/bitwise-calculator' },
    { name: 'Modulo Calculator', path: '/number/modulo-calculator' },
    { name: 'Logarithm Calculator (log, ln)', path: '/number/log-calculator' },
    { name: 'Exponent Calculator', path: '/number/exponent-calculator' },
    { name: 'Square Root Calculator', path: '/number/sqrt-calculator' },
    { name: 'Permutation/Combination Calculator', path: '/number/permutation-combination' },
    { name: 'Number Factorization', path: '/number/factorization' },
    { name: 'Mortgage Calculator', path: '/number/mortgage-calculator' },
    { name: 'GPA Calculator', path: '/number/gpa-calculator' },
    { name: 'Random Number from Range', path: '/number/random-range' },
  );
}

// Add more categories and tools similarly until the desired count is reached.
// Consider tools for:
// - System Admin (Cron generator, chmod calculator)
// - AI/ML (Simple model testers - might be too complex)
// - File Utilities (Splitter, Joiner, Archiver - Zip/Unzip)
// - Gaming (Dice roller variations, character sheet helpers)





function toggleCategory(category) {
  category.isOpen = !category.isOpen;
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.tools-sidebar {
  width: 280px; // Slightly wider for categories
  flex-shrink: 0;
  background-color: $bg-secondary;
  padding: 1.5rem 0; // Remove horizontal padding here
  border-right: 1px solid $border-color;
  height: 100%;
  overflow-y: auto;
}

.sidebar-title {
  font-size: 1.2rem;
  color: $text-primary;
  margin-bottom: 1rem;
  padding: 0 1rem 0.75rem 1rem; // Add padding back here
  border-bottom: 1px solid $border-color;
  text-align: center;
}

.category-block {
  margin-bottom: 1.5rem; // Space between categories
}

.category-title {
  font-size: 0.85rem; // Smaller category title
  color: $text-muted;
  text-transform: uppercase;
  font-weight: 600;
  padding: 0.5rem 1rem; // Padding for category title
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer; // Indicate it's clickable
  position: relative; // For toggle icon positioning

  &:hover {
    color: $text-primary; // Highlight on hover
  }
}

.category-icon {
  font-size: 1.1em;
}

.toggle-icon {
  margin-left: auto; // Push toggle icon to the right
  font-size: 1.2em;
  color: $text-muted;
  transition: transform 0.2s ease; // Smooth rotation
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  margin-bottom: 0; // Remove bottom margin from li
}

// Link for "All Tools" at the top
.all-tools-link {
  margin: 0 1rem 0.5rem 1rem; // Add horizontal margin
  font-weight: 500;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.6rem; // Adjust gap for icon
  padding: 0.6rem 1rem 0.6rem 1.2rem; // Adjust padding slightly for tool icon
  color: $text-secondary;
  text-decoration: none;
  // Remove border-radius for a cleaner list look
  // border-radius: 4px;
  transition: background-color 0.2s ease, color 0.2s ease;
  font-size: 0.95rem; // Slightly smaller font for tool links

  &:hover {
    background-color: $bg-tertiary;
    color: $text-primary;
  }

  &.is-active {
    background-color: $primary-color;
    color: $text-black;
    font-weight: 500;

    .link-icon {
       color: $text-black;
    }
  }
}

.link-icon {
  font-size: 1.2rem;
  color: $text-muted;
  transition: color 0.2s ease;
  margin-right: 0.2rem; // Add slight space after icon if needed
}

.tool-item-icon {
  font-size: 1.1rem; // Adjust size of individual tool icons
  min-width: 18px; // Ensure icons align vertically
  text-align: center;
}

.sidebar-link.is-active .link-icon { // Style for active link icons
   color: $text-black;
}

.sidebar-link:hover .link-icon {
   color: $text-primary;
}


@media (max-width: 768px) {
  .tools-sidebar {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid $border-color;
    padding: 1rem 0; // Adjust padding
  }
  .sidebar-title {
    margin-bottom: 1rem;
    text-align: left;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .category-title {
     padding-left: 1rem;
     padding-right: 1rem;
  }
  .all-tools-link,
  .sidebar-link {
     padding-left: 1.2rem; // Adjust mobile padding if needed
     padding-right: 1rem;
  }
  .all-tools-link {
     margin-left: 0;
     margin-right: 0;
  }
}
</style>