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

// Define your tools categorized
const toolCategories = ref([
  {
    name: 'Image Utilities',
    icon: 'uil:image',
    isOpen: false ,
    tools: [
      { name: 'Compress JPEG', path: '/image/compress-jpeg' },
      { name: 'Compress PNG', path: '/image/compress-png' },
      { name: 'Progressive JPEG Converter', path: '/image/progressive-jpeg' },
      { name: 'Image to Base64', path: '/image/image-to-base64' },
      { name: 'EXIF Viewer', path: '/image/exif-viewer' },
      { name: 'EXIF Remover', path: '/image/exif-remover' },
      { name: 'Convert PNG to JPG', path: '/image/png-to-jpg' },
      { name: 'Convert JPG to PNG', path: '/image/jpg-to-png' },
      { name: 'Resize Image', path: '/image/resize-image' },
      { name: 'Convert to WebP', path: '/image/convert-to-webp' },
    ]
  },
  {
    name: 'Formatter & Minifier',
    icon: 'uil:file-edit-alt',
    isOpen: true,
    tools: [
      { name: 'JSON Formatter', path: '/formatter/json-formatter' },
      { name: 'JSON Minifier', path: '/formatter/json-minifier' },
      { name: 'JSON to XML', path: '/formatter/json-to-xml' },
      { name: 'XML to JSON', path: '/formatter/xml-to-json' },
      { name: 'XML Formatter', path: '/formatter/xml-formatter' },
      { name: 'XML Minifier', path: '/formatter/xml-minifier' },
      { name: 'HTML Beautifier', path: '/formatter/html-beautifier' },
      { name: 'HTML Minifier', path: '/formatter/html-minifier' },
      { name: 'JavaScript Beautifier', path: '/formatter/js-beautifier' },
      { name: 'JavaScript Minifier', path: '/formatter/js-minifier' },
      { name: 'CSS Beautifier', path: '/formatter/css-beautifier' },
      { name: 'CSS Minifier', path: '/formatter/css-minifier' },
      { name: 'SQL Formatter', path: '/formatter/sql-formatter' },
      { name: 'SQL Minifier', path: '/formatter/sql-minifier' },
      { name: 'YAML to JSON', path: '/formatter/yaml-to-json' },
      { name: 'JSON to YAML', path: '/formatter/json-to-yaml' },
      { name: 'JSON Validator', path: '/formatter/json-validator' },
      { name: 'JSON Diff', path: '/formatter/json-diff' },
      { name: 'HTML to JSX', path: '/formatter/html-to-jsx' },
      { name: 'JSX to HTML', path: '/formatter/jsx-to-html' },
    ]
  },
  {
    name: 'Internet Testing',
    icon: 'uil:globe',
    isOpen: false,
    tools: [
      { name: 'My IP Address', path: '/internet/my-ip' },
      { name: 'URL Encode', path: '/internet/url-encode' },
      { name: 'URL Decode', path: '/internet/url-decode' },
    ]
  },
  {
    name: 'Hash & Cryptography',
    icon: 'uil:lock-alt',
    isOpen: false,
    tools: [
      { name: 'MD5 Hash Generator', path: '/crypto/md5-generator' },
      { name: 'SHA1 Hash Generator', path: '/crypto/sha1-generator' },
      { name: 'SHA224 Hash Generator', path: '/crypto/sha224-generator' },
      { name: 'SHA256 Hash Generator', path: '/crypto/sha256-generator' },
      { name: 'SHA384 Hash Generator', path: '/crypto/sha384-generator' },
      { name: 'SHA512 Hash Generator', path: '/crypto/sha512-generator' },
      { name: 'BASE64 Encode', path: '/crypto/base64-encode' },
      { name: 'BASE64 Decode', path: '/crypto/base64-decode' },
      { name: 'Password Generator', path: '/crypto/password-generator' },
      { name: 'bcrypt Generator', path: '/crypto/bcrypt-generator' },
      { name: 'HMAC Generator', path: '/crypto/hmac-generator' },
      { name: 'JWT Decoder', path: '/crypto/jwt-decoder' },
      { name: 'AES Encryptor', path: '/crypto/aes-encryptor' },
      { name: 'AES Decryptor', path: '/crypto/aes-decryptor' },
      { name: 'Random String Generator', path: '/crypto/random-string' },
    ]
  },
  {
    name: 'Number Conversion',
    icon: 'uil:calculator',
    isOpen: false,
    tools: [
      { name: 'Hex to Decimal', path: '/number/hex-to-dec' },
      { name: 'Decimal to Hex', path: '/number/dec-to-hex' },
      { name: 'Octal to Decimal', path: '/number/oct-to-dec' },
      { name: 'Decimal to Octal', path: '/number/dec-to-oct' },
      { name: 'Binary to Decimal', path: '/number/bin-to-dec' },
      { name: 'Decimal to Binary', path: '/number/dec-to-bin' },
      { name: 'Binary to Hex', path: '/number/bin-to-hex' },
      { name: 'Hex to Binary', path: '/number/hex-to-bin' },
      { name: 'ASCII Table', path: '/number/ascii-table' },
      { name: 'Hex to ASCII', path: '/number/hex-to-ascii' },
      { name: 'ASCII to Hex', path: '/number/ascii-to-hex' },
      { name: 'Binary to Text', path: '/number/bin-to-text' },
      { name: 'Text to Binary', path: '/number/text-to-bin' },
      { name: 'Fraction to Decimal', path: '/number/frac-to-dec' },
      { name: 'Decimal to Fraction', path: '/number/dec-to-frac' },
      { name: 'Percent to Decimal', path: '/number/percent-to-dec' },
      { name: 'Decimal to Percent', path: '/number/dec-to-percent' },
      { name: 'Percent to Fraction', path: '/number/percent-to-frac' },
      { name: 'Fraction to Percent', path: '/number/frac-to-percent' },
      { name: 'Hex to RGB', path: '/number/hex-to-rgb' },
      { name: 'RGB to Hex', path: '/number/rgb-to-hex' },
      { name: 'Hex to RGBA', path: '/number/hex-to-rgba' },
      { name: 'RGBA to Hex', path: '/number/rgba-to-hex' },
      { name: 'Roman Numerals Chart', path: '/number/roman-chart' },
      { name: 'Roman to Numbers', path: '/number/roman-to-num' },
      { name: 'Numbers to Roman', path: '/number/num-to-roman' },
    ]
  },
  {
    name: 'String & Text Utilities',
    icon: 'uil:text',
    isOpen: false,
    tools: [
      { name: 'Text Editor Online', path: '/string/text-editor' },
      { name: 'Regex Tester', path: '/string/regex-tester' },
      { name: 'Regex Replace', path: '/string/regex-replace' },
      { name: 'Word Counter', path: '/string/word-counter' },
      { name: 'Character Count', path: '/string/char-counter' },
      { name: 'Case Converter', path: '/string/case-converter' },
      { name: 'Reverse Text', path: '/string/reverse-text' },
      { name: 'Number to Words', path: '/string/num-to-words' },
      { name: 'Text to ASCII', path: '/string/text-to-ascii' },
      { name: 'ASCII to Text', path: '/string/ascii-to-text' },
      { name: 'Remove Duplicate Lines', path: '/string/remove-duplicates' },
      { name: 'Remove Blank Lines', path: '/string/remove-blanks' },
      { name: 'Add Line Numbers', path: '/string/add-line-numbers' },
      { name: 'Trim Spaces', path: '/string/trim-spaces' },
      { name: 'Find and Replace', path: '/string/find-replace' },
      { name: 'URL Slug Generator', path: '/string/slug-generator' },
      { name: 'Text Difference Checker', path: '/string/text-diff' },
      { name: 'Email Extractor', path: '/string/email-extractor' },
      { name: 'JSON Escape/Unescape', path: '/string/json-escape' },
    ]
  }
]);

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